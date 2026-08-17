import { Page } from '@playwright/test';
import {
  gotoUrlAndWaitFor,
  isElementVisible,
  waitForThenClick,
  waitForThenFill,
} from './helpers';
import { TEST_USER, TEST_USER_PASSWORD, baseUrl } from './constants';

/**
 * Removes OneTrust/CMP UI from the DOM so it cannot intercept pointer events.
 * E2E tests here are not meant to exercise the banner; overlays often reappear on IdP after login redirect.
 */
export const dismissOneTrustBlockingUi = async (page: Page) => {
  await page.evaluate(() => {
    const removeById = (id: string) => document.getElementById(id)?.remove();
    removeById('onetrust-consent-sdk');
    removeById('onetrust-banner-sdk');
    document
      .querySelectorAll('.onetrust-pc-dark-filter')
      .forEach((el) => el.remove());
  });
};

/** When OneTrust is present, accept all; then strip UI so clicks are never blocked. */
const allowAllAndStripOneTrustUi = async (page: Page) => {
  await page.evaluate(() => {
    // @ts-ignore OneTrust global from CMP script
    window.OneTrust?.AllowAll?.();
  });
  await dismissOneTrustBlockingUi(page);
};

export const acceptCookiesAndLogin = async (
  page: Page,
  publication: string,
  pathname = '',
) => {
  const url = baseUrl(publication) + pathname;

  await gotoUrlAndWaitFor(url, page, /login/);
  await acceptCookies(page);

  await waitForThenClick(
    page.locator('#main').getByRole('button', { name: 'Login' }),
    { timeout: 60_000 },
  );

  // Hosted IdP: label/locale varies; identifier-first uses name="username". Do not rely on
  // getByLabel('E-Mail-Adresse') alone — it often times out on CI. Long wait covers slow redirects.
  const loginWait = { timeout: 90_000 as const };
  const emailField = page
    .getByLabel(/E-Mail|E-Mail-Adresse|Email|Benutzername/i)
    .or(page.locator('input[name="username"]'))
    .or(page.locator('input[type="email"]'))
    .or(
      page.locator(
        'input[autocomplete="username"], input[autocomplete="email"]',
      ),
    )
    .first();

  await waitForThenFill(emailField, TEST_USER, loginWait);
  // IdP loads its own OneTrust instance; AllowAll + strip so the dark filter does not block the continue button.
  await allowAllAndStripOneTrustUi(page);
  await waitForThenClick(page.locator('#first-step-continue-btn'), loginWait);

  await waitForThenFill(
    page.locator('input[type="password"]'),
    TEST_USER_PASSWORD,
    loginWait,
  );
  await handleCaptcha(page);
  await waitForThenClick(
    page
      .getByRole('button', { name: /Weiter|Anmelden|Login/i })
      .or(page.locator('button[type="submit"]'))
      .first(),
    loginWait,
  );
  await page.waitForLoadState('domcontentloaded');
  // The IdP redirects back to the app, where OneTrust reloads. Its dark filter
  // can reappear and intercept the clicks the tests make right after login, so
  // strip it again once we are back on the app.
  await dismissOneTrustBlockingUi(page);
};

export const acceptCookies = async (page: Page) => {
  // IMPORTANT: add this to all tests that need to accept cookies
  //            AFTER a goto, gotoUrlAndWaitFor, etc. call was made!

  // check if CMP SDK is loaded
  // @ts-ignore
  const cmp = await page.evaluate(() => window.OneTrust);

  // if not, we wait for it to load (short timeout — strip still runs if CMP never loads)
  if (!cmp) {
    try {
      // @ts-ignore
      await page.waitForFunction(() => typeof window.OneTrust !== 'undefined', {
        timeout: 10_000,
      });
    } catch {
      // No OneTrust on this page; overlay removal below is enough for tests.
    }
  }

  await allowAllAndStripOneTrustUi(page);
};

const handleCaptcha = async (page: Page) => {
  // // find element by role presentation and id recaptcha-anchor-label
  // and click on it if exists
  const captcha = page
    .frameLocator('iframe[title="reCAPTCHA"]')
    .first()
    .getByLabel('Ich bin kein Roboter.');

  if (await isElementVisible(captcha)) {
    await waitForThenClick(captcha);
  }
};
