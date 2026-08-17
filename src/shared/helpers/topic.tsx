import React from 'react';
import Link from '../../common/components/Link';

const renderTopic = (item: TopicEdge, index: number, style: any) => {
  if (item?.node) {
    return (
      <span key={`navigation-link-${item.node.id}`}>
        {index ? ', ' : ''}
        <Link
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
          path={item.node.preferredUri}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
          label={item.node.title}
          className={style}
        />
      </span>
    );
  }
};

export default renderTopic;
