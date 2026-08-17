/* istanbul ignore file */

import serverFactory from '../../../common/entry/server/factory';
import { isHostProtected } from '../../../shared/helpers/isHostProtected';
import App from '../../screens/App';
import RaschProviders from '../../screens/App/components/RaschProviders';
import generateApolloCache from '../../../shared/generateApolloCache';
import errorFunction from './error';
import unsupportedBrowser from './unsupportedBrowser';
import loginOffline from './loginOffline';
import { configureServerStore } from '../../shared/configureStore';
import { legalAdviceSitemapHandler } from './legalAdviceSitemap/handler';
import { SITEMAP_PATH } from './legalAdviceSitemap/constants';

/* @ts-ignore TODO: TS7006 ->  Parameter 'req' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'res' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'next' implicitly has an 'any' type. */
const authenticate = (req, res, next): void => {
  if (isHostProtected(req)) {
    const auth = { login: 'beo', password: 'notthebird' };
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
      res.set('WWW-Authenticate', 'Basic realm="Beobachter"');
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
      req.headers.host === 'www.beobachter.ch' ||
      req.headers.host === 'beobachter.ch' ||
      req.headers.host === 'app.beobachter.ch' ||
      req.headers.host === 'stage.beobachter.ch' ||
      req.headers.host === 'app.stage.beobachter.ch' ||
      req.headers.host === 'performance.beobachter.ch' ||
      req.headers.host === 'develop.beobachter.ch' ||
      req.headers.host === 'master.beobachter.ch'
    )
  ) {
    req.isAkamaiRequest = false;
  }

  next();
};

const server = serverFactory({
  RaschProviders,
  AppRoutes: App,
  authenticate,
  configureServerStore,
  dnsPrefetchLinks: [
    '//cdn.beobachter.ch',
    '//tags.tiqcdn.com',
    '//adserver.adtech.de',
    '//cdn.ringier-advertising.ch',
    '//buy.tinypass.com',
    '//cdn.tinypass.com',
    '//experience.tinypass.com',
    '//login.onelog.ch',
    '//cdn.cookielaw.org',
  ],
  errorFunction,
  unsupportedBrowser,
  loginOffline,
  preConnectLinks: [
    { href: '//cdn.beobachter.ch' },
    { href: '//cdn.ringier-advertising.ch' },
    { href: '//cdn.cookielaw.org' },
  ],
  isAkamaiRequest,
  doNotHydrateWindowState: true,
  generateApolloCache,
  registerRoutes: (app) => {
    app.get(SITEMAP_PATH, legalAdviceSitemapHandler);
  },
});

server();
