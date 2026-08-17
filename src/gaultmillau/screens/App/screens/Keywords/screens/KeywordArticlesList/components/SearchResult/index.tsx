import React from 'react';
import classNames from 'classnames';
import { ensureTeaserInterface } from '../../../../../../components/Teaser/shared/helpers';
import TeaserGrid from '../../../../../../components/TeaserGrid';
import { GRID_LAYOUT_TEASER_3X4 } from '../../../../../../components/TeaserGrid/gridConfigs/constants';
import styles from './styles.legacy.css';
import { SearchProps } from './typings';

const SearchResult = ({ list }: SearchProps) => {
  if (!list || !list.edges || !list.edges.length || list.edges.length === 0) {
    return null;
  }

  return (
    <div className={classNames('search-result', styles.Wrapper)}>
      <TeaserGrid
        items={ensureTeaserInterface(list.edges)}
        layout={GRID_LAYOUT_TEASER_3X4}
      />
    </div>
  );
};

export default SearchResult;
