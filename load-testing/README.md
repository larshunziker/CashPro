# Load Testing

For load testing, please install the following tool (for example via homebrew): https://k6.io/open-source

Create a JS file (see below), cd to your script in the terminal and execute it with "k6 run <your script>.js".

## Basic scripting

First, import the neccessary code:

```javascript
import http from 'k6/http'; //This module will be used to fetch
import { check, sleep } from 'k6'; //These are used to set
```

Then, define options for the test suite:

```javascript
export let options = {
  vus: 1, //Number of conccurrent vitual users
  duration: '10s', //timespan of testing. shouldn't be too low, as k6 only computes fully successful requests.
};
```

Note that the number of runs can not precisely be predicted. The duration and vu number only allow for an approximate guess.

You will have to define and export one default function. This function will be run by every virtual user, over and over again for as long as the test runs, and should therefore not contain things like module imports or loading from disk.

In this example, a URL is called via GET request and the result stored in a variable.

```javascript
export default function() {
  let res = http.get('http://test.k6.io');
```

After this, the earlier imported "check" method is used to check each call for the returned status and whether it was returned in a predefined time.

```javascript
check(res, {
    'status was 200': (r) => r.status == 200, //Was the response status 200?
    'transaction time OK': (r) => r.timings.duration < 620, //Did it not take longer than 620 ms?
  });
  sleep(1); //The vu will have a very short break before getting to work again.
}
```

The results of each _check({})_ will be summarized in the terminal after test execution.

## Testing our graphQL

To test our graphQL API, we make a POST request to it.

```javascript
export default function () {
let res = http.post(url, payload, params);
check(res, { ... })
```

Outside the default function, define the three variables:

```javascript
const url = 'https://api.dev.handelszeitung.ch/graphql/';
const params = {
  headers: {
    'content-type': 'application/json',
    accept: 'application/json',
  },
};
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
```

All these details can be found when inspecting the Post request made to a locally run page.

In the above example, the graphQL query is stored in a variable `queryStringWithFields`, which was outsourced to another file due to its length.
