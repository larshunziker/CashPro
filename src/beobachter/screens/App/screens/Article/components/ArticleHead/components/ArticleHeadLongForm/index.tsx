import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Picture from '../../../../../../../../../common/components/Picture';
import UtilityOverlay from '../../../../../../components/UtilityBar/components/UtilityOverlay';
import UtilityBar from '../../../../../../components/UtilityBar';
import AuthorDateBlock from '../../../../../../components/AuthorDateBlock';
import FullscreenButton from '../../../../../../components/FullscreenButton';
import BeyondWordsPlayer from '../../../../../../components/UtilityBar/components/BeyondWordsPlayer';
import {
  UTILITYBAR_CONFIG_ARTICLE,
  UTILITYBAR_OVERLAY_CONFIG_ARTICLE,
} from '../../../../constants';
import {
  IMAGE_FORMAT_PORTRAIT,
  STYLE_16X9_1130,
  STYLE_16X9_890,
  STYLE_2X3_210,
  STYLE_3X2_440,
  STYLE_3X2_770,
  STYLE_3X4_960,
} from '../../../../../../../../../shared/constants/images';
import {
  ANCHOR_HERO,
  ANCHOR_TITLE,
  ARTICLE_TYPE_OPINION,
  ARTICLE_TYPE_SPONSORED,
} from '../../../../../../../../../shared/constants/content';
import { EVENT_UTILITY_BAR_PLAYER } from '../../../../../../../../../shared/constants/utilitybar';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ArticleHeadLongFormProps } from './typings';

const ArticleHeadLongForm = ({ article, origin }: ArticleHeadLongFormProps) => {
  const isOldBodyWidth = [
    ARTICLE_TYPE_SPONSORED,
    ARTICLE_TYPE_OPINION,
  ].includes(article.subtypeValue);
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

  const bodyWidthStyle = isOldBodyWidth
    ? classNames(
        grid.ColSm22,
        grid.ColMd17,
        grid.ColXl14,
        grid.ColOffsetSm1,
        grid.ColOffsetMd1,
        grid.ColOffsetXl5,
      )
    : classNames([
        grid.ColOffsetSm2,
        grid.ColSm20,
        grid.ColOffsetMd4,
        grid.ColMd16,
      ]);
  const heroImageBody = article?.heroImageBody?.[0] as ImageParagraph;

  const shouldDisplayImageCredit = !heroImageBody?.suppressSource;
  const isPortrait = heroImageBody?.format === IMAGE_FORMAT_PORTRAIT;

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
            /* @ts-ignore TODO: TS2322 ->  Type 'ArticleInterface & EntityQueueReplaceableInterface & MetatagProviderInterface & NodeInterface & ... 4 more ... &  */
            article={article}
            addClass={styles.AuthorDateBlock}
          />
        </div>
      </div>

      {heroImageBody && heroImageBody?.image?.file?.relativeOriginPath && (
        <>
          <div className={classNames(grid.Container, styles.HeroImage)}>
            <div className={grid.Row}>
              <div
                className={classNames({
                  [grid.ColXs24]: !isPortrait,
                  [bodyWidthStyle]: isPortrait,
                })}
              >
                <figure
                  id={ANCHOR_HERO}
                  className={styles.HeroImage}
                  data-testid="longreadheader-authordate-wrapper"
                >
                  <Picture
                    downloadPriority="high"
                    relativeOrigin={heroImageBody.image.file.relativeOriginPath}
                    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                    focalPointX={heroImageBody.image.file.focalPointX}
                    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                    focalPointY={heroImageBody.image.file.focalPointY}
                    alt={heroImageBody.image?.file?.alt || ''}
                    title={heroImageBody.title || ''}
                    style_320={isPortrait ? STYLE_3X4_960 : STYLE_2X3_210}
                    style_540={isPortrait ? STYLE_3X4_960 : STYLE_3X2_440}
                    style_760={isPortrait ? STYLE_3X4_960 : STYLE_3X2_770}
                    style_960={isPortrait ? STYLE_3X4_960 : STYLE_16X9_890}
                    style_1680={isPortrait ? STYLE_3X4_960 : STYLE_16X9_1130}
                  />

                  <FullscreenButton
                    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
                    imageId={heroImageBody.id}
                    /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
                    origin={origin}
                  />
                </figure>
              </div>
            </div>
          </div>
          <div className={grid.Container}>
            <div className={grid.Row}>
              <div
                className={classNames({
                  [grid.ColXs24]: !isPortrait,
                  [bodyWidthStyle]: isPortrait,
                })}
              >
                <figcaption className={styles.Caption}>
                  {(heroImageBody.caption && (
                    <span
                      data-testid="longreadheader-imagecaption-wrapper"
                      dangerouslySetInnerHTML={{
                        __html: `${heroImageBody.caption} `,
                      }}
                    />
                  )) ||
                    ''}
                  {heroImageBody.image?.credit && shouldDisplayImageCredit && (
                    <span
                      className={styles.ArticleImageCredit}
                      data-testid="longreadheader-imagecredit-wrapper"
                    >
                      Quelle: {heroImageBody.image.credit}
                    </span>
                  )}
                </figcaption>
              </div>
            </div>
          </div>
        </>
      )}

      <div className={grid.Container}>
        <div
          className={classNames(
            'utility-bar-wrapper',
            styles.UtilityBarWrapper,
            grid.HideForPrint,
            bodyWidthStyle,
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

export default ArticleHeadLongForm;
