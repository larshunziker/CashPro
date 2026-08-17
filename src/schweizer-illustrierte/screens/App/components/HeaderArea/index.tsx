import React, { memo } from 'react';
import classNames from 'classnames';
import Header from '../Header';
import HeaderInner from '../Header/components/HeaderInner';
import Navigation from '../Navigation';
import { TRACKING_CLASS_SITE_HEADER } from '../../../../../shared/constants/tracking';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../../../../common/assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { HeaderInnerProps } from '../Header/components/HeaderInner/typings';
import { HeaderAreaComponent, HeaderAreaProps } from './typings';

type HeaderAreaInnerProps = HeaderInnerProps & HeaderAreaProps;

const HeaderArea: HeaderAreaComponent = (props: HeaderAreaInnerProps) => {
  const {
    isStickyEnabled = true,
    isMarketingPageReducedHeader,
    isPuzzlePage,
    subtypeValue,
  } = props;
  return (
    <div className={TRACKING_CLASS_SITE_HEADER}>
      <Header
        hasStickiness={isStickyEnabled}
        isMarketingPageReducedHeader={isMarketingPageReducedHeader}
        isPuzzlePage={isPuzzlePage}
        subtypeValue={subtypeValue}
      >
        <HeaderInner {...props} />
      </Header>
      {isMarketingPageReducedHeader && (
        <div className={classNames(styles.NavigationWrapper, grid.HiddenSmUp)}>
          <div className={grid.Container}>
            <div className={sections.SectionPullOut}>
              <div className={styles.Navigation}>
                <Navigation isPuzzlePage={isPuzzlePage} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo<HeaderAreaInnerProps>(HeaderArea);
