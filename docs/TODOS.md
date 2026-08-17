# TODOS

## High
- [ ] re-add gql response headers to SSR response headers (tag forwarding)
- [ ] adjust image sizes to reduce .svg
- [ ] http streaming
- [ ] SSR HMR
- [ ] remove momentjs and replace it with something smaller
- [ ] adapt changes made on this PR (https://github.com/facebook/create-react-app/pull/4077)
- [ ] remove monkeypatched version of react-dev-utils
- [ ] remove legacy lifecycle hooks => https://reactjs.org/blog/2018/03/29/react-v-16-3.html
- [ ] add strict mode on top level to detect unsafe lifecycles, refs and side effects in tree (https://reactjs.org/docs/strict-mode.html)
- [ ] add event-guard js => https://github.com/rasch-dtc/js-event-guard


## Low

- [ ] Create concept for using apollo engine + apollo server instead of our custom persist graphql solution => https://www.apollographql.com/docs/engine/auto-persisted-queries.html
- [ ] Make use of Pngquant, Mozjpeg, etc.
- [ ] move parts from `actions`, `reducers` and `selectors` within app share to `common` to reduce code duplication


## Long term

- [ ] Check if we can replace react with preact or inferno
- [ ] Check jsx-a11y/media-has-caption in /home/steven/projects/rasch-stack/frontend/src/gaultmillau/screens/App/components/Video/components/Brightcove/render.js
- [ ] Search for eslint-disable no-restricted-syntax and fix it

