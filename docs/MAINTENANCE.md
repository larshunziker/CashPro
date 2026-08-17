# packages maintenance sheet

## 👀 Todos

| pkg | action |
| --- | ------ |

## 🚨 blocked

### dependiencies

| pkg                       | working version | breaking version | issue                                                                                                                                                                                                                                                                                      | solution |
| ------------------------- | --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| `graphql`                 | `15.3.0`        | `15.4.0`         | no gql data is fetched, error: "Must provide an operation" (client/server are not working)                                                                                                                                                                                                 | -        |
| `react-dropzone`          | `11.5.3`        | `14.2.1`         | the {draggedFiles} prop on the returned hook state has been removed and the accept/reject state is only computed on drag enter and drop and The {accept} prop will now require an object instead of a string or array of strings https://github.com/react-dropzone/react-dropzone/releases | needs webform allowedExtension redo to include mime-types in addition to file extensions |

### devDependiencies

| pkg                      | working version | breaking version | issue                                                                                                                                 | solution |
| ------------------------ | --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `crypto-hash`            | `^1.3.0`        | `> 2.0.0`        | pure ESM support required ([read more](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c))                        | -        |
| `file-type`              | `^16.5.3`       | `> 17.0.0`       | pure ESM support required ([read more](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c))                        | -        |
| `chalk`                  | `4.1.2`         | `5.0.0`          | pure ESM support required ([read more](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)) - and other changes... | -        |
| `jest-environment-jsdom` | `^28.1.3`       | `>29.0.0`        | needs node update (parse5)                                                                                                            | -        |

## single use packages

- serialize-javascript
- body-scroll-lock
- rdndmb-html5-to-touch
- react-textarea-autosize
- reselect
- nodesi

## ✅ how to

execute this steps to upgrade the NPM packages from this app

### upgrade docker image version

- Check if there are newer images of our docker containers available (https://hub.docker.com/r/uselagoon/node-22-builder/tags)
- Example version [Github](https://github.com/rasch-dtc/rasch-stack/pull/6464/files#diff-e6ffa5dc854b843b3ee3c3c28f8eae2f436c2df2b1ca299cca1fa5982e390cf8R435)

### upgrade npm packages

- run `yarn upgrade-interactive` on your console within the app directory
- select all packages which a patch (🟢) or minor (🟡) upgrade
- skip section "resolutions" and packages listed above on "packages blocked"
- hit enter
- after the installation has completed run `yarn upgrade-interactive` again and update the versions of the packages mentioned in the "resolutions" section of the `packages.json` file manually
- abort the process with ^C
- run `yarn reinstall` to get a fresh copy
- when eveything is working repeat the above mentioned setps and upgrad the (🔴) major packages as well
- if packages are not upgreadeable w/o a bigger effort create a follow up ticket

## 🐛 testing

### testing the core features

- run `yarn run lint`
- run `yarn test` for each app
- run `yarn dev` for each app
- run `yarn build` for each app and test the output

### testing packages based

- try to find all usages of the upgraded package and test the output and the behavior of it
- test it on all browsers if you've added polyfills or changed something on babel or core-js!
- for dev dependencies pls have a quick look at [https://bundlephobia.com](https://bundlephobia.com) and compare the sizes
