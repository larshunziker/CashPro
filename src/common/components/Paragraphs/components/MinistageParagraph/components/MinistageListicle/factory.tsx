import React from 'react';
import classNames from 'classnames';
import Link from '../../../../../Link';
import {
  TRACKING_CLASS_MINISTAGE_LISTICLE_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../shared/constants/tracking';
import {
  MinistageListicleComponent,
  MinistageListicleFactoryOptions,
} from './typings';

const MinistageListicleFactory = ({
  Header,
  styles,
}: MinistageListicleFactoryOptions): MinistageListicleComponent => {
  const MinistageListicle: MinistageListicleComponent = ({
    ministageParagraph,
  }) => {
    const ministageListicle: MinistageListicle | null =
      (ministageParagraph?.ministage &&
        (ministageParagraph.ministage as MinistageListicle)) ||
      null;

    if (
      !ministageListicle ||
      !Array.isArray(ministageListicle.links?.edges) ||
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      ministageListicle?.links?.edges?.length < 1
    ) {
      return null;
    }

    return (
      <div
        className={classNames(
          TRACKING_CLASS_PARAGRAPH,
          TRACKING_CLASS_MINISTAGE_LISTICLE_PARAGRAPH,
          styles.Wrapper,
        )}
      >
        <div className={styles.ContentWrapper}>
          {Header && (
            <div
              className={styles.HeaderWrapper}
              data-testid="ministage-listicle-header"
            >
              <Header />
            </div>
          )}
          <div className={styles.LinkWrapper}>
            <ul className={styles.LinkList}>
              {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
              {ministageListicle.links.edges.map(({ node }: LinkEdge) => (
                /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                <li className={styles.ListItem} key={node.label}>
                  {/* @ts-ignore TODO: TS2322 ->  Type '{ __typename? */}
                  <Link className={styles.Link} {...node} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return MinistageListicle;
};

export default MinistageListicleFactory;
