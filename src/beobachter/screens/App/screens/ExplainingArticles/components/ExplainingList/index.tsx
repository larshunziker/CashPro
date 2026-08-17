import React from 'react';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import Link from '../../../../../../../common/components/Link';
import SVGIcon from '../../../../components/SVGIcon';
import { SVG_ICONS_TYPE_CHEVRON_RIGHT } from '../../../../../../../shared/constants/svgIcons';
import styles from './styles.legacy.css';
import { EntriesListProps } from './typings';

const EntriesList = ({ list = {} }: EntriesListProps) => {
  if (
    !list ||
    !list.edges ||
    !Array.isArray(list.edges) ||
    !list.edges.length
  ) {
    return null;
  }

  const filteredList = list.edges
    .map(({ node }) => ({
      label: node?.title || '',
      preferredUri: node?.target?.preferredUri || '',
    }))
    .filter((element) => !!(element.label && element.preferredUri));

  return (
    <TestFragment data-testid="entrylist-elementlist-wrapper">
      {filteredList.map((item, index) => {
        const { preferredUri, label } = item;

        if (!label || !preferredUri) {
          return null;
        }
        return (
          <h2 key={`element-list-item-${index}`} className={styles.ListItem}>
            <Link
              path={item.preferredUri}
              data-testid="link"
              className={styles.Link}
            >
              <>
                {item.label || ''}
                <SVGIcon
                  className={styles.Icon}
                  type={SVG_ICONS_TYPE_CHEVRON_RIGHT}
                />
              </>
            </Link>
          </h2>
        );
      })}
    </TestFragment>
  );
};

export default EntriesList;
