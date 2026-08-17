import React, { ComponentType, memo } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import teaserFactory from '../../../../../../../common/components/Teaser/factory';
import cssClassByChannel from '../../../../../../shared/helpers/cssClassByChannel';
import { isIconVisible } from '../../shared/helpers';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import Picture from '../../../../../../../common/components/Picture';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import Icon from '../../../Icon';
import {
  IMAGE_GALLERY_CONTENT_TYPE,
  VIDEO_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';
import {
  FULLSCREEN_HASH,
  FULLSCREEN_HASH_TEASER_CLICK,
} from '../../../../../../../shared/constants/fullscreen';
import {
  STYLE_1X1_140,
  STYLE_3X2_440,
  STYLE_3X2_770,
} from '../../../../../../../shared/constants/images';
import styles from './styles.legacy.css';
import {
  GetElementByProps,
  TeaserFactoryProps,
} from '../../../../../../../common/components/Teaser/typings';
import { ActiveMainChannel } from '../../../../../../shared/types';

type TeaserBlogPostMaxiPropsInner = TeaserFactoryProps & {
  activeMainChannel: ActiveMainChannel;
};

/* @ts-ignore TODO: TS2322 ->  Type '({ authors, channel } */
export const getChildrenByProps: GetElementByProps<
  TeaserBlogPostMaxiPropsInner
> = ({ authors, channel }) => {
  const author =
    authors?.edges?.[0]?.node || channel?.authors?.edges?.[0]?.node || null;

  if (!author) {
    return null;
  }

  const imagePath =
    author.imageParagraph?.image?.file?.relativeOriginPath || '';
  const focalPointX = author?.imageParagraph?.image?.file?.focalPointX || null;
  const focalPointY = author?.imageParagraph?.image?.file?.focalPointY || null;
  const imageAlt = author.imageParagraph?.image?.file?.alt || '';

  return (
    <div className={styles.AuthorBox}>
      <div className={styles.AuthorName}>von {author.name}</div>
      {imagePath && (
        <TestFragment data-testid="TeaserBlogPostMaxi-Author-Picture-Wrapper">
          <Picture
            relativeOrigin={imagePath}
            /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
            focalPointX={focalPointX}
            /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
            focalPointY={focalPointY}
            alt={imageAlt}
            className={styles.AuthorImage}
            style_320={STYLE_1X1_140}
          />
        </TestFragment>
      )}
    </div>
  );
};

/* @ts-ignore TODO: TS2322 ->  Type '({ hasVideo, __typename, activeMainChannel } */
export const getIconByProps: GetElementByProps<
  TeaserBlogPostMaxiPropsInner
> = ({ hasVideo, __typename, activeMainChannel }) => {
  const getThemedClass = cssClassByChannel(styles, activeMainChannel);

  /* @ts-ignore TODO: TS2345 ->  Argument of type 'boolean | undefined' is not assignable to parameter of type 'boolean'. */
  if (!isIconVisible(hasVideo, __typename)) {
    return null;
  }

  return (
    <Icon
      type={classNames({
        IconCamera: hasVideo,
        IconFotoMarker: __typename === IMAGE_GALLERY_CONTENT_TYPE,
        IconMovieOutline: __typename === VIDEO_CONTENT_TYPE,
      })}
      addClass={classNames({
        /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
        [getThemedClass('IconStyle')]: __typename !== VIDEO_CONTENT_TYPE,
        [styles.IconMovieOutlineStyle]: __typename === VIDEO_CONTENT_TYPE,
      })}
    />
  );
};

const TeaserBlogPostMaxi = teaserFactory({
  icon: getIconByProps,
  isIconPositionOnImage: true,
  children: getChildrenByProps,
  styles: {
    ContentWrapper: styles.ContentWrapper,
    Image: styles.Image,
    ImageWrapper: styles.ImageWrapper,
    ShortTitle: styles.ShortTitle,
    Title: styles.Title,
    TitleInner: styles.TitleInner,
    Wrapper: styles.Wrapper,
    IconStyle: styles.IconStyle,
  },
  teaserImageStyles: {
    style_320: STYLE_3X2_770,
    style_760: STYLE_3X2_440,
    style_1680: STYLE_3X2_770,
  },
  fullScreenHashTeaserClick: FULLSCREEN_HASH_TEASER_CLICK,
  fullScreenHash: FULLSCREEN_HASH,
}) as ComponentType<TeaserBlogPostMaxiPropsInner>;

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

export default connect(mapStateToProps)(memo(TeaserBlogPostMaxi));
