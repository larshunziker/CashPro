import React from 'react';
import classNames from 'classnames';
import {
  getZodiacSignIcon,
  getZodiacSignUrls,
  ZODIAC_SIGNS_DATA,
  ZodiacSign,
} from '../../../../../../../../shared/helpers/zodiacSigns';
import Link from '../../../../../../../../../common/components/Link';
import TestFragment from '../../../../../../../../../shared/tests/components/TestFragment';
import Icon from '../../../../../Icon';
import {
  TRACKING_CLASS_HOROSCOPE_STAGE_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../../../shared/constants/tracking';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { HoroscopeStageParagraphProps } from './typings';

const HoroscopeStageParagraph = ({
  ministageParagraph,
}: HoroscopeStageParagraphProps) => {
  const ministageHoroscope =
    ministageParagraph?.ministage as MinistageHoroscopes;
  if (!ministageHoroscope?.name || !ministageHoroscope?.shortTitle) {
    return null;
  }

  const name = ministageHoroscope.name;
  const shortTitle = ministageHoroscope.shortTitle;

  const renderSigns = ({ id, slug, title }: ZodiacSign) => {
    const zodiacSignUrls = getZodiacSignUrls(slug);
    return (
      <TestFragment
        data-testid="horoscope-stage-zodiacsign-container"
        key={`zodiac-sign-${id}`}
      >
        <Link path={zodiacSignUrls.daily} className={styles.ZodiacSign}>
          <>
            <Icon
              type={`IconZodiac${getZodiacSignIcon(slug)}`}
              addClass={styles.ZodiacSignIcon}
            />
            <div className={styles.ZodiacTitle}>{title}</div>
          </>
        </Link>
      </TestFragment>
    );
  };

  return (
    <div data-testid="horoscope-stage-container" className={grid.Container}>
      <div
        data-testid="horoscope-stage-container-shortTitle"
        className={classNames(
          TRACKING_CLASS_PARAGRAPH,
          TRACKING_CLASS_HOROSCOPE_STAGE_PARAGRAPH,
          styles.Wrapper,
        )}
      >
        <Link
          className={styles.ShortTitle}
          path="/horoskop"
          label={shortTitle}
        />

        <div
          data-testid="horoscope-stage-container-name"
          className={styles.Title}
        >
          {name}
        </div>

        <div className={styles.Zodiacs}>
          {ZODIAC_SIGNS_DATA.map(renderSigns)}
        </div>
      </div>
    </div>
  );
};

export default HoroscopeStageParagraph;
