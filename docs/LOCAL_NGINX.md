# Local NGINX

Test locally NGINX config changes. In addition you'll also get an https secured server to test other features!

ℹ️️ Info: When using the NGINX in front of our node app, fast refreshes / module hot reloads won't work! You are still able to use http://locallhost:3000 during development and just use the NGINX for proxying the requests to our microservices.

## Prerequisites

- docker installed
- node installed
- mkcert installed

## Setup
- install docker (recommended https://orbstack.dev/download)
- install [mkcert](https://github.com/FiloSottile/mkcert)
- create a privat certificate (see section `How-to` > `create a personal certificate`)
- continue with the setps mentioned on "Usage"

## Usage NGINX

- run `yarn dev` or `yarn start`
- open browser on port 3300 (should be opened automatically)
- wait about 30s (the docker image needs some time to build)
- if you still see `ERR_CONNECTION_REFUSED`, see `How-to` > `See NGINX start up errors`

## Usage NGINX with HTTPS

- run `yarn dev` or `yarn start`
- open browser on port 3333

## Start app without NGINX

- run `yarn dev:plain` or `yarn start:plain`
- open browser on port 3000

## Testing

You can eather test redirects on the browser or using CURL. But since redirects will remove the port on the URL, it could be easier to use CURL instead.

### CURL

```sh
curl https://localhost:3300/path/that/should/be/redirected -I
```

## How-to

### Make config changes in watch mode

On develop with active NGINX mode, all files within the `.nginx` directory are watched by webpack. Do NOT nest them in subfolders! Changes needs about 30s to be reflected so please be a bit patient 🤓

### See NGINX start up errors

Errors are not shown on `yarn dev`. To make them visible execute the script directly via `APP=<app name> node scripts/nginx.js`

### How to create a personal certificate

Make sure you've at least once run `mkcert -install` to generate your personal local CA! Then continue with these steps below:

```sh
cd <project-root>/certs/
mkcert localhost dev.local 127.0.0.1 ::1
mv localhost+3-key.pem key.pem
mv localhost+3.pem cert.pem
```

### Docker images are not created successfully

If you see that the two docker images are not created successfully by checking the output created when running `See NGINX startup errors`, do these setps to overcome them:

```
docker ps
(find may existing IDs of running containers)
docker stop <id1> (<id2>)
docker rm <id1> (<id2>)
```

And then retry to generate the containers.
