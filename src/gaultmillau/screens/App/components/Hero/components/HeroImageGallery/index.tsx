import React, { ComponentType, useState } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views'. '/Users/bhs/code/work/rasch-stack/node_modules/re */
import SwipeableViews from 'react-swipeable-views';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-core/lib/mod'. '/Users/bhs/code/work/rasch-stack/no */
import mod from 'react-swipeable-views-core/lib/mod';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-utils/lib/virtualize'. '/Users/bhs/code/work/rasch- */
import virtualize from 'react-swipeable-views-utils/lib/virtualize';
import classNames from 'classnames';
import { VideoType } from '../../../../../../../shared/helpers/createVideoObjectJsonLd';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/helpers/ensureVideo'. '/Users/bhs/code/work/r */
import { ensureVideoItem } from '../../../../../../../shared/helpers/ensureVideo';
import Picture from '../../../../../../../common/components/Picture';
import Icon from '../../../Icon';
import VideoParagraphComponent from '../../../Paragraphs/components/VideoParagraph';
import { STYLE_HEADER_16_9_LARGE } from '../../../../../../../shared/constants/images';
import {
  IMAGE_PARAGRAPH,
  VIDEO_PARAGRAPH,
} from '../../../../../../../shared/constants/paragraphs';
import { HERO_IMAGE_GALLERY_ORIGIN } from '../../constants';
import styles from './styles.legacy.css';
import type { HeroImageGalleryProps } from './typings';

const EnhancedSwipeableViews = virtualize(SwipeableViews);

const onSlideChange = () => {
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  if (!global?.videojs?.players) {
    return;
  }
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  Object.keys(global.videojs.players).forEach((key: string) => {
    let thePlayer: any = {};
    try {
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      thePlayer = global.videojs(key);

      if (thePlayer) {
        thePlayer.pause();
      }
    } catch (e) {
      // ignore
    }
  });
};

const HeroImageGallery: ComponentType<HeroImageGalleryProps> = ({
  gallery,
  children,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleIndexChange = (index: number) => {
    setActiveIndex(index);
    onSlideChange();
  };

  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
  const itemsCount: number = gallery.body.length;

  return (
    <div className={classNames('hero-image-gallery', styles.Wrapper)}>
      <EnhancedSwipeableViews
        index={activeIndex}
        onChangeIndex={handleIndexChange}
        enableMouseEvents={false}
        containerStyle={{ width: '100%' }}
        /* @ts-ignore TODO: TS7031 ->  Binding element 'key' implicitly has an 'any' type. */
        /* @ts-ignore TODO: TS7031 ->  Binding element 'index' implicitly has an 'any' type. */
        slideRenderer={({ key, index }) => {
          const idx = mod(index, itemsCount);
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<ParagraphInterface>' is not assignable to type 'ImageParagraph | VideoParagraph'. */
          /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
          const entry: ImageParagraph | VideoParagraph = gallery.body[idx];

          const ensuredEntry: ImageParagraph | VideoParagraph =
            entry.__typename === VIDEO_PARAGRAPH
              ? ensureVideoItem(entry)
              : entry;

          return (
            <div
              key={`hero-image-gallery-${key}-${ensuredEntry.id || index}`}
              className={styles.Slide}
            >
              {ensuredEntry.__typename === IMAGE_PARAGRAPH && (
                <Picture
                  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                  relativeOrigin={ensuredEntry?.image?.file?.relativeOriginPath}
                  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                  focalPointX={ensuredEntry?.image?.file?.focalPointX}
                  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                  focalPointY={ensuredEntry?.image?.file?.focalPointY}
                  alt={ensuredEntry?.image?.file?.alt || ''}
                  style_320={STYLE_HEADER_16_9_LARGE}
                  disableWrapperClassName
                  downloadPriority="high"
                />
              )}

              {ensuredEntry.__typename === VIDEO_PARAGRAPH && (
                <div className={styles.VideoWrapper}>
                  <VideoParagraphComponent
                    video={ensuredEntry.video as VideoType}
                    origin={HERO_IMAGE_GALLERY_ORIGIN}
                  />
                </div>
              )}
            </div>
          );
        }}
      />

      <div className={styles.NavigationWrapper}>
        <button
          onClick={() => {
            handleIndexChange(activeIndex - 1);
          }}
          className={styles.PrevButton}
          title="previous"
        >
          <Icon type="IconChevronLeft" />
        </button>
        <button
          onClick={() => {
            handleIndexChange(activeIndex + 1);
          }}
          className={styles.NextButton}
          title="next"
        >
          <Icon type="IconChevronRight" />
        </button>
      </div>

      {children}
    </div>
  );
};

export default HeroImageGallery;
