# Authorize

## Definition

This authorize screen is a standalone solution and gets bundled by a custom webpack
config which bases on the same shared webpack config as our react application.
Therefore, we can use the same global variables as on our react app.

## How does it work

On each `yarn dev` and `yarn build` call, the files within this directory are also bundled
using a custom webpack config. the output is written into the `public` directory within the
applications src directory.
On builds the content of the public directory is automatically moved into the builded directory and it is automatically available.
