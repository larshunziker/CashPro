// sonar-disable
import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import classNames from 'classnames';
import longFormFactory, {
  LongFormFactoryPropsInner,
} from '../../../../../common/screens/LongForm/factory';
import { getScrollOffset } from '../../../../shared/helpers/getScrollOffset';
import authStateSelector from '../../../../../shared/selectors/authStateSelector';
import headerStateSelector from '../../../../../shared/selectors/headerStateSelector';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import pianoStateSelector from '../../../../../shared/selectors/pianoStateSelector';
import windowStateSelector from '../../../../../shared/selectors/windowStateSelector';
import withHelmet from '../../../../shared/decorators/withHelmet';
import withScrollToAnchor from '../../../../shared/decorators/withScrollToAnchor';
import {
  resetHeaderData,
  setHeaderData,
} from '../../../../../shared/actions/header';
import AppNexus from '../../components/AppNexus';
import Comments from '../../components/Comments';
import Helmet from '../../components/Helmet';
import Paragraphs from '../../components/Paragraphs';
import PianoRestrictedDrawer from '../../components/PianoRestrictedDrawer';
import ProgressBar from '../../components/ProgressBar';
import CustomRecommendations from '../../components/Recommendations/components/CustomRecommendations';
import ArticleAlerts from '../../screens/Article/components/ArticleAlerts';
import AuthorBox from '../../screens/ArticlePage/components/AuthorBox';
import ArticleRecommendations from '../Article/components/ArticleRecommendations';
import EditButtons from './../../components/EditButtons';
import LongFormHero from './components/LongFormHero';
import { MHPA_2 } from '../../../../../shared/constants/adZone';
import {
  ARTICLE_CONTENT_TYPE,
  ARTICLE_TYPE_LONG_READ,
} from '../../../../../shared/constants/content';
import { PUBLICATION_BEO } from '../../../../../shared/constants/publications';
import { ROOT_SCHEMA_TYPE_NEWS_ARTICLE } from '../../../../../shared/constants/structuredData';
import { PARAGRAPHS_FOR_FREE } from '../../screens/Article/constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../assets/styles/variables.legacy.css'. '/Users/bhs/code/work/rasch-st */
import variables from '../../assets/styles/variables.legacy.css';
import styles from './styles.legacy.css';

type LongFormPropsInner = LongFormFactoryPropsInner & {
  setHeaderData: (props: HeaderState) => void;
  resetHeaderData: () => void;
};

export const getFallbackTitle = () => 'Longform Artikel';

const withLifecycle = lifecycle<any, any>({
  componentDidMount() {
    const activeMenuTrailEdges: ActiveMenuTrailItemConnectionResolvers =
      this.props?.landingPage?.activeMenuTrail?.edges;
    const activeChannel: any | null =
      (activeMenuTrailEdges &&
        Array.isArray(activeMenuTrailEdges) &&
        activeMenuTrailEdges.length > 0 &&
        activeMenuTrailEdges[activeMenuTrailEdges.length - 1]) ||
      null;
    if (this.props?.article) {
      const {
        id,
        gcid,
        nid,
        //   TODO: Uncomment after information about replacing LongForm with LongRead
        // subtypeValue,
        channel,
        preferredUri,
        socialMediaTitle,
        title,
        shortTitle,
        lead,
        createDate,
        commentStatus,
        restrictionStatus,
      }: Article & { subtypeValue?: string } = this.props.article;
      this.props.setHeaderData({
        articleData: {
          id,
          gcid,
          nid,
          title,
          shortTitle,
          lead,
          // TODO: Fix this after knowledge if we should replace LongRead with LongForm
          // subtypeValue: ARTICLE_TYPE_LONG_FORM,
          subtypeValue: ARTICLE_TYPE_LONG_READ,
          channel,
          commentStatus: commentStatus,
          preferredUri,
          socialMediaTitle,
          restrictionStatus,
          createDate,
        },
        title: activeChannel?.article?.label || '',
        contentType: ARTICLE_CONTENT_TYPE,
      });
    } else {
      this.props.setHeaderData({
        articleData: null,
        title: activeChannel?.article?.label || '',
      });
    }
  },
  componentWillUnmount() {
    this.props.resetHeaderData();
  },
});

const mapStateToProps = (state: ReduxState) => ({
  viewportLabel: windowStateSelector(state).viewport.label,
  noHeader: headerStateSelector(state).noHeader,
  hasSubscriptions:
    authStateSelector(state).hasSubscriptions ||
    pianoStateSelector(state).isAccessGranted,
  isCrawler: locationStateSelector(state)?.isCrawler || false,
});

const mapDispatchToProps = {
  setHeaderData,
  resetHeaderData,
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'data' implicitly has an 'any' type. */
export const longFormBreadcrumbsData = (data) => {
  const longformArticle = data?.environment?.routeByPath.object;

  if ((longformArticle?.activeMenuTrail?.edges?.length || 0) <= 1) {
    return longformArticle?.activeMenuTrail || null;
  }

  data.breadcrumbsData = {
    activeMenuTrail: longformArticle.activeMenuTrail,
    title: longformArticle?.title || '',
  };
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'article' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'pageLayoutType' implicitly has an 'any' type. */
export const longFormArticleRecommendations = ({ article, pageLayoutType }) => {
  return (
    <>
      <div className={classNames('ad-wrapper', `ad-wrapper-mobile`)}>
        <AppNexus slot={MHPA_2} isMultiPlacement deviceType="mobile" />
      </div>
      <ArticleRecommendations
        article={article}
        pageLayoutType={pageLayoutType}
      />
    </>
  );
};

const LongForm = compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withScrollToAnchor({ offset: variables.pageScrollOffset }),
  withHelmet({
    getNode: (mapProps: LongFormPropsInner): Article =>
      mapProps.article || null,
    rootSchemaType: ROOT_SCHEMA_TYPE_NEWS_ARTICLE,
    getFallbackTitle: (mapProps: LongFormPropsInner) =>
      (!!mapProps && getFallbackTitle()) || '',
    getNodesCount: (mapProps: LongFormPropsInner) =>
      mapProps.article?.body?.length || 0,
    pageSize: 1,
  }),
  withLifecycle,
)(
  longFormFactory({
    ProgressBar,
    Helmet,
    EditButtons,
    LongFormHero,
    AppNexus,
    Paragraphs,
    paragraphsForFree: PARAGRAPHS_FOR_FREE,
    ArticleRecommendations: longFormArticleRecommendations,
    publication: PUBLICATION_BEO,
    articleColStyles: grid.ColXs24,
    AuthorBox,
    Comments,
    ArticleAlerts,
    Recommendations: CustomRecommendations,
    getScrollOffset,
    PianoRestrictedDrawer,
    styles: {
      Wrapper: styles.Wrapper,
      ArticleHeader: styles.ArticleHeader,
      Container: grid.Container,
      Row: grid.Row,
      LowerSection: classNames(
        grid.ColOffsetSm2,
        grid.ColSm20,
        grid.ColOffsetMd4,
        grid.ColMd16,
      ),
      AuthorBoxContainer: styles.AuthorBoxContainer,
      AuthorBoxWrapper: styles.AuthorBoxWrapper,
      CommentsWrapper: classNames(
        grid.ColOffsetSm2,
        grid.ColSm20,
        grid.ColOffsetMd4,
        grid.ColMd16,
        styles.CommentsWrapper,
      ),
      AlertsWrapper: classNames(
        grid.ColOffsetSm2,
        grid.ColSm20,
        grid.ColOffsetMd4,
        grid.ColMd16,
        styles.AlertsWrapper,
      ),
      Recommendations: classNames(styles.Recommendations, grid.HideForPrint),
      ArticleRecommendations: classNames(
        styles.ArticleRecommendations,
        grid.HideForPrint,
      ),
      Paywall: classNames(styles.Paywall, 'paywall-wrapper-with-print-info'),
    },
  }),
);

export default LongForm;
