// sonar-disable

import React from 'react';
import { connect } from 'react-redux';

import { compose, lifecycle } from 'recompose';
import classNames from 'classnames';
import longReadFactory, {
  LongReadFactoryPropsInner,
} from '../../../../../common/screens/LongRead/factory';
import { generateMetaLinks } from '../../../../../shared/helpers/withHelmet';
import { ensureTeaserInterface } from '../../components/Teaser/shared/helpers';
import withHelmet from '../../../../shared/decorators/withHelmet';
import withScrollToAnchor from '../../../../shared/decorators/withScrollToAnchor';
import {
  resetHeaderData,
  setHeaderData,
} from '../../../../../shared/actions/header';
import Helmet from '../../components/Helmet';
import Paragraphs from '../../components/Paragraphs';
import RelatedContent from '../../components/RelatedContent';
import ArticleAlerts from '../Article/components/ArticleAlerts';
import StatusPage from '../StatusPage';
import LongReadHeader from './components/LongReadHeader';
import {
  PAGER_TYPE_PREV_NEXT,
  PAGER_TYPE_SECTION_PAGER,
  default as Pager,
} from '../../components/Pager';
import { COMMENT_STATUS_HIDDEN } from '../../../../../shared/constants/comments';
import { ARTICLE_TYPE_LONG_READ } from '../../../../../shared/constants/content';
import { SECTION_PARAGRAPH } from '../../../../../shared/constants/paragraphs';
import { ROOT_SCHEMA_TYPE_NEWS_ARTICLE } from '../../../../../shared/constants/structuredData';
import { GRID_LAYOUT_TEASER_3X2 } from '../../components/TeaserGrid/gridConfigs/constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';

type LongReadPropsInner = LongReadFactoryPropsInner & {
  setHeaderData: (props: HeaderState) => void;
  resetHeaderData: () => void;
};

const getHelmetMetaLink = (
  location: RaschRouterLocation,
  totalOfPages = 1,
  page = 1,
): Array<Record<string, any>> => {
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'string | undefined'. */
  return generateMetaLinks(location, null, page, totalOfPages);
};

const mapDispatchToProps = {
  setHeaderData,
  resetHeaderData,
};

const doSetHeaderData = (props: Record<string, any>) => {
  if (props?.node) {
    const {
      gcid,
      nid,
      subtypeValue,
      channel,
      preferredUri,
      socialMediaTitle,
      title,
      shortTitle,
      lead,
    }: Article & { subtypeValue?: string } = props.node;

    props.setHeaderData({
      articleData: {
        gcid,
        nid,
        title,
        shortTitle,
        lead,
        subtypeValue,
        channel,
        commentStatus: COMMENT_STATUS_HIDDEN,
        preferredUri,
        socialMediaTitle,
      },
      contentType: ARTICLE_TYPE_LONG_READ,
    });
  }
};

const withLifecycle: Function = lifecycle<any, any>({
  componentDidMount(): void {
    doSetHeaderData(this.props);
  },
  componentWillUnmount(): void {
    this.props.resetHeaderData();
  },
});

export const getFallbackTitle = (): string => 'Longread Artikel';

// set ssr required redux data right away since lifecycles won't be called
const withSsrHandler =
  (Component: Function): Function =>
  (props: LongReadPropsInner): Function => {
    if (__SERVER__) {
      doSetHeaderData(props);
    }
    // @ts-ignore
    return <Component {...props} />;
  };

export default compose<any, any>(
  connect(null, mapDispatchToProps),
  withScrollToAnchor(),
  withHelmet({
    getNode: (mapProps: LongReadPropsInner): Article => mapProps.node,
    rootSchemaType: ROOT_SCHEMA_TYPE_NEWS_ARTICLE,

    getFallbackTitle: (mapProps: LongReadPropsInner): string =>
      (!!mapProps && getFallbackTitle()) || '',
    getNodesCount: (mapProps: LongReadPropsInner): number =>
      (mapProps.node?.body &&
        mapProps.node.body.filter(
          (
            item: any, // TODO: type item with ParagraphInterface
          ): boolean =>
            item && item.__typename && item.__typename === SECTION_PARAGRAPH,
        ).length) ||
      0,
    pageSize: 1,
    hasBreadcrumbs: () => false,
  }),
  withLifecycle,
  withSsrHandler,
)(
  longReadFactory({
    ArticleFooter: ArticleAlerts,
    Helmet,
    ensureTeaserInterface,
    LongReadHeader,
    StatusPage,
    Pager,
    Paragraphs,
    RelatedContent,
    gridLayout: GRID_LAYOUT_TEASER_3X2,
    getHelmetMetaLink,
    topPagerType: PAGER_TYPE_SECTION_PAGER,
    bottomPagerType: PAGER_TYPE_PREV_NEXT,
    styles: {
      Wrapper: styles.Wrapper,
      SectionGreyLongread: styles.SectionGreyLongread,
      ParagraphWrapper: styles.ParagraphWrapper,
      Section: sections.Section,
      OuterWrapper: styles.OuterWrapper,
      InnerTop: styles.InnerTop,
      TextParagraphHeader: '',
      FirstSectionPager: grid.HiddenMdDown,
    },
    articleColStyle: classNames(grid.ColXs24, grid.ColMd18, grid.ColXl17),
    pagerColStyle: grid.ColXs24,
  }),
);
