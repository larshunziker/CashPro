/* istanbul ignore file */

import serverFactory from '../../../common/entry/server/factory';
import { isHostProtected } from '../../../shared/helpers/isHostProtected';
import App from '../../screens/App';
import RaschProviders from '../../screens/App/components/RaschProviders';
import generateApolloCachePolicy from '../../../shared/generateApolloCachePolicy';
import errorFunction from './error';
import unsupportedBrowser from './unsupportedBrowser';
import loginOffline from './loginOffline';
import { configureServerStore } from '../../shared/configureStore';

/* @ts-ignore TODO: TS7006 ->  Parameter 'req' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'res' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'next' implicitly has an 'any' type. */
const authenticate = (req, res, next): void => {
  if (isHostProtected(req)) {
    // shut up and ...
    const auth = { login: 'preview', password: 'takemymoney' };
    const authAdtest = { login: 'adtest', password: 'adtest' };

    const b64auth: string =
      (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password]: Array<string> = new Buffer(b64auth, 'base64')
      .toString()
      .split(':');

    if (
      !login ||
      !password ||
      ((login !== auth.login || password !== auth.password) &&
        (login !== authAdtest.login || password !== authAdtest.password))
    ) {
      res.set('WWW-Authenticate', 'Basic realm="Cash"');
      return res.status(401).send('You shall not pass');
    }
  }

  next();
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'req' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'res' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'next' implicitly has an 'any' type. */
const isAkamaiRequest = (req, res, next): void => {
  if (
    __PRODUCTION__ &&
    !(
      req.headers.host === 'www.cash.ch' ||
      req.headers.host === 'cash.ch' ||
      req.headers.host === 'app.cash.ch' ||
      req.headers.host === 'stage.cash.ch' ||
      req.headers.host === 'app.stage.cash.ch' ||
      req.headers.host === 'performance.cash.ch' ||
      req.headers.host === 'master.cash.ch' ||
      req.headers.host === 'app.develop.cash.ch' ||
      req.headers.host === 'develop.cash.ch'
    )
  ) {
    req.isAkamaiRequest = false;
  }

  next();
};

const getContentSecurityPolicyHeader = (req: any): string => {
  if (req.url.startsWith('/widget/')) {
    return `frame-ancestors ${[
      'http://localhost:3000',
      'https://*.cash.ch',
      'https://*.handelszeitung.ch',
      'https://*.blick.ch',
      'https://*.develop.ras.dev/',
    ].join(' ')}`;
  }

  return '';
};

const server = serverFactory({
  RaschProviders,
  AppRoutes: App,
  authenticate,
  configureServerStore,
  preloadCssPattern: '<link.*? href="(https://cdn.fi-box..*?.css.*?)"',
  dnsPrefetchLinks: [
    '//tags.tiqcdn.com',
    '//cdn.ringier-advertising.ch',
    '//cdn.cookielaw.org',
    '//auth.ws.cash.ch',
    '//cdn.fi-box.service.cash.ch',
    '//cdn.tinypass.com',
    '//buy-eu.piano.io',
    '//c2-eu.piano.io',
  ],
  errorFunction,
  preConnectLinks: [
    { href: '//fonts.gstatic.com', options: { crossorigin: '' } },
    { href: '//cdn.ringier-advertising.ch' },
    { href: '//cdn.fi-box.service.cash.ch' },
    { href: '//cdn.cookielaw.org' },
    { href: '//auth.ws.cash.ch', options: { crossorigin: 'use-credentials' } },
  ],
  unsupportedBrowser,
  loginOffline,
  isAkamaiRequest,
  doNotHydrateWindowState: true,
  getContentSecurityPolicyHeader,
  generateApolloCache: generateApolloCachePolicy,
});

server();
