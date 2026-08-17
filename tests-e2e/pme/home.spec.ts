import { expect, test } from '@playwright/test';
import { baseUrl } from '../shared/constants';
import { PUBLICATION_PME } from '../../src/shared/constants/publications';

test('home has title', async ({ page, context }) => {
  await page.goto(baseUrl(PUBLICATION_PME));
  await expect(page).toHaveTitle(/.*| PME/);
});
