import React, { FC } from 'react';
import classNames from 'classnames';
import { TEASER_LAYOUT_SHORT_TITLE } from '../../../../../../../shared/constants/teaser';
import styles from './styles.legacy.css';
import { ShortTitleProps } from './typings';

const ShortTitle: FC<ShortTitleProps> = ({ shortTitle, addClass = '' }) => (
  <div
    className={classNames(TEASER_LAYOUT_SHORT_TITLE, styles.TeaserTopic, {
      [addClass]: !!addClass,
    })}
  >
    {shortTitle}
  </div>
);

export default ShortTitle;
