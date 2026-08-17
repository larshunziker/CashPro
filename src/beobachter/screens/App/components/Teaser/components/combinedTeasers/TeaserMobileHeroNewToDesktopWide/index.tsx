import React, { memo } from 'react';
import TeaserHeroNew from '../../TeaserHeroNew';
import TeaserWide from '../../TeaserWide';
import grid from '../../../../../../../../common/assets/styles/grid.legacy.css';
import { TeaserProps } from '../../../typings';

const TeaserMobileHeroNewToDesktopWide = (props: TeaserProps) => {
  return (
    <>
      <div className={grid.HiddenSmUp}>
        <TeaserHeroNew {...props} />
      </div>
      <div className={grid.HiddenSmDown}>
        <TeaserWide {...props} />
      </div>
    </>
  );
};

export default memo(TeaserMobileHeroNewToDesktopWide);
