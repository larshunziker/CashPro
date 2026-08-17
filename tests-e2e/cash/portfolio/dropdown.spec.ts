import { expect, test } from '@playwright/test';
import { clickToastAway, waitForThenClick } from '../../shared/helpers';
import { acceptCookiesAndLogin } from '../../shared/common';
import { PUBLICATION_CASH } from '../../../src/shared/constants/publications';
import { getHost } from '../../shared/constants';

test.describe('portfolio dropdown', () => {
  test('dropdown desktop', async ({ page }) => {
    await acceptCookiesAndLogin(page, PUBLICATION_CASH, 'portfolio');

    // no instrument present = no test possible for different views
    await test.step('Add instrument to Portfolio', async () => {
      await page.getByRole('searchbox', { name: 'Add Instruments' }).click();
      await page
        .getByRole('searchbox', { name: 'Add Instruments' })
        .fill('ABB N');
      await page
        .getByRole('searchbox', { name: 'Add Instruments' })
        .press('Enter');
      await page.mouse.wheel(0, 200);
      await page
        .locator('a')
        .filter({
          hasText: 'ABB NCHFSIX Swiss ExchangeCH',
        })
        .click();
      await page.getByLabel('Anzahl*').click();
      await page.getByLabel('Anzahl*').fill('2');
      await page.getByLabel('Kaufen').click();
      await page.getByText('Kaufen - ABB N').waitFor({ state: 'hidden' });
      await clickToastAway(page);
    });

    await test.step('Test different views', async () => {
      const dropdownElement = page
        .getByLabel(/.*(?:Ansicht|Spezial-Infos)/)
        .first();

      await dropdownElement.click();
      await dropdownElement.scrollIntoViewIfNeeded();
      // dropdown open
      await expect(
        page.getByRole('link', { name: 'Standard Ansicht' }),
      ).toBeVisible();
      await expect(
        page.getByRole('link', { name: 'Original-Währung Ansicht' }),
      ).toBeVisible();
      await expect(
        page.getByRole('link', { name: 'Limiten Ansicht' }),
      ).toBeVisible();
      await expect(
        page.getByRole('link', { name: 'Performance Ansicht' }),
      ).toBeVisible();
      await expect(
        page.getByRole('link', { name: 'Spezial-Infos' }),
      ).toBeVisible();
      await expect(
        page.getByRole('link', { name: 'Monitor Ansicht' }),
      ).toBeVisible();
      await expect(
        page.getByRole('link', { name: 'Spezial-Infos' }),
      ).toBeVisible();
      await page.getByRole('link', { name: 'Performance Ansicht' }).click();
      // dropdown closed
      await expect(page.getByLabel('Standard Ansicht')).not.toBeVisible();
      await expect(page.getByLabel('Performance Ansicht')).toBeVisible();
    });
  });

  test('dropdown mobile', async ({ page, context }) => {
    page.setViewportSize({ width: 759, height: 800 });
    await acceptCookiesAndLogin(page, PUBLICATION_CASH, 'portfolio');

    const host = getHost(PUBLICATION_CASH);
    await context.addCookies([
      { name: 'RASCHFORCEADS', value: '1', domain: host, path: '/' },
    ]);

    const dropdown = page.getByRole('button', {
      name: /.*(?:Ansicht|Spezial-Infos)/,
    });

    // open dropdown, select performance view
    await waitForThenClick(dropdown);
    await waitForThenClick(
      page.getByRole('link', { name: 'Performance Ansicht' }),
    );
    await expect(page.getByLabel('Standard Ansicht')).not.toBeInViewport();
    await expect(
      page.getByText('Original-Währung Ansicht'),
    ).not.toBeInViewport();
    await expect(page.getByText('Limiten Ansicht')).not.toBeInViewport();
    await expect(page.getByText('Performance Ansicht')).toHaveCount(2);
    await expect(page.getByText('Spezial-Infos')).not.toBeInViewport();
    await expect(page.getByText('Monitor Ansicht')).not.toBeInViewport();

    // open dropdown again, select nothing
    await waitForThenClick(dropdown);
    await expect(page.getByText('Standard Ansicht')).toBeVisible();
    await expect(page.getByText('Original-Währung Ansicht')).toBeVisible();
    await expect(page.getByText('Limiten Ansicht')).toBeVisible();
    await expect(page.getByText('Performance Ansicht')).toHaveCount(2);
    await expect(page.getByText('Spezial-Infos')).toBeVisible();
    await expect(page.getByText('Monitor Ansicht')).toBeVisible();
  });
});
