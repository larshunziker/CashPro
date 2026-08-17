# RASCH Frontend Stack v2

The mono-repo frontend stack for all RASCH applications.

## Setup / Installation Guide

A detailed setup guide for your local dev environment can be found here: [Setup](docs/SETUP.md)

## Get Started

1. Clone this repository

2. Install [OrbStack](https://orbstack.dev/download) (docker)

3. Create a self signed certificates for secure authentication, see [Spotlight](https://spotlight.rms.rocks/documentation/integrations/mkcert)

4. Start the app:

```
yarn dev
```

## General Information

Some general information about the stack can be found under [doc/INFO.md](docs/INFO.md). </br>

There is an [FAQ Section](#faq) at the end of this readme file.

## Pull-Request info

In [docs/PULL-REQUEST.md](docs/PULL-REQUEST.md) can you find the pull-request guidelines for developer and reviewer.

## Server

| Env        | Url                                              | CNAME           |
| ---------- | ------------------------------------------------ | --------------- |
| pr         | https://nginx.pr-NUMBER.APP-k8s.develop.ras.dev/ | -               |
| develop    | http://nginx-APP-develop.rasch.amazee.io/        | develop.APP.tld |
| stage      | http://nginx-APP-stage.rasch.amazee.io/          | stage.APP.tld   |
| master     | http://nginx-APP-master.rasch.amazee.io/         | stage.APP.tld   |
| production | https://nginx-APP-production.rasch.amazee.io/    | www.APP.tld     |

### Branches / environments

For the rasch-stack we only have a `develop` and a `master` branch, but in the list above there is a stage and a production url. How does that work? Its actually pretty simple:

- The **develop** preview url is using the codebase from the `develop` branch and is pointing against the [**DEV CMS**](https://cms.dev.ringiermedienschweiz.ch)
- The **stage** preview url is using the codebase from the `master` branch and is pointing against the [**STAGE CMS**](https://cms.stage.ringiermedienschweiz.ch)
- The **master** preview url is using the codebase from the `master` branch and is pointing against the [**PRODUCTION CMS**](https://cms.ringiermedienschweiz.ch)
- The **preview** preview url is using the codebase from the `master` branch and is pointing against the [**PRODUCTION CMS**](https://cms.ringiermedienschweiz.ch) (unpublished content will be displayed here)
- The **production** preview url is using the codebase from the `master` branch (since the last deployment) and is pointing against the [**PRODUCTION CMS**](https://cms.ringiermedienschweiz.ch) (without akamai cache)

More info can be found [here](https://confluence.ringieraxelspringer.ch/pages/viewpage.action?pageId=36538934).

## CLI

#### `yarn dev`

Runs the dev server

#### `yarn build`

Creates a production build including SSR (node and client)

#### `yarn start`

Starts a built app

#### `yarn lint`

Runs `EsLint`, `TSC` and `CSS` linters on `fix` mode.

#### `yarn persistgraphql`

Updates introspection query and query map (for frontend and backend)

#### `yarn test`

Runs unit tests.
Optional you can add on option `--coverage` to get the coverage report in `coverage/<app name>`. Open `index.html` in a browser to see the coverage per file.

For publication-specific Jest patterns and troubleshooting, see `docs/testing/JEST_PUBLICATION_TEST_PLAYBOOK.md`.

#### `yarn test:ci`

Runs unit tests for all publications and updates the coverage report in `coverage/<app name>`.

#### `yarn test:single <relative path to file>`

Runs unit test just for defined file

#### `yarn purge-caches`

Purges babel caches.

## CLI options

#### `APP=<app> yarn xxx`

Forces to run the provided app.

#### `DOT_ENV=<env-name> yarn xxx`

Forces to use .env.xxx config file within the app directory. Useful to get stage graphql backend for example.
NOTE: never ever run `DOT_ENV=master yarn build && yarn start`! this could cause stale caches on production!

## JS Global Variables

| key                               | description                                                                                                                | app support |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------- |
| global.\_\_INITIAL_STATE\_\_      | initial redux state which is generated on the SSR and used for the hydration process within the client boot up             | all         |
| global.\_\_GRAPHQL_HOST\_\_       | host of the connected graphql endpoint                                                                                     | all         |
| global.\_\_GRAPHQL_ORIGIN\_\_     | `not in use anymore`                                                                                                       | all         |
| global.\_\_INITIAL_ADS_CONFIG\_\_ | initial ads config and slots used to boost ad load time generated on SSR and used on the client boot up                    | all         |
| global.locationOrigin             | location on which the SSR server is running                                                                                | all         |
| global.Ads                        | stores the current ad config and slots which will be updated on each page transition and acts as the single point of truth | all         |
| global.isFullscreenGallery        | indicates if a fullscreen gallery is open or not                                                                           | SI          |
| global.refetchGQL                 | a helper function to refetch the graphql data and bypass the local apollo cache                                            | SI          |
| global.dataLayer                  | contains tracking data required for tealium                                                                                | all         |
| global.handleWysiwygLink(`event`) | handle links from the backend with the react router. parameter = event to read props from the click event in the FE        | all         |
| global.apolloClient               | global access to the apollo client                                                                                         | all         |
| global.\_\_jodfbn9492nw\_\_       | on true, it is a request which falls into the crawler segment on akamai                                                    | all         |

## Maintenance

We do frequently package maintenance on this stack (1 per sprint). [Here](docs/MAINTENANCE.md) you can see what we do and how.

## Locust - Load testing

See `locust/simple-load-test.py` to implement tests

Examples:

`locust/locust.sh -f simple-load-test.py -h https://stage.handelszeitung.ch -u preview -p cheesecake`

`locust/locust.sh -f simple-graphql.py -h https://cms.migration.ringiermedienschweiz.ch`

## Docker containers

### NGINX

Example to build docker image for nginx:
`docker build --no-cache --pull -t "rasch-nginx" --build-arg RASCH_PROJECT=handelszeitung -f .nginx/Dockerfile .`

### Node

Example to build docker image for gaultmillau:
`docker build --no-cache --pull -t "rasch-node" --build-arg RASCH_PROJECT=handelszeitung --build-arg LAGOON_GIT_BRANCH=develop .`

## FAQ

**Can you add a PR domain to the local `/etc/hosts` file, to simulate a preview or prodcution domain?**

> No, this is not possible. </br> > `> dig <your-pr-domain>` wont return an IP address. Because the **ras.dev** domain is a proxy to the k8s container, where your PR build lies.
>
> You could theoretically change the CNAME on cloudflare, in order to simulate the "preview" domain. But its probably best to test it locally.

**No Ads are displayed on localhost:3000, what now?**

> Ads are not served on [localhost:3000](http://localhost:3000). You have to add a an entry in your `/etc/hosts` file, in order to see ads locally.
>
> Add the following entry in your `hosts` file
>
> ```bash
> 127.0.0.1 dev.local
> ```
>
> Now you can preview ads locally on [dev.local:3000](http://dev.local:3000)

## Issues with yarn after future stack upgrade

after upgrading yarn to the newest version (3.2.1) there was an issue while using yarn in our stack.

The error was: `The remote archive doesn't match the expected checksum`

If you face the same issue, this is how to fix it:

- we've added a new property `checksumBehavior: update` in our `.yarnrc.yml` file.
- open to the `.yarnrc.yml` file
- comment the `checksumBehavior` snippet in
- run `yarn install` again
- don't forget to comment the `checksumBehavior` snippet out again

## Troubleshooting

### ERROR: cert.pem and/or key.pem was not found in the /certs/ directory!

- Error: missing cert

- Fix: create a cert see [Spotlight](https://spotlight.rms.rocks/documentation/integrations/mkcert)

### Website is not running

- Error: The browser shows: Die Website ist nicht erreichbar

- Fix: Stop all docker container with OrbStack. It happens when you used Orbit which started the container differently. Or because of missing certs.
