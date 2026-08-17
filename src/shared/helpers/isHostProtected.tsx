import { Request } from 'express';

const hostsByPublication: Record<string, string[]> = {
  beobachter: [
    'www.beobachter.ch',
    'beobachter.ch',
    'app.beobachter.ch',
    'app.stage.beobachter.ch',
  ],
  cash: ['www.cash.ch', 'cash.ch', 'app.stage.cash.ch', 'app.cash.ch'],
  gaultmillau: ['www.gaultmillau.ch', 'gaultmillau.ch'],
  handelszeitung: [
    'www.handelszeitung.ch',
    'app.handelszeitung.ch',
    'app.stage.handelszeitung.ch',
    'handelszeitung.ch',
  ],
  'schweizer-illustrierte': [
    'www.schweizer-illustrierte.ch',
    'schweizer-illustrierte.ch',
  ],
};

export const isHostProtected = (req: Request) => {
  const regexCMS = /^https?:\/\/cms.*[a-z-]*.ringiermedienschweiz.ch/i;
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  const referrerIsCMS = regexCMS.test(req.get('Referrer'));
  const refererIsLighthouse = req
    .get('User-Agent')
    ?.includes('Chrome-Lighthouse');

  const hosts = hostsByPublication[__APP_NAME__];

  if (__PRODUCTION__ && !referrerIsCMS && !refererIsLighthouse) {
    const unprotectedHost =
      hosts.some((host) => host === req.headers.host) ||
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      req.headers.host.startsWith('dev.local') ||
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      req.headers.host.startsWith('localhost');

    return !unprotectedHost;
  }
  return false;
};
