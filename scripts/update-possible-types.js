const fetch = require('node-fetch'); // if you remove this, check if GM is still able to persist graphql queries!
const fs = require('fs');
const path = require('path');
require('../config/env');

let env = '';
switch (process.env.DOT_ENV) {
  case 'develop':
    env = '.dev';
    break;
  case 'stage':
    env = '.stage';
    break;
}
const gqlUrl = process.env.GRAPHQL_HOST_LOADER;
const cmsUrl = `https://api${env}.${process.env.APP}.ch/graphql`;

const apolloAuthToken = process.env.hasOwnProperty('APOLLO_SERVICE_AUTH')
  ? process.env.APOLLO_SERVICE_AUTH
  : '';

const fetchSchema = async (url) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-app-introspect-auth': apolloAuthToken,
    },
    body: JSON.stringify({
      variables: {},
      query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
    }),
  });
  const resJson = await res.json();
  return resJson;
};

const saveSchemaToFS = async (schema) => {
  const possibleTypes = {};
  schema.data.__schema.types.forEach((supertype) => {
    if (supertype.possibleTypes) {
      possibleTypes[supertype.name] = supertype.possibleTypes.map(
        (subtype) => subtype.name,
      );
    }
  });
  const file = path.resolve(
    process.cwd(),
    'src',
    'shared',
    'possibleTypes.json',
  );
  // console.log(
  //   '=============== Writing possibleTypes =================\n',
  //   `${JSON.stringify(possibleTypes)}\n`,
  //   '========================= END =========================\n',
  // );
  await fs.writeFile(file, JSON.stringify(possibleTypes), 'utf-8', (err) => {
    if (err) {
      console.error('Error writing possibleTypes.json', err);
    } else {
      console.log('Fragment types successfully extracted!');
    }
  });
};

const doUpdatePossibleTypes = async () => {
  const gqlSchemaRaw = (gqlUrl && (await fetchSchema(gqlUrl))) || null;
  const cmsSchemaRaw = await fetchSchema(cmsUrl);
  if (gqlSchemaRaw) {
    cmsSchemaRaw.data.__schema.types.push(...gqlSchemaRaw.data.__schema.types);
  }
  await saveSchemaToFS(cmsSchemaRaw);
};

module.exports = doUpdatePossibleTypes;
