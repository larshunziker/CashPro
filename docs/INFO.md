# Stack info for developers
The rasch-stack contains all rasch frontend applications in a single (mono) repo.

## Debugging
Easiest way to debug the code is to use the internal debugger of vscode.
1. start any app `yarn dev`
2. open `debug` view on the left panel (press `F5/shift+cmd+D`)
3. start the debugger by pressing the `play` icon
4. set a breakpoint within vscode
5. press `re-start` icon

The debugger can run during your development and is able to handle HMR updates.

## Query Maps
In `src/<app>/shared` are 2 files related to the query maps. `queries-backend.json` is the query used by the backend and will be served via express. `queries-frontend.js` exports the current api version plus a hashed version of the backend query to reduce the file size of our main.js bundle.

## Env
Create a `.env.local` file to add custom settings like:

| key | value | default | description |
| -- | -- | -- | -- |
| `REACT_EDITOR` | string | n/A | defines the editor which will respond on error overlay interactions |
| `GRAPHQL_FORCE_POST` | boolean | `false` | on true, you get POST requests on SSR as well instead of GET |
| `USE_DEVELOPMENT_ESLINT_CONFIG` | boolean | `false` | on true, you turn on a 'developer friendlier' set of eslint rules. please note, that this works only on your machine and won't affect the CI |
| `USE_EXPERIMENTAL_ESLINT_CONFIG` | boolean | `false` | on true, you turn on the experimental eslint configuration which may cause issues because of not fully tested eslint rules |
| `USE_CUSTOM_CSS_LOADER_LOCAL_INDENT_NAME_PATTERN` | string | `[local]__[name]__[hash:base64:5]` | you are able to define a custom pattern for the creation on classnames on development mode. available patterns can be found [here](https://github.com/webpack/loader-utils#interpolatename). |
| `USE_STRICT_MODE` | boolean | `false` | on true wraps whole application in `React.StrictMode`. More info on Strict Mode can be found [here](https://reactjs.org/docs/strict-mode.html). |
| `USE_DEBUG_TRACING` | boolean | `false` | on true, why-did-you-update plugin is enabled |
| `PIANO_FORCE_DISABLE` | boolean | `false` | on true, piano will connect to an invalid zone (so no experiences are loaded) |
| `DEFAULT_APP` | string | `''` | if defined, the provided app will be used as the default application and the user don't has to select the right app over and over again on yarn dev for example |
| `DISABLE_WEBPACK_MEASURE` | boolean | `false` | on true, speed-measure-webpack-plugin stops printing console output on webpack builds |
| `USE_LOCAL_ESI_PROCESSING`| boolean | `false` | on true, on builded apps the <esi> tags will be processes so we get the content w/o akamai locally
| `FORCE_PREVIEW_REQUESTS`| boolean | `false` | on true, pr instance will boot by using the stage backend using preview graphql requests

## Unit Tests
Unit tests are run by jest. Coverage files are located in `/coverage`  after running `yarn test:ci`. See `Readme.md` for further info.

### Snapshot tests
A snapshot test automatically creates a `__snapshots__` folder with a `index.js.snap` file. As creator of a snapshot test, **you** are responsible, that the output in the `.snap` file is correct. If the test fails at a later point in time, the developer has to make sure the the new output of the snapshot test is correct and only then update the snapshop test.


## FE Deployment

See [Frontend Deployments / Akamai cache purge / Live Release](https://confluence.ringieraxelspringer.ch/pages/viewpage.action?pageId=77905179) Confluence page for more information
