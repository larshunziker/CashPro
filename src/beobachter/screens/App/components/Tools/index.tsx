import React from 'react';
import { ensureTeaserInterface } from '../Teaser/shared/helpers';
import TeaserGrid from '../TeaserGrid';
import { GRID_LAYOUT_TEASER_TOOLS } from '../TeaserGrid/gridConfigs/constants';
import { toolsSortOrder } from './constants';
import styles from './styles.legacy.css';
import {
  RelatedContentLegalAdvice,
  RelatedContentLegalAdviceEdge,
} from '../../screens/LegalAdvice/typings';

const Tools = ({ data }: RelatedContentLegalAdvice) => {
  if (!data || data.count === 0) {
    return;
  }

  let items = null;

  if (data && data.edges) {
    items = data.edges.map((item: RelatedContentLegalAdviceEdge) => {
      return {
        node: {
          ...item.node,
          shortTitle:
            item?.node?.subtypeValue === 'tool'
              ? item?.node?.toolTypeLabel
              : item?.node?.shortTitle,
        },
      };
    });
  }

  const sortedTools = ensureTeaserInterface(items).sort(
    /* @ts-ignore TODO: TS7006 ->  Parameter 'prevItem' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'nextItem' implicitly has an 'any' type. */
    (prevItem, nextItem) => {
      const indexA = toolsSortOrder.indexOf(prevItem.toolType);
      const indexB = toolsSortOrder.indexOf(nextItem.toolType);

      const normalizedIndexA = indexA === -1 ? toolsSortOrder.length : indexA;
      const normalizedIndexB = indexB === -1 ? toolsSortOrder.length : indexB;

      return normalizedIndexA - normalizedIndexB;
    },
  );

  return (
    <div className={styles.Wrapper}>
      <h2 className={styles.Title}>Hilfsmittel</h2>
      <TeaserGrid layout={GRID_LAYOUT_TEASER_TOOLS} items={sortedTools} />
    </div>
  );
};

export default Tools;
