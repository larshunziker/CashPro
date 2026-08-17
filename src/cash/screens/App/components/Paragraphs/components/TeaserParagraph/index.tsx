import React from 'react';
import classNames from 'classnames';
import Teaser from '../../../Teaser';
import { INFO_BOX_TYPE } from '../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/constants';
import { TEASER_LAYOUT_M } from '../../../../../../../shared/constants/teaser';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import { TeaserParagraphProps } from './typings';

const TeaserParagraph = ({ teaserParagraph, origin }: TeaserParagraphProps) => {
  const teaser = teaserParagraph?.teasers?.edges?.[0]?.node as TeaserInterface;

  if (!teaser) {
    return null;
  }

  if (origin === INFO_BOX_TYPE) {
    return (
      <div className={grid.Row}>
        <div className={classNames(grid.ColXs12, grid.ColSm10)}>
          {/* @ts-ignore TODO: TS2322 ->  Type '{ __typename? */}
          <Teaser component={TEASER_LAYOUT_M} {...teaser} />
        </div>
      </div>
    );
  }

  /* @ts-ignore TODO: TS2322 ->  Type '{ __typename? */
  return <Teaser component={TEASER_LAYOUT_M} {...teaser} />;
};

export default TeaserParagraph;
