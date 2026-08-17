#!/usr/bin/env node

/**
 * @file   static query loader
 * @author Steven Wolf <steven.wolf@ringieraxelspringer.ch>
 * @date   2017-10-05
 */

const fetch = require('isomorphic-fetch');

const reQuery = /gqldata`([^`]+)`/;
const reContent = /gqldata`[^`]+`/;

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 2000;

function fetchWithRetry(url, options, retries = MAX_RETRIES) {
  return fetch(url, options)
    .then((res) => {
      if (!res.ok && retries > 0) {
        const delay = BASE_DELAY_MS * Math.pow(2, MAX_RETRIES - retries);
        return new Promise((resolve) => setTimeout(resolve, delay)).then(() =>
          fetchWithRetry(url, options, retries - 1),
        );
      }
      return res;
    })
    .catch((err) => {
      if (retries > 0) {
        const delay = BASE_DELAY_MS * Math.pow(2, MAX_RETRIES - retries);
        // eslint-disable-next-line no-console
        console.warn(
          `gqldata-loader: fetch failed (${err.message}), retrying in ${delay}ms (${retries} left)`,
        );
        return new Promise((resolve) => setTimeout(resolve, delay)).then(() =>
          fetchWithRetry(url, options, retries - 1),
        );
      }
      throw err;
    });
}

module.exports = function (content) {
  const tester = reQuery.exec(content);

  if (tester && tester.length > 1) {
    const callback = this.async();
    const gqlQuery = tester[1];

    fetchWithRetry(process.env.CMS_GRAPHQL_HOST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query: gqlQuery }),
    })
      .then((res) => res.json())
      .then((json) => {
        callback(null, content.replace(reContent, JSON.stringify(json.data)));
      })
      .catch((e) => callback(e));
  } else {
    return content;
  }
};
