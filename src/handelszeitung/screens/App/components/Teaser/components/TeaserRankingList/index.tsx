/**
 * @file   Teaser Ranking List
 * @author Alexandra Geier <alexandra.geier@ringieraxelspringer.ch>
 * @date   2019-09-18
 *
 */

import React from 'react';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import classNames from 'classnames';
import teaserFactory from '../../../../../../../common/components/Teaser/factory';
import Icon from '../../../Icon/index';
import {
  STYLE_16X9_280,
  STYLE_16X9_340,
  STYLE_16X9_360,
} from '../../../../../../../shared/constants/images';
import {
  TEASER_IMAGE_IDENTIFIER,
  TEASER_RANKING_LIST_IDENTIFIER,
} from '../../constants';
import styles from './styles.legacy.css';

const children = (
  <Icon type="IconArrowRight" addClass={styles.CallToActionIcon} />
);

const TeaserRankingList = teaserFactory({
  teaserImageStyles: {
    style_320: STYLE_16X9_280,
    style_760: STYLE_16X9_340,
    style_1680: STYLE_16X9_360,
  },
  children,
  isShortTitleHidden: true,
  styles: {
    Wrapper: classNames(TEASER_RANKING_LIST_IDENTIFIER, styles.Wrapper),
    ContentWrapper: styles.TeaserText,
    Title: styles.Title,
    ImageWrapper: styles.Wrapper,
    Image: classNames(TEASER_IMAGE_IDENTIFIER, styles.Image),
  },
  disableWrapperClassName: true,
});

const withUpdatePolicy = shouldUpdate<any>(
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'nextProps' implicitly has an 'any' type. */
  (props, nextProps) => props.title !== nextProps.title,
);

export default compose<any, any>(withUpdatePolicy)(TeaserRankingList);
