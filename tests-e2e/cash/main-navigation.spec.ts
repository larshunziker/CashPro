import { expect, test } from '@playwright/test';
import { gotoUrlAndWaitFor, hoverThenClick } from '../shared/helpers';
import { acceptCookies } from '../shared/common';
import { PUBLICATION_CASH } from '../../src/shared/constants/publications';
import { baseUrl } from '../shared/constants';

test.describe('Main Navigation', () => {
  test('menu', async ({ page }) => {
    await gotoUrlAndWaitFor(baseUrl(PUBLICATION_CASH), page);
    await acceptCookies(page);
    await expect(page).toHaveTitle(/.*cash/);
    await test.step('News', async () => {
      await hoverThenClick(
        page.locator('.site-header').getByRole('link', { name: 'News' }),
        page.getByRole('link', { name: 'Top News', exact: true }),
      );
      const element = page.locator('h1').getByText('Top News');
      await element.waitFor();
      await expect(page.locator('h1').getByText('Top News')).toBeVisible();
      await expect(page.url()).toContain('news/top-news');
    });
    await test.step('Börse & Märkte', async () => {
      await hoverThenClick(
        page
          .locator('.site-header')
          .getByRole('link', { name: 'Börse & Märkte' }),
        page.getByRole('link', { name: 'Marktübersicht', exact: true }),
      );
      const element = page.locator('h1').getByText('Börse & Märkte');
      await element.waitFor();
      await expect(element).toBeVisible();
      await expect(page.url()).toContain('boerse');
    });
    await test.step('Anlegen', async () => {
      await hoverThenClick(
        page.locator('.site-header').getByRole('link', { name: 'Anlegen' }),
        page.getByRole('link', { name: 'Vermögensverwaltung', exact: true }),
      );
      const element = page.locator('h1').getByText('Vermögensverwaltung');
      await element.waitFor();
      await expect(element).toBeVisible();
      await expect(page.url()).toContain('anlegen/vermoegensverwaltung');
    });
  });
});
