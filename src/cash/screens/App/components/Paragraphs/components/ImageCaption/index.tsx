import React, { memo } from 'react';
import classNames from 'classnames';
import {
  PAGESCREEN_MARKETING_TYPE,
  PAGESCREEN_MARKETING_TYPE_LONGFORM,
} from '../../../../screens/PageScreen/constants';
import { VIDEO_PAGE } from '../../../../screens/Video/constants';
import styles from './styles.legacy.css';
import { ImageCaptionProps } from './typings';

type ImageCaptionPropsInner = ImageCaptionProps;

const ImageCaption = ({
  caption,
  credit,
  addClass = '',
  origin = '',
  suppressSource,
}: ImageCaptionPropsInner) => (
  <div
    className={classNames('image-caption', styles.Wrapper, {
      [addClass]: !!addClass,
    })}
  >
    {credit && caption && (
      <span
        className={classNames(styles.Caption, {
          [styles.CaptionMarketingPage]:
            origin === PAGESCREEN_MARKETING_TYPE ||
            origin === PAGESCREEN_MARKETING_TYPE_LONGFORM,
        })}
        dangerouslySetInnerHTML={{ __html: caption }}
        itemProp="caption"
      />
    )}
    {credit && !suppressSource && (
      <div
        className={classNames(styles.Credits, {
          [styles.CreditsVideoPage]: origin === VIDEO_PAGE,
        })}
      >{` Quelle: ${credit}`}</div>
    )}
  </div>
);

export default memo(ImageCaption);
