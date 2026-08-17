import React from 'react';
import classNames from 'classnames';
import { ensureTeaserInterface } from '../../../../components/Teaser/shared/helpers';
import TeaserGrid from '../../../../components/TeaserGrid';
import { GRID_LAYOUT_TEASER_3X6 } from '../../../../components/TeaserGrid/gridConfigs/constants';
import styles from './styles.legacy.css';
import { SearchProps } from './typings';

const SearchResult = ({ list }: SearchProps) => {
  if (!list) {
    return null;
  }
  return (
    <div className={classNames('search-result', styles.Wrapper)}>
      <TeaserGrid
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'TeasableInterfaceGraphListItem[] | undefined' is not assignable to parameter of type 'any[]'. */
        items={ensureTeaserInterface(list.edges)}
        layout={GRID_LAYOUT_TEASER_3X6}
      />
    </div>
  );
};

export default SearchResult;
