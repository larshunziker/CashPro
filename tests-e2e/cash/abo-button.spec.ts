import { expect, test, type Locator, type Page } from '@playwright/test';
import { gotoUrlAndWaitFor, waitForThenClick } from '../shared/helpers';
import { acceptCookies, acceptCookiesAndLogin } from '../shared/common';
import { PUBLICATION_CASH } from '../../src/shared/constants/publications';
import { baseUrl } from '../shared/constants';

const checkOpenCloseWidget = async (
  page: Page,
  aboButton: Locator,
  /** Accessible name of the Piano modal title (string or RegExp if copy changed, e.g. hyphen vs space). */
  aboHeading: string | RegExp,
) => {
  // close button in piano widget
  const closeButton = page
    .locator('.tp-iframe-wrapper')
    .frameLocator('iframe')
    .first()
    .getByRole('button')
    .first();

  const iframe = page
    .locator('.tp-iframe-wrapper')
    .first()
    .frameLocator('iframe')
    .first()
    .getByRole('heading', { name: aboHeading });

  // click on Abo Button
  await aboButton.click();

  // check visibility of iframe
  await iframe.waitFor();
  await expect(iframe).toBeVisible();

  // check if close button is visible
  await closeButton.waitFor();
  await expect(closeButton).toBeVisible();

  // close piano Widget
  await closeButton.click();
  await expect(iframe).toBeHidden();
};

test.describe('Abo Page Test', () => {
  const urlBoersenAbos = baseUrl(PUBLICATION_CASH) + 'services/boersenabo';
  test('should open abo page', async ({ page }) => {
    await gotoUrlAndWaitFor(urlBoersenAbos, page);
    await acceptCookies(page);

    // test if page is rendered (Title is set)
    await expect(page).toHaveTitle(/.*Börsenabos.*/);
    await expect(page.locator('h1').getByText('Börsenabos')).toBeVisible();
  });

  test('Test Anleger Abo Button', async ({ page }) => {
    await gotoUrlAndWaitFor(urlBoersenAbos, page);
    await acceptCookies(page);

    // Abo-Button (Anleger): title is in <p>; avoid div.filter() (nested divs matched 3×). Button a11y name may include extra chars — use /Bestellen/.
    const anlegerAboButton = page
      .locator('p', { hasText: /^Anleger$/ })
      .first()
      .locator('xpath=parent::*')
      .getByRole('button', { name: /Bestellen/ });

    await checkOpenCloseWidget(
      page,
      anlegerAboButton,
      /Anleger\s*[-–]?\s*Abo/i,
    );
  });

  test('Test Realtime Abo Button', async ({ page }) => {
    await gotoUrlAndWaitFor(urlBoersenAbos, page);
    await acceptCookies(page);

    // Abo-Button (Realtime)
    const realtimeAboButton = page
      .locator('div')
      .filter({ hasText: /^Realtime*/ })
      .getByRole('button');

    await checkOpenCloseWidget(page, realtimeAboButton, 'Realtime-Abo');
  });

  test('Test Profi Abo Button', async ({ page, context }) => {
    await gotoUrlAndWaitFor(urlBoersenAbos, page);
    await acceptCookies(page);

    // Abo-Button (Profi)
    const profiAboButton = page
      .locator('div')
      .filter({ hasText: /^Profi*/ })
      .getByRole('button');

    await checkOpenCloseWidget(page, profiAboButton, 'Profi-Abo');
  });

  test('Test Basic Abo Button', async ({ page, context }) => {
    await gotoUrlAndWaitFor(urlBoersenAbos, page);
    await acceptCookies(page);

    // Abo-Button (Basic)
    await waitForThenClick(
      page
        .locator('div')
        .filter({ hasText: /^Basic*/ })
        .getByRole('button', { name: 'Registrieren' }),
    );

    await expect(page).toHaveTitle(/.*OneLog.*/);
  });
});
