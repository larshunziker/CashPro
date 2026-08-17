#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');
const paths = require('../config/paths');
const fetch = require('isomorphic-fetch');

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
          chalk`{yellow persist-menu: fetch failed (${err.message}), retrying in ${delay}ms (${retries} left)}`,
        );
        return new Promise((resolve) => setTimeout(resolve, delay)).then(() =>
          fetchWithRetry(url, options, retries - 1),
        );
      }
      throw err;
    });
}

const appEnv = process.env.APP || '';

if (!appEnv) {
  process.exit();
}

const menuQuery = `${paths.appPublic}/hybrid/menu.gql`;

function handleWrite(err) {
  if (err) {
    // eslint-disable-next-line no-console
    console.log(chalk`{red File write failed!}`);
    process.exit(1);
    return;
  }
  // eslint-disable-next-line no-console
  console.log(chalk`✅  {green App menu for {bold ${appEnv}} created.}`);
}

function handleFile(err, gqlQuery) {
  if (err) {
    // eslint-disable-next-line no-console
    console.log(chalk`{red Was not able to find/read file "${menuQuery}"!}`);
    process.exit(1);
    return;
  }

  fetchWithRetry(process.env.CMS_GRAPHQL_HOST, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query: gqlQuery.toString() }),
  })
    .then((res) => res.json())
    .then((json) => {
      fs.writeFile(
        `${paths.appPublic}/hybrid/menu.json`,
        JSON.stringify(json.data),
        handleWrite,
      );
    })
    .catch((e) =>
      // eslint-disable-next-line no-console
      console.log(chalk`{red Was not able to write menu.json ${e}!}`),
    );
}

if (fs.existsSync(menuQuery)) {
  fs.readFile(menuQuery, handleFile);
}
