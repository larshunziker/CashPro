import React, { memo } from 'react';
import classNames from 'classnames';
import {
  PAGESCREEN_MARKETING_TYPE_LONGFORM,
  PAGE_SCREEN_MARKETING_TYPE,
} from '../../../../screens/PageScreen/constants';
import { VIDEO_PAGE } from '../../../../screens/Video/constants';
import styles from './styles.legacy.css';
import { ImageCaptionProps } from './typings';

type ImageCaptionPropsInner = ImageCaptionProps;

const ImageCaption = ({
  caption,
  credit,
  addClass = '',
  origin,
  suppressSource,
  sourceDescription = 'Quelle:',
}: ImageCaptionPropsInner) => (
  <div
    className={classNames('image-caption', styles.Wrapper, {
      [addClass]: !!addClass,
    })}
  >
    {caption && origin !== VIDEO_PAGE && (
      <span
        className={classNames(styles.Caption, {
          [styles.MarketingPage]:
            origin === PAGE_SCREEN_MARKETING_TYPE ||
            origin === PAGESCREEN_MARKETING_TYPE_LONGFORM,
        })}
        dangerouslySetInnerHTML={{ __html: caption }}
        itemProp="caption"
      />
    )}
    {credit && !suppressSource && (
      <div className={styles.Credits}>{` ${sourceDescription} ${credit}`}</div>
    )}
  </div>
);

export default memo(ImageCaption);
