import { expect, test } from '@playwright/test';
import { baseUrl } from '../shared/constants';
import { PUBLICATION_HZ } from '../../src/shared/constants/publications';

test('home has title', async ({ page }) => {
  await page.goto(baseUrl(PUBLICATION_HZ));
  await expect(page).toHaveTitle(/.*| Handelszeitung/);
});
