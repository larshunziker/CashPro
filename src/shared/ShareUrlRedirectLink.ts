import { ApolloLink, Observable, Operation } from '@apollo/client';
import { NextLink } from '@apollo/client/link/core/types';
import { FetchResult } from '@apollo/client/link/core';
import { getServiceUrl } from './helpers/serviceUrl';
import {
  PUBLICATION_GROUP_BEO,
  PUBLICATION_GROUP_CASH,
  PUBLICATION_GROUP_GM,
  PUBLICATION_GROUP_HZ,
  PUBLICATION_GROUP_SI,
} from './constants/publications';

const SHARE_URL_PREFIX = 'r/';

function getPublicationFromAppName() {
  switch (__APP_NAME__) {
    case 'beobachter':
      return PUBLICATION_GROUP_BEO;
    case 'cash':
      return PUBLICATION_GROUP_CASH;
    case 'gaultmillau':
      return PUBLICATION_GROUP_GM;
    case 'handelszeitung':
      return PUBLICATION_GROUP_HZ;
    case 'schweizer-illustrierte':
      return PUBLICATION_GROUP_SI;
    default:
      return PUBLICATION_GROUP_BEO;
  }
}
function getServiceEndpoint() {
  if (__SERVER__) {
    const env = __DOT_ENV__ === 'update' ? 'stage' : __DOT_ENV__;
    const host =
      env === 'master'
        ? `https://www.${__APP__}.ch`
        : `https://${env}.${__APP__}.ch`;
    return `${host}${__COMMERCE_SERVICE_ENDPOINT__}`;
  }
  return getServiceUrl(__COMMERCE_SERVICE_ENDPOINT__);
}
async function getShareUrl(id: string) {
  const endpoint = getServiceEndpoint();
  const url = new URL(`${endpoint}/gifts/${getPublicationFromAppName()}/${id}`);
  const getShareUrlResponse = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (!getShareUrlResponse.ok && getShareUrlResponse.status !== 404) {
    throw new Error(
      `Failed to fetch share URL: ${getShareUrlResponse.statusText}`,
    );
  }
  return await getShareUrlResponse.json();
}

export class ShareUrlRedirectLink extends ApolloLink {
  request(operation: Operation, forward: NextLink): Observable<FetchResult> {
    const path = operation.variables?.path;
    let id = operation.getContext()?.sharingPlus;
    const isRedirect = path && path.startsWith(SHARE_URL_PREFIX);
    if (isRedirect) {
      id = path.replace(SHARE_URL_PREFIX, '');
    }
    if (!id) {
      // No special handling, just forward
      return forward(operation);
    }
    return new Observable((observer) => {
      let subscription: { unsubscribe: () => void } | undefined;
      getShareUrl(id)
        .then((data) => {
          // Handle redirect requests
          if (isRedirect) {
            if (data.statusCode === 404) {
              observer.next({
                data: {
                  environment: {
                    routeByPath: {
                      statusCode: 404,
                      object: null,
                    },
                  },
                },
              });
              observer.complete();
              return;
            }
            observer.next({
              data: {
                environment: {
                  routeByPath: {
                    preferred:
                      data.path +
                      `?sharingPlus=${id}&utm_source=article_gifting&utm_medium=social&utm_campaign=article_utility_bar`,
                    object: null,
                  },
                },
              },
            });
            observer.complete();
            return;
          }
          // Handle non-redirect requests: if data.path is missing or doesn't match, just forward
          if (
            !data.path ||
            data.path.substring(1) !== operation.variables.path
          ) {
            subscription = forward(operation).subscribe({
              next: (result) => observer.next(result),
              error: (err) => observer.error(err),
              complete: () => observer.complete(),
            });
            return;
          }
          // Otherwise, forward and patch the result
          subscription = forward(operation).subscribe({
            next: (result: { data: QueryRoot }) => {
              if (result.data?.environment?.routeByPath?.object) {
                const nextResult = structuredClone(result);
                // @ts-ignore
                nextResult.data.environment.routeByPath.object.restrictionStatus =
                  'free';
                observer.next(nextResult);
              } else {
                observer.next(result);
              }
            },
            error: (err) => observer.error(err),
            complete: () => observer.complete(),
          });
        })
        .catch((err) => observer.error(err));
      return () => subscription && subscription.unsubscribe();
    });
  }
}
