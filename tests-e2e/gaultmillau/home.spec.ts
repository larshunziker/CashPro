import { expect, test } from '@playwright/test';
import { baseUrl } from '../shared/constants';
import { PUBLICATION_GM } from '../../src/shared/constants/publications';

test('home has title', async ({ page }) => {
  await page.goto(baseUrl(PUBLICATION_GM));
  await expect(page).toHaveTitle(/.*| GaultMillau/);
});
