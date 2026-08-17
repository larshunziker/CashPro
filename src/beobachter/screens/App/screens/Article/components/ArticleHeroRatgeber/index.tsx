import React, { Suspense, lazy, useEffect, useState } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-body-classname'. '/Users/bhs/code/work/rasch-stack/node_modules/rea */
import BodyClassName from 'react-body-classname';
import classNames from 'classnames';
import ClientSideOnly from '../../../../../../../common/components/ClientSideOnly';
import SuspenseFallback from '../../../../../../../common/components/SuspenseFallback';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import AuthorDateBlock from '../../../../components/AuthorDateBlock';
import UtilityBar from '../../../../components/UtilityBar';
import UtilityOverlay from '../../../../components/UtilityBar/components/UtilityOverlay';
import ArticleDefaultRatgeber from '../ArticleHero/components/ArticleDefaultRatgeber';
import ArticleImage from '../ArticleHero/components/ArticleImage';
import ArticleVideo from '../ArticleHero/components/ArticleVideo';
import BeyondWordsPlayer from '../../../../components/UtilityBar/components/BeyondWordsPlayer';
import { ANCHOR_HERO } from '../../../../../../../shared/constants/content';
import { VIDEO_PARAGRAPH } from '../../../../../../../shared/constants/paragraphs';
import { TRACKING_CLASS_ARTICLE_HERO } from '../../../../../../../shared/constants/tracking';
import {
  UTILITYBAR_CONFIG_ARTICLE,
  UTILITYBAR_OVERLAY_CONFIG_ARTICLE,
} from '../../constants';
import { EVENT_UTILITY_BAR_PLAYER } from '../../../../../../../shared/constants/utilitybar';
import styles from './styles.legacy.css';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import { ArticleHeroProps } from './typings';

export type ArticleHeroPropsInner = ArticleHeroProps;

export const HERO_IMAGE = 'ImageParagraph';
export const HERO_VIDEO = 'VideoParagraph';
export const HERO_GALLERY = 'ImageGalleryParagraph';

const ImageGalleryHero = lazy(
  () =>
    import(
      /* webpackChunkName: "ImageGalleryHero" */ '../ArticleHero/components/ImageGalleryHero'
    ),
);

const ArticleHeroRatgeber = ({
  children,
  article,
  pageLayoutType,
  ...props
}: ArticleHeroPropsInner) => {
  if (!article) {
    return null;
  }
  const heroImageBody =
    (article?.heroImageBody &&
      Array.isArray(article.heroImageBody) &&
      article.heroImageBody.length > 0 &&
      article.heroImageBody[0]) ||
    null;

  const heroImageBodyType = heroImageBody?.__typename || 'unknown'; // just something so we fall in the default case

  const heroImageCredit = heroImageBody?.image?.credit || null;

  const heroImageGalleryItems =
    heroImageBody &&
    heroImageBody.gallery &&
    heroImageBody.gallery.items.filter(
      (galleryItem) =>
        (galleryItem.image && galleryItem.image.credit) ||
        galleryItem.__typename === VIDEO_PARAGRAPH,
    );

  const heroImageGallery =
    heroImageBody && heroImageGalleryItems && heroImageGalleryItems.length > 0
      ? {
          ...heroImageBody.gallery,
          items: heroImageGalleryItems,
        }
      : null;

  if (!heroImageGallery && !heroImageCredit && !heroImageBody?.video) {
    return (
      <div data-testid="article-image-authordateblock-wrapper">
        {children}
        {/* @ts-ignore TODO: TS2322 ->  Type 'ArticleInterface & EntityQueueReplaceableInterface & MetatagProviderInterface & NodeInterface & ... 4 more ... &  */}
        <AuthorDateBlock article={article} />
      </div>
    );
  }

  switch (heroImageBodyType) {
    case HERO_VIDEO:
      return (
        <TestFragment data-testid="article-image-articlevideo-wrapper">
          <ArticleVideo
            key={(article && article.id) || 0}
            /* @ts-ignore TODO: TS2322 ->  Type '{ __typename */
            video={heroImageBody}
            article={article}
          >
            {children}
          </ArticleVideo>
        </TestFragment>
      );
    case HERO_GALLERY:
      return (
        <TestFragment data-testid="article-image-imagegalleryhero-wrapper">
          <ClientSideOnly>
            <Suspense fallback={<SuspenseFallback />}>
              {/* @ts-ignore typings for heroImageGallery */}
              <ImageGalleryHero gallery={heroImageGallery} article={article}>
                {children}
              </ImageGalleryHero>
            </Suspense>
          </ClientSideOnly>
        </TestFragment>
      );
    case HERO_IMAGE:
      return (
        <TestFragment data-testid="article-image-articleimage-wrapper">
          <ArticleImage
            image={heroImageBody}
            article={article}
            pageLayoutType={pageLayoutType}
            {...props}
          >
            {children}
          </ArticleImage>
        </TestFragment>
      );
    default:
      // TODO: check if it's possible to create, might be sth to be removed
      return (
        <TestFragment data-testid="article-image-articledefaultratgeber-wrapper">
          <ArticleDefaultRatgeber article={article}>
            {children}
          </ArticleDefaultRatgeber>
        </TestFragment>
      );
  }
};

const HeroWrapper = (props: ArticleHeroPropsInner) => {
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  const beyondWordsPlayerInstance = props.article.gcid ? (
    <BeyondWordsPlayer
      articleId={props.article.gcid}
      restrictionStatus={props.article.restrictionStatus}
    />
  ) : null;

  const togglePlayerVisibility = () => {
    setIsPlayerVisible((prevState) => !prevState);
  };
  useEffect(() => {
    document.addEventListener(EVENT_UTILITY_BAR_PLAYER, togglePlayerVisibility);

    return () => {
      document.removeEventListener(
        EVENT_UTILITY_BAR_PLAYER,
        togglePlayerVisibility,
      );
    };
  }, []);

  return (
    <div className={TRACKING_CLASS_ARTICLE_HERO}>
      <div id={ANCHOR_HERO} className={styles.ArticleHeroWrapper}>
        <ArticleHeroRatgeber {...props} />
      </div>
      {!__TESTING__ && (
        <div>
          <div>
            <div className={classNames(props.articleColStyle, grid.Row)}>
              <div
                className={classNames(
                  'utility-bar-wrapper',
                  styles.UtilityBarWrapper,
                  grid.ColXl18,
                  grid.ColOffsetXl3,
                  grid.HideForPrint,
                )}
              >
                <BodyClassName className={styles.ArticleBody}>
                  <UtilityBar
                    enabledUtilities={UTILITYBAR_CONFIG_ARTICLE}
                    shouldUseSwipeable
                  >
                    {({ isOverlayVisible, toggleOverlayVisible }) => {
                      return (
                        <>
                          <div
                            className={classNames(styles.PlayerWrapper, {
                              [styles.Hidden]: !isPlayerVisible,
                            })}
                          >
                            {beyondWordsPlayerInstance}
                          </div>
                          <div className={styles.UtilityOverlayWrapper}>
                            <UtilityOverlay
                              overlayTitle="Artikel teilen"
                              isOverlayVisible={isOverlayVisible}
                              toggleOverlayVisible={toggleOverlayVisible}
                              enabledUtilities={
                                UTILITYBAR_OVERLAY_CONFIG_ARTICLE
                              }
                            />
                          </div>
                        </>
                      );
                    }}
                  </UtilityBar>
                </BodyClassName>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroWrapper;
