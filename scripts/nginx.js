'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

const { execSync } = require('child_process');
const chalk = require('react-dev-utils/chalk');
const fs = require('fs');

// try to find cert and key otherwise notify user to create a custom cert
try {
  // eslint-disable-next-line no-console
  console.log(__dirname);

  fs.readFileSync(__dirname + '/../certs/cert.pem');
  fs.readFileSync(__dirname + '/../certs/key.pem');
} catch (e) {
  // eslint-disable-next-line no-console
  console.log(
    chalk.red.bold(
      'ERROR: cert.pem and/or key.pem was not found in the /certs/ directory!',
    ),
  );
  // eslint-disable-next-line no-console
  console.log(
    'See docs/LOCAL_NGINX > Setup for further info on how to generate these certificates.',
  );
}

// run nginx
if (process.env.APP) {
  // eslint-disable-next-line no-console
  console.log(chalk.cyan(`Starting NGINX for ${process.env.APP}...\n`));
  try {
    execSync(`sh ./.nginx/local/docker-compose.sh ${process.env.APP}`, {
      stdio: 'inherit',
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
} else {
  // eslint-disable-next-line no-console
  console.error('No app configured for NGINX.');
}
