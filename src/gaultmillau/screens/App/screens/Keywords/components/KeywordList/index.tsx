import React from 'react';
import Link from '../../../../../../../common/components/Link';
import styles from './styles.legacy.css';
import { KeywordListProps } from './typings';

const renderItem = ({
  /* @ts-ignore TODO: TS2339 ->  Property 'label' does not exist on type 'Maybe<Keyword> | undefined'. */
  /* @ts-ignore TODO: TS2339 ->  Property 'entities' does not exist on type 'Maybe<Keyword> | undefined'. */
  /* @ts-ignore TODO: TS2339 ->  Property 'id' does not exist on type 'Maybe<Keyword> | undefined'. */
  /* @ts-ignore TODO: TS2339 ->  Property 'preferredUri' does not exist on type 'Maybe<Keyword> | undefined'. */
  node: { label, entities, id, preferredUri },
}: KeywordEdge) => {
  if (!label || !entities?.count || !preferredUri) {
    return null;
  }
  return (
    <span key={`keyword-list-item-${id}`} className={styles.ListItem}>
      <Link className={styles.KeywordLink} path={preferredUri} label={label} />
    </span>
  );
};

const KeywordList = ({ list = {} }: KeywordListProps) => (
  <div className={`keyword-list ${styles.Wrapper}`}>
    {list.edges && list.edges.length > 0 && list.edges.map(renderItem)}
  </div>
);

export default KeywordList;
