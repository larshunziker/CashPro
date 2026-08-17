/* istanbul ignore file */

import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CHANNEL_TYPE_SPECIAL,
  NATIVE_ADVERTISING_CONTENT_TYPE,
  RESTRICTION_STATUS_NONE,
  RESTRICTION_STATUS_PAID,
  RESTRICTION_STATUS_REGISTERED,
} from '../constants/content';
import { useSSRContext } from '../../common/components/SSRContext';
import { setPianoPageMetadata } from '../actions/piano';
import locationStateSelector from '../selectors/locationStateSelector';
import useRaschRouterLocation from './useRaschRouterLocation';

interface usePianoTrackingDataProps {
  waitWithPianoExperience?: boolean;
  loading?: boolean;
  data?: {
    environment?: {
      routeByPath: Route;
    };
    routeByPath?: Route;
  };
  locationState: {
    screenReady: boolean;
  };
  screenReady: boolean;
}

const usePianoTrackingData = (props: usePianoTrackingDataProps) => {
  const { isSSR } = useSSRContext();
  const dispatch = useDispatch();
  const { query } = useRaschRouterLocation();
  const queryRef = useRef(query);
  const screenReady = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).screenReady,
  );

  useEffect(() => {
    /* @ts-ignore TODO: TS2322 ->  Type 'Route | null' is not assignable to type 'Route'. */
    const routeByPath: Route =
      props?.data?.environment?.routeByPath || props?.data?.routeByPath || null;

    /* @ts-ignore TODO: TS2322 ->  Type 'RouteObjectInterface | null' is not assignable to type 'RouteObjectInterface & ArticleInterface & EntityQueueRepl */
    const routeObject: RouteObjectInterface &
      ArticleInterface &
      Article &
      ExplainingArticle &
      Video &
      Channel = routeByPath?.object || null;

    const contentType: string = routeObject?.__typename || 'StaticPage';
    const keywords = routeObject?.keywords?.edges
      ? /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        routeObject?.keywords?.edges?.map((item) => item.node?.label || '')
      : [];
    const publicationDate: string =
      routeObject?.publicationDate || routeObject?.createDate;
    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
    const restrictionStatus: string = [
      RESTRICTION_STATUS_PAID,
      RESTRICTION_STATUS_REGISTERED,
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
    ].includes(routeObject?.restrictionStatus)
      ? routeObject.restrictionStatus
      : RESTRICTION_STATUS_NONE;
    const channel = routeObject?.channel;
    const category = routeObject?.category;

    const isPrintArticle = !!routeObject?.issue?.nid;

    let publicationDateISO = '';
    if (publicationDate) {
      const publicationDateObject = new Date(publicationDate);
      if (!isNaN(publicationDateObject.getTime())) {
        publicationDateISO = publicationDateObject.toISOString();
      }
    }

    const isNativeContent =
      contentType === NATIVE_ADVERTISING_CONTENT_TYPE ||
      channel?.channelType === CHANNEL_TYPE_SPECIAL ||
      false;

    // Check if we're on a webinar
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
    let webinarId: string = null;
    if (routeObject?.brightcoveId && routeObject.restrictionStatus === 'paid') {
      // Video detail page
      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
      const webinarKeyword = routeObject.keywords?.edges.filter(
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        (keyword) => keyword.node?.label?.toLowerCase() === 'webinar',
      );

      if (webinarKeyword && webinarKeyword.length > 0) {
        webinarId = routeObject?.brightcoveId;
      }
    } else if (routeObject?.body) {
      // Article with webinar video
      for (let i = 0; i < routeObject?.body.length; i++) {
        const paragraph = routeObject?.body[i];

        if (
          (paragraph as VideoParagraph).__typename === 'VideoParagraph' &&
          (paragraph as VideoParagraph).video?.restrictionStatus === 'paid'
        ) {
          /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
          const webinarKeyword = (
            paragraph as VideoParagraph
          ).video?.keywords?.edges.filter(
            /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
            (keyword) => keyword.node?.label?.toLowerCase() === 'webinar',
          );

          if (webinarKeyword && webinarKeyword.length > 0) {
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
            webinarId = (paragraph as VideoParagraph).video?.brightcoveId;
            break;
          }
        }
      }
    }
    if (!isSSR && !props.waitWithPianoExperience && screenReady) {
      const hierarchyEdges =
        /* @ts-ignore hierarchy lives on `channel.settings` for articles/channel pages and on `routeObject.settings` for other content types */
        channel?.settings?.hierarchy?.edges ||
        routeObject?.settings?.hierarchy?.edges ||
        null;
      const channelsHierarchy: string[] =
        hierarchyEdges?.flatMap(
          (hierarchyEdge: { node?: { title?: string | null } }) =>
            hierarchyEdge?.node?.title ? [hierarchyEdge.node.title] : [],
        ) || [];
      dispatch(
        setPianoPageMetadata({
          contentType,
          publication: routeObject?.publication || __APP_NAME__,
          isNativeContent: isNativeContent,
          pathname: global.location?.pathname,
          publicationDate: publicationDateISO,
          restrictionStatus,
          section: channel?.title || category || '',
          channelsHierarchy,
          tags: keywords,
          isPrintArticle: isPrintArticle,
          mainChannel:
            routeObject?.channel?.settings?.mainChannel?.title ||
            routeObject?.settings?.mainChannel?.title ||
            '',
          subType: routeObject?.subtypeValue || '',
          gcid: routeObject?.gcid || '',
          webinarId,
          page: queryRef.current?.page || null,
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
          cliffhangerTitle: routeObject?.cliffhangerTitle,
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<Maybe<string>[]> | undefined' is not assignable to type 'string[] | undefined'. */
          cliffhangerBulletpoints: routeObject?.cliffhangerBulletpoints,
        }),
      );
    }
  }, [
    dispatch,
    props?.data?.environment?.routeByPath,
    props?.data?.routeByPath,
    props.waitWithPianoExperience,
    screenReady,
    isSSR,
  ]);

  return;
};

export default usePianoTrackingData;
