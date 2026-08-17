import { expect, test } from '@playwright/test';
import { gotoUrlAndWaitFor } from '../shared/helpers';
import { acceptCookies } from '../shared/common';
import { PUBLICATION_CASH } from '../../src/shared/constants/publications';
import { baseUrl } from '../shared/constants';

test.describe('News', () => {
  test('should find important elements on top-news', async ({ page }) => {
    const path = 'news/top-news';
    const url = baseUrl(PUBLICATION_CASH) + path;
    await gotoUrlAndWaitFor(url, page);
    await acceptCookies(page);

    await expect(page).toHaveTitle(/.*Top News.*/);
    await expect(page.locator('h1').getByText('Top News')).toBeVisible();

    // should not have rel next and prev
    await expect(page.locator('link').first()).not.toHaveAttribute(
      'rel',
      'prev',
    );

    const page2 = path + '?page=2#page';
    const page3 = path + '?page=3#page';
    await page.getByRole('link', { name: '2', exact: true }).click();
    await page.waitForURL(`**/${page2}`);
    expect(page.url()).toContain(page2);

    await page.locator('a.page-loader-next-btn[href*="page=3"]').click();
    await page.waitForURL(new RegExp(`${path.replace(/\//g, '\\/')}\\?page=3`));
    expect(page.url()).toContain(page3);

    await page.locator('a.page-loader-prev-btn[href*="page=2"]').click();
    await page.waitForURL(new RegExp(`${path.replace(/\//g, '\\/')}\\?page=2`));
    expect(page.url()).toContain(page2);
  });
});
