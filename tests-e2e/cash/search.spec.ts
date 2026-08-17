import { expect, test } from '@playwright/test';
import { baseUrl } from '../shared/constants';
import { PUBLICATION_CASH } from '../../src/shared/constants/publications';
import { gotoUrlAndWaitFor } from '../shared/helpers';
import { acceptCookies } from '../shared/common';

test.beforeEach(async ({ page, context }) => {
  await gotoUrlAndWaitFor(baseUrl(PUBLICATION_CASH), page);
  await acceptCookies(page);
});

test.describe('Search', () => {
  test('should find search results correctly', async ({ page }) => {
    await test.step('Search', async () => {
      await page.getByPlaceholder('Suchen').click();
      await page.getByPlaceholder('Suchen').fill('ubs');
      await page.getByPlaceholder('Suchen').press('Enter');
    });

    await expect(page.getByRole('heading', { name: 'Aktien' })).toBeVisible();
  });

  test('should not find any search results', async ({ page }) => {
    await test.step('Search', async () => {
      await page.getByPlaceholder('Suchen').click();
      await page.getByPlaceholder('Suchen').fill('csdafcsdcsdcscacascsdac');
      await page.getByPlaceholder('Suchen').press('Enter');
    });

    await expect(
      page.getByRole('heading', { name: 'Aktien' }),
    ).not.toBeVisible();
    await expect(
      page.getByText(
        'Leider wurden keine mit Ihrer Suchanfrage übereinstimmenden Dokumente gefunden.',
      ),
    ).toBeVisible();
  });
});
