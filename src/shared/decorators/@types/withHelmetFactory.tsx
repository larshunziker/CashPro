import { ContentTypeUnion } from '../../@types/gql';
import {
  HelmetComponent,
  MetaTag,
} from '../../../common/components/Helmet/typings';

export type PublisherLogoDimensions = {
  width: number;
  height: number;
};

export type WithHelmetFactoryOptions = {
  getPublisher: (props: Record<any, any>) => string;
  getPublisherLogo: (props: Record<any, any>) => string;
  getPublisherLogoDimensions?: () => PublisherLogoDimensions;
  Helmet?: HelmetComponent;
  whiteListedParams?: Record<string, boolean>;
};

export type WithHelmetNodeProps = {
  title: string;
  meta: Array<MetaTag>;
  socialMetaValues: Record<string, any>;
  link: Array<Record<string, any>>;
  script: Maybe<Array<Record<string, any>>>;
  teaserImage: Maybe<Record<string, any>>;
  content: Maybe<Record<string, any>>;
};

export type WithHelmetProps = {
  withHelmetNode: WithHelmetNodeProps & Record<string, any>;
};

export type WithHelmet = {
  getNode?: Function;
  getNodesCount?: Function;
  getNodes?: Function;
  getImage?: (props: any) => ImageFile;
  pageSize?: Function | number;
  getFallbackTitle?: Function;
  getFallbackDescription?: Function;
  rootSchemaType?: string;
  getRootSchemaType?: Function;
  structuredDefaultData?: StructuredData;
  getRootSchemaRestricted?: Function;
  androidAppSchema?: Record<string, any>;
  iOSAppSchema?: Record<string, any>;
  hasBreadcrumbs?: Function;
};

export type StructuredData = {
  sameAs: String[];
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint: {
    '@type': string;
    contactType: string;
    telephone: string;
    email: string;
  };
  potentialAction?: {
    '@type': string;
    target: {
      '@type': string;
      urlTemplate: string;
    };
    'query-input': string;
  };
};

export type SchemaNodeProps = Partial<ContentTypeUnion> &
  Pick<
    Article,
    | 'title'
    | 'authors'
    | 'keywords'
    | 'metaDescription'
    | 'restrictionStatus'
    | 'changeDate'
    | 'publicationDate'
    | 'revisionDate'
    | 'teaserImage'
  > &
  Pick<LandingPage, 'subtypeValue' | 'createDate'> &
  Pick<Teaser, 'link'> &
  Pick<
    Recipe,
    | 'carb'
    | 'protein'
    | 'ingredients'
    | 'fat'
    | 'energy'
    | 'quantity'
    | 'cookingTime'
    | 'preparationTime'
  > &
  Pick<
    Author,
    | 'name'
    | 'awards'
    | 'hasProfilePage'
    | 'preferredUri'
    | 'website'
    | 'instagram'
    | 'twitter'
    | 'facebook'
    | 'linkedin'
    | 'xing'
  > & {
    // can't pick from Recipe because of wrong ParagraphInterface typing
    instructions?: Maybe<Array<Maybe<Record<string, any>>>>;
  };
