import React from 'react';
import classNames from 'classnames';
import Picture from '../../../../../../../common/components/Picture';
import {
  STYLE_16X9_440,
  STYLE_16X9_560,
  STYLE_16X9_800,
} from '../../../../../../../shared/constants/images';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'file' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'lead' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'title' implicitly has an 'any' type. */
const Hero = ({ file, lead, title }) => {
  return (
    <div className={styles.HeroWrapper}>
      <div className={grid.Container}>
        <div className={grid.Row}>
          <div className={classNames(grid.ColXs24, grid.ColMd12)}>
            <div className={styles.HeroInnerWrapper}>
              <p className={styles.ShortTitle}>Bilanz</p>
              <p className={styles.HeroTitle}>{title}</p>
              {lead && (
                <span
                  className={styles.HeroLead}
                  dangerouslySetInnerHTML={{ __html: lead }}
                />
              )}
            </div>
          </div>
          {file?.relativeOriginPath && (
            <div
              className={classNames(
                grid.ColXs24,
                grid.ColMd12,
                styles.HeroImageWrapper,
              )}
            >
              <Picture
                relativeOrigin={file.relativeOriginPath}
                focalPointX={file.focalPointX}
                focalPointY={file.focalPointY}
                style_320={STYLE_16X9_440}
                style_540={STYLE_16X9_560}
                style_760={STYLE_16X9_800}
                alt={file.alt || ''}
                className={styles.HeroImage}
                downloadPriority="high"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
