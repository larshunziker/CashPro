#!/usr/bin/env node

const inquirer = require('inquirer');
const { Octokit } = require('@octokit/core');

const os = require('os');
const fs = require('fs-extra');

const DEFAULT_OCTOKIT_PARAMS = {
  owner: 'rasch-dtc',
  org: 'rasch-dtc',
  repo: 'rasch-stack',
  headers: {
    'X-GitHub-Api-Version': '2022-11-28',
  },
};

const run = async () => {
  // we're using credentials from butler file
  const credentialsFilePath = `${os.homedir()}/.butler/credentials.json`;

  const { githubToken } = await fs.readJson(credentialsFilePath);

  if (!githubToken) {
    throw new Error(`No "githubToken" inside ${credentialsFilePath} file`);
  }

  const octokit = new Octokit({
    auth: githubToken,
  });

  const config = await inquirer.prompt([
    {
      type: 'list',
      name: 'prNumber',
      message: 'Select release pull request',
      validate: async (value) => {
        const numberValue = Number(value);

        if (isNaN(numberValue) || !Number.isInteger(numberValue)) {
          return 'Please enter an integer number';
        }

        return true;
      },
      choices: async () => {
        const pulls = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
          ...DEFAULT_OCTOKIT_PARAMS,
          state: 'open',
          per_page: 100,
          base: 'master',
        });

        if (pulls.status !== 200) {
          throw new Error(
            `Something went wrong while fetching all release PRs`,
          );
        }

        const choices = pulls.data
          .filter((pull) =>
            pull.labels.some((label) => label.name === 'release'),
          )
          .map((pull) => ({
            name: `[${new Date(pull.created_at).toLocaleString()}] ${
              pull.title
            }`,
            value: pull.number,
          }));

        if (choices.length === 0) {
          throw new Error(`There are no open PRs with label "release"`);
        }

        return choices;
      },
    },
    {
      name: 'team',
      type: 'list',
      validate: (value) => {
        if (value.length === 0) {
          return 'Please select a team group';
        }

        return true;
      },
      choices: [
        '@domain/beobachter',
        '@domain/business-media',
        '@domain/rasch',
      ],
      message: 'Select team group:',
    },
  ]);

  console.log('[START] Fetching all commits from Release PR');

  const commits = await octokit.request(
    'GET /repos/{owner}/{repo}/pulls/{pull_number}/commits',
    {
      ...DEFAULT_OCTOKIT_PARAMS,
      pull_number: config.prNumber,
    },
  );

  if (commits.status !== 200) {
    throw new Error(
      `Something went wrong while fetching all commits from Release PR`,
    );
  }

  console.log('[END] Fetching all commits from Release PR');

  console.log(`[START] Fetching all PRs by commits`);

  const teamRelatedPrs = {};

  await Promise.all(
    commits.data.map(async (commit) => {
      const commitSha = commit.sha;

      // console.log(`[START] Fetching all PRs for commit: ${commitSha}`);

      const pullsByCommit = await octokit.request(
        'GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls',
        {
          ...DEFAULT_OCTOKIT_PARAMS,
          commit_sha: commitSha,
        },
      );

      if (pullsByCommit.status !== 200) {
        throw new Error(
          `Something went wrong while fetching all PRs for commit: ${commitSha}`,
        );
      }

      // console.log(`[END] Fetching all PRs for commit: ${commitSha}`);

      for (let j = 0; j < pullsByCommit.data.length; j++) {
        const pr = pullsByCommit.data[j];

        const isTeamRelated = pr.labels.some(
          (label) => label.name === config.team,
        );

        if (isTeamRelated) {
          teamRelatedPrs[pr.html_url] = pr.title;
        }
      }
    }),
  );

  console.log(`[END] Fetching all PRs by commits`);

  console.log(`\nAll PRs related to release for team ${config.team} are:`);

  for (const prUrl in teamRelatedPrs) {
    console.log(`${prUrl},${teamRelatedPrs[prUrl]}`);
  }
};

run();
