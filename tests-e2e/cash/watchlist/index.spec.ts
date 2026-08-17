import { expect, test } from '@playwright/test';
import { clickToastAway } from '../../shared/helpers';
import { acceptCookiesAndLogin } from '../../shared/common';
import { PUBLICATION_CASH } from '../../../src/shared/constants/publications';

test.describe('Watchlist', () => {
  test('all steps', async ({ page, context }) => {
    await acceptCookiesAndLogin(page, PUBLICATION_CASH, 'watchlist');

    await test.step('Create New Watchlist', async () => {
      if (
        await page
          .getByText('Sie haben noch keine Watchlist')
          .first()
          .isVisible()
      ) {
        // find button "Neue Watchlist erstellen"
        await page
          .getByRole('button', { name: 'Neue Watchlist anlegen' })
          .click();

        await page.getByLabel('Watchlist Bezeichnung').click();
        await page.getByLabel('Watchlist Bezeichnung').fill('Test Watchlist');
        await page.getByLabel('Watchlist Bezeichnung').click();

        await page.click(
          '#rasch-confirm-alert button[aria-label="Watchlist anlegen"]',
        );
        // expect to see "Test Watchlist" on the screen
        await expect(page.getByLabel('Test Watchlist')).toBeVisible();
      }
    });

    await test.step('Rename Watchlist', async () => {
      await page.getByRole('button', { name: 'Bearbeiten' }).click();
      await page.locator('a').filter({ hasText: 'Umbenennen' }).click();
      await page.getByLabel('Watchlist Bezeichnung*').click();
      await page
        .getByLabel('Watchlist Bezeichnung*')
        .fill('Test Watchlist renamed');
      await page.getByLabel('Watchlist anlegen').click();

      let ele = page.getByText('Test Watchlist renamed').first();
      await ele.waitFor();
      await expect(ele).toBeVisible();

      // rename it back if it was renamed
      if (await page.getByText('Test Watchlist renamed').first().isVisible()) {
        await page.getByRole('button', { name: 'Bearbeiten' }).click();
        await page.locator('a').filter({ hasText: 'Umbenennen' }).click();
        await page.getByLabel('Watchlist Bezeichnung*').click();
        await page.getByLabel('Watchlist Bezeichnung*').fill('Test Watchlist');
        await page.getByLabel('Watchlist anlegen').click();

        let ele = page.getByText('Test Watchlist').first();
        await ele.waitFor();
        await expect(ele).toBeVisible();
      }

      await expect(page.getByText('Test Watchlist').first()).toBeVisible();
    });

    await test.step('Add instrument to Watchlist', async () => {
      await page.getByRole('searchbox', { name: 'Add Instruments' }).click();
      await page
        .getByRole('searchbox', { name: 'Add Instruments' })
        .fill('ABB n');
      await page
        .getByRole('searchbox', { name: 'Add Instruments' })
        .press('Enter');
      await page
        .locator('a')
        .filter({ hasText: 'ABB NCHFSIX Swiss ExchangeCH0012221716' })
        .click();
      const ele = page.getByRole('cell', { name: 'ABB N' });
      await clickToastAway(page);
      await ele.waitFor();
    });

    await test.step('Remove instrument from Watchlist', async () => {
      await page.getByRole('cell', { name: '' }).locator('a').click();
      await page.getByRole('button', { name: '6 Löschen' }).click();
      await page
        .locator('#ModalStickyFooter')
        .getByRole('button', { name: '6 Löschen' })
        .click();

      await page
        .locator('#main')
        .getByText(
          'Beginnen Sie, Instrumente zu Ihrer Watchlist hinzuzufügen. Sie können diese dire',
        )
        .waitFor();
    });
  });
});
