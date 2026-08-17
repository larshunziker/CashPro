import React, { Suspense, useEffect, useState } from 'react';
import classNames from 'classnames';
import UtilityOverlay from '../../../../components/UtilityBar/components/UtilityOverlay';
import UtilityBar from '../../../../components/UtilityBar';
import AuthorDateBlock from '../../../../components/AuthorDateBlock';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import ClientSideOnly from '../../../../../../../common/components/ClientSideOnly';
import SuspenseFallback from '../../../../../../../common/components/SuspenseFallback';
import {
  HERO_GALLERY,
  HERO_IMAGE,
  HERO_VIDEO,
} from '../../../Article/components/ArticleHeroRatgeber';
import ImageGalleryHero from './components/ImageGalleryHero';
import VideoHero from './components/VideoHero';
import ImageHero from './components/ImageHero';
import BeyondWordsPlayer from '../../../../components/UtilityBar/components/BeyondWordsPlayer';
import {
  UTILITYBAR_CONFIG_ARTICLE,
  UTILITYBAR_OVERLAY_CONFIG_ARTICLE,
} from '../../constants';
import { ANCHOR_TITLE } from '../../../../../../../shared/constants/content';
import { VIDEO_PARAGRAPH } from '../../../../../../../shared/constants/paragraphs';
import { EVENT_UTILITY_BAR_PLAYER } from '../../../../../../../shared/constants/utilitybar';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { LongFormHeroProps } from '../../../../../../../common/screens/LongForm/typings';

/* @ts-ignore TODO: TS7031 ->  Binding element 'article' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'origin' implicitly has an 'any' type. */
const ArticleHero = ({ article, origin }) => {
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

  const heroImageGalleryItems =
    heroImageBody &&
    heroImageBody.gallery &&
    heroImageBody.gallery.items.filter(
      /* @ts-ignore TODO: TS7006 ->  Parameter 'galleryItem' implicitly has an 'any' type. */
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

  switch (heroImageBodyType) {
    case HERO_VIDEO:
      return (
        <TestFragment data-testid="article-image-articlevideo-wrapper">
          <VideoHero video={heroImageBody} article={article} />
        </TestFragment>
      );
    case HERO_GALLERY:
      return (
        <TestFragment data-testid="article-image-imagegalleryhero-wrapper">
          <ClientSideOnly>
            <Suspense fallback={<SuspenseFallback />}>
              {/* @ts-ignore typings for heroImageGallery */}
              <ImageGalleryHero gallery={heroImageGallery} />
            </Suspense>
          </ClientSideOnly>
        </TestFragment>
      );
    case HERO_IMAGE:
      return (
        <TestFragment data-testid="article-image-articleimage-wrapper">
          {/* @ts-ignore TODO: TS2786 ->  'ImageHero' cannot be used as a JSX component. */}
          <ImageHero article={article} origin={origin} />
        </TestFragment>
      );
  }
};

const LongFormHero = ({ article, origin }: LongFormHeroProps) => {
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  const beyondWordsPlayerInstance = article.gcid ? (
    <BeyondWordsPlayer
      articleId={article.gcid}
      restrictionStatus={article.restrictionStatus}
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
    <>
      <div className={grid.Container}>
        <div className={styles.LongReadArticleHeader}>
          {article?.shortTitle && (
            <p className={styles.ShortTitle}>{article.shortTitle}</p>
          )}

          <h1 id={ANCHOR_TITLE} className={styles.Title}>
            {article?.title || ''}
          </h1>

          {article?.lead && (
            <p className={styles.Description}>{article.lead}</p>
          )}

          <AuthorDateBlock
            /* @ts-ignore TODO: TS2322 ->  Type '(Article | NativeAdvertising) & { subtypeValue? */
            article={article}
            addClass={styles.AuthorDateBlock}
          />
        </div>
      </div>

      {/* @ts-ignore TODO: TS2786 ->  'ArticleHero' cannot be used as a JSX component. */}
      <ArticleHero article={article} origin={origin} />

      <div className={grid.Container}>
        <div
          className={classNames(
            'utility-bar-wrapper',
            grid.ColOffsetSm2,
            grid.ColSm20,
            grid.ColOffsetMd4,
            grid.ColMd16,
            styles.UtilityBarWrapper,
            grid.HideForPrint,
          )}
        >
          <UtilityBar
            enabledUtilities={UTILITYBAR_CONFIG_ARTICLE}
            shouldUseSwipeable
          >
            {({ isOverlayVisible, toggleOverlayVisible }) => (
              <>
                <div
                  className={classNames(styles.PlayerWrapper, {
                    [styles.Hidden]: !isPlayerVisible,
                  })}
                >
                  {beyondWordsPlayerInstance}
                </div>
                <div>
                  <UtilityOverlay
                    overlayTitle="Article teilen"
                    isOverlayVisible={isOverlayVisible}
                    toggleOverlayVisible={toggleOverlayVisible}
                    enabledUtilities={UTILITYBAR_OVERLAY_CONFIG_ARTICLE}
                  />
                </div>
              </>
            )}
          </UtilityBar>
        </div>
      </div>
    </>
  );
};

export default LongFormHero;
