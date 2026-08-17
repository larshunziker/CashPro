#!/usr/bin/env node

/**
 * @file   persist-graphql.js
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2017-11-16
 *
 */

const fs = require('fs');
const path = require('path');
const sha = require('jssha');
const chalk = require('chalk');
const { parse, visit } = require('graphql');
const onFinished = require('on-finished');
const cp = require('child_process');
const paths = require('../config/paths');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

// set app
const appEnv = process.env.APP || '';
const dotEnv = process.env.DOT_ENV || '';
console.log(
  chalk`{blue Persist GraphQL for {bold ${appEnv}} on env {bold ${dotEnv}}}`,
);

// import async functions
const updatePossibleTypes = require('./update-possible-types');

const backendQueryMapSrc = `${paths.appQueryMaps}/${paths.appQueryMapsBackendName}`;

// run persist graphql for the frontend query map
function onBackendQueryMapHandler(err) {
  if (err) {
    console.log(chalk`{red {bold Backend} query map was not created.}`);
    console.log(err);
    process.exit(1);
    return;
  }

  console.log(
    chalk`{green {bold Backend} query map for {bold ${appEnv}} created.}`,
  );

  // strip custom directives from the backend query map
  const data = fs.readFileSync(backendQueryMapSrc, 'utf8');
  // replace '@api(name: xxx)' and '@api(name: "xxx")' with ''
  const newData = data.replace(/ @api\(name:.*?\)/g, '');
  // update file
  fs.writeFileSync(backendQueryMapSrc, newData, {
    encoding: 'utf8',
    flag: 'w',
  });

  // GRAPHQL QUERY VALIDATION
  validateFragments(backendQueryMapSrc);

  // create frontend query map
  cp.fork(`${__dirname}/persist-graphql-frontend.js`);
}

// run persist graphql for the backend query map
function onPossibleTypeUpdateHandler(err = false) {
  if (err) {
    console.log(chalk`{red {bold Introspection} query was not updated.}`);
    console.log(err);
    process.exit(1);
    return;
  }

  console.log(chalk`{green {bold Introspection} query updated.}`);

  cp.exec(
    `npx persistgraphql ${paths.appRoot} ${backendQueryMapSrc} --js --add_typename --extension=js`,
    onBackendQueryMapHandler,
  );
}

// update introspection query
if (process.env.SKIP_POSSIBLE_TYPES) {
  onPossibleTypeUpdateHandler();
  return;
}

updatePossibleTypes()
  .then(() => onPossibleTypeUpdateHandler())
  .catch((err) => onPossibleTypeUpdateHandler(err));

function validateFragments(queryMapPath) {
  const raw = fs.readFileSync(queryMapPath, 'utf8');
  let queries;
  try {
    queries = JSON.parse(raw);
  } catch (e) {
    console.log(chalk`{red Could not parse query map file: ${queryMapPath}}`);
    process.exit(1);
  }
  // Map: fragmentName -> [fieldsHash]
  const fragmentFields = {};
  const errors = [];
  // Helper: compare selection sets
  function selectionSetHash(selectionSet) {
    if (!selectionSet || !selectionSet.selections) return '';
    return JSON.stringify(
      selectionSet.selections.map((sel) => {
        if (sel.kind === 'Field') {
          return {
            name: sel.name.value,
            selection: selectionSetHash(sel.selectionSet),
          };
        } else if (sel.kind === 'InlineFragment') {
          return {
            typeCondition: sel.typeCondition.name.value,
            selection: selectionSetHash(sel.selectionSet),
          };
        } else if (sel.kind === 'FragmentSpread') {
          return {
            fragment: sel.name.value,
          };
        }
        return sel.kind;
      }),
    );
  }
  for (const query of Object.keys(queries)) {
    let ast;
    try {
      ast = parse(query);
    } catch (e) {
      errors.push(`GraphQL query parse error: ${e.message}\nQuery: ${query}`);
      continue;
    }
    // Fragment validation (as before)
    visit(ast, {
      FragmentDefinition(node) {
        const name = node.name.value;
        const fields = JSON.stringify(
          node.selectionSet.selections.map((sel) => sel.name && sel.name.value),
        );
        if (!fragmentFields[name]) fragmentFields[name] = new Set();
        fragmentFields[name].add(fields);
        // Check for duplicate fragments with different fields
        if (fragmentFields[name].size > 1) {
          errors.push(
            `Duplicate fragment '${name}' with different fields in fragment '${name}'!`,
          );
        }
      },
    });
    // Field validation: check for duplicate field names with different selection sets
    function checkDuplicateFields(
      selectionSet,
      parentPath = '',
      queryName = '',
      fragmentName = '',
    ) {
      if (!selectionSet || !selectionSet.selections) return;
      const fieldMap = {};
      for (const sel of selectionSet.selections) {
        if (sel.kind === 'Field') {
          // Use alias if present, otherwise use field name
          const name = sel.alias ? sel.alias.value : sel.name.value;
          const hash = selectionSetHash(sel.selectionSet);
          const key = parentPath + '.' + name;
          if (!fieldMap[name]) fieldMap[name] = [];
          fieldMap[name].push(hash);
          // Recursively check children
          checkDuplicateFields(sel.selectionSet, key, queryName, fragmentName);
        } else if (
          sel.kind === 'InlineFragment' ||
          sel.kind === 'FragmentDefinition'
        ) {
          let fragName = fragmentName;
          if (sel.kind === 'FragmentDefinition' && sel.name && sel.name.value) {
            fragName = sel.name.value;
          }
          checkDuplicateFields(
            sel.selectionSet,
            parentPath,
            queryName,
            fragName,
          );
        }
      }
      for (const [name, hashes] of Object.entries(fieldMap)) {
        if (hashes.length > 1) {
          if (fragmentName) {
            errors.push(
              `Duplicate field '${name}' detected in fragment '${fragmentName}' (${
                parentPath || 'root'
              }). GraphQL does not allow multiple fields with the same name in the same selection set.`,
            );
          } else {
            errors.push(
              `Duplicate field '${name}' detected in '${
                parentPath || 'root'
              }' of query: '${queryName}'. GraphQL does not allow multiple fields with the same name in the same selection set.`,
            );
          }
        }
      }
    }
    // Get query name for error reporting
    let queryName = '';
    if (ast.definitions && ast.definitions.length > 0) {
      const def = ast.definitions[0];
      if (def.name && def.name.value) {
        queryName = def.name.value;
      }
    }
    if (ast.definitions) {
      for (const def of ast.definitions) {
        if (def.selectionSet) {
          // If fragment, pass its name
          let fragmentName = '';
          if (def.kind === 'FragmentDefinition' && def.name && def.name.value) {
            fragmentName = def.name.value;
          }
          checkDuplicateFields(def.selectionSet, '', queryName, fragmentName);
        }
      }
    }
  }
  // Check for duplicate fragments with different fields
  for (const [name, fieldsSet] of Object.entries(fragmentFields)) {
    if (fieldsSet.size > 1) {
      errors.push(`Duplicate fragment '${name}' with different fields!`);
    }
  }
  // Print all errors at once
  if (errors.length > 0) {
    console.log(chalk`{red GraphQL validation errors:}`);
    errors.forEach((err) => console.log(chalk`{red ${err}}`));
    process.exit(1);
  }
}
