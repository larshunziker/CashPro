import { expect, test } from '@playwright/test';
import { baseUrl } from '../shared/constants';
import { PUBLICATION_CASH } from '../../src/shared/constants/publications';
import { acceptCookies } from '../shared/common';
import { gotoUrlAndWaitFor } from '../shared/helpers';

test.beforeEach(async ({ page, context }) => {
  await context.addCookies([
    { name: 'RASCHFORCEADS', value: '1', domain: 'localhost', path: '/' },
  ]);

  const domain =
    baseUrl(PUBLICATION_CASH) + 'aktien/ubs-group-n-24476758/usc/usd';

  await gotoUrlAndWaitFor(domain, page);
  await acceptCookies(page);
});

test.describe('fullquote page functionality', () => {
  test('orderbook', async ({ page }) => {
    // orberbook as guest
    //const orderbook = page.getByText('.fi-box-orderbook-wrapper');

    // stage was not working so this test is not helpful for the moment

    await expect(page).toHaveTitle(/.*cash/);
  });
});
