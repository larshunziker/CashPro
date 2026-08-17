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
    const auth = { login: 'preview', password: 'umbrellaella' };
    const authAdTest = { login: 'adtest', password: 'adtest' };
    const authAdvent = { login: 'preview', password: 'advent23' };

    const b64auth: string =
      (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password]: Array<string> = new Buffer(b64auth, 'base64')
      .toString()
      .split(':');

    const authIsInvalid = login !== auth.login || password !== auth.password;
    const authAdTestIsInvalid =
      login !== authAdTest.login || password !== authAdTest.password;
    const authAdventIsInvalid =
      authAdvent.login !== login || authAdvent.password !== password;

    if (
      !login ||
      !password ||
      (authIsInvalid && authAdTestIsInvalid && authAdventIsInvalid)
    ) {
      res.set('WWW-Authenticate', 'Basic realm="Schweizer-Illustrierte"');
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
      req.headers.host === 'www.schweizer-illustrierte.ch' ||
      req.headers.host === 'schweizer-illustrierte.ch' ||
      req.headers.host === 'stage.schweizer-illustrierte.ch' ||
      req.headers.host === 'develop.schweizer-illustrierte.ch' ||
      req.headers.host === 'performance.schweizer-illustrierte.ch' ||
      req.headers.host === 'master.schweizer-illustrierte.ch'
    )
  ) {
    req.isAkamaiRequest = false;
  }

  next();
};

const server = serverFactory({
  RaschProviders,
  AppRoutes: App, // TODO replace AppRoutes with App in factory once we migrate
  authenticate,
  configureServerStore,
  dnsPrefetchLinks: [
    '//cdn.schweizer-illustrierte.ch',
    '//tags.tiqcdn.com',
    '//adserver.adtech.de',
    '//cdn.ringier-advertising.ch',
    '//buy.tinypass.com',
    '//cdn.tinypass.com',
    '//experience.tinypass.com',
    '//login.onelog.ch',
    '//cdn.cookielaw.org',
    '//raetselfabrik.de', // puzzles
  ],
  errorFunction,
  unsupportedBrowser,
  loginOffline,
  preConnectLinks: [
    { href: '//cdn.schweizer-illustrierte.ch' },
    { href: '//cdn.ringier-advertising.ch' },
    { href: '//cdn.cookielaw.org' },
  ],
  isAkamaiRequest,
  doNotHydrateWindowState: true,
  generateApolloCache,
});

server();
