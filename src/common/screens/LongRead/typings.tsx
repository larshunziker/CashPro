import { HelmetComponent } from '../../components/Helmet/typings';
import { LongReadHeaderComponent } from './components/LongReadHeader/typings';

export type LongReadProps = {
  location: RouterLocation;
  node: Article & { subtypeValue?: string };
  page: number;
};

export type LongReadFactoryStyles = {
  InnerTop?: string;
  OuterWrapper?: string;
  ParagraphWrapper: string;
  SectionGreyLongread: string;
  TextParagraphHeader: string;
  Wrapper: string;
  Section: string;
  FirstSectionPager?: string;
};

export type LongReadFactoryOptions = {
  ArticleFooter?: React.ComponentType<any>;
  ProgressBar?: React.ComponentType<any>;
  ensureTeaserInterface?: Function;
  gridLayout?: string;
  getHelmetMetaLink?: Function;
  Helmet: HelmetComponent;
  EditButtons?: React.ComponentType<any>;
  LongReadHeader: LongReadHeaderComponent;
  StatusPage: React.ComponentType<any>;
  Pager: React.ComponentType<any>;
  topPagerType: string;
  bottomPagerType: string;
  Paragraphs: React.ComponentType<any>;
  RelatedContent?: React.ComponentType<any>;
  styles: LongReadFactoryStyles;
  articleColStyle: string;
  pagerColStyle: string;
};
