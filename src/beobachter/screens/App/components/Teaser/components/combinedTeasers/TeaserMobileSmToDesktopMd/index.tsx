import React, { memo } from 'react';
import TeaserSM from '../../TeaserSM';
import TeaserMD from '../../TeaserMD';
import grid from '../../../../../../../../common/assets/styles/grid.legacy.css';
import { TeaserProps } from '../../../typings';

const TeaserMobileSmToDesktopMd = (props: TeaserProps) => {
  return (
    <>
      <div className={grid.HiddenSmUp}>
        <TeaserSM {...props} />
      </div>
      <div className={grid.HiddenSmDown}>
        <TeaserMD {...props} />
      </div>
    </>
  );
};

export default memo(TeaserMobileSmToDesktopMd);
