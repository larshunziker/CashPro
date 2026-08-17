import { Locator, Page, expect } from '@playwright/test';

export const clickToastAway = async (page: Page) => {
  const toast = page.getByRole('alert').first();
  await toast.waitFor({ timeout: 2000 });
  await toast.getByRole('button').click();
};

export const gotoUrlAndWaitFor = async (
  url: string,
  page: Page,
  waitForUrl?: string | RegExp,
) => {
  await page.goto(url);

  /*
  waitForURL vs goto: waitForURL resolves when the URL condition is met, goto resolves when the page is loaded
    => think of redirects, or changing the URL without reloading the page like in a SPA... it's safer to also
    add waitForURL after goto, since the page might be loaded before the URL condition is met
  */
  await page.waitForURL(waitForUrl || url);
};

type WaitOptions = { timeout?: number };

export const waitForThenClick = async (
  element: Locator,
  options?: WaitOptions,
) => {
  await element.waitFor(options);
  await element.click(options);
};

export const waitForThenFill = async (
  element: Locator,
  fillWith: string,
  options?: WaitOptions,
) => {
  await element.waitFor(options);
  await element.fill(fillWith, options);
};

/**
 * Robustly interact with a flyout/hover menu: hover the trigger, wait for the
 * target to become visible, then click it. The whole sequence is retried via
 * `toPass`, because hover menus frequently collapse between hover and click
 * (a common source of e2e flakiness on the main navigation).
 */
export const hoverThenClick = async (
  trigger: Locator,
  target: Locator,
  options?: WaitOptions,
) => {
  const timeout = options?.timeout ?? 15_000;
  await expect(async () => {
    await trigger.hover({ timeout: 2_000 });
    await target.waitFor({ state: 'visible', timeout: 2_000 });
    await target.click({ timeout: 2_000 });
  }).toPass({ timeout });
};

export const isElementVisible = async (locator: Locator): Promise<boolean> => {
  let isPresent = false;
  try {
    await locator.waitFor({ timeout: 500 });
    isPresent = true;
  } catch (err) {}
  return isPresent;
};
