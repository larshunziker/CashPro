import crypto from 'crypto';
import { resolve } from 'path';
import React, { ReactElement } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-body-classname'. '/Users/bhs/code/work/rasch-stack/node_modules/rea */
import BodyClassName from 'react-body-classname';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server.js';
import { ApolloProvider } from '@apollo/client';
import { renderToStringWithData } from '@apollo/client/react/ssr';
import { GrowthBook } from '@growthbook/growthbook';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'ejs'. '/Users/bhs/code/work/rasch-stack/node_modules/ejs/lib/ejs.js' impl */
import ejs from 'ejs';
import { NextFunction, Request, Response } from 'express';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'fs-extra'. '/Users/bhs/code/work/rasch-stack/node_modules/fs-extra/lib/in */
import fs from 'fs-extra';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'nodesi'. '/Users/bhs/code/work/rasch-stack/node_modules/nodesi/index.js'  */
import ESI from 'nodesi';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'serialize-javascript'. '/Users/bhs/code/work/rasch-stack/node_modules/ser */
import serialize from 'serialize-javascript';
import url from 'url';
import { GrowthBookProvider } from '@growthbook/growthbook-react';
import cacheHeaderMiddleware from '../../../shared/helpers/cacheHeaderMiddleware';
import getETag from '../../../shared/helpers/etag';
import { addStylesToHeader } from '../../../shared/helpers/preloadStyles';
import { getServiceUrl } from '../../../shared/helpers/serviceUrl';
import {
  appendBodyChildAndRemoveExistingScripts,
  createScriptLoader,
  getPreloadScripts,
  grepJsTagsFromView,
  grepStyleTagsFromView,
} from '../../../shared/helpers/ssrPreload';
import { checkIfIsValidUrl } from '../../../shared/helpers/urlValidation';
import SSRContextProvider from '../../components/SSRContext';
import configureApolloClient from '../../../shared/configureApolloClient';
import { sanitizedString } from '../../../shared/helpers/utils';
import type { ServerRenderFactoryOptions } from './typings';

const iv = crypto.randomBytes(16);
const encrypt = (str: string) => {
  // @ts-ignore
  const cipher = crypto.createCipheriv(
    'aes-256-ctr',
    '?=`H6sdm/NWjRRI(Cc7r+xs01lwHzfr3',
    iv,
  );

  // @ts-ignore
  const encrypted = Buffer.concat([cipher.update(str), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex'),
  };
};

export default ({
  RaschProviders,
  AppRoutes,
  configureServerStore,
  preloadCssPattern,
  fontPreloadLinks = [],
  dnsPrefetchLinks = [],
  preConnectLinks = [],
  doNotHydrateWindowState = false,
  getContentSecurityPolicyHeader,
  assetManifest,
  generateApolloCache,
}: ServerRenderFactoryOptions) => {
  const IFRAME_WHITE_LIST: Array<string> = [
    'mdbstage.ringier.ch',
    'mdb.ringier.ch',
    'mdbdev.ringier.ch',
    'cms.dev.ringiermedienschweiz.ch',
    'cms.stage.ringiermedienschweiz.ch',
    'rasch.prod.rasch1.cluster.amazee.io',
    'cms.ringiermedienschweiz.ch',
    'popo.docker.amazee.io',
    'ringier-staging.hacepiby.cyon.site',
    'www.ringier-advertising.ch',
  ];

  const esi = new ESI();

  // handle javascript includes -------------------------------------------------

  let view: string = fs
    .readFileSync(
      resolve(process.cwd(), `build/${__APP_NAME__}/public/index.ejs`),
    )
    .toString();

  const { internalJsSources, externalJsSources }: any =
    grepJsTagsFromView(view);

  view = appendBodyChildAndRemoveExistingScripts(view, '');

  // ----------------------------------------------------------------------------

  // DNS Prefetching & preconnect directive to also allow TCP handshaking and SSL termination
  /* @ts-ignore TODO: TS7034 ->  Variable 'links' implicitly has type 'any[]' in some locations where its type cannot be determined. */
  const links = [];

  // handle js
  links.push(
    ...getPreloadScripts({
      internalJsSources,
      externalJsSources,
    }),
  );

  // handle css
  links.push(...grepStyleTagsFromView(view));

  // handle fonts
  links.push(
    ...fontPreloadLinks.reduce((acc, fontName) => {
      const assetName = `static/media/${fontName}`;
      // by now we support just woff2 preloads!!!
      if (fontName.indexOf('woff2') < 0) {
        return acc;
      }

      // check if we find an entry for this font in the manifest
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'AssetManifest'. */
      if (!assetManifest[assetName]) {
        return acc;
      }

      acc.push(
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'string' is not assignable to parameter of type 'never'. */
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'AssetManifest'. */
        `<link rel="preload" href="${assetManifest[assetName]}" as="font" crossorigin>`,
      );

      return acc;
    }, []),
  );

  // handle preconnects
  links.push(
    ...preConnectLinks.map((config) => {
      const options =
        (config.options &&
          Object.keys(config.options).map(
            (key) =>
              (config.options[key] && `${key}="${config.options[key]}"`) || key,
          )) ||
        [];

      return `<link rel="preconnect" href="${config.href}" ${options.join(
        ' ',
      )}>`;
    }),
    // handle dns prefetches
    ...dnsPrefetchLinks.map(
      (link: string) => `<link rel="dns-prefetch" href="${link}">`,
    ),
  );

  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> => {
    // -----------------------------------------------------------------------

    // TODO: before we use `url.parse` for the first time we should validate
    // the pathname and the search query. filter out all invalid things and
    // create a new url which can be used within this file safely. otherwise
    // we have multiple sources and none of the is the single point of truth.
    const parsedUri = url.parse(req.url);

    // block malformed urls (query string without starting ?)
    if (
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | null' is not assignable to parameter of type 'string'. */
      !checkIfIsValidUrl(parsedUri.pathname) ||
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      (parsedUri.path.indexOf('&') > -1 && parsedUri.path.indexOf('?') === -1)
    ) {
      res.status(404).send('Page not found');
      return;
    }

    if (parsedUri.query) {
      const query = new URLSearchParams(parsedUri.query);
      if (query.get('page') === '1') {
        query.delete('page');
        const queryString = query.size > 0 ? '?' + query.toString() : '';
        res.redirect(301, `${parsedUri.pathname}${queryString}`);
        return;
      }
    }

    let graphqlHost: string = process.env.__GRAPHQL_HOST__ || '';

    const isHybridApp =
      req.headers['x-hybrid-app'] ||
      (req.headers.cookie && req.headers.cookie.includes('RASCHHYBRIDAPP')) ||
      false;

    if (
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      req.headers.host.startsWith('preview.') ||
      (__FORCE_PREVIEW_REQUESTS__ &&
        (__DOT_ENV__ === 'stage' || __DOT_ENV__ === 'master'))
    ) {
      graphqlHost = process.env.__PREVIEW_GRAPHQL_HOST__ || '';

      if (
        !process.env.__PREVIEW_GRAPHQL_HOST__ &&
        __DOT_ENV__ !== 'stage' &&
        __DOT_ENV__ !== 'master'
      ) {
        // eslint-disable-next-line no-console
        console.log(
          'WARNING: __PREVIEW_GRAPHQL_HOST__ is only available on stage or master!',
        );
      }
    } else if (isHybridApp) {
      // The hybrid app must hit the dedicated `app` subdomain instead of the
      // public host (`www` on master, `stage` on stage).
      graphqlHost =
        __DOT_ENV__ === 'stage'
          ? graphqlHost.replace('://stage.', '://app.stage.')
          : graphqlHost.replace('://www.', '://app.');
    }

    const graphqlOrigin: string = process.env.__GRAPHQL_ORIGIN__ || '';
    /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
    const host: string = req.headers.host;

    // This is for akamai to understand that this request is from SSR and
    // needs to be handled differently concerning geo-blocking logic.
    const graphqlHeaders = {
      'X-Do-Not-Deny': '1',
    };

    // Configure the apollo client with persisted queries.
    // NOTE: when you consider to change anything here, please also check and change on src/shared/expressHydrationReach/factory.js
    const apolloClient = configureApolloClient(
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>' is not assignable to parameter of */
      getServiceUrl(graphqlHost, req),
      graphqlOrigin,
      host,
      generateApolloCache,
      cacheHeaderMiddleware(res),
      graphqlHeaders,
      req,
    );

    /* @ts-ignore TODO: TS2322 ->  Type 'IncomingHttpHeaders' is not assignable to type 'Record<string, string | string[]>'. */
    const store = configureServerStore({ url: req.url, headers: req.headers });

    const isProdEnv: boolean = process.env.NODE_ENV === 'production';
    let protocol: string = isProdEnv ? 'https' : req.protocol;
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.locationOrigin = `${protocol}://${req.hostname}`;

    if (req.hostname.indexOf('localhost') !== -1) {
      protocol = 'http';
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      global.locationOrigin = `${protocol}://${host}`;
    }

    // push locationOrigin to global scope
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.Ads = {
      config: {
        platform: '',
        targeting: {},
        publisher: __AD_PUBLISHER__,
        ikjuzglkjfroef: true, // are ads enabled (ad-free logic) check templates.ejs
        tracking: {},
      },
      slots: [],
      helpers: [],
    };

    const helmetContext: any = {};
    const initialState = store.getState();
    const isCrawler = req.headers['x-crawler'] || false;
    initialState.route.isCrawler = isCrawler;

    initialState.route.isHybridApp = !!isHybridApp;
    initialState.route.clientUrl = `${protocol}://${req.headers.host}`;

    const isGrowthBookActive = __ENABLE_GROWTHBOOK__;
    let growthbook: any;
    if (isGrowthBookActive) {
      growthbook = new GrowthBook({});
    }
    const growthbookJSX =
      (isGrowthBookActive && (
        <GrowthBookProvider growthbook={growthbook}>
          <HelmetProvider context={helmetContext}>
            {AppRoutes && <AppRoutes />}
          </HelmetProvider>
        </GrowthBookProvider>
      )) ||
      null;

    const Root: ReactElement<any> = (
      <Provider store={store}>
        <SSRContextProvider>
          <StaticRouter location={req.url}>
            {(RaschProviders && <RaschProviders />) || null}
            <ApolloProvider client={apolloClient}>
              {(isGrowthBookActive && growthbookJSX) || (
                <HelmetProvider context={helmetContext}>
                  {AppRoutes && <AppRoutes />}
                </HelmetProvider>
              )}
            </ApolloProvider>
          </StaticRouter>
        </SSRContextProvider>
      </Provider>
    );

    renderToStringWithData(Root)
      .then(async (renderedContent: string): Promise<void> => {
        // Collect side-effects after rendering.
        const { helmet } = helmetContext;
        const bodyClassName: string = BodyClassName.rewind();

        // extract redux state
        const initialState = store.getState();

        // create shorthand for app defined ssr status info
        const statusCode: number = initialState.ssr.statusCode || 200;
        const redirectUri: string = initialState.ssr.redirectUri || '';

        // remove states which should not be sent to the client
        delete initialState.ssr;
        if (doNotHydrateWindowState) {
          delete initialState.window;
        }

        // handle 301/302
        if (statusCode > 300 && statusCode <= 302 && redirectUri) {
          if (parsedUri.query) {
            res.redirect(statusCode, `${redirectUri}?${parsedUri.query}`);
          } else {
            res.redirect(statusCode, `${redirectUri}`);
          }
          return;
        }

        // The order in which the html head elements should be rendered.
        const headOrder: Array<string> = [
          'title',
          'base',
          'meta',
          'link',
          'script',
          'style',
        ];

        // handle meta data
        const htmlHead: string = headOrder
          .map((key: string): string => helmet[key].toString().trim())
          .join('');
        const htmlAttributes: string = helmet.htmlAttributes.toString();

        let contentSecurityPolicyHeaderData: string =
          getContentSecurityPolicyHeader
            ? getContentSecurityPolicyHeader(req)
            : '';

        // iframe allowed only from authorized domains
        if (req.headers.referer) {
          IFRAME_WHITE_LIST.some((whiteDomain: string): boolean => {
            /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
            if (req.headers.referer.indexOf(whiteDomain) !== -1) {
              contentSecurityPolicyHeaderData +=
                contentSecurityPolicyHeaderData.length
                  ? ` ${req.headers.referer}`
                  : `frame-ancestors ${req.headers.referer}`;
              return true;
            }
            return false;
          });
        }

        res.set(
          'Content-Security-Policy',
          contentSecurityPolicyHeaderData || "frame-ancestors 'self'",
        );

        res.set('Content-Type', 'text/html; charset=utf-8');

        const lastModified = __BUILD_DATE_TIME__;
        if (res.get('Last-Modified') === undefined) {
          res.set('Last-Modified', lastModified);
        }
        res.set('X-Last-Modified', lastModified);

        const apolloInlineErrorState =
          statusCode !== 200
            ? serialize(
                JSON.stringify({
                  statusCode,
                  state: apolloClient.extract(),
                }).replace(/(\u2028|\u2029)/g, ''),
                { isJSON: true },
              )
            : undefined;

        // Encode apolloState as base64 (no compression, no unicode replacement needed)
        const apolloStateRaw = JSON.stringify({
          statusCode,
          state: apolloClient.extract(),
        });
        const apolloStateEncoded = Buffer.from(
          apolloStateRaw,
          'utf-8',
        ).toString('base64');

        const scriptChunks: string = createScriptLoader({
          internalJsSources,
          externalJsSources,
        });

        res.set('etag', `"${getETag(renderedContent)}"`);
        // @ts-ignore
        global.transactionId = req?.transactionId;
        const renderedDocument: string = ejs.render(view, {
          graphqlHost: JSON.stringify(graphqlHost),
          graphqlOrigin: JSON.stringify(graphqlOrigin),
          apolloInlineErrorState,
          apolloInlineState: apolloStateEncoded,
          debugData: JSON.stringify(
            encrypt(`${JSON.stringify(req.headers, null, ' ')}
          ---
          ${JSON.stringify(res.getHeaders(), null, ' ')}
          ---
          ${JSON.stringify(req.query, null, ' ')}
          ---
          ${JSON.stringify(req.url, null, ' ')}
          `),
          ),
          initialState: serialize(initialState, { isJSON: true }),
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          initialAds: sanitizedString(JSON.stringify(global.Ads)),
          renderedContent,
          /* @ts-ignore TODO: TS7005 ->  Variable 'links' implicitly has an 'any[]' type. */
          htmlHead: links.join('\n') + htmlHead,
          htmlAttributes,
          bodyClassName,
          isAkamaiRequest: req?.isAkamaiRequest === false ? false : true,
          scriptChunks,
          ddClientToken: __DATADOG_CLIENT_TOKEN__,
          ddAppID: __DATADOG_APP_ID__,
          ddServiceName: __DATADOG_SERVICE_NAME__,
          ddEnv: __DATADOG_ENV__,
          ddSampleRate: __DATADOG_SAMPLE_RATE__,
          ddAppVersion: process.env.__DATADOG_APP_VERSION__,
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>' is not assignable to parameter of */
          authServiceDomain: getServiceUrl(__AUTH_SERVICE_URL__, req),
          oneTrustId: __ONE_TRUST_ID__,
          isLoginRoute: (
            initialState?.route?.locationBeforeTransitions?.pathname || ''
          ).startsWith('/login'),
          gtmAuth: __GTM_AUTH__,
          gtmPreview: __GTM_PREVIEW__,
        });

        // remove privat header
        // res.removeHeader('x-ssr-debug');

        // when we have pr instance we should return 500 instead of 503
        // otherwise it would show lagoon screen
        if (statusCode === 503 && !req?.isAkamaiRequest) {
          res.status(500);
        } else {
          res.status(statusCode);
        }

        // parse esi tags (to test locally)
        let finalDocument = __USE_LOCAL_ESI_PROCESSING__
          ? await esi.process(renderedDocument)
          : renderedDocument;

        if (preloadCssPattern) {
          finalDocument = addStylesToHeader(finalDocument, preloadCssPattern);
        }

        res.write(finalDocument);

        res.end();
        next();
      })
      .catch(next);
  };
};

Intl.DateTimeFormat('ch-DE', {});
