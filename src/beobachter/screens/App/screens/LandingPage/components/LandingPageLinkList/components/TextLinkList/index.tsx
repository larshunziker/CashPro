import React, { ReactElement } from 'react';
import Link from '../../../../../../../../../common/components/LinkLegacy';
import Icon from '../../../../../../components/Icon';
import styles from './styles.legacy.css';
import { TextLinksListProps } from './typings';

// ---------------------------------------------------------------------------------- //
// COMPONENT
// ---------------------------------------------------------------------------------- //

const renderItems = (props: SearchableUnionEdge): ReactElement | null => {
  const node = props.node as ArticleUnion;
  return (
    (node && node.id && node.preferredUri && node.title && (
      <div key={node.id} className={styles.ListItem}>
        <Link
          link={{ path: node.preferredUri }}
          className={styles.ListItemLink}
        >
          {node.shortTitle && (
            <div className={styles.ShortTitle}>{node.shortTitle}</div>
          )}
          <div className={styles.Title}>
            {node.title}
            <Icon type="IconArrowRight" addClass={styles.ListItemIcon} />
          </div>
        </Link>
      </div>
    )) ||
    null
  );
};

const TextLinkList = ({ items }: TextLinksListProps): ReactElement | null =>
  (items && items.edges && (
    <div className={`text-link-overview ${styles.Wrapper}`}>
      {items.edges.map(renderItems)}
    </div>
  )) ||
  null;

export default TextLinkList;
