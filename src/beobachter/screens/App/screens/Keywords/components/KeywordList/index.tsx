import React, { ReactElement } from 'react';
import TestFragment from '../../../../../../../../src/shared/tests/components/TestFragment';
import { getAlertItemTypeByTypename } from '../../../../../../../common/components/SubscribeButton/helper';
import SubscribeButton from '../../../../components/SubscribeButton';
import Link from '../../../../../../../common/components/Link';
import styles from './styles.legacy.css';
import { KeywordListProps } from './typings';

const KeywordList = ({ list }: KeywordListProps): ReactElement => {
  if (
    !list ||
    !list.edges ||
    !Array.isArray(list.edges) ||
    list.edges.length === 0
  ) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  const filteredList = list.edges
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    .filter((edge) => !!edge.node)
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    .map((edge) => edge.node);

  return (
    <TestFragment data-testid="keywordlist-elementlist-wrapper">
      {filteredList.map((item) => {
        /* @ts-ignore TODO: TS2339 ->  Property '__typename' does not exist on type 'Maybe<Keyword> | undefined'. */
        /* @ts-ignore TODO: TS2339 ->  Property 'id' does not exist on type 'Maybe<Keyword> | undefined'. */
        /* @ts-ignore TODO: TS2339 ->  Property 'label' does not exist on type 'Maybe<Keyword> | undefined'. */
        const { __typename: typeName, id, label } = item;

        if (!label || !id || !typeName) {
          return null;
        }

        return (
          <div
            key={id}
            className={styles.KeywordListItem}
            data-testid="keyword-list-item-wrapper"
          >
            <Link
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
              /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
              path={item.preferredUri}
              label={label}
              className={styles.Label}
            />

            <SubscribeButton
              theme="light"
              label={label || ''}
              type={getAlertItemTypeByTypename(typeName)}
              /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
              id={Number(item.tid)}
            />
          </div>
        );
      })}
    </TestFragment>
  );
};

export default KeywordList;
