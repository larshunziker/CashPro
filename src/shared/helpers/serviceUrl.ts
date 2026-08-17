export const isPrInstance = (host = '') => {
  const hostCopy = host || global?.location?.host;
  return (hostCopy && hostCopy.endsWith('.ras.dev')) || false;
};
/* @ts-ignore TODO: TS7006 ->  Parameter 'hostname' implicitly has an 'any' type. */
export const isAppRunningLocally = (hostname) =>
  hostname === 'localhost' || global.location?.hostname === 'localhost';
/* @ts-ignore TODO: TS7006 ->  Parameter 'url' implicitly has an 'any' type. */
export const isLocalRunningAppConnectedToProdService = (url, hostname = '') =>
  (isAppRunningLocally(hostname) && url && url.endsWith('/prod')) || false;

export const getServiceUrl = (_url: string, req = null) => {
  let url = _url;

  if (!url) {
    return url;
  }

  // non proxied / legacy service urls
  if (!url.startsWith('/_/')) {
    return url;
  }

  // only for graphql requests in _url
  if (
    __SERVER__ &&
    req &&
    __GRAPHQL_HOST_LOADER__ &&
    (url.startsWith('/_/api/graphql/') || url.startsWith('/_/local/4008/'))
  ) {
    return __GRAPHQL_HOST_LOADER__;
  }

  let host = global?.location?.host || '';
  let hostname = global?.location?.hostname || '';
  let protocol = global?.location?.protocol || '';

  if (req) {
    /* @ts-ignore TODO: TS2339 ->  Property 'headers' does not exist on type 'never'. */
    host = req.headers?.host;
    /* @ts-ignore TODO: TS2339 ->  Property 'hostname' does not exist on type 'never'. */
    hostname = req?.hostname;
    /* @ts-ignore TODO: TS2339 ->  Property 'protocol' does not exist on type 'never'. */
    /* @ts-ignore TODO: TS2339 ->  Property 'protocol' does not exist on type 'never'. */
    protocol = req?.protocol && `${req?.protocol}:`;

    if (hostname === 'localhost') {
      protocol = 'https:';
      /* @ts-ignore TODO: TS2339 ->  Property 'get' does not exist on type 'never'. */
      host += `:${req.get('X-RAS-Frontend-Port') || 3333}`;
    }
  }

  if (protocol && host) {
    url = `${protocol}//${host}${_url}`;
  }

  // adjust url for PR instances and local development connected to prod service
  // -------------------------------------------------------------------------------------
  // pr instances as well as a local running frontend connected to a prod service
  // can not use the local proxy but need to use the environment specific url
  // like develop.handelszeitung.ch, stage.handelszeitung.ch or www.handelszeitung.ch
  // this because onelog does not allow wildcards on the allowed origins nor
  // localhost on the prod environment
  // -------------------------------------------------------------------------------------
  if (
    __USE_LOCAL_ESI_PROCESSING__ ||
    isPrInstance(host) ||
    isLocalRunningAppConnectedToProdService(_url, hostname)
  ) {
    const env = __DOT_ENV__ === 'update' ? 'stage' : __DOT_ENV__;
    const host =
      env === 'master'
        ? `https://www.${__APP__}.ch`
        : `https://${env}.${__APP__}.ch`;
    url = `${host}${_url}`;
  }

  return url;
};
