import { expect, test } from '@playwright/test';
import { baseUrl } from '../shared/constants';
import { PUBLICATION_SI } from '../../src/shared/constants/publications';

test('home has title', async ({ page }) => {
  await page.goto(baseUrl(PUBLICATION_SI));
  await expect(page).toHaveTitle(/.*| Schweizer Illustrierte/);
});
