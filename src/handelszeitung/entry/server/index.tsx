/* istanbul ignore file */

import serverFactory from '../../../common/entry/server/factory';
import { isHostProtected } from '../../../shared/helpers/isHostProtected';
import App from '../../screens/App';
import RaschProviders from '../../screens/App/components/RaschProviders';
import generateApolloCache from '../../../shared/generateApolloCache';
import errorFunction from './error';
import loginOffline from './loginOffline';
import unsupportedBrowser from './unsupportedBrowser';
import { configureServerStore } from '../../shared/configureStore';

/* @ts-ignore TODO: TS7006 ->  Parameter 'req' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'res' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'next' implicitly has an 'any' type. */
const authenticate = (req, res, next): void => {
  if (isHostProtected(req)) {
    const auth = { login: 'preview', password: 'cheesecake' };
    const authAdTest = { login: 'adtest', password: 'adtest' };
    const authPartner = { login: 'partner', password: 'take.a.look' };

    const b64auth: string =
      (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password]: Array<string> = new Buffer(b64auth, 'base64')
      .toString()
      .split(':');

    const authIsInvalid = login !== auth.login || password !== auth.password;
    const authAdTestIsInvalid =
      login !== authAdTest.login || password !== authAdTest.password;
    const authPartnerIsInvalid =
      authPartner.login !== login || authPartner.password !== password;

    if (
      !login ||
      !password ||
      (authIsInvalid && authAdTestIsInvalid && authPartnerIsInvalid)
    ) {
      res.set('WWW-Authenticate', 'Basic realm="Handelszeitung"');
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
      req.headers.host === 'www.handelszeitung.ch' ||
      req.headers.host === 'app.handelszeitung.ch' ||
      req.headers.host === 'handelszeitung.ch' ||
      req.headers.host === 'stage.handelszeitung.ch' ||
      req.headers.host === 'develop.handelszeitung.ch' ||
      req.headers.host === 'performance.handelszeitung.ch' ||
      req.headers.host === 'master.handelszeitung.ch'
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
  // fontPreloadLinks: ['Gotham-Black.woff2', 'GothamSSm-Book.woff2'],
  dnsPrefetchLinks: [
    '//cdn.handelszeitung.ch',
    '//tags.tiqcdn.com',
    '//cdn.ringier-advertising.ch',
    '//cdn.tinypass.com',
    '//buy.tinypass.com',
    '//experience.tinypass.com',
    '//cdn.cookielaw.org',
  ],
  errorFunction,
  unsupportedBrowser,
  loginOffline,
  preConnectLinks: [
    { href: '//cdn.handelszeitung.ch' },
    { href: '//cdn.ringier-advertising.ch' },
    { href: '//cdn.cookielaw.org' },
  ],
  isAkamaiRequest,
  doNotHydrateWindowState: true,
  generateApolloCache,
});

server();
