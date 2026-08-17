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
import styles from './styles.legacy.css';
import { ZodiacSignsProps } from './typings';

class ZodiacSigns extends Component<ZodiacSignsProps> {
  renderZodiacSign = ({ slug, id, title }: ZodiacSign) => {
    const { isYearly, current } = this.props;
    const { yearly, daily } = getZodiacSignUrls(slug);
    const zodiacUrl = isYearly ? yearly : daily;
    return (
      <li
        key={`zodiac-sign-${zodiacUrl}`}
        className={styles.IconWrapper}
        data-testid="zodiac-sign"
      >
        <Link
          path={zodiacUrl}
          className={classNames(styles.Icon, {
            [styles.Active]: id && current && id === current.id,
            [styles.Yearly]: isYearly,
          })}
          title={title}
          data-testid="zodiac-sign-link"
        >
          <Icon type={`IconZodiac${getZodiacSignIcon(slug)}`} />
        </Link>
      </li>
    );
  };

  render() {
    return (
      <ul className={styles.IconList} data-testid="zodiac-signs-wrapper">
        {ZODIAC_SIGNS_DATA.map(this.renderZodiacSign)}
      </ul>
    );
  }
}

export default ZodiacSigns;
