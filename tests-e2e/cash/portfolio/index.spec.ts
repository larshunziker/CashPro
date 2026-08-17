import { expect, test } from '@playwright/test';
import { clickToastAway } from '../../shared/helpers';
import { acceptCookiesAndLogin } from '../../shared/common';
import { PUBLICATION_CASH } from '../../../src/shared/constants/publications';

test.describe.configure({ mode: 'serial' });
test.describe('Portfolio Page Test', () => {
  test('all steps', async ({ page }) => {
    await acceptCookiesAndLogin(page, PUBLICATION_CASH, 'portfolio');

    await test.step('Create New Portfolio', async () => {
      await page.getByLabel('test 1').click();

      const hasTestPortfolio = page.getByRole('link', {
        name: 'Test Portfolio',
      });
      if (await hasTestPortfolio.isVisible()) {
        await hasTestPortfolio.click();
      } else {
        page
          .getByRole('link')
          .filter({
            hasText: 'Neues Portfolio anlegen',
          })
          .first()
          .click();

        await page.getByLabel('Portfolio Bezeichnung').fill('Test Portfolio');
        await page.getByRole('link', { name: 'Währung* ' }).click();
        await page.getByRole('option', { name: 'CHF' }).click();
        await page.getByLabel('Portfolio umbenennen').click();
      }

      const ele = page.getByText('Test Portfolio').first();
      await ele.waitFor();
      await expect(ele).toBeVisible();
    });

    await test.step('Rename Portfolio', async () => {
      await page.getByRole('button', { name: 'Bearbeiten' }).click();
      await page.locator('a').filter({ hasText: 'Umbenennen' }).click();
      await page.getByLabel('Portfolio Bezeichnung*').click();
      await page
        .getByLabel('Portfolio Bezeichnung*')
        .fill('Test Portfolio renamed');
      await page.getByLabel('Portfolio umbenennen').click();

      const eleRenamed = page.getByText('Test Portfolio renamed').first();
      await eleRenamed.waitFor();
      await expect(eleRenamed).toBeVisible();

      // rename it back if it was renamed
      await page.getByRole('button', { name: 'Bearbeiten' }).click();
      await page.locator('a').filter({ hasText: 'Umbenennen' }).click();
      await page.getByLabel('Portfolio Bezeichnung*').click();
      await page.getByLabel('Portfolio Bezeichnung*').fill('Test Portfolio');
      await page.getByLabel('Portfolio umbenennen').click();

      const ele = page.getByText('Test Portfolio').first();
      await ele.waitFor();
      await expect(ele).toBeVisible();
    });

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
      await page.getByLabel('Anzahl*').fill('2');
      await page.getByLabel('Kaufen').click();
      await clickToastAway(page);
    });

    await test.step('Set custom View', async () => {
      await page.getByLabel(/.*(?:Ansicht|Spezial-Infos)/).click();
      await page.getByRole('link', { name: 'Performance Ansicht' }).click();
      await page.getByLabel('Mehr', { exact: true }).click();
      await page
        .locator('a')
        .filter({ hasText: 'Ansicht und Gruppierung merken' })
        .click();

      const dropdownElement = page.getByLabel('Performance Ansicht').first();
      dropdownElement.waitFor();
      await clickToastAway(page);
    });

    await test.step('Edit custom order', async () => {
      await page.getByLabel('Mehr', { exact: true }).click();
      await page.mouse.wheel(0, 200);
      await page
        .getByRole('link', { name: / Eigene Ansicht (erstellen|anpassen)/ })
        .click();
      await page.getByRole('button', { name: 'Felder hinzufügen' }).click();

      // add fields
      await page.getByLabel('Name (Kurz)').check();
      await page.getByLabel('Börsenplatz-Kürzel').check();
      await page.getByLabel('Börsenplatz', { exact: true }).check();
      await page.getByLabel('ISIN').check();
      await page.getByRole('button', { name: 'Speichern' }).click();
      await clickToastAway(page);
      await page.mouse.wheel(0, 150);

      /* TODO WIP: Drag and drop fields

        // drag and drop fields
        const dragHandle = page
          .locator('div')
          .filter({ hasText: /^Name$/ })
          .locator('span i');
        const dragDestination = page.getByText('Börsenplatz-Kürzel', {
          exact: true,
        });

        // Ensure both elements are visible before proceeding
        await dragHandle.waitFor({ state: 'visible' });
        await dragDestination.waitFor({ state: 'visible' });

        const sourceBoundingBox = await dragHandle.boundingBox();
        const targetBoundingBox = await dragDestination.boundingBox();

        if (!sourceBoundingBox || !targetBoundingBox) {
          throw new Error('Could not retrieve bounding boxes for drag and drop.');
        }

        await page.mouse.down();
        await page.mouse.move(
          targetBoundingBox.x + targetBoundingBox.width / 2,
          targetBoundingBox.y + targetBoundingBox.height / 2 + 100,
          { steps: 1 }, // Same here, reduce steps
        );
        await page.mouse.up();

        await dragDestination.hover();
        // await page.dragAndDrop(dragHandle, dragToHandle);
        */

      // delete all added fields
      await page
        .locator('div')
        .filter({ hasText: /^Name \(Kurz\)$/ })
        .locator('a')
        .nth(1)
        .click();

      await page
        .locator('div')
        .filter({ hasText: /^Börsenplatz-Kürzel$/ })
        .locator('a')
        .nth(1)
        .click();
      await page
        .locator('div')
        .filter({ hasText: /^Börsenplatz$/ })
        .locator('a')
        .nth(1)
        .click();
      await page
        .locator('div')
        .filter({ hasText: /^ISIN$/ })
        .locator('a')
        .nth(1)
        .click();

      await page.mouse.wheel(0, -350);
      await page
        .getByRole('button', { name: '! zurück zum Portfolio' })
        .click();
    });

    await test.step('Add other asset to Portfolio', async () => {
      const addButton = page.getByRole('button', { name: '' }).first();
      await addButton.click();
      await page
        .locator('a')
        .filter({ hasText: 'Titel manuell eintragen' })
        .nth(1)
        .click();

      await page.getByLabel('Name*').fill('testpos1');
      await page.getByLabel('Anzahl*').fill('2');
      await page.getByLabel('Preis in CHF*').fill('2');
      await page.getByLabel('Wert*').fill('40');

      await page.getByLabel('Manueller Titel anlegen').click();
      await page.getByText('testpos1', { exact: true }).waitFor();
      await clickToastAway(page);
      await page.waitForTimeout(1000);
    });

    await test.step('Change other asset in Portfolio', async () => {
      await page.getByRole('row', { name: 'testpos1' }).locator('a').click();
      await page.getByRole('button', { name: ' Bearbeiten' }).click();

      await page.getByLabel('Name*').fill('testpos2');
      await page.getByLabel('Wert in CHF*').fill('1111');
      await page.getByLabel('Portfolio anlegen').click();

      await page
        .getByText('Bearbeiten - testpos1')
        .waitFor({ state: 'hidden' });

      const title = page.getByText('testpos2').first();
      await title.waitFor();
      await page.waitForTimeout(1000);
    });

    await test.step('Remove two instrument from Portfolio', async () => {
      for (let i = 0; i++; i < 2) {
        await page
          .getByRole('cell', { name: '' })
          .locator('a')
          .first()
          .click();
        await page.getByRole('button', { name: '6 Löschen' }).first().click();
        await page
          .locator('#ModalStickyFooter')
          .getByRole('button', { name: '6 Löschen' })
          .click();

        const noInstrumentsText = page
          .locator('p')
          .filter({
            hasText:
              'Beginnen Sie, Instrumente zu Ihrem Portfolio hinzuzufügen.',
          })
          .first();

        try {
          // TODO: we need to fix this on the component, as it doesn't always work as intended
          // => sometimes we have an infinite spinner instead of the text
          await noInstrumentsText.waitFor();
        } catch (error) {}
      }
    });

    await test.step('Delete Test Portfolio', async () => {
      await page.getByLabel('Bearbeiten').click();
      await page
        .locator('#scrollable-drawer-content')
        .getByRole('link')
        .filter({ hasText: 'Löschen' })
        .click();
      await page
        .locator('#ModalStickyFooter')
        .getByRole('button', { name: '6 Löschen' })
        .click();

      await page
        .locator('h1')
        .filter({
          hasText: 'Portfolios',
        })
        .first()
        .waitFor();
      await page
        .locator('a')
        .filter({
          hasText: 'test 1',
        })
        .first()
        .waitFor();
    });
  });
});
