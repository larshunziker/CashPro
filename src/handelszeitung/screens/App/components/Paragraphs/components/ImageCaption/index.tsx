import React, { ReactElement } from 'react';
import classNames from 'classnames';
import {
  PAGESCREEN_MARKETING_TYPE,
  PAGESCREEN_MARKETING_TYPE_LONGFORM,
} from '../../../../screens/PageScreen/constants';
import styles from './styles.legacy.css';
import { ImageCaptionProps } from './typings';

const ImageCaption = ({
  caption,
  credit,
  origin = '',
  suppressSource,
}: ImageCaptionProps): ReactElement => (
  <div className={classNames('image-caption', styles.Wrapper)}>
    {caption && (
      <span
        className={classNames({
          [styles.CaptionMarketingPage]:
            origin === PAGESCREEN_MARKETING_TYPE ||
            origin === PAGESCREEN_MARKETING_TYPE_LONGFORM,
        })}
        dangerouslySetInnerHTML={{ __html: caption }}
      />
    )}
    {credit && !suppressSource && (
      <div className={styles.Credits}>Quelle: {credit}</div>
    )}
  </div>
);

export default ImageCaption;
