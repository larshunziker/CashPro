import React from 'react';
import classNames from 'classnames';
import { getZodiacSignIcon } from '../../../../../../shared/helpers/zodiacSigns';
import Icon from '../../../../components/Icon';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { HeadProps } from './typings';

const Head = ({
  isYearly,
  shortTitle,
  title,
  subtitle,
  zodiacSlug,
}: HeadProps) => {
  if (!zodiacSlug || !zodiacSlug.length || !shortTitle || !title || !subtitle) {
    return null;
  }

  return (
    <div
      className={classNames(grid.Container, styles.Wrapper, {
        [styles.Yearly]: isYearly,
      })}
      data-testid="head-wrapper"
    >
      <div className={grid.Row}>
        <div
          className={classNames(
            grid.ColOffsetSm2,
            grid.ColSm4,
            grid.ColOffsetXl2,
            grid.ColXl3,
            styles.IconWrapper,
          )}
        >
          <div
            className={classNames(styles.IconWrapperInner, {
              [styles.Yearly]: isYearly,
            })}
            data-testid="icon-wrapper"
          >
            <Icon
              type={`IconZodiac${getZodiacSignIcon(zodiacSlug)}`}
              addClass={classNames(styles.ZodiacSignIcon, {
                [styles.Yearly]: isYearly,
              })}
            />
          </div>
        </div>
        <div
          className={classNames(grid.ColSm16, grid.ColXl14, styles.TextWrapper)}
        >
          <div
            className={classNames(styles.TextWrapperInner, {
              [styles.Yearly]: isYearly,
            })}
          >
            <span
              data-testid="short-title-wrapper"
              className={styles.ShortTitle}
            >
              {shortTitle}
            </span>

            <h1 data-testid="title-wrapper" className={styles.Title}>
              {title}
            </h1>

            <p data-testid="subtitle-wrapper" className={styles.Subtitle}>
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Head;
