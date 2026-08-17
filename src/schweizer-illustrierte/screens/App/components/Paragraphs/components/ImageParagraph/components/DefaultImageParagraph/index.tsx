import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import cssClassByChannel from '../../../../../../../../shared/helpers/cssClassByChannel';
import settingsStateSelector from '../../../../../../../../shared/selectors/settingsStateSelector';
import Picture from '../../../../../../../../../common/components/Picture';
import FullscreenButton from '../../../../../FullscreenButton';
import ImageCaption from '../../../ImageCaption';
import {
  IMAGE_FORMAT_DEFAULT,
  IMAGE_FORMAT_LANDSCAPE,
  IMAGE_FORMAT_PORTRAIT,
  IMAGE_FORMAT_SQUARE,
  STYLE_1X1_410,
  STYLE_1X1_495,
  STYLE_1X1_640,
  STYLE_2X3_210,
  STYLE_2X3_305,
  STYLE_2X3_360,
  STYLE_2X3_960,
  STYLE_3X2_440,
  STYLE_3X2_770,
} from '../../../../../../../../../shared/constants/images';
import { MULTI_COLUMNS_PARAGRAPH } from '../../../../../../../../../shared/constants/paragraphs';
import {
  TRACKING_CLASS_DEFAULT_IMAGE_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../../../shared/constants/tracking';
import { INFO_BOX_TYPE } from '../../..//InfoBoxParagraph/constants';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../../../../../../../../common/assets/styles/sections.legacy.css';
import helpers from '../../../../../../assets/styles/helpers.legacy.css';
import styles from './styles.legacy.css';
import { ActiveMainChannel } from '../../../../../../../../shared/types';
import { ImageParagraphProps } from '../../../ImageParagraph/typings';

export const FORMAT_STYLE_MAPPING = {
  [IMAGE_FORMAT_LANDSCAPE]: {
    style_320: STYLE_3X2_440,
    style_540: STYLE_3X2_770,
  },
  [IMAGE_FORMAT_PORTRAIT]: {
    style_320: STYLE_2X3_360,
    style_540: STYLE_2X3_960,
    style_760: STYLE_2X3_210,
    style_960: STYLE_2X3_305,
    style_1680: STYLE_2X3_360,
  },
  [IMAGE_FORMAT_SQUARE]: {
    style_320: STYLE_1X1_410,
    style_480: STYLE_1X1_495,
    style_540: STYLE_1X1_640,
    style_760: STYLE_1X1_410,
    style_960: STYLE_1X1_495,
  },
};

export type DefaultImageParagraphPropsInner = ImageParagraphProps & {
  activeMainChannel: ActiveMainChannel;
};

const getFormatClasses = (format: string) => {
  switch (format) {
    case IMAGE_FORMAT_PORTRAIT:
      return [grid.ColSm12, grid.ColOffsetSm6].join(' ');
    case IMAGE_FORMAT_SQUARE:
      return [grid.ColSm16, grid.ColOffsetSm4].join(' ');

    default:
      return '';
  }
};

const IMAGE_PARAGRAPH_IDENTIFIER = 'inline-image-paragraph';

// ---------------------------------------------------------------------------------- //
// COMPONENT
// ---------------------------------------------------------------------------------- //

const DefaultImageParagraph = ({
  imageParagraph,
  activeMainChannel,
  origin,
  heroMediaParagraph,
}: DefaultImageParagraphPropsInner): ReactElement => {
  if (!imageParagraph || !imageParagraph.image) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  const imageFormat = imageParagraph.format || IMAGE_FORMAT_DEFAULT;
  const imagePath = imageParagraph.image?.file?.relativeOriginPath || '';
  const focalPointX = imageParagraph?.image?.file?.focalPointX || null;
  const focalPointY = imageParagraph?.image?.file?.focalPointY || null;
  const imageAlt = imageParagraph.image?.file?.alt || '';
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ landscape */
  const imageStyles = FORMAT_STYLE_MAPPING[imageFormat];
  const originalUrl =
    (imageParagraph.image?.showOriginal &&
      imageParagraph.image?.file?.origin) ||
    null;

  const getThemedClass = cssClassByChannel(styles, activeMainChannel);

  return (
    <div
      className={classNames(
        TRACKING_CLASS_PARAGRAPH,
        TRACKING_CLASS_DEFAULT_IMAGE_PARAGRAPH,
        {
          [grid.Row]:
            (imageFormat === IMAGE_FORMAT_PORTRAIT ||
              imageFormat === IMAGE_FORMAT_SQUARE) &&
            origin !== MULTI_COLUMNS_PARAGRAPH &&
            !imageParagraph.fullWidth &&
            !heroMediaParagraph,
        },
      )}
      data-testid="default-imageparagraph-wrapper"
    >
      {imageParagraph.title && (
        <div
          data-testid="default-imageparagraph-title-wrapper"
          className={styles.TitleWrapper}
        >
          <h2
            data-testid="default-imageparagraph-title"
            className={getThemedClass('Title')}
          >
            {imageParagraph.title}
          </h2>
        </div>
      )}

      <figure
        className={classNames({
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
          [getFormatClasses(imageParagraph.format)]:
            origin !== MULTI_COLUMNS_PARAGRAPH &&
            !imageParagraph.fullWidth &&
            !heroMediaParagraph,
          [styles.InfoBoxMargin]: origin === INFO_BOX_TYPE,
          [styles.Wrapper]: !heroMediaParagraph,
        })}
      >
        <div className={styles.ImageInnerWrapper}>
          {!heroMediaParagraph && (
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
            <FullscreenButton imageId={imageParagraph.id} origin={origin} />
          )}
          {((imagePath || originalUrl) && (
            <Picture
              url={originalUrl}
              showOriginal={imageParagraph.image?.showOriginal}
              relativeOrigin={imagePath}
              focalPointX={focalPointX}
              focalPointY={focalPointY}
              alt={imageAlt}
              className={classNames(
                IMAGE_PARAGRAPH_IDENTIFIER,
                sections.Section,
              )}
              {...imageStyles}
            />
          )) ||
            null}
        </div>
        {!heroMediaParagraph &&
          (imageParagraph.caption || imageParagraph.image?.credit) && (
            <ImageCaption
              addClass={helpers.Margin0}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
              caption={imageParagraph.caption}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
              credit={imageParagraph.image?.credit}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
              suppressSource={imageParagraph.suppressSource}
            />
          )}
      </figure>
    </div>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

export default connect(mapStateToProps)(DefaultImageParagraph);
