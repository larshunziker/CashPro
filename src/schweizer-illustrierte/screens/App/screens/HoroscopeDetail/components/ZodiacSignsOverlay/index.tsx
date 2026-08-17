import React, { Component } from 'react';
import classNames from 'classnames';
import {
  ZODIAC_SIGNS_DATA,
  ZodiacSign,
  getZodiacSignIcon,
  getZodiacSignUrls,
} from '../../../../../../shared/helpers/zodiacSigns';
import Link from '../../../../../../../common/components/Link';
import Icon from '../../../../components/Icon';
import ModalOverlay from '../../../../components/ModalOverlay';
import { HOROSCOPE_OVERLAY } from '../../../../components/ModalOverlay/constants';
import styles from './styles.legacy.css';
import { ZodiacSignsOverlayProps } from './typings';

class ZodiacSignsOverlay extends Component<ZodiacSignsOverlayProps> {
  renderZodiacSign = ({ slug, id, title }: ZodiacSign) => {
    const { isYearly, current, toggleHandler } = this.props;
    const { yearly, daily } = getZodiacSignUrls(slug);
    const zodiacUrl = isYearly ? yearly : daily;

    return (
      <li
        key={`zodiac-sign-${zodiacUrl}`}
        className={styles.Item}
        data-testid="zodiac-sign"
      >
        <Link
          path={zodiacUrl}
          className={classNames(styles.ItemLink, {
            [styles.Active]: id && current && id === current.id,
          })}
          onClick={toggleHandler}
          data-testid="zodiac-sign-link"
        >
          <>
            <span className={styles.IconWrapper}>
              <span
                className={classNames(styles.Icon, {
                  [styles.Yearly]: isYearly,
                })}
              >
                <Icon
                  type={`IconZodiac${getZodiacSignIcon(slug)}`}
                  data-testid="zodiac-sign-icon"
                />
              </span>
            </span>

            <span
              className={classNames(styles.ItemTitle, {
                [styles.Yearly]: isYearly,
              })}
              data-testid="zodiac-sign-title"
            >
              {title}
            </span>
          </>
        </Link>
      </li>
    );
  };

  render() {
    const { toggleHandler, isYearly, title, subtitle } = this.props;
    return (
      <div data-testid="zodiac-signs-wrapper">
        <ModalOverlay
          isVisible={true}
          isDifferentFlavour={isYearly}
          component={HOROSCOPE_OVERLAY}
        >
          <>
            <Icon
              type="IconCloseButtonSimple"
              onClick={toggleHandler}
              addClass={styles.CloseButton}
              data-testid="close-button"
            />

            {title && (
              <p
                className={classNames(styles.Title, {
                  [styles.Yearly]: isYearly,
                })}
                data-testid="title"
              >
                {title}
              </p>
            )}

            {subtitle && (
              <span
                className={classNames(styles.Subtitle, {
                  [styles.Yearly]: isYearly,
                })}
                data-testid="subtitle"
              >
                {subtitle}
              </span>
            )}

            <ul className={styles.ItemList}>
              {ZODIAC_SIGNS_DATA.map(this.renderZodiacSign)}
            </ul>
          </>
        </ModalOverlay>
      </div>
    );
  }
}

export default ZodiacSignsOverlay;
