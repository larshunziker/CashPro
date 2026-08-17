import { expect, test } from '@playwright/test';
import { hoverThenClick } from '../shared/helpers';

/**
 * Unit-style coverage for the shared `hoverThenClick` helper (PNT-4716).
 *
 * The helper is the fix for the flaky main navigation, where hover flyout menus
 * collapse between hovering the trigger and clicking the target. Instead of
 * hitting a live environment, these tests build a self-contained flyout menu via
 * `page.setContent`, so the helper's behaviour is verified deterministically and
 * without any network dependency.
 */
test.describe('shared helper: hoverThenClick', () => {
  test('opens a hover flyout and clicks the revealed target', async ({
    page,
  }) => {
    await page.setContent(`
      <style>
        .submenu { display: none; }
        /* the target is only revealed while the trigger's menu item is hovered */
        .nav-item:hover .submenu { display: block; }
      </style>
      <nav>
        <div class="nav-item">
          <a id="trigger" href="#">News</a>
          <div class="submenu">
            <a id="target" href="#top-news">Top News</a>
          </div>
        </div>
      </nav>
      <h1 id="status">not-clicked</h1>
      <script>
        document.getElementById('target').addEventListener('click', (event) => {
          event.preventDefault();
          document.getElementById('status').textContent = 'clicked';
        });
      </script>
    `);

    const trigger = page.locator('#trigger');
    const target = page.locator('#target');

    await expect(target).toBeHidden();

    await hoverThenClick(trigger, target);

    await expect(page.locator('#status')).toHaveText('clicked');
  });

  test('retries until a delayed target becomes clickable', async ({ page }) => {
    // The target only appears after 2.5s, which is longer than the helper's
    // internal 2s waitFor. The first inner attempt therefore fails and the
    // `toPass` retry loop must run again before the click succeeds. This mirrors
    // a flyout that is not yet ready on the first hover.
    await page.setContent(`
      <a id="trigger" href="#">News</a>
      <a id="target" href="#top-news" style="display: none;">Top News</a>
      <h1 id="status">not-clicked</h1>
      <script>
        setTimeout(() => {
          document.getElementById('target').style.display = 'block';
        }, 2500);
        document.getElementById('target').addEventListener('click', (event) => {
          event.preventDefault();
          document.getElementById('status').textContent = 'clicked';
        });
      </script>
    `);

    const trigger = page.locator('#trigger');
    const target = page.locator('#target');

    await expect(target).toBeHidden();

    await hoverThenClick(trigger, target);

    await expect(page.locator('#status')).toHaveText('clicked');
  });

  test('fails fast when the target never appears', async ({ page }) => {
    // Guards the timeout contract: if the flyout never reveals the target, the
    // helper rejects within the provided budget instead of hanging.
    await page.setContent(`
      <a id="trigger" href="#">News</a>
      <h1 id="status">not-clicked</h1>
    `);

    const trigger = page.locator('#trigger');
    const missingTarget = page.locator('#does-not-exist');

    await expect(
      hoverThenClick(trigger, missingTarget, { timeout: 3_000 }),
    ).rejects.toThrow();
    await expect(page.locator('#status')).toHaveText('not-clicked');
  });
});
