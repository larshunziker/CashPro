import { check, sleep } from 'k6';
import http from 'k6/http';
const queryStringWithFields = require('./queryWithFields.js'); //Query with new fields, see
const queryStringWithoutFields = require('./queryWithoutFields.js');

export let options = {
  vus: 75, //Nr of conccurrent users 10-50
  duration: '4s', //timespan of testing. shouldn't be too low, as k6 only computes fully successful requests.
};

const url = 'https://api.dev.handelszeitung.ch/graphql/';
const payload = JSON.stringify({
  operationName: 'RouteByPath',
  variables: {
    path: 'tracking-load-test',
    publication: 'HZ',
    additionalPublications: ['BIL', 'SV', 'HZB'],
    landingPageGridPageSize: 11,
    landingPageGridOffset: 0,
    branchPageSize: 13,
    branchOffset: 0,
    keywordsPageSize: 30,
    keywordsOffset: 0,
    dossierPageSize: 9,
    dossierOffset: 0,
    sponsorLimit: 13,
    sponsorSortBy: 'Date',
    sponsorOffset: 0,
    sponsorSortOrder: 'Descending',
    organizationOffset: 0,
    organizationLimit: 13,
    organizationSortBy: 'Date',
    organizationSortOrder: 'Descending',
    personOffset: 0,
    personLimit: 13,
    personSortBy: 'Date',
    personSortOrder: 'Descending',
    rankingPageSize: 21,
    rankingOffset: 0,
  },
  query: queryStringWithFields,
});

const params = {
  headers: {
    'content-type': 'application/json',
    accept: 'application/json',
  },
};

export default function () {
  let res = http.post(url, payload, params);
  console.log('Response time was ' + String(res.timings.duration) + ' ms'); //Log the request time in ms (for each round trip)
  check(res, {
    'status was 200': (r) => r.status == 200,
    'transaction time OK': (r) => r.timings.duration < 620,
  });
  sleep(0.1);
}

//Results are explained here:
//https://k6.io/docs/using-k6/metrics#built-in-metrics
