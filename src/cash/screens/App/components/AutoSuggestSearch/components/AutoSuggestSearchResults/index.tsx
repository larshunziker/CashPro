import React, { ReactElement } from 'react';
import classNames from 'classnames';
import Link from '../../../../../../../common/components/Link';
import styles from './styles.legacy.css';
import { AutoSuggestSearchResultsProps } from './typings';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const markStyleAsUsed = [styles.IsActive];

const AutoSuggestSearchResults = ({
  title,
  titleLink,
  items,
  handleSearchResults,
  handleTitleSearchResults,
}: AutoSuggestSearchResultsProps): ReactElement => {
  return (
    <div className={styles.Wrapper}>
      {items?.length > 0 && (
        <div className={styles.ResultTitle}>
          {(titleLink && (
            <Link
              key={`title-${title}`}
              className={classNames({
                [styles.LinkColor]: titleLink,
              })}
              /* @ts-ignore TODO: TS2322 ->  Type '((e */
              onClick={
                titleLink
                  ? /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
                    (e) => handleTitleSearchResults(e, null, null, titleLink)
                  : null
              }
              /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */
              path={titleLink || null}
              label={title}
            />
          )) || <>{title}</>}
        </div>
      )}
      {items?.map((entity: QuotesUnion, index) => {
        return (
          <div
            className={styles.ResultListItem}
            key={`${entity?.__typename}-${index}-${entity.listingId}`}
          >
            <Link
              className={styles.Link}
              onClick={(e) =>
                handleSearchResults(e, entity.listingId, entity.name, entity)
              }
            >
              <div>
                <div className={classNames(styles.ItemName)}>
                  <span>{entity?.mName || entity?.name || ''}</span>
                </div>
                <div className={classNames(styles.ItemAttributes)}>
                  <span>{entity?.currency || ''}</span>
                  <span>{entity?.marketDescription || ''}</span>
                  <span>{entity?.mIsin || ''}</span>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default AutoSuggestSearchResults;
