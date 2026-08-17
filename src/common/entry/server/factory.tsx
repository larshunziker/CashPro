import { extname } from 'path';
import chalk from 'chalk';
import { program } from 'commander';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'ejs'. '/Users/bhs/code/work/rasch-stack/node_modules/ejs/lib/ejs.js' impl */
import { __express as ejs } from 'ejs';
import express, { NextFunction, Request, Response } from 'express';
import expressStaticGzip from 'express-static-gzip';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'on-finished'. '/Users/bhs/code/work/rasch-stack/node_modules/on-finished/ */
import onFinished from 'on-finished';
import { getAssetManifest } from '../../../shared/helpers/getAssetManifest';
import { noop } from '../../../shared/helpers/utils';
import renderFactory from './renderFactory';
import { ServerFactoryOptions } from './typings';

/* @ts-ignore TODO: TS7006 ->  Parameter 'req' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'res' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'next' implicitly has an 'any' type. */
const passMiddleware = (req, res, next) => {
  next();
};

const assetManifest = getAssetManifest();

const raschFontPaths =
  assetManifest?.files &&
  Object.keys(assetManifest.files).reduce((result, file) => {
    if (/RASCH-Font\.*\.(woff|woff2|svg)/.test(file)) {
      const ext = extname(file).split('?').shift();
      /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      result[ext] = assetManifest.files[file];
    }
    return result;
  }, {});

export default ({
    RaschProviders,
    AppRoutes,
    isAkamaiRequest = passMiddleware,
    authenticate = passMiddleware,
    configureServerStore,
    fontPreloadLinks,
    dnsPrefetchLinks,
    /* @ts-ignore TODO: TS2322 ->  Type '() => null' is not assignable to type '(error */
    errorFunction = noop,
    preConnectLinks,
    unsupportedBrowser,
    loginOffline,
    preloadCssPattern,
    doNotHydrateWindowState = false,
    getContentSecurityPolicyHeader,
    generateApolloCache,
    registerRoutes,
  }: ServerFactoryOptions) =>
  (): void => {
    program
      .option(
        '-v, --viewsPath [path]',
        'Path to express views [path]',
        __dirname,
      )
      .option('-p, --port [number]', 'Port [number]');

    const options = program.opts();
    program.parse(process.argv);

    const { viewsPath, port } = options;

    // create server
    const app = express();
    const publicPath = viewsPath;

    // define rendering
    app.set('views', viewsPath);
    app.set('view engine', 'ejs');
    app.engine('.ejs', ejs); // required due to https://github.com/webpack/webpack/issues/4009

    // set cache control for sw.js
    app.use((req, res, next) => {
      if (req.originalUrl === '/sw.js') {
        res.setHeader('Cache-Control', 'max-age=0, private, must-revalidate');
      }

      next();
    });

    // static rule
    app.use(
      '/',
      expressStaticGzip(publicPath, {
        index: false,
        enableBrotli: true,
        orderPreference: ['br', 'gz'],
        serveStatic: {
          maxAge: 31536000000,
        },
      }),
    );
    app.use(
      '/',
      express.static(publicPath, {
        maxAge: 31536000000,
      }),
    );

    // Logging middleware
    app.use((req, res, next) => {
      // eslint-disable-next-line no-console
      console.log('EXPRESS request received:', {
        // pathname: req._parsedOriginalUrl.pathname,
        pathname: req.originalUrl,
        query: req.query,
        params: req.params,
      });

      req.startTimeStamp = new Date().getTime();

      /* @ts-ignore TODO: TS7006 ->  Parameter 'err' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7006 ->  Parameter 'reqFinished' implicitly has an 'any' type. */
      onFinished(req, (err, reqFinished) => {
        const existingTimeStamp = reqFinished.startTimeStamp;
        // eslint-disable-next-line no-console
        console.log('--> EXPRESS request finished:', {
          time: `${new Date().getTime() - existingTimeStamp}ms`,
          // pathname: reqFinished._parsedOriginalUrl.pathname,
          pathname: reqFinished.originalUrl,
        });
      });

      next();
    });

    // Is request from akamai
    app.use(isAkamaiRequest);

    // Authentication
    app.use(authenticate);

    /* @ts-ignore TODO: TS7006 ->  Parameter 'req' implicitly has an 'any' type. */
    const logConversionToSovendus = async (req) => {
      const apiParams = new URLSearchParams();
      apiParams.append('apiKey', __SOVENDUS_API_KEY__);

      return await fetch(
        `${__SOVENDUS_API_URL__}/${__SOVENDUS_EXTERNAL_ID__}/${req.query.sovReqToken}/api`,
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
          },
          method: 'post',
          body: apiParams.toString(),
        },
      )
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          if (!response || !response.sovReqToken) {
            // eslint-disable-next-line no-console
            console.error(
              `[RaschStack][logConversionToSovendus] log: ${JSON.stringify(
                response,
              )}`,
            );
            return null;
          }

          return response;
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(
            `[RaschStack][logConversionToSovendus] error: ${JSON.stringify(
              error,
            )}`,
          );
          return null;
        });
    };

    app.get('/track-piano-conversion/*', (req, res): void => {
      const apiParams = new URLSearchParams();
      apiParams.append('api_token', __PIANO_API_TOKEN__);
      apiParams.append('aid', __PIANO_AID__);
      // @ts-ignore
      apiParams.append('uid', req.query.uid);
      // @ts-ignore
      apiParams.append('rid', req.query.rid);

      // check if user has access on piano
      fetch(`${__PIANO_ENDPOINT__}/publisher/user/access/check`, {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        method: 'post',
        body: apiParams.toString(),
      })
        .then((response) => {
          return response.json();
        })
        .then(async (response) => {
          // do nothing if user has no access on piano
          if (!response || !response.access) {
            return res.json(null);
          }

          // track conversion if user has access on piano
          const sovendusReponse = await logConversionToSovendus(req);
          if (!sovendusReponse) {
            return res.json(null);
          }
          return res.json(response);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(
            `[RaschStack][pianoConversionHandler] error: ${JSON.stringify(
              error,
            )}`,
          );
          return res.json(null);
        });
    });

    const render = renderFactory({
      RaschProviders,
      AppRoutes,
      /* @ts-ignore TODO: TS2322 ->  Type '(req */
      configureServerStore,
      fontPreloadLinks,
      dnsPrefetchLinks,
      preConnectLinks,
      doNotHydrateWindowState,
      preloadCssPattern,
      getContentSecurityPolicyHeader,
      assetManifest,
      generateApolloCache,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.get('/500', (req, res, next) => {
      res.status(500).send(errorFunction(new Error('500 error')));
    });

    app.get('/unsupported-browser', (req, res) => {
      /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
      return res.send(unsupportedBrowser());
    });

    if (__AUTH_LOGIN_OFFLINE_ENABLED__) {
      app.get('/login-offline', (req, res) => {
        return res.status(500).send(loginOffline());
      });
    }

    // The purpose behind this redirect is to have one, stable url for rasch-font
    // that is used inside piano
    app.get(
      '/static/media/RASCH-Font:ext(.woff|.woff2|.svg)',
      (req, res, next) => {
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'. */
        const redirectUrl = raschFontPaths?.[req?.params?.ext];

        if (!redirectUrl || redirectUrl === req.originalUrl) {
          return next();
        }
        return res
          .setHeader('Cache-Control', 'max-age=0, no-cache, no-store')
          .redirect(302, redirectUrl);
      },
    );

    registerRoutes?.(app);

    // This is where the server-side rendering magic happens.
    app.get('*', render);

    // Error middleware
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      res.status(500).send(errorFunction(err));
    });

    // Callback
    const defaultCallback = () => {
      // eslint-disable-next-line no-console
      console.log(chalk`{green Server started on port {bold ${port}}}`);
    };

    program.parse(process.argv);

    // Start the app
    const server = app.listen(port, defaultCallback);
    server.setTimeout(31 * 1000);
  };
