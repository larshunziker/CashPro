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

/* @ts-ignore TODO: TS7006 ->  Parameter 'req' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'res' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'next' implicitly has an 'any' type. */
const authenticate = (req, res, next): void => {
  if (isHostProtected(req)) {
    const auth = { login: 'preview', password: 'leckerschmecker' };
    const auth2 = { login: 'partner3', password: 'd8g*zwT7' };
    const authAdtest = { login: 'adtest', password: 'adtest' };

    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password]: string[] = new Buffer(b64auth, 'base64')
      .toString()
      .split(':');

    if (
      !login ||
      !password ||
      ((login !== auth.login || password !== auth.password) &&
        (login !== auth2.login || password !== auth2.password) &&
        (login !== authAdtest.login || password !== authAdtest.password))
    ) {
      res.set('WWW-Authenticate', 'Basic realm="GM"');
      return res.status(401).send('You shall not pass.');
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
      req.headers.host === 'www.gaultmillau.ch' ||
      req.headers.host === 'gaultmillau.ch' ||
      req.headers.host === 'stage.gaultmillau.ch' ||
      req.headers.host === 'develop.gaultmillau.ch' ||
      req.headers.host === 'performance.gaultmillau.ch' ||
      req.headers.host === 'master.gaultmillau.ch'
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
  /* @ts-ignore TODO: TS2322 ->  Type '({ url */
  configureServerStore,
  dnsPrefetchLinks: [
    '//tags.tiqcdn.com',
    '//cdn.ringier-advertising.ch',
    '//cdn.cookielaw.org',
  ],
  errorFunction,
  unsupportedBrowser,
  loginOffline,
  preConnectLinks: [
    { href: '//cdn.ringier-advertising.ch' },
    { href: '//cdn.cookielaw.org' },
  ],
  isAkamaiRequest,
  doNotHydrateWindowState: true,
  generateApolloCache,
});

server();
