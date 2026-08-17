export interface ListPageResponse {
  data: Data;
}

export interface Data {
  environment: Environment;
}

export interface Environment {
  routeByPath: RouteByPath;
}

export interface RouteByPath {
  object: Object;
}

export interface Object {
  grid: Grid;
}

export interface Grid {
  count: number;
  edges: Edge[];
}

export interface Edge {
  node: TeaserNode;
}

export interface TeaserNode {
  __typename: string;
  changeDate: string;
  publicationDate: string;
  preferredUri: string;
  channel: Channel;
  publication: string;
}

export interface Channel {
  title: string;
}

export type TeaserWithUrl = TeaserNode & { url: string };

export type TeaserWithUrlFromDB = {
  url: string;
  typename: string;
  changeDate: string;
  publicationDate: string;
  publication: string;
  preferredUri: string;
  channelTitle: string;
};
