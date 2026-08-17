declare type TrackingData = {
  type: string;
  value: string;
};

declare type TealiumTrackEventProps = {
  type?: 'view' | 'link';
  payload?: Record<string, any> | null; // json payload or null
};

declare type TimeOnPageTrackProp = {
  timeStamp: Date | null;
  payload: Record<string, any> | null;
};

declare type TaeliumData = {
  preferredUri?: string;
  pathname?: string;
  typeId?: string;
  nodeId?: string;
  pageType?: string;
  pageTitle?: string;
  contentShortTitle?: string;
  contentTitle?: string;
  commentStatus?: string;
  subtypeValue?: string;
  mainChannel?: string;
  channelHierarchy?: ChannelConnection;
  channel?: string;
  createDate?: string;
  changeDate?: string;
  changedDate?: string; // maybe we shiould remove it?
  publicationDate?: string;
  showUpdated?: string;
  publication?: string;
  keywords?: string;
  authors?: string[];
  restrictionStatus?: string;
  channelSponsors?: string[];
  pageSponsor?: string;
  userId?: string;
  loginStatus?: boolean;
  timeToReadSec?: string;
  timeToReadLabel?: string;
  isPrintArticle?: number;
  source?: string;
  amountOfDaysPublished?: number;
  restrictionStatusList?: any[];
  cms_search_results?: number;
  cms_search_type?: string;
  cms_search_query?: string;
  fqValor?: string;
  fqIsin?: string;
  fqSymbol?: string;
  fqMarket?: string;
  fqCurrency?: string;
  fqType?: string;
  fqIssuer?: string;
  externalSubscription?: Record<string, any>[];
};
