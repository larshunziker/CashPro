/*
Lints only files that changed compared to the base branch
Inspired by React https://github.com/facebook/react/blob/6db7f4209e6f32ebde298a0b7451710dd6aa3e19/package.json#L114
Adapted to our use case and settings
*/

const { ESLint } = require('eslint');
const minimatch = require('minimatch');

const execFileSync = require('child_process').execFileSync;

const exec = (command, args) => {
  console.log('> ' + [command].concat(args).join(' '));
  const options = {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'pipe',
    encoding: 'utf-8',
  };
  return execFileSync(command, args, options);
};

const execGitCmd = (args) => exec('git', args).trim().toString().split('\n');

const listChangedFiles = () => {
  const parentBranch = exec('sh', ['scripts/parent_branch.sh']);
  const mergeBase = execGitCmd(['merge-base', 'HEAD', parentBranch]);
  return new Set([
    ...execGitCmd(['diff', '--name-only', '--diff-filter=ACMRTUB', mergeBase]),
    ...execGitCmd(['ls-files', '--others', '--exclude-standard']),
  ]);
};

async function runESLint() {
  const eslint = new ESLint({ cache: true });
  const formatter = await eslint.loadFormatter();

  const results = await eslint.lintFiles(
    intersect([...listChangedFiles()], ['**/*.ts', '**/*.tsx', '**/*.css']),
  );

  const messages = results.filter((item) => {
    return item.messages[0];
  });

  const errorCount = results.reduce(
    (count, result) => count + result.errorCount,
    0,
  );
  console.log(formatter.format(messages));
  return errorCount === 0;
}

function intersect(files, patterns) {
  let intersection = [];
  patterns.forEach((pattern) => {
    intersection = [
      ...intersection,
      ...minimatch.match(files, pattern, { matchBase: true }),
    ];
  });
  return [...new Set(intersection)];
}

async function main() {
  process.env.USE_DEVELOPMENT_ESLINT_CONFIG = 'false';
  console.log('Linting changed files...');
  if (await runESLint()) {
    console.log('Lint passed for changed files.');
  } else {
    console.log('Lint failed for changed files.');
    process.exit(1);
  }
}

main();
