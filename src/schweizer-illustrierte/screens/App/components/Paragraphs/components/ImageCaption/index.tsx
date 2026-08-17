import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import cssClassByChannel from '../../../../../../shared/helpers/cssClassByChannel';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import { IMAGE_GALLERY_DETAIL_SCREEN } from '../../../../screens/ImageGalleryArticle/constants';
import { VIDEO_PAGE } from '../../../../screens/Video/constants';
import helpers from '../../../../assets/styles/helpers.legacy.css';
import styles from './styles.legacy.css';
import { ActiveMainChannel } from '../../../../../../shared/types';
import { ImageCaptionComponent, ImageCaptionProps } from './typings';

export type ImageCaptionPropsInner = ImageCaptionProps & {
  activeMainChannel: ActiveMainChannel;
};

const ImageCaption: ImageCaptionComponent = ({
  addClass = '',
  caption,
  credit,
  origin,
  activeMainChannel,
  suppressSource,
}: ImageCaptionPropsInner): ReactElement => {
  if (!caption && !credit) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }
  const getThemedClass = cssClassByChannel(styles, activeMainChannel);

  return (
    <figcaption
      className={classNames(styles.TextWrapper, {
        [addClass]: !!addClass,
        [styles.GalleryDetailSpacing]: origin === IMAGE_GALLERY_DETAIL_SCREEN,
        [styles.TextWrapperVideoDetail]: origin === VIDEO_PAGE,
      })}
    >
      {caption && origin !== VIDEO_PAGE && (
        <span
          className={classNames(
            getThemedClass('RichtextWrapper'),
            getThemedClass('CaptionAuthorParagraph'),
            {
              /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
              [getThemedClass('ParagraphWhite')]:
                origin === IMAGE_GALLERY_DETAIL_SCREEN,
            },
          )}
          dangerouslySetInnerHTML={{ __html: `${caption} ` }}
        />
      )}
      {credit && !suppressSource && (
        <span
          className={classNames(getThemedClass('CaptionAuthorCopyRight'), {
            [helpers.TextNowrap]: origin === IMAGE_GALLERY_DETAIL_SCREEN,
          })}
          dangerouslySetInnerHTML={{ __html: credit }}
        />
      )}
    </figcaption>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

export default connect(mapStateToProps)(ImageCaption);
