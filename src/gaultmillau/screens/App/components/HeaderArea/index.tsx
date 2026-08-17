import React, { memo } from 'react';
import Header from '../Header';
import Logo from '../Logo';
import { TRACKING_CLASS_SITE_HEADER } from '../../../../../shared/constants/tracking';
import styles from './styles.legacy.css';
import { HeaderAreaProps } from './typings';

type HeaderAreaPropsInner = HeaderAreaProps;

const HeaderArea = ({
  isStickyEnabled = true,
  isHome,
}: HeaderAreaPropsInner) => (
  <>
    <div
      className={TRACKING_CLASS_SITE_HEADER}
      data-testid="headerarea-wrapper"
    >
      <Header hasStickiness={isStickyEnabled} isHome={isHome || false} />
    </div>
    {isHome && (
      <div className={styles.ChannelLogo}>
        <div className={styles.LogoWrapper} data-testid="logo-wrapper">
          <Logo type="channel" />
        </div>
      </div>
    )}
  </>
);

export default memo<HeaderAreaProps>(HeaderArea);
