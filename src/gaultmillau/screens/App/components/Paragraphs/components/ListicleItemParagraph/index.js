import React from 'react';
import classNames from 'classnames';
import Link from 'Link';
import Picture from 'Picture';
import { STYLE_TEASER_3_2, STYLE_TEASER_3_2_LARGE } from 'constants/images';
import {
  TRACKING_CLASS_MINISTAGE_LISTICLE_ITEM_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from 'constants/tracking';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const ListicleItemParagraph = ({ listicleItem, listicleIndex }) => {
  const isFirstListicle = listicleIndex === 0;
  const isFourthListicle = !isFirstListicle && listicleIndex % 3 === 0;
  const showBiggerImage = isFirstListicle || isFourthListicle;

  const contentColConfig = classNames({
    [grid.ColSm10]: isFirstListicle,
    [grid.ColSm8]: isFourthListicle,
    [grid.ColSm7]: !showBiggerImage,
    [grid.ColMd8]: isFirstListicle,
  });

  const imageColConfig = classNames({
    [grid.ColSm16]: isFourthListicle,
    [grid.ColSm14]: !isFourthListicle,
    [grid.ColMd16]: showBiggerImage,
    [grid.ColMd11]: !showBiggerImage,
  });

  const indexJsx = (
    <div
      className={classNames(styles.Index, {
        [grid.ColSm3]: !showBiggerImage,
        [grid.ColMd6]: !showBiggerImage,
      })}
    >
      {listicleIndex + 1}
    </div>
  );

  /* eslint-disable react/no-danger */
  const contentColJsx = (
    <Link
      {...listicleItem.link}
      className={classNames(contentColConfig, styles.MobileOrder)}
    >
      <div
        className={classNames({
          [grid.HiddenSmUp]: !(isFirstListicle || isFourthListicle),
        })}
      >
        {indexJsx}
      </div>
      <div className={styles.Title}>{listicleItem.title || ''}</div>

      {/* the content comes with <p> tags so we must use "dangerouslySetInnerHTML" */}
      <div
        className={styles.Content}
        dangerouslySetInnerHTML={{
          __html: listicleItem.text || '',
        }}
      />

      {/* the footer comes with <p>'s and optional <u> tags so we must use "dangerouslySetInnerHTML" */}
      <div
        className={styles.Footer}
        dangerouslySetInnerHTML={{
          __html: listicleItem.footer || '',
        }}
      />
    </Link>
  );

  const image = listicleItem.image?.image || null;

  const imageColJsx = image?.file?.relativeOriginPath ? (
    <div className={imageColConfig}>
      <div className={styles.ImageBox}>
        {listicleItem.featured && (
          <div
            className={classNames(styles.Choice, {
              [styles.ChoiceLeft]: listicleIndex % 2 === 0,
              [styles.ChoiceRight]: listicleIndex % 2 !== 0,
            })}
          />
        )}
        <Link {...listicleItem.link} className={styles.ImageWrapper}>
          <Picture
            relativeOrigin={image?.file?.relativeOriginPath}
            focalPointX={image?.file?.focalPointX}
            focalPointY={image?.file?.focalPointY}
            style_320={STYLE_TEASER_3_2}
            style_760={STYLE_TEASER_3_2_LARGE}
            alt={listicleItem.image?.image?.file?.alt || ''}
            className={styles.Image}
          />
        </Link>
      </div>
    </div>
  ) : null;

  // desktop layout, first and even rows
  let listicleJsx = (
    <div
      className={classNames(grid.Row, {
        [styles.First]: isFirstListicle,
      })}
    >
      {contentColJsx}
      {imageColJsx}
    </div>
  );

  // desktop layout, un-even rows
  if (listicleIndex % 2 !== 0) {
    listicleJsx = (
      <div
        className={classNames(grid.Row, {
          [styles.First]: isFirstListicle,
          [styles.NotFirst]: !isFirstListicle,
        })}
      >
        {imageColJsx}
        {contentColJsx}
      </div>
    );
  }

  // -> on desktop, 3-column layout when not first
  if (!isFirstListicle && !isFourthListicle) {
    if (listicleIndex % 2 !== 0) {
      listicleJsx = (
        <div
          className={classNames(grid.Row, {
            [styles.First]: isFirstListicle,
            [styles.NotFirst]: !isFirstListicle,
          })}
        >
          {imageColJsx}
          {contentColJsx}
          <div
            className={classNames(styles.Index, grid.HiddenSmDown, {
              [grid.ColSm3]: !showBiggerImage,
              [grid.ColMd6]: !showBiggerImage,
            })}
          >
            {listicleIndex + 1}
          </div>
        </div>
      );
    } else {
      listicleJsx = (
        <div
          className={classNames(grid.Row, {
            [styles.First]: isFirstListicle,
            [styles.NotFirst]: !isFirstListicle,
          })}
        >
          <div
            className={classNames(styles.Index, grid.HiddenSmDown, {
              [grid.ColSm3]: !showBiggerImage,
              [grid.ColMd6]: !showBiggerImage,
            })}
          >
            {listicleIndex + 1}
          </div>
          {contentColJsx}
          {imageColJsx}
        </div>
      );
    }
  } else if (isFourthListicle) {
    // -> on desktop, again 2-column layout on every third entry but not the first
    if (listicleIndex % 2 !== 0) {
      listicleJsx = (
        <div
          className={classNames(styles.EveryThird, grid.Row, {
            [styles.First]: isFirstListicle,
            [styles.NotFirst]: !isFirstListicle,
          })}
        >
          {imageColJsx}
          {contentColJsx}
        </div>
      );
    } else {
      listicleJsx = (
        <div
          className={classNames(styles.EveryThird, grid.Row, {
            [styles.First]: isFirstListicle,
            [styles.NotFirst]: !isFirstListicle,
          })}
        >
          {contentColJsx}
          {imageColJsx}
        </div>
      );
    }
  }

  return (
    <div
      className={classNames(
        TRACKING_CLASS_PARAGRAPH,
        TRACKING_CLASS_MINISTAGE_LISTICLE_ITEM_PARAGRAPH,
        styles.Wrapper,
      )}
    >
      {listicleJsx}
    </div>
  );
};

export default ListicleItemParagraph;
