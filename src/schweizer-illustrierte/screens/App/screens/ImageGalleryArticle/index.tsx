import React, { ReactElement, useEffect } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-body-classname'. '/Users/bhs/code/work/rasch-stack/node_modules/rea */
import BodyClassName from 'react-body-classname';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames';
import { enrichOverviewBodyWithADs } from '../../../../../shared/helpers/ads';
import renderTopic from '../../../../../shared/helpers/topic';
import cssClassByChannel from '../../../../shared/helpers/cssClassByChannel';
import settingsStateSelector from '../../../../shared/selectors/settingsStateSelector';
import withHelmet from '../../../../shared/decorators/withHelmet';
import {
  resetHeaderData,
  setHeaderData,
} from '../../../../../shared/actions/header';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import AppNexus from '../../components/AppNexus';
import Breadcrumbs from '../../components/Breadcrumbs';
import EditButtons from '../../components/EditButtons';
import Icon from '../../components/Icon';
import Paragraphs from '../../components/Paragraphs';
import Recommendations from '../../components/Recommendations';
import UtilityBar from '../../components/UtilityBar';
import UtilityOverlay from '../../components/UtilityBar/components/UtilityOverlay';
import ArticleAlerts from '../Article/components/ArticleAlerts';
import Hero from './components/Hero';
import { IMAGE_PARAGRAPH } from '../../../../../shared/constants/paragraphs';
import { ROOT_SCHEMA_TYPE_NEWS_ARTICLE } from '../../../../../shared/constants/structuredData';
import {
  TRACKING_CLASS_CONTENT_BODY,
  TRACKING_CLASS_CONTENT_HEADER,
} from '../../../../../shared/constants/tracking';
import { UTILITY_BAR_THEME_LIGHT } from '../../../../../shared/constants/utilitybar';
import { MMR_1 } from '../../components/AppNexus/constants';
import {
  IMAGE_GALLERY_DETAIL_SCREEN,
  UTILITYBAR_CONFIG_IMAGE_GALLERY,
  UTILITYBAR_OVERLAY_CONFIG_IMAGE_GALLERY,
} from './constants';
import { TEASER_LAYOUT_S } from '../../../../../shared/constants/teaser';
import styles from './styles.legacy.css';
// @ts-ignore
import grid from '@grid.legacy.css';
import { ActiveMainChannel } from '../../../../shared/types';
import { ImageGalleryArticleProps } from './typings';

type ImageGalleryArticlePropsInner = ImageGalleryArticleProps & {
  activeMainChannel: ActiveMainChannel;
  resetHeaderData: Function;
  setHeaderData: Function;
};

const filterImageParagraphs = (item: any) =>
  item.__typename === IMAGE_PARAGRAPH;

const FALLBACK_TITLE = 'Image Gallery Article';

const ImageGalleryArticle = ({
  imageGalleryArticle,
  activeMainChannel,
  resetHeaderData,
  setHeaderData,
}: ImageGalleryArticlePropsInner): ReactElement | null => {
  const {
    channel,
    relatedTopics,
    shortTitle,
    preferredUri,
    title,
    lead,
    gcid,
    __typename,
  }: ImageGallery = imageGalleryArticle;

  useEffect(() => {
    setHeaderData({
      articleData: {
        title,
        gcid,
        shortTitle,
        lead,
        channel,
        preferredUri,
      },
      contentType: __typename,
    });

    return () => {
      resetHeaderData();
    };
  }, [
    __typename,
    channel,
    gcid,
    preferredUri,
    resetHeaderData,
    setHeaderData,
    title,
    shortTitle,
    lead,
  ]);

  if (!imageGalleryArticle || Object.keys(imageGalleryArticle).length === 0) {
    return null;
  }

  const getThemedClass = cssClassByChannel(styles, activeMainChannel);

  const topicList = relatedTopics?.edges;

  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<ParagraphInterface>[] | null | undefined' is not assignable to type 'ImageParagraph[]'. */
  const imageParagraphs: Array<ImageParagraph> =
    imageGalleryArticle.body &&
    imageGalleryArticle.body.filter(filterImageParagraphs);

  const recommendations = imageGalleryArticle?.recommendations?.edges;

  return (
    <>
      <div className={TRACKING_CLASS_CONTENT_HEADER}>
        <EditButtons
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
          editContentUri={imageGalleryArticle.editContentUri}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
          editRelationUri={imageGalleryArticle.editRelationUri}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
          cloneContentUri={imageGalleryArticle.cloneContentUri}
        />
      </div>
      <div
        className={classNames(
          'ad-wrapper',
          'ad-wrapper-mobile',
          'header-apn-zone',
          styles.HeaderAd,
        )}
      >
        <AppNexus slot={MMR_1} deviceType="mobile" />
      </div>
      <div
        className={styles.Wrapper}
        data-testid="image-gallery-detail-container"
      >
        {imageGalleryArticle.preferredUri &&
          imageGalleryArticle.activeMenuTrail && (
            <Breadcrumbs
              pageUrl={imageGalleryArticle.preferredUri}
              /* @ts-ignore TODO: TS2322 ->  Type 'ActiveMenuTrailItemConnection' is not assignable to type 'BreadcrumbsItems'. */
              items={imageGalleryArticle.activeMenuTrail}
              origin={IMAGE_GALLERY_DETAIL_SCREEN}
            />
          )}
        <div className={grid.Container}>
          {imageGalleryArticle.teaserImage &&
            imageGalleryArticle.shortTitle &&
            imageGalleryArticle.title && (
              <TestFragment data-testid="image-gallery-detail-hero-container">
                <Hero
                  shortTitle={imageGalleryArticle.shortTitle}
                  title={imageGalleryArticle.title}
                  teaserImage={imageGalleryArticle.teaserImage}
                />
              </TestFragment>
            )}
          <div className={getThemedClass('ShareWrapper')}>
            <div className={grid.Row}>
              <div
                className={classNames(grid.ColXs4, grid.ColSm2, grid.ColXl2)}
              >
                <div className={styles.IconWrapper}>
                  <Icon type={'IconFotoMarker'} addClass={styles.CamIcon} />
                  {imageParagraphs && (
                    <span
                      className={styles.ItemCounter}
                      data-testid="image-gallery-detail-counter-container"
                    >
                      {imageParagraphs.length}
                    </span>
                  )}
                </div>
              </div>
              <div className={classNames(grid.ColXs20, grid.ColSm19)}>
                {imageGalleryArticle.title &&
                  imageGalleryArticle.preferredUri &&
                  imageGalleryArticle.teaserImage && (
                    <BodyClassName className={styles.ArticleBody}>
                      <div className={styles.UtilityBar}>
                        <UtilityBar
                          enabledUtilities={UTILITYBAR_CONFIG_IMAGE_GALLERY}
                          theme={UTILITY_BAR_THEME_LIGHT}
                        >
                          {({ isOverlayVisible, toggleOverlayVisible }) => (
                            <UtilityOverlay
                              overlayTitle="Artikel teilen"
                              isOverlayVisible={isOverlayVisible}
                              toggleOverlayVisible={toggleOverlayVisible}
                              enabledUtilities={
                                UTILITYBAR_OVERLAY_CONFIG_IMAGE_GALLERY
                              }
                            />
                          )}
                        </UtilityBar>
                      </div>
                    </BodyClassName>
                  )}
              </div>
            </div>
          </div>
          {imageGalleryArticle.lead && (
            <div className={grid.Row}>
              <div
                className={classNames(
                  grid.ColSm20,
                  grid.ColXl14,
                  grid.ColOffsetSm2,
                  grid.ColOffsetXl0,
                )}
              >
                <p className={styles.Lead}>{imageGalleryArticle.lead}</p>
              </div>
            </div>
          )}
        </div>
        {imageGalleryArticle.body &&
          Array.isArray(imageGalleryArticle.body) &&
          imageGalleryArticle.body.length > 0 && (
            <div className={TRACKING_CLASS_CONTENT_BODY}>
              <TestFragment data-testid="image-gallery-detail-paragraph-container">
                <Paragraphs
                  pageBody={enrichOverviewBodyWithADs({
                    pageBody: imageGalleryArticle.body,
                  })}
                  origin={IMAGE_GALLERY_DETAIL_SCREEN}
                  colStyle={classNames(
                    grid.ColXs24,
                    grid.ColSm20,
                    grid.ColOffsetSm2,
                    grid.ColXl24,
                    grid.ColOffsetXl0,
                  )}
                  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
                  isAdSuppressed={imageGalleryArticle?.channel?.suppressAds}
                  hasContainer
                />
              </TestFragment>
            </div>
          )}

        <div className={grid.Container}>
          <div className={grid.Row}>
            <div
              className={classNames(
                grid.ColSm20,
                grid.ColXl14,
                grid.ColOffsetSm2,
                grid.ColOffsetXl5,
              )}
            >
              {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
              {topicList?.length > 0 && (
                <div
                  className={classNames(
                    styles.ArticleAlertsWrapper,
                    grid.HideForPrint,
                  )}
                >
                  <strong className={styles.Topic}>Topics: </strong>
                  {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
                  {topicList.map((topic, index) => {
                    /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<TopicEdge>' is not assignable to parameter of type 'TopicEdge'. */
                    return renderTopic(topic, index, styles.Topic);
                  })}
                </div>
              )}

              {imageGalleryArticle?.keywords?.edges &&
                imageGalleryArticle?.keywords?.edges?.length > 0 && (
                  <div
                    className={classNames(
                      styles.ArticleAlertsWrapper,
                      grid.HideForPrint,
                    )}
                  >
                    <ArticleAlerts
                      items={imageGalleryArticle?.keywords?.edges}
                      theme="light"
                    />
                  </div>
                )}
            </div>
          </div>

          {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
          {imageGalleryArticle?.recommendations?.edges?.length > 0 && (
            <Recommendations
              title="Mehr für dich"
              items={recommendations}
              isBlack
              teaserLayout={TEASER_LAYOUT_S}
            />
          )}
        </div>
      </div>
    </>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

const mapDispatchToProps = {
  setHeaderData,
  resetHeaderData,
};

export default compose<any, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withHelmet({
    getNode: (
      mapProps: ImageGalleryArticlePropsInner,
    ): Article | ImageGallery => mapProps.imageGalleryArticle,
    getFallbackTitle: (mapProps: ImageGalleryArticlePropsInner): string =>
      (!!mapProps && FALLBACK_TITLE) || '',
    rootSchemaType: ROOT_SCHEMA_TYPE_NEWS_ARTICLE,
  }),
)(ImageGalleryArticle);
