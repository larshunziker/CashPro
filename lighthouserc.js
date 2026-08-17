const CREDENTIALS = Buffer.from(
  process.env.PREVIEW_USERNAME + ':' + process.env.PREVIEW_PASSWORD,
).toString('base64');

const getPreviewUrl = (prNumber, APP) =>
  `https://nginx.pr-${prNumber}.${APP}-k8s.develop.ras.dev`;

const { PR_NUMBER, BEO, CASH, GM } = process.env;
const url = [];

if (BEO) {
  url.push(getPreviewUrl(PR_NUMBER, 'beobachter'));
}
if (CASH) {
  url.push(getPreviewUrl(PR_NUMBER, 'cash'));
}
if (GM) {
  url.push(getPreviewUrl(PR_NUMBER, 'gaultmillau'));
}

module.exports = {
  ci: {
    collect: {
      url,
      settings: {
        extraHeaders: `{"Authorization": "Basic ${CREDENTIALS}"}`,
      },
    },
    assert: {
      // preset: 'lighthouse:recommended',
      assertions: {
        'cumulative-layout-shift': 'on',
        'categories:accessibility': ['error', { minScore: 0.75 }],
        'categories:best-practices': ['error', { minScore: 0.8 }],
        'categories:seo': ['error', { minScore: 0.8 }],
        // 'uses-text-compression': 'off',
        // 'apple-touch-icon': 'off',
        // 'color-contrast': 'off',
        // 'csp-xss': 'off',
        // 'errors-in-console': 'off',
        // 'font-display': 'off',
        // 'maskable-icon': 'off',
        // 'no-unload-listeners': 'off',
        // 'unused-css-rules': 'off',
        // 'unused-javascript': 'off',
        // 'users-text-compression': 'off',
        // 'valid-source-maps': 'off',
        // 'unsized-images': 'off',
        // 'bootup-time': 'off',
        // 'dom-size': 'off',
        // 'first-contentful-paint': 'off',
        // 'largest-contentful-paint': 'off',
        // 'first-meaningful-paint': 'off',
        // 'interactive': 'off',
        // 'legacy-javascript': 'off',
        // 'mainthread-work-breakdown': 'off',
        // 'max-potential-fid': 'off',
        // 'render-blocking-resources': 'off',
        // 'speed-index': 'off',
        // 'uses-long-cache-ttl': 'off',
      },
    },
  },
};
