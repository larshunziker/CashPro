import { ReactElement, ComponentType } from 'react';
import { HelmetComponent } from '../../components/Helmet/typings';

export type LongFormProps = {
  location: RouterLocation;
  article: Article & {
    subtypeValue?: string;
    heroImageBody: ImageParagraph[];
  };
  page: number;
  hasSubscriptions?: boolean;
  isCrawler?: boolean;
  viewportLabel?: string;
  noHeader?: boolean;
};

export type LongFormHeroProps = {
  article: (Article | NativeAdvertising) & {
    subtypeValue?: string;
    heroImageBody: ImageParagraph[];
  };
  origin: string;
};

export type LongFormFactoryStyles = {
  Wrapper?: string;
  ArticleHeader?: string;
  Container?: string;
  Row?: string;
  LowerSection?: string;
  AuthorBoxContainer?: string;
  AuthorBoxWrapper?: string;
  CommentsWrapper?: string;
  Recommendations?: string;
  ArticleRecommendations?: string;
  AlertsWrapper?: string;
  Paywall?: string;
};

export type LongFormFactoryOptions = {
  ProgressBar?: ComponentType<any>;
  EditButtons?: ComponentType<any>;
  LongFormHero: LongFormHeroComponent;
  Paragraphs: ComponentType<any>;
  paragraphsForFree: number;
  styles: LongFormFactoryStyles;
  getHelmetMetaLink?: Function;
  AppNexus: ComponentType<any>;
  AuthorBox: ComponentType<any>;
  Comments: ComponentType<any>;
  ArticleAlerts: ComponentType<any>;
  ArticleRecommendations: ComponentType<any>;
  Recommendations: ComponentType<any>;
  PianoRestrictedDrawer: ComponentType<any>;
  publication: string;
  Helmet: HelmetComponent;
  articleColStyles?: string;
  getScrollOffset: (
    isMarketingLandingPage: boolean,
    viewportLabel: string,
    noHeader: boolean,
  ) => number;
};

export type LongFormHeroComponent = (props: LongFormHeroProps) => ReactElement;
