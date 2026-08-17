/**
 * @file    extracted getQueryDocumentKey from persistgraphql package to reduce
 *          the file size from the production build, as persistgraphql imports
 *          the whole graphql module, even though only the print function is needed.
 * @author  Steven Wolf (steven.wolf@ringieraxelspringer.ch)
 * @date    2017-08-14
 *
 */
import { print as gqlPrint } from 'graphql';

// Returns a key for a query in a document definition. Should include exactly one query and a set
// of fragments that the query references. Currently just uses GraphQL printing as a serialization
// mechanism; may use hashes or ids in the future. Also applies query transformers to the document
// before making it a document key.
export function getQueryDocumentKey(document, queryTransformers = []) {
  return gqlPrint(
    applyFragmentDefinitionSort(
      applyQueryTransformers(document, queryTransformers),
    ),
  );
}

// Sorting strategy for fragment definitions. Sorts fragment
// definitions by their name and moves them to the end of the
// query.
export function sortFragmentsByName(a, b) {
  const aIsFragment = a.kind === 'FragmentDefinition';
  const bIsFragment = b.kind === 'FragmentDefinition';

  // If both aren't fragments, just leave them in place.
  if (!aIsFragment && !bIsFragment) {
    return 0;
  }
  // If both are fragments, sort them by their name.
  if (aIsFragment && bIsFragment) {
    const aName = a.name.value;
    const bName = b.name.value;
    if (aName === bName) {
      return 0; // keep order
    } else if (aName < bName) {
      return -1; // move up
    } else {
      return 1; // move down
    }
  }

  // Move fragments to the end.
  return aIsFragment ? 1 : -1;
}

// Apply sorting strategy for fragments.
export function applyFragmentDefinitionSort(document) {
  document.definitions = document.definitions.sort(sortFragmentsByName);
  return document;
}

// Apply queryTransformers to a query document.
export function applyQueryTransformers(document, queryTransformers = []) {
  let currentDocument = document;
  queryTransformers.forEach((transformer) => {
    currentDocument = transformer(currentDocument);
  });
  return currentDocument;
}
