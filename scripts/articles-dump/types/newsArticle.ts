export interface NewsArticleResponse {
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
  title: string;
  shortTitle?: string;
  publicationDate: string;
  publication: string;
  gcid: string;
  preferredUri: string;
  lead: string;
  body: Body[];
  channel: Channel;
  authors: Authors;
  teaserImage: TeaserImage;
}

export interface Body {
  text: string;
}

export interface Channel {
  title: string;
}

export interface Authors {
  edges: Edge[];
}

export interface Edge {
  node: Node;
}

export interface Node {
  name: string;
}

export interface TeaserImage {
  caption?: string;
  image: Image;
}

export interface Image {
  file: File;
}

export interface File {
  relativeOriginPath: string;
}

export type NewsArticleFromDB = {
  preferredUri: string;
  lead: string;
  bodyText: string;
  channelTitle: string;
  authors: string;
  teaserImagePath: string;
  caption: string;
  title: string;
  shortTitle: string;
  gcid: string;
  publicationDate: string;
  publication: string;
};
