import { expect, test } from '@playwright/test';
import { baseUrl } from '../shared/constants';
import { PUBLICATION_BEOBACHTER } from '../../src/shared/constants/publications';
import { gotoUrlAndWaitFor } from '../shared/helpers';

test('home has title', async ({ page }) => {
  await gotoUrlAndWaitFor(baseUrl(PUBLICATION_BEOBACHTER), page);
  await expect(page).toHaveTitle(/.*| Beobachter/);
});
