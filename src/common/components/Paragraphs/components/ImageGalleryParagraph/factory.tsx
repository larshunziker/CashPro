/**
 * @file   paragraphs - image gallery paragraph factory
 */

import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { noop } from '../../../../../shared/helpers/utils';
import {
  TRACKING_CLASS_IMAGE_GALLERY_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../shared/constants/tracking';
import {
  ImageGalleryParagraphFactoryOptions,
  ImageGalleryParagraphProps,
} from './typings';

type ImageGalleryParagraphPropsInner = ImageGalleryParagraphProps;

export default ({
  ImageGallery,
  getComponentSwitchValueByProps = noop,
}: ImageGalleryParagraphFactoryOptions) => {
  const ImageGalleryParagraph = (
    props: ImageGalleryParagraphPropsInner,
  ): ReactElement | null => {
    const { gallery }: ImageGalleryParagraphPropsInner = props;
    if (!gallery?.gallery) {
      return null;
    }

    return (
      <div
        data-testid="imagegalleryparagraph-container"
        className={classNames(
          TRACKING_CLASS_PARAGRAPH,
          TRACKING_CLASS_IMAGE_GALLERY_PARAGRAPH,
        )}
      >
        <ImageGallery
          gallery={gallery || {}}
          hasTitleOverride={gallery?.hasTitleOverride || false}
          title={gallery?.title || ''}
          component={getComponentSwitchValueByProps(props)}
          origin={props.origin}
        />
      </div>
    );
  };

  return ImageGalleryParagraph;
};
