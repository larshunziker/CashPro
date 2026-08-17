# End-to-End Tests

This folder contains all E2E tests that get executed over our GitHub actions.

## Run Tests Locally

- run `npx playwright install`
- run `yarn dev` and choose your app (against stage)
- run the following command: `yarn test:e2e`
- change the publication name to your publication
- tests will run against localhost:3333 so make sure to have docker/orbstack running
- to make debugging easy you can change `headless: true` to `headless: false` in the `playwright.config.ts` file to see what the browser does
- if you want to run only one or certain tests, you can filter them out by adding either the relative path to the test file or just parts of it, e.g. `yarn test:e2e <path_to_file>` or `yarn test:e2e cash home`.

## Generate Tests

The easiest way to start is by using the test generator. Run `npx playwright codegen`. This opens two applications. One is a browser and the second shows the generated code. Navigate to the page you want to test and click around. The code for the navigation is generated in the second window. When you are done copy the code and adjust it where needed.

## Write Tests

- Make sure the basic auth password of your publication is fetched in the workflow file (`e2e-tests.yml`) according to the cash example `echo "CASH_BASIC_AUTH_PASSWORD=${{ secrets.CASH_BASIC_AUTH_PASSWORD }}" >> $GITHUB_ENV`.

Test example:

```ts
test('cash home has title', async ({ page, context }) => {
  await page.goto(baseUrl(PUBLICATION_CASH));
  await expect(page).toHaveTitle(/.*cash/);
});
```

- The test runner follows the same rules as our build tool. Tests are run if they are in the title of the PR ([SI], [PME], [BEO] ...) or if no publication is mentioned all tests are run.
- use `baseUrl(PUBLICATION_CASH)` to get the correct PR URL and to set the correct basic auth credentials.

## Testing and Debugging

- **Timeouts:** [`playwright.config.ts`](../playwright.config.ts) sets `actionTimeout` and `navigationTimeout` below the full test timeout. If a locator or `page.goto` hangs, Playwright fails that **specific** step with a message and call log (selector, URL) instead of only `Test timeout of 60000ms exceeded`. Increase `actionTimeout` / `navigationTimeout` there if a slow but valid step needs more time, or pass `{ timeout: … }` on a single call. Wrap long flows in `test.step('name', async () => { … })` so failures show which step ran last.
- By setting the property `headless` to `true` in the `playwright.config.ts`, you can see the tests being executed directly in a new Chromium instance, otherwise it'll just perform the tests without any visibility.
- Using `yarn test:e2e-debug`, one can go through all testing instructions step-by-step. This of course is super handy, if you're trying to figure out why a certain test suddenly fails.
- With `yarn test:e2e-ui` one is presented with a nice window that allows one to see all tests and run and re-run them individually as often you you wish to.
- If you want to test only specific tests, add the relative path after your command, i.e. `yarn test:e2e-debug <path_to_file>`. It's even possible to only add parts of the relative path, so if you like to i.e. focus on only one publication, you can write your command like `yarn test:e2e-debug cash`.
- By adding `await page.pause()`, you can let the Playwright test to run up untill this expression, it's basically the `debugger` statement for Playwright. Just make sure, you are in debug mode, either by running `yarn:e2e-debug` or by adding `PWDEBUG=1` to your Playwright command.
- When a test is being stepped through via debugging mode, one can open up the devtools' console via F12 and enter `playwright.<your_locator>` to see if that locator you're using correctly targets your desired element.

## Test Only Specific Tests

- To do so, add the relative path after your command, i.e. `yarn test:e2e <path_to_file>`.
- It's even possible to only add parts of the relative path, so if you like to i.e. focus on only one publication, you can write your command like `yarn test:e2e cash`.
- One could even filter multiple tests by chaining them with a space between them, i.e. `yarn test:e2e portfolio home`.

## Good to Know

- At the time of declaring a locator, i.e. `const button = page.getByRole('button')`, there is no need to add await, since locators don't resolve to promises.
- `expect(button).toBeVisible()` is just a subset of ⁠`button.waitFor()`. `waitFor` is more generic since it can also be used with states like `popup.waitFor({ state: 'hidden')` or in conjunction with custom max timeouts. It's also more readable and flexible. Therefore it is generally advisable to rather use `waitFor`.

## If Tests Fail on GitHub Actions

- Go to the failing test on github actions
- Scroll down to the ende and check the artifacts
- Download the artifacts
- In this file you find all failing tests with a video and the traces file
- go to https://trace.playwright.dev/ and drag and drop the traces there

## Install Runner on AWS

This is only needed to initially set up the test runner and should not be necessary for a developer.

- Start an EC2 t2.xlarge instance (16GB RAM, 16GB SSD, 4 vcpu) on AWS
- Connect to the instance
- Set up the runner
  - `mkdir actions-runner && cd actions-runner`
  - `curl -o actions-runner-linux-x64-2.299.1.tar.gz -L https://github.com/actions/runner/releases/download/v2.299.1/actions-runner-linux-x64-2.299.1.tar.gz`
  - `tar xzf ./actions-runner-linux-x64-2.299.1.tar.gz`
  - `./config.sh --url https://github.com/rasch-dtc --token AXYHUBG4SBPIIGVCY4ECE3LEVPJCO`
  - `sudo ./svc.sh install`
  - `sudo ./svc.sh start
- Set up docker
  - Follow the install docs `https://docs.docker.com/engine/install/centos/`
    -Install dependencies
  - `sudo yum install make`
    `sudo usermod -a -G docker ec2-user`
  - restart runner
    `sudo ./svc.sh stop`
    `sudo ./svc.sh start`
