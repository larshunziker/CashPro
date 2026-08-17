import React, { ReactElement, memo } from 'react';
import classNames from 'classnames';
import {
  getZodiacSignIcon,
  getZodiacSignUrls,
} from '../../../../../../shared/helpers/zodiacSigns';
import Link from '../../../../../../../common/components/Link';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import ArrowButton from '../../../ArrowButton';
import Icon from '../../../Icon';
import { ARROW_BUTTON_THEME_LIGHT } from '../../../ArrowButton/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { TeaserHoroscopeProps } from './typings';

type TeaserHoroscopePropsInner = TeaserHoroscopeProps;

const TeaserHoroscope = ({
  title,
  from,
  to,
  slug,
}: TeaserHoroscopePropsInner): ReactElement => {
  if (!slug || !title || !from || !to) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }
  const zodiacSignUrls = getZodiacSignUrls(slug);
  return (
    <div className={styles.Wrapper} data-testid="teaser-horoscope-wrapper">
      <Icon
        type={`IconZodiac${getZodiacSignIcon(slug)}`}
        addClass={styles.ZodiacSignIcon}
      />

      {title && (
        <div className={styles.Title} data-testid="teaser-horoscope-title">
          {title}
        </div>
      )}

      {from && to && (
        <div
          className={styles.ShortTitle}
          data-testid="teaser-horoscope-short-title"
        >
          <span className={styles.TextFrom}>{from}</span>
          <span className={styles.TextDelimiter}>-</span>
          <span className={styles.TextTo}>{to}</span>
        </div>
      )}

      {slug && (
        <TestFragment datat-testid="teaser-horoscope-buttons">
          <Link path={zodiacSignUrls.daily}>
            <>
              <ArrowButton
                addClass={classNames(styles.ArrowButton, grid.HiddenXlUp)}
                theme={ARROW_BUTTON_THEME_LIGHT}
              >
                Tageshoroskop
              </ArrowButton>

              <ArrowButton
                addClass={classNames(styles.ArrowButton, grid.HiddenXlDown)}
                theme={ARROW_BUTTON_THEME_LIGHT}
                large
              >
                Tageshoroskop
              </ArrowButton>
            </>
          </Link>
          <Link path={zodiacSignUrls.yearly}>
            <>
              <ArrowButton
                addClass={classNames(styles.ArrowButton, grid.HiddenXlUp)}
                theme={ARROW_BUTTON_THEME_LIGHT}
              >
                Jahreshoroskop
              </ArrowButton>

              <ArrowButton
                addClass={classNames(styles.ArrowButton, grid.HiddenXlDown)}
                theme={ARROW_BUTTON_THEME_LIGHT}
                large
              >
                Jahreshoroskop
              </ArrowButton>
            </>
          </Link>
        </TestFragment>
      )}
    </div>
  );
};

export default memo<TeaserHoroscopeProps>(TeaserHoroscope);
