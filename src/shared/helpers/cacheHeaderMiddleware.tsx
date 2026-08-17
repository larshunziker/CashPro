import { Response as ExpressResponse } from 'express';

type CacheControl = {
  public?: boolean;
  private?: boolean;
  'max-age'?: number;
  's-maxage'?: number;
  'no-cache'?: boolean;
  'no-store'?: boolean;
  'no-transform'?: boolean;
  'proxy-revalidate'?: boolean;
  'must-revalidate'?: boolean;
};

const mergeCacheControl = (next: string, previous: string): string => {
  const nextParsed: CacheControl = parseCacheControl(next);
  const prevParsed: CacheControl = parseCacheControl(previous);
  const merged: CacheControl = { ...prevParsed, ...nextParsed };

  // Always use the lowest max-age value.
  if (typeof merged['max-age'] !== 'undefined') {
    const maxAgePrev: number =
      prevParsed['max-age'] || nextParsed['max-age'] || 0;
    const maxAgeNext: number =
      nextParsed['max-age'] || prevParsed['max-age'] || 0;
    merged['max-age'] = Math.min(maxAgePrev, maxAgeNext);
  }

  // Always prefer 'private' (and do not allow both to be present).
  if (typeof merged.private !== 'undefined') {
    delete merged.public;
  }

  return Object.keys(merged)
    .reduce((carry: string[], current: string): string[] => {
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'CacheControl'. */
      if (merged[current] === true) {
        return carry.concat([current]);
      }

      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'CacheControl'. */
      return carry.concat([`${current}=${merged[current]}`]);
    }, [])
    .join(', ');
};

const mergeEdgeCacheTag = (next: string, previous: string): string => {
  const prevSplit: string[] = previous.split(',');
  const nextSplit: string[] = next
    .split(',')
    // Filter for tags that have not been added yet.
    .filter((item: string): boolean => prevSplit.indexOf(item) === -1);

  return prevSplit.concat(nextSplit).join(',');
};

const evaluateLastModified = (next: string, previous: string): string => {
  // if next date is earlier than the build time of the app, use the build time
  const nextSafe =
    next && new Date(next).getTime() > new Date(__BUILD_DATE_TIME__).getTime()
      ? next
      : __BUILD_DATE_TIME__;

  // if we don't have any previous value, use the next value
  if (previous === undefined) {
    return nextSafe;
  }

  const previousDate: Date = new Date(previous);
  const nextDate: Date = new Date(nextSafe);
  let lastModified: Date = previousDate;
  if (previousDate.getTime() < nextDate.getTime()) {
    lastModified = nextDate;
  }

  return lastModified.toUTCString();
};

export const parseCacheControl = (value: string): CacheControl => {
  const regex: RegExp =
    /(?:^|(?:\s*\,\s*))([^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)(?:\=(?:([^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)|(?:\"((?:[^"\\]|\\.)*)\")))?/g; // eslint-disable-line
  const header: CacheControl = {};

  let match: string[] | null = regex.exec(value);
  while (match) {
    const key: string = match[1];
    const data: string = match[2] || match[3];
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'CacheControl'. */
    header[key] = data ? data.toLowerCase() : true; // eslint-disable-line no-cond-assign
    match = regex.exec(value);
  }

  if (typeof header['max-age'] !== 'undefined') {
    header['max-age'] = parseInt(String(header['max-age']), 10) || 0;
  }

  if (typeof header['s-maxage'] !== 'undefined') {
    header['s-maxage'] = parseInt(String(header['s-maxage']), 10) || 0;
  }

  return header;
};

const cacheHeaderMiddleware =
  (expressResponse: ExpressResponse) =>
  /* @ts-ignore TODO: TS7031 ->  Binding element 'graphqlResponse' implicitly has an 'any' type. */
  ({ response: graphqlResponse }): any => {
    try {
      // Propagate the cache tags from the graphql request to
      // enable caching in KeyCDN using the same cache tags
      // that were also used for caching the graphql response
      // on keycdn.
      const cacheControl: string =
        graphqlResponse.headers.get('cache-control') || '';
      const edgeCacheTag: string =
        graphqlResponse.headers.get('edge-cache-tag') || '';
      if (cacheControl) {
        const merged: string = mergeCacheControl(
          cacheControl,
          expressResponse.get('Cache-Control') || '',
        );
        expressResponse.set('Cache-Control', merged);
      }

      if (edgeCacheTag) {
        const merged: string = mergeEdgeCacheTag(
          edgeCacheTag,
          expressResponse.get('Edge-Cache-Tag') || '',
        );
        expressResponse.set('Edge-Cache-Tag', merged);
      }

      // enforce last-modified header
      const lastModified: string = evaluateLastModified(
        graphqlResponse.headers.get('Last-Modified') || __BUILD_DATE_TIME__,
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
        expressResponse.get('Last-Modified'),
      );
      expressResponse.set('Last-Modified', lastModified);

      // // X-Last-Modified-Upstream is a merged list of last modified dates across all qgl request
      // if (graphqlResponse.headers.get('Last-Modified')) {
      //   const llm = expressResponse.get('X-Last-Modified-Upstream');
      //   if (llm && llm !== '') {
      //     expressResponse.set(
      //       'X-Last-Modified-Upstream',
      //       `${llm} | ${graphqlResponse.headers.get('Last-Modified')}`,
      //     );
      //   } else {
      //     expressResponse.set('X-Last-Modified-Upstream', lastModified);
      //   }
      // }

      // expressResponse.set('X-Last-Modified-Real', lastModified);
      // expressResponse.set('X-Last-Modified-App', __BUILD_DATE_TIME__);

      // Get the gql header for denied country and append it to the response header.
      const denyFromAbroad: string =
        graphqlResponse.headers.get('X-Deny-From-Abroad') || '';
      if (denyFromAbroad !== '') {
        expressResponse.set('X-Deny-From-Abroad', denyFromAbroad);
      }

      // debug header (will be deleted on serverRenderFactory and output will be sent within the encrypted debug hash)
      // if (operationName && variables) {
      //   const debugData = JSON.parse(
      //     expressResponse.get('x-ssr-debug') || '{}',
      //   );
      //   debugData[operationName] = {
      //     fetchedAt: new Date().toUTCString(),
      //     variables,
      //     headers: Object.entries(graphqlResponse.headers),
      //   };
      //   expressResponse.set('x-ssr-debug', JSON.stringify(debugData));
      // }

      const expires: string = graphqlResponse.headers.get('expires') || '';
      if (expires !== '') {
        expressResponse.set('expires', expires);
      }
    } catch (e) {
      // This can happen if something caused the express response
      // to be sent ahead of time.
      console.error(e); // eslint-disable-line no-console
    }

    return graphqlResponse;
  };

export default cacheHeaderMiddleware;
