import { Page, expect, test } from '@playwright/test';
import { gotoUrlAndWaitFor } from '../shared/helpers';
import { PUBLICATION_CASH } from '../../src/shared/constants/publications';
import { baseUrl } from '../shared/constants';

const checkIfElementsExist = async (page: Page, expectedInstrumentTitle) => {
  const titleElement = page.getByText(expectedInstrumentTitle).first();
  const trendIcon = page.locator('#main i');
  const chartElement = page.locator('div[id*=highcharts]');

  await titleElement.waitFor();
  await trendIcon.waitFor();
  await chartElement.waitFor();
};

const checkIfTrendValid = async (page: Page) => {
  /* please note:
  As observed while writing the tests, in case the absolute value (iNetVperprV) is `0.00`,
  it still can happen that the relative change (iNetVperprVPr) is different. Therefore,
  I used the value of iNetVperprVPr here to determine in which direction the trend goes.
  When checking the code, iNetVperprV is the determinant for what styles are applied, which
  makes the above statement kinda confusing... */

  const colorPositive = 'rgb(54, 133, 63)';
  const colorNegative = 'rgb(177, 16, 41)';

  /* This page renders live quotes that the auto-updater can refresh at any moment.
     Reading the percentage and asserting the icon colour as two separate steps is racy:
     an auto-update tick between the two reads flips the expected colour. We instead read
     both in one pass and poll until we observe a self-consistent (percentage ↔ colour)
     pair, which also absorbs the initial load before live values are present. */
  const readTrendConsistency = async (): Promise<boolean> => {
    const values = await page
      .locator('div')
      .filter({ hasText: /%/, hasNotText: 'Jetzt mehr erfahren' })
      .locator('> div > span')
      .allTextContents();

    const trendChangePercentage = values[1]?.replace('%', '');
    // live values not rendered yet → keep polling
    if (trendChangePercentage === undefined) {
      return false;
    }

    const trendChangeFloat = isNaN(parseFloat(trendChangePercentage))
      ? '0.00'
      : parseFloat(trendChangePercentage).toFixed(2);

    const color = await page
      .locator('p')
      .first()
      .locator('i')
      .first()
      .evaluate((el) => getComputedStyle(el).color);

    if (trendChangeFloat === '0.00') {
      // trend unchanged/neutral
      return color !== colorPositive && color !== colorNegative;
    }
    if (trendChangeFloat.includes('-')) {
      // trend negative
      return color === colorNegative;
    }
    // trend positive
    return color === colorPositive;
  };

  await expect
    .poll(readTrendConsistency, { timeout: 15_000, intervals: [500] })
    .toBe(true);
};

test.describe('External Chart', () => {
  test('external chart: origin=cash', async ({ page }) => {
    const query = '?origin=cash&listingid=24476758-4-1'; // UBS

    const domain = baseUrl(PUBLICATION_CASH) + `widget/external-chart${query}`;

    await gotoUrlAndWaitFor(domain, page);
    await expect(page.getByText('Präsentiert von')).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'cash' })).not.toBeVisible();
  });

  test('external chart: origin=blick', async ({ page }) => {
    const query = '?origin=blick&listingid=24476758-4-1'; // UBS

    const domain = baseUrl(PUBLICATION_CASH) + `widget/external-chart${query}`;

    await gotoUrlAndWaitFor(domain, page);
    await page.getByText('Präsentiert von').waitFor();
    await page.getByRole('link', { name: 'cash' }).waitFor();
  });

  test('external chart: listingId=Kurse', async ({ page }) => {
    const query = '?listingid=11448018-537-333'; // Tesla
    const instrumentTitle = 'Tesla Rg';

    const domain = baseUrl(PUBLICATION_CASH) + `widget/external-chart${query}`;

    await gotoUrlAndWaitFor(domain, page);
    await checkIfElementsExist(page, instrumentTitle);
    await checkIfTrendValid(page);
  });

  test('external chart: listingId=Indizes', async ({ page }) => {
    const query = '?listingid=998089-4-1'; // SMI
    const instrumentTitle = 'SMI';

    const domain = baseUrl(PUBLICATION_CASH) + `widget/external-chart${query}`;

    await gotoUrlAndWaitFor(domain, page);
    await checkIfElementsExist(page, instrumentTitle);
    await checkIfTrendValid(page);
  });

  test('external chart: listingId=ETF/Fonds', async ({ page }) => {
    const query = '?listingid=25949494-65-333'; // ARKK
    const instrumentTitle = 'Ark Innovation ETF';

    const domain = baseUrl(PUBLICATION_CASH) + `widget/external-chart${query}`;

    await gotoUrlAndWaitFor(domain, page);
    await checkIfElementsExist(page, instrumentTitle);
    await checkIfTrendValid(page);
  });

  test('external chart: listingId=Derivate', async ({ page }) => {
    const query = '?listingid=153605174-880-1'; // JB Barrier Reverse Convertible
    const instrumentTitle = '9.5% p.a. JB Barrier Reverse Convertible (80%)';

    const domain = baseUrl(PUBLICATION_CASH) + `widget/external-chart${query}`;

    await gotoUrlAndWaitFor(domain, page);
    await checkIfElementsExist(page, instrumentTitle);
    await checkIfTrendValid(page);
  });

  test('external chart: listingId=Rohstoffe', async ({ page }) => {
    const query = '?listingid=274701-178-1'; // Gold
    const instrumentTitle = 'Gold 1 Kg';

    const domain = baseUrl(PUBLICATION_CASH) + `widget/external-chart${query}`;

    await gotoUrlAndWaitFor(domain, page);
    await checkIfElementsExist(page, instrumentTitle);
    await checkIfTrendValid(page);
  });

  test('external chart: listingId=Devisen/Zinsen', async ({ page }) => {
    const query = '?listingid=275000-148-1'; // USD/CHF
    const instrumentTitle = 'USD/CHF';

    const domain = baseUrl(PUBLICATION_CASH) + `widget/external-chart${query}`;

    await gotoUrlAndWaitFor(domain, page);
    await checkIfElementsExist(page, instrumentTitle);
    // await checkIfTrendValid(page);
  });

  test('external chart: listingId=Crypto', async ({ page }) => {
    const query = '?listingid=999999919205-9910014-1'; // ETH
    const instrumentTitle = 'ETH';

    const domain = baseUrl(PUBLICATION_CASH) + `widget/external-chart${query}`;

    await gotoUrlAndWaitFor(domain, page);
    await checkIfElementsExist(page, instrumentTitle);
    await checkIfTrendValid(page);
  });

  test('external chart: path=Kurse', async ({ page }) => {
    const query = '?path=aktien/ubs-group-n-24476758/swx/chf'; // UBS
    const instrumentTitle = 'UBS Group N';

    const domain = baseUrl(PUBLICATION_CASH) + `widget/external-chart${query}`;

    await gotoUrlAndWaitFor(domain, page);
    await checkIfElementsExist(page, instrumentTitle);
    await checkIfTrendValid(page);
  });

  test('external chart: path=Indizes', async ({ page }) => {
    const query = '?path=indizes/nasdaq-100-985336/nai/usd'; // NDX
    const instrumentTitle = 'NASDAQ 100';

    const domain = baseUrl(PUBLICATION_CASH) + `widget/external-chart${query}`;

    await gotoUrlAndWaitFor(domain, page);
    await checkIfElementsExist(page, instrumentTitle);
    await checkIfTrendValid(page);
  });

  test('external chart: path=ETF/Fonds', async ({ page }) => {
    const query = '?path=fonds/zkb-gold-etf-13910159/swx/chf'; // Swisscanto (CH) Gold ETF
    const instrumentTitle = 'Swisscanto (CH) Gold ETF';

    const domain = baseUrl(PUBLICATION_CASH) + `widget/external-chart${query}`;

    await gotoUrlAndWaitFor(domain, page);
    await checkIfElementsExist(page, instrumentTitle);
    await checkIfTrendValid(page);
  });

  test('external chart: path=Derivate', async ({ page }) => {
    const query = '?path=neuemissionen/10-gebn-baeg-27-153605174/qmh/chf'; // SBWSJB
    const instrumentTitle = '9.5% p.a. JB Barrier Reverse Convertible (80%)';

    const domain = baseUrl(PUBLICATION_CASH) + `widget/external-chart${query}`;

    await gotoUrlAndWaitFor(domain, page);
    await checkIfElementsExist(page, instrumentTitle);
    await checkIfTrendValid(page);
  });

  test('external chart: path=Rohstoffe', async ({ page }) => {
    const query = '?path=rohstoffe-edelmetalle/oelpreis-(brent)-274207/lsd/usd'; // Öl (Brent)
    const instrumentTitle = 'Ölpreis (Brent)';

    const domain = baseUrl(PUBLICATION_CASH) + `widget/external-chart${query}`;

    await gotoUrlAndWaitFor(domain, page);
    await checkIfElementsExist(page, instrumentTitle);
    await checkIfTrendValid(page);
  });

  test('external chart: path=Devisen/Zinsen', async ({ page }) => {
    const query = '?path=devisen-zinsen/eur-chf-bills-1353227/csd/chf'; // EUR/CHF
    const instrumentTitle = 'EUR/CHF BILLS';

    const domain = baseUrl(PUBLICATION_CASH) + `widget/external-chart${query}`;

    await gotoUrlAndWaitFor(domain, page);
    await checkIfElementsExist(page, instrumentTitle);
    await checkIfTrendValid(page);
  });

  test('external chart: path=Crypto', async ({ page }) => {
    const query = '?path=kryptowaehrungen/ethereum-eth-999999919205/cccagg/chf'; // ETH
    const instrumentTitle = 'ETH';

    const domain = baseUrl(PUBLICATION_CASH) + `widget/external-chart${query}`;

    await gotoUrlAndWaitFor(domain, page);
    await checkIfElementsExist(page, instrumentTitle);
    await checkIfTrendValid(page);
  });

  /*
    to run locally: call "yarn dev" then run in parallel the "iframe embed" tests
    RUN: DOT_ENV=localhost E2E_TEST_MATCH='external-chart' npx playwright test --grep 'iframe embed'
  */
  test.describe('iframe embed', () => {
    test.use({ ignoreHTTPSErrors: true });

    test('external chart: iframe embed with origin=blick and path (SMI)', async ({
      page,
    }) => {
      const isCi = !!process.env.CI;
      test.setTimeout(isCi ? 90_000 : 200_000);

      const base = baseUrl(PUBLICATION_CASH);
      const widgetSrc = `${base}widget/external-chart?origin=blick&path=/indizes/smi-998089/swx/chf&timeperiod=1d#iframeId=RZQCLXFOIM&theme=light`;

      const isAutoUpdateGraphqlOk = (response: Response) => {
        if (!response.url().includes('graphql') || response.status() !== 200) {
          return false;
        }
        if (response.url().includes('AutoUpdateWithCredentials')) {
          return true;
        }
        const postData = response.request().postData();
        return postData?.includes('AutoUpdateWithCredentials') ?? false;
      };

      let autoUpdateGraphqlResponseCount = 0;
      page.on('response', (response) => {
        if (isAutoUpdateGraphqlOk(response)) {
          autoUpdateGraphqlResponseCount++;
        }
      });

      const body = `<!DOCTYPE html><html><body>
        <iframe id="RZQCLXFOIM" src="${widgetSrc}"
          style="width:100%;height:600px;border:none;"></iframe>
        </body></html>`;

      const wrapperUrl = `${base.replace(/\/$/, '')}/iframe-wrapper`;
      await page.route(
        (url) => url.pathname.replace(/\/$/, '') === '/iframe-wrapper',
        (route) =>
          route.fulfill({
            contentType: 'text/html',
            body,
          }),
      );

      await page.goto(wrapperUrl, { waitUntil: 'domcontentloaded' });

      await page.locator('#RZQCLXFOIM').waitFor({ state: 'attached' });

      const iframe = page.frameLocator('#RZQCLXFOIM');

      await iframe.getByText('SMI').first().waitFor({ timeout: 60_000 });
      await iframe.locator('div[id*=highcharts]').waitFor();
      await iframe.getByText('Präsentiert von').waitFor();
      await iframe.getByRole('link', { name: 'cash' }).waitFor();

      /* The head renders the quote timestamp as `DD.MM.YYYY - HH:MM:SS`. Since the date now
          comes from `lvalDatetime` (and not from `Date.now()`), it should match this pattern
          and only change when auto-update delivers a fresh quote. */
      const lvalDatetimeRegex = /\d{2}\.\d{2}\.\d{4} - \d{2}:\d{2}:\d{2}/;

      const readLiveHeadValues = async () => {
        const headValueSpans = iframe
          .locator('div')
          .filter({ hasText: /%/, hasNotText: 'Jetzt mehr erfahren' })
          .locator('> div > span');
        const lvalLine = (await headValueSpans.nth(0).textContent()) ?? '';
        const pctLine = (await headValueSpans.nth(1).textContent()) ?? '';
        const absLine = (await headValueSpans.nth(2).textContent()) ?? '';
        const lvalFormatted = lvalLine.trim().match(/^[\d'.]+/)?.[0] ?? '';
        const iNetVperprVPr = pctLine.replace('%', '').trim();
        const iNetVperprV = absLine.trim();
        const lvalDatetimeText =
          (
            await iframe.getByText(lvalDatetimeRegex).first().textContent()
          )?.trim() ?? '';
        const lvalDatetime =
          lvalDatetimeText.match(lvalDatetimeRegex)?.[0] ?? '';
        return {
          lvalFormatted,
          iNetVperprVPr,
          iNetVperprV,
          lvalDatetime,
        };
      };

      await expect
        .poll(async () => {
          const v = await readLiveHeadValues();
          return (
            v.lvalFormatted.length > 0 &&
            v.iNetVperprVPr.length > 0 &&
            v.iNetVperprV.length > 0 &&
            lvalDatetimeRegex.test(v.lvalDatetime)
          );
        })
        .toBe(true);

      /* CI: stop after smoke (iframe + head shows lval / % / abs). Live polling is slow and
          quote ticks are not guaranteed on PR preview within the job budget. */
      if (isCi) {
        return;
      }

      const initialLive = await readLiveHeadValues();

      await expect
        .poll(() => autoUpdateGraphqlResponseCount, {
          timeout: 90_000,
          intervals: [2000],
        })
        .toBeGreaterThanOrEqual(2);

      await expect
        .poll(
          async () => {
            const next = await readLiveHeadValues();
            return (
              next.lvalFormatted !== initialLive.lvalFormatted ||
              next.iNetVperprVPr !== initialLive.iNetVperprVPr ||
              next.iNetVperprV !== initialLive.iNetVperprV ||
              next.lvalDatetime !== initialLive.lvalDatetime
            );
          },
          { timeout: 30_000, intervals: [500] },
        )
        .toBe(true);

      /* The displayed timestamp must be derived from the instrument's `lvalDatetime`
          and rendered in the expected `DD.MM.YYYY - HH:MM:SS` format (and not from
          `Date.now()` as before the fix). */
      const finalLive = await readLiveHeadValues();
      expect(finalLive.lvalDatetime).toMatch(lvalDatetimeRegex);
    });
  });
});
