/* istanbul ignore file */

import React from 'react';
import scrollToTopFactory from '../../../../../common/components/ScrollToTop/factory';
import Icon from '../Icon';
import styles from './styles.legacy.css';

export const ANCHOR_TAG_SCROLL_TO_TOP = 'smoothScrollToTop';

const ScrollToTop = scrollToTopFactory({
  icon: <Icon type="IconChevronUp" addClass={styles.IconStyles} />,
  anchorTagScrollToTop: ANCHOR_TAG_SCROLL_TO_TOP,
  pixelsScrolledToFadeInComponentDefault: 200,
  styles: {
    ButtonToTop: styles.ButtonToTop,
    ButtonWrapper: styles.ButtonWrapper,
    ScrollToTopFadeIn: styles.ScrollToTopFadeIn,
    ScrollToTopFadeOut: styles.ScrollToTopFadeOut,
  },
});

export default ScrollToTop;
