import { expect, test } from '@playwright/test';
import { gotoUrlAndWaitFor } from '../shared/helpers';
import { acceptCookies } from '../shared/common';
import { PUBLICATION_CASH } from '../../src/shared/constants/publications';
import { baseUrl } from '../shared/constants';

test.describe('Home', () => {
  test('should find important elements on home', async ({ page }) => {
    await gotoUrlAndWaitFor(baseUrl(PUBLICATION_CASH), page);
    await acceptCookies(page);
    await expect(page).toHaveTitle(/.*cash/);
    await expect(page.getByText('Top News')).toBeVisible();
    await expect(page.getByText('Meistgelesen').first()).toBeVisible();

    await expect(page.locator('h3').getByText('Börse & Märkte')).toBeVisible();
    await expect(page.getByText('Unternehmen').first()).toBeVisible();
    await expect(page.getByText('Rechtliche Hinweise')).toBeVisible();
    await expect(page.locator('a').getByText('Kontakt')).toBeVisible();
  });
});
