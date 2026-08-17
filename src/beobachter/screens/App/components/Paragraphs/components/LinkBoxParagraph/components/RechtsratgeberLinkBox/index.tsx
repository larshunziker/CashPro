import React, { memo } from 'react';
import classNames from 'classnames';
import Link from '../../../../../../../../../common/components/Link';
import {
  TRACKING_CLASS_LINK_BOX_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../../../shared/constants/tracking';
import styles from './styles.legacy.css';
import { LinkBoxParagraphProps } from '../../typings';
import { LinkGraphListItem } from './typings';

type RechtsratgeberLinkBoxParagraphPropsInner = LinkBoxParagraphProps;

type ItemProps = {
  linkGraphListItem: LinkGraphListItem;
  index: number;
};

const Item = ({ linkGraphListItem, index }: ItemProps) => (
  <li className={styles.ListItem} key={`guider-link-box-link-${index}`}>
    {/* @ts-ignore TODO: TS2322 ->  Type '{ children */}
    <Link {...linkGraphListItem.node} className={styles.ListItemBox}>
      <>
        <span className={styles.ListItemNumber}>{index + 1}</span>
        <span
          className={styles.Label}
          data-testid={`rechtsratgeberlinkbox-link-label-${index}`}
        >
          {linkGraphListItem?.node?.label || ''}
        </span>
      </>
    </Link>
  </li>
);

const RechtsratgeberLinkBox = ({
  linkBox,
  articleColStyle = '',
}: RechtsratgeberLinkBoxParagraphPropsInner) => {
  if (
    !linkBox?.links?.edges ||
    !Array.isArray(linkBox.links.edges) ||
    linkBox.links.edges.length === 0
  ) {
    return null;
  }

  return (
    <div className={classNames(articleColStyle)}>
      <div
        className={classNames(
          TRACKING_CLASS_PARAGRAPH,
          TRACKING_CLASS_LINK_BOX_PARAGRAPH,
          'guide',
          styles.Wrapper,
        )}
      >
        {linkBox?.title && (
          <span
            className={styles.SubTitle}
            data-testid="rechtsratgeberlinkbox-title"
          >
            {linkBox.title}
          </span>
        )}

        <ul className={styles.Listing}>
          {linkBox.links.edges
            .filter((item) => item?.node?.label !== '')
            .map((item, index) => (
              <Item
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<LinkEdge>' is not assignable to type 'LinkGraphListItem'. */
                /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                linkGraphListItem={linkBox.links.edges[index]}
                index={index}
                key={`item-${index}`}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default memo<LinkBoxParagraphProps>(RechtsratgeberLinkBox);
