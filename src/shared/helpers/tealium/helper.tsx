import { getTimeToReadLabel } from '../../../common/components/TimeToRead/shared/helpers';
import { Auth0 } from '../../../common/components/Auth0Provider';
import {
  ROUTE_HOME_BEO,
  ROUTE_HOME_CASH,
  ROUTE_HOME_HZ,
} from '../../constants/publications';
import { getAmountOfDaysPublished } from '../tracking';

/* @ts-ignore TODO: TS7006 ->  Parameter 'landingPage' implicitly has an 'any' type. */
export const returnRestrictionStatusList = (landingPage) => {
  const firstEQ =
    (landingPage &&
      Array.isArray(landingPage?.body) &&
      landingPage.body.length > 0 &&
      landingPage.body.find(
        /* @ts-ignore TODO: TS7006 ->  Parameter 'paragraphItem' implicitly has an 'any' type. */
        (paragraphItem) => paragraphItem.__typename === 'EntityQueueParagraph',
      )) ||
    null;

  return (
    (firstEQ &&
      Array.isArray(firstEQ.entityQueue?.items?.edges) &&
      firstEQ.entityQueue.items.edges.length > 0 &&
      firstEQ.entityQueue.items.edges.map(
        /* @ts-ignore TODO: TS7031 ->  Binding element 'node' implicitly has an 'any' type. */
        ({ node }) => (node.restrictionStatus && 1) || 0,
      )) ||
    []
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'routeByPath' implicitly has an 'any' type. */
export const getTealiumData = (routeByPath): TaeliumData => {
  const pageSponsor = routeByPath?.object?.sponsor?.title || '';
  const channelSponsorsNodeArray =
    routeByPath?.object?.channel?.sponsors?.edges ||
    routeByPath?.object?.settings?.channel?.sponsors?.edges ||
    [];
  const channelSponsors =
    (Array.isArray(channelSponsorsNodeArray) &&
      channelSponsorsNodeArray.map(({ node }) => node.title)) ||
    [];
  const preferredUri = routeByPath?.object?.preferredUri || '';
  const typeId =
    (routeByPath.canonical && routeByPath.canonical.split('/').pop()) || '';
  const nodeId = routeByPath?.object?.nid || '';
  const pageType = routeByPath?.object?.__typename || '';
  const pageTitle =
    routeByPath?.object?.metaTitle || routeByPath?.object?.metaOgTitle || '';
  const contentShortTitle = routeByPath?.object?.shortTitle || '';
  const contentTitle = routeByPath?.object?.title || '';
  const commentStatus = routeByPath?.object?.commentStatus || '';
  const subtypeValue = routeByPath?.object?.subtypeValue || '';
  const channel = routeByPath?.object?.channel?.title || '';
  const mainChannel =
    routeByPath?.object?.channel?.settings?.mainChannel?.title ||
    routeByPath?.object?.settings?.mainChannel?.title ||
    '';
  const channelHierarchy =
    routeByPath?.object?.channel?.settings?.hierarchy?.edges ||
    routeByPath?.object?.settings?.hierarchy?.edges ||
    '';
  const createDate = routeByPath?.object?.createDate || '';
  const changeDate = routeByPath?.object?.changeDate || '';
  const publicationDate = routeByPath?.object?.publicationDate || '';
  const showUpdated = routeByPath?.object?.showUpdated || '';
  const publication = routeByPath?.object?.publication || '';
  const keywords =
    (routeByPath.object &&
      routeByPath.object.metaKeywords &&
      routeByPath.object.metaKeywords.split(', ')) ||
    [];
  /* @ts-ignore TODO: TS7034 ->  Variable 'authors' implicitly has type 'any[]' in some locations where its type cannot be determined. */
  const authors = [];
  if (
    routeByPath.object &&
    routeByPath.object.authors &&
    routeByPath.object.authors.edges
  ) {
    /* @ts-ignore TODO: TS7006 ->  Parameter 'author' implicitly has an 'any' type. */
    routeByPath.object.authors.edges.forEach((author) => {
      if (author.node && author.node.name) {
        authors.push(author.node.name);
      }
    });
  }

  const restrictionStatus = routeByPath?.object?.restrictionStatus || 'free';
  const fqValor = routeByPath?.object?.newData?.getFullquotePage?.mValor || '';
  const fqMarket = routeByPath?.object?.params?.market || '';
  const fqCurrency = routeByPath?.object?.params?.currency || '';
  const fqType = routeByPath?.object?.__typename || '';
  const fqIsin = routeByPath?.object?.newData?.getFullquotePage?.mIsin || '';
  const fqSymbol = routeByPath?.object?.newData?.getFullquotePage?.mSymb || '';
  const fqIssuer =
    routeByPath?.object?.pageId === 'fq_derivates_bnp'
      ? 'BNPP'
      : routeByPath?.object?.newData?.getFullquotePage?.issuerShort || '';

  const userId = Auth0.getUserId();
  const externalSubscription = Auth0.getExternalSubscription();
  let externalSubs = '';

  if (Array.isArray(externalSubscription)) {
    externalSubscription.forEach((sub) => {
      externalSubs += `${sub.magazinId}:${sub.gid}:${sub.source};`;
    });
  }
  const loginStatus = userId !== '';
  const timeToReadSec = routeByPath?.object?.time2read || 0;
  const timeToReadLabel = getTimeToReadLabel(timeToReadSec);
  const isPrintArticle = (routeByPath?.object?.issue?.nid && 1) || 0;
  const source = routeByPath?.object?.source || '';
  const amountOfDaysPublished = getAmountOfDaysPublished(publicationDate);
  let restrictionStatusList = [];

  if (
    routeByPath.preferred === `/${ROUTE_HOME_BEO}` ||
    routeByPath.preferred === `/${ROUTE_HOME_CASH}` ||
    routeByPath.preferred === `/${ROUTE_HOME_HZ}`
  ) {
    restrictionStatusList = returnRestrictionStatusList(routeByPath.object);
  }

  return {
    preferredUri,
    typeId,
    nodeId,
    pageType,
    pageTitle,
    contentShortTitle,
    contentTitle,
    commentStatus,
    subtypeValue,
    mainChannel,
    channelHierarchy,
    channel,
    createDate,
    changeDate,
    publicationDate,
    showUpdated,
    publication,
    keywords,
    /* @ts-ignore TODO: TS7005 ->  Variable 'authors' implicitly has an 'any[]' type. */
    authors,
    restrictionStatus,
    channelSponsors,
    pageSponsor,
    userId,
    loginStatus,
    timeToReadSec,
    /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */
    timeToReadLabel,
    isPrintArticle,
    source,
    amountOfDaysPublished,
    restrictionStatusList,
    fqValor,
    fqIsin,
    fqSymbol,
    fqMarket,
    fqCurrency,
    fqType,
    fqIssuer,
    externalSubs,
  };
};

export const hasTealiumData = (payload: TaeliumData): boolean =>
  (payload.preferredUri ||
    payload.typeId ||
    payload.pageType ||
    payload.pageTitle ||
    payload.subtypeValue ||
    payload.channel ||
    payload.createDate ||
    payload.changeDate ||
    payload.publicationDate ||
    payload.contentShortTitle ||
    payload.contentTitle ||
    payload.publication ||
    payload.restrictionStatus ||
    payload.keywords ||
    payload.channelSponsors ||
    payload.pageSponsor ||
    payload.authors ||
    payload.commentStatus ||
    payload.loginStatus ||
    payload.userId ||
    payload.timeToReadSec ||
    payload.source ||
    payload.timeToReadLabel ||
    payload.restrictionStatusList) as boolean;
