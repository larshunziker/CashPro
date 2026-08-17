import React, { Component } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-body-classname'. '/Users/bhs/code/work/rasch-stack/node_modules/rea */
import BodyClassName from 'react-body-classname';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames';
import { enrichArticleBodyWithADs } from '../../../../../shared/helpers/ads';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import {
  getZodiacSign,
  getZodiacSignUrls,
} from '../../../../shared/helpers/zodiacSigns';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../shared/decorators/withArticleIntersectionObserver'. '/User */
import { default as withArticleIntersectionObserver } from '../../../../../shared/decorators/withArticleIntersectionObserver';
import withParams from '../../../../../shared/decorators/withParams';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../shared/decorators/withHelmet';
import {
  resetHeaderData,
  setHeaderData,
} from '../../../../../shared/actions/header';
import Link from '../../../../../common/components/Link';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import AppNexus from '../../components/AppNexus';
import ArrowButton from '../../components/ArrowButton';
import AuthorBox from '../../components/AuthorBox';
import Breadcrumbs from '../../components/Breadcrumbs';
import Paragraphs from '../../components/Paragraphs';
import UtilityBar from '../../components/UtilityBar';
import UtilityOverlay from '../../components/UtilityBar/components/UtilityOverlay';
import StatusPage from './../StatusPage';
import Head from './components/Head';
import LatestStories from './components/LatestStories';
import ZodiacSigns from './components/ZodiacSigns';
import ZodiacSignsOverlay from './components/ZodiacSignsOverlay';
import { TEXT_PARAGRAPH } from '../../../../../shared/constants/paragraphs';
import { ROOT_SCHEMA_TYPE_WEBSITE } from '../../../../../shared/constants/structuredData';
import {
  MHPA_2,
  MMR_1,
  MPA_3,
  WIDEBOARD_2,
  WIDEBOARD_3,
} from '../../components/AppNexus/constants';
import { ARROW_BUTTON_THEME_HOROSCOPE } from '../../components/ArrowButton/constants';
import {
  UTILITYBAR_CONFIG_ARTICLE,
  UTILITYBAR_OVERLAY_CONFIG_ARTICLE,
} from '../ArticlePage/constants';
import { HOROSCOPE_DETAIL_DAILY, HOROSCOPE_DETAIL_DEFAULT } from './constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import helpers from '../../assets/styles/helpers.legacy.css';
import styles from './styles.legacy.css';
import { HoroscopeDetailProps } from './typings';

type HoroscopeDetailState = {
  overlayVisible: boolean;
};

export type HoroscopeDetailPropsInner = HoroscopeDetailProps & {
  data: {
    environment: Environment;
    dailyHoroscope: string;
  };
  isYearly: boolean;
  zodiacSlug: string;
  resetHeaderData: () => void;
  setHeaderData: (props: HeaderState) => void;
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'zodiacSlug' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'isYearly' implicitly has an 'any' type. */
const getFallbackTitle = ({ zodiacSlug, isYearly }) =>
  `${
    isYearly ? 'Jahreshoroskop' : 'Tageshoroskop'
  } Sternzeichen ${getZodiacSign(zodiacSlug)?.title} | Schweizer Illustrierte"`;

/* @ts-ignore TODO: TS7031 ->  Binding element 'zodiacSlug' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'isYearly' implicitly has an 'any' type. */
const getFallbackDescription = ({ zodiacSlug, isYearly }) =>
  `${
    isYearly ? 'Das Jahreshoroskop für' : 'Das Tageshoroskop für'
  } Sternzeichen ${getZodiacSign(zodiacSlug)?.title}.${
    (!isYearly && ' Was der Tag für dich bereithält.') || ''
  }"`;

const adPlacementSlotsHoroscope = {
  mobile: {
    sequence: [],
    repeater: MHPA_2,
    last: MPA_3,
  },
  tabletDesktop: {
    sequence: [],
    repeater: WIDEBOARD_2,
    last: WIDEBOARD_3,
  },
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'shortTitle' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'title' implicitly has an 'any' type. */
const DailyHoroscopeHeader = ({ shortTitle, title }) => (
  <>
    <div
      data-testid="daily-horoscope-short-title"
      className={styles.ShortTitle}
    >
      {shortTitle}
    </div>
    <div data-testid="daily-horoscope-title" className={styles.Title}>
      {title}
    </div>
  </>
);

class HoroscopeDetail extends Component<
  HoroscopeDetailPropsInner,
  HoroscopeDetailState
> {
  constructor(props: HoroscopeDetailPropsInner) {
    super(props);

    this.state = {
      overlayVisible: false,
    };
  }

  onOverlayToggle = () => {
    this.setState({ overlayVisible: !this.state.overlayVisible });
  };

  mapDailyHoroscopeDataToTextParagraph = (
    dailyHoroscopeJSON: DailyHoroscopeJSON,
  ) =>
    dailyHoroscopeJSON?.body.map((item) => ({
      ...item,
      text: `<p>${item.text}</p>`,
      characterCount: item.text.length,
      __typename: TEXT_PARAGRAPH,
    })) || [];

  appendCustomTextParagraphHeader = (body: Array<any>) =>
    body.map((item) => ({
      ...item,
      headerComponent: (
        <DailyHoroscopeHeader title={item.title} shortTitle={item.shortTitle} />
      ),
    }));

  componentDidUpdate() {
    /* @ts-ignore TODO: TS2322 ->  Type 'RouteObjectInterface | null' is not assignable to type 'Article'. */
    const article: Article =
      this.props?.data?.environment?.routeByPath?.object || null;

    if (article) {
      const {
        gcid,
        shortTitle,
        channel,
        preferredUri,
        socialMediaTitle,
        title,
        lead,
        __typename,
      } = article;

      this.props.setHeaderData({
        articleData: {
          gcid,
          title,
          shortTitle,
          lead,
          channel,
          preferredUri,
          socialMediaTitle,
          commentStatus: 'hidden',
        },
        contentType: __typename,
      });
    }
  }

  componentWillUnmount() {
    this.props.resetHeaderData();
  }

  render() {
    const { data, isYearly, zodiacSlug, loading }: HoroscopeDetailPropsInner =
      this.props;
    const { overlayVisible }: HoroscopeDetailState = this.state;

    /* @ts-ignore TODO: TS2322 ->  Type 'RouteObjectInterface | null' is not assignable to type 'Article'. */
    const article: Article = data?.environment?.routeByPath?.object || null;
    const zodiacSign = getZodiacSign(zodiacSlug);

    if (!zodiacSign || !article) {
      if (loading) {
        return null;
      }

      return (
        <TestFragment data-testid="not-found-wrapper">
          <StatusPage />
        </TestFragment>
      );
    }

    const dailyHoroscopeJSON: DailyHoroscopeJSON = data?.dailyHoroscope
      ? JSON.parse(data.dailyHoroscope)
      : null;
    const zodiacSignUrls = getZodiacSignUrls(zodiacSign.slug);
    const dailyHoroscopeButton = (
      <Link path={zodiacSignUrls.daily}>
        <ArrowButton addClass={styles.DailyButton}>Tageshoroskop</ArrowButton>
      </Link>
    );

    const yearlyHoroscopeButton = (
      <Link path={zodiacSignUrls.yearly}>
        <ArrowButton
          addClass={styles.YearlyButton}
          theme={ARROW_BUTTON_THEME_HOROSCOPE}
        >
          Jahreshoroskop
        </ArrowButton>
      </Link>
    );

    const allZodiacSignsButton = (
      /* eslint-disable-next-line jsx-a11y/click-events-have-key-events */
      <span onClick={this.onOverlayToggle} tabIndex={0} role="button">
        <ArrowButton
          addClass={styles.AllZodiacSignsButton}
          /* @ts-ignore TODO: TS2322 ->  Type 'false | "arrow-button-horoscope-theme"' is not assignable to type 'string | undefined'. */
          theme={isYearly && ARROW_BUTTON_THEME_HOROSCOPE}
        >
          Alle Sternzeichen
        </ArrowButton>
      </span>
    );

    const author = article?.authors?.edges?.[0]?.node || null;

    /* @ts-ignore TODO: TS2322 ->  Type '{ title */
    const horoscopeHeaderData: HoroscopeHeader = dailyHoroscopeJSON
      ? dailyHoroscopeJSON.header
      : {
          title: article?.title,
          subTitle: article?.lead,
          shortTitle: article?.shortTitle,
        };

    let horoscopeArticleBody;
    let dailyHoroscopeArticleBody;
    if (isYearly) {
      horoscopeArticleBody =
        article?.body && Array.isArray(article?.body)
          ? enrichArticleBodyWithADs({
              pageBody: article.body,
              adPlacementSlots: adPlacementSlotsHoroscope,
            })
          : [];
    } else {
      dailyHoroscopeArticleBody = dailyHoroscopeJSON?.body
        ? this.appendCustomTextParagraphHeader(
            enrichArticleBodyWithADs({
              pageBody:
                this.mapDailyHoroscopeDataToTextParagraph(dailyHoroscopeJSON),
              adPlacementSlots: adPlacementSlotsHoroscope,
            }),
          )
        : [];
      horoscopeArticleBody =
        article?.body && Array.isArray(article?.body) ? article.body : [];
    }

    return (
      <TestFragment data-testid="horoscope-detail-wrapper">
        {overlayVisible && (
          <ZodiacSignsOverlay
            current={zodiacSign}
            isYearly={isYearly}
            toggleHandler={this.onOverlayToggle}
            title="Tageshoroskop"
            subtitle="Wählen Sie Ihr Sternzeichen"
          />
        )}

        {article?.preferredUri && article?.activeMenuTrail && (
          <Breadcrumbs
            pageUrl={article?.preferredUri}
            /* @ts-ignore TODO: TS2322 ->  Type 'ActiveMenuTrailItemConnection' is not assignable to type 'BreadcrumbsItems'. */
            items={article?.activeMenuTrail}
          />
        )}

        <div className={'ad-wrapper ad-wrapper-mobile'}>
          <AppNexus slot={MMR_1} deviceType="mobile" />
        </div>

        <div className={classNames(grid.Container, styles.ZodiacSignsTop)}>
          <div className={grid.Row}>
            <div
              className={classNames(
                grid.ColSm24,
                grid.ColOffsetXl5,
                grid.ColXl14,
              )}
            >
              <ZodiacSigns current={zodiacSign} isYearly={isYearly} />
            </div>
          </div>
        </div>

        <Head
          isYearly={isYearly}
          title={horoscopeHeaderData.title}
          shortTitle={horoscopeHeaderData.shortTitle}
          subtitle={horoscopeHeaderData.subTitle}
          zodiacSlug={zodiacSign.slug}
        />
        <div
          className={classNames(grid.Container, helpers.PositionRelative)}
          data-testid="horoscope-container"
        >
          <div className={grid.Row}>
            <div
              className={classNames(
                grid.ColOffsetSm2,
                grid.ColOffsetXl5,
                grid.ColSm21,
              )}
            >
              <BodyClassName className={styles.ArticleBody}>
                <div
                  className={classNames(
                    'utility-bar-wrapper',
                    styles.UtilityBarWrapper,
                  )}
                >
                  <UtilityBar enabledUtilities={UTILITYBAR_CONFIG_ARTICLE}>
                    {({ isOverlayVisible, toggleOverlayVisible }) => (
                      <UtilityOverlay
                        overlayTitle="Artikel teilen"
                        isOverlayVisible={isOverlayVisible}
                        toggleOverlayVisible={toggleOverlayVisible}
                        enabledUtilities={UTILITYBAR_OVERLAY_CONFIG_ARTICLE}
                      />
                    )}
                  </UtilityBar>
                </div>
              </BodyClassName>
            </div>
          </div>
          <div className={grid.Row}>
            <div
              className={classNames(
                grid.ColOffsetSm2,
                grid.ColOffsetXl5,
                grid.ColSm21,
              )}
            >
              <span className={grid.HiddenSmUp}>{allZodiacSignsButton}</span>
              {isYearly ? dailyHoroscopeButton : yearlyHoroscopeButton}
            </div>
            {article?.showAuthorBox && author && (
              <div
                className={classNames(
                  grid.ColSm11,
                  grid.ColXl9,
                  grid.ColOffsetXl2,
                  grid.HiddenSmDown,
                )}
              >
                <AuthorBox author={author} origin={HOROSCOPE_DETAIL_DEFAULT} />
              </div>
            )}
          </div>
          <div className={grid.Row}>
            <div
              className={classNames(
                grid.ColXs24,
                grid.ColSm2,
                grid.ColXl3,
                grid.ColOffsetXl2,
              )}
            >
              {article?.showAuthorBox && author && (
                <span className={grid.HiddenSmUp}>
                  <AuthorBox author={author} />
                </span>
              )}
            </div>
            <div
              className={classNames(grid.ColSm20, grid.ColXl14)}
              data-testid="paragraphs-wrapper"
              key={zodiacSign.id}
            >
              {!!horoscopeArticleBody?.length && (
                <Paragraphs
                  pageBody={horoscopeArticleBody}
                  origin={HOROSCOPE_DETAIL_DEFAULT}
                  hasContainer={false}
                  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
                  isAdSuppressed={article?.channel?.suppressAds}
                />
              )}
              {/* @ts-ignore TODO: TS2454 ->  Variable 'dailyHoroscopeArticleBody' is used before being assigned. */}
              {!isYearly && !!dailyHoroscopeArticleBody?.length && (
                <Paragraphs
                  pageBody={dailyHoroscopeArticleBody}
                  origin={HOROSCOPE_DETAIL_DAILY}
                  hasContainer={false}
                  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
                  isAdSuppressed={article?.channel?.suppressAds}
                />
              )}
              <div
                className={classNames(
                  grid.Row,
                  styles.BottomButtonsWrapper,
                  grid.HiddenSmUp,
                )}
              >
                <div className={classNames(grid.ColOffsetSm2, grid.ColSm21)}>
                  {allZodiacSignsButton}
                  {isYearly ? dailyHoroscopeButton : yearlyHoroscopeButton}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={classNames(grid.Container, styles.ZodiacSignsBottom)}>
          <div className={grid.Row}>
            <div
              className={classNames(
                grid.ColSm24,
                grid.ColOffsetXl5,
                grid.ColXl14,
              )}
            >
              <ZodiacSigns current={zodiacSign} isYearly={isYearly} />
              {
                <div
                  className={classNames(
                    styles.YearlyHoroscopeButtonWrapper,
                    grid.HiddenSmDown,
                  )}
                >
                  {isYearly ? dailyHoroscopeButton : yearlyHoroscopeButton}
                </div>
              }
            </div>
          </div>
        </div>

        <LatestStories />
      </TestFragment>
    );
  }
}

const mapDispatchToProps = {
  setHeaderData,
  resetHeaderData,
};

export const HoroscopeDetailWrapper = compose<any, any>(
  withParams,
  withArticleIntersectionObserver({
    selectors: ['.article-wrapper'],
    rootMargin: '-400px 0px 0px 0px',
    threshold: 0,
  }),
  connect(null, mapDispatchToProps),
  withHelmet({
    getNode: (mapProps: HoroscopeDetailPropsInner) =>
      mapProps.data?.environment?.routeByPath?.object,
    getFallbackTitle: (mapProps: HoroscopeDetailPropsInner): string =>
      getFallbackTitle(mapProps),
    getFallbackDescription: (mapProps: HoroscopeDetailPropsInner): string =>
      getFallbackDescription(mapProps),
    rootSchemaType: ROOT_SCHEMA_TYPE_WEBSITE,
  }),
  withAppNexus({
    parseTrackingData,
  }),
)(HoroscopeDetail);

export default HoroscopeDetailWrapper;
