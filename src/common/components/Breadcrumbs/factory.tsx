import React, { useRef } from 'react';
import classNames from 'classnames';
import Helmet from '../../../beobachter/screens/App/components/Helmet';
import grid from '../../assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ScrollButtonComponent } from './components/scrollButton/typings';
import {
  BreadcrumbsComponent,
  BreadcrumbsFactoryOptions,
  BreadcrumbsFactoryOptionsStyles,
  BreadcrumbsProps,
} from './typings';

type BreadcrumbsPropsInner = BreadcrumbsProps;

const defaultStyles: BreadcrumbsFactoryOptionsStyles = {
  OuterWrapper: '',
  Wrapper: styles.BreadcrumbWrapper,
  List: styles.BreadcrumbList,
  Link: styles.BreadcrumbLink,
  Title: '',
  Placeholder: '',
};

const BreadcrumbsFactory = ({
  Link,
  styles: appStyles,
  hasPlaceholder,
  isAuthorPage,
  ScrollButton,
  homeLabel = 'Home',
}: BreadcrumbsFactoryOptions<any>):
  | BreadcrumbsComponent
  | ScrollButtonComponent => {
  const Breadcrumbs = (props: BreadcrumbsPropsInner) => {
    const itemList = useRef(null);
    const { items, pageUrl, staticData, title } = props;

    const getStyles = (): BreadcrumbsFactoryOptionsStyles => {
      const styles: BreadcrumbsFactoryOptionsStyles =
        (typeof appStyles === 'function' && appStyles(props)) ||
        (typeof appStyles === 'object' && appStyles) ||
        defaultStyles;
      return styles;
    };

    // check if at least node labels exists
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    const hasNodeLabel = items?.edges?.every(({ node }) => node.label);

    let itemCount = 1;
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    let breadcrumbItemsCount = items?.edges?.length - 1;
    const breadCrumbItems = items?.edges?.filter(({ node }, index) => {
      const isLast = index === breadcrumbItemsCount;
      if (!node?.link && isLast) {
        return true;
      }

      if (!node?.link && !isLast) {
        return false;
      }

      return true;
    });
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    breadcrumbItemsCount = breadCrumbItems?.length - 1;

    const breadcrumbsSchema =
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      (items?.edges?.length > 0 &&
        hasNodeLabel && {
          '@context': 'https://schema.org',
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          '@id': `${global.locationOrigin}/#/schema/BreadcrumbList${pageUrl}`,
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: itemCount++,
              name: homeLabel,
              /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
              item: global.locationOrigin,
              /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
              url: global.locationOrigin,
            },
            /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
            ...breadCrumbItems.map(({ node }, index) => {
              const hasLink = node?.link;
              const isLast = index === breadcrumbItemsCount;

              if (hasLink || isLast) {
                const listItem: Record<string, string | number> = {
                  '@type': 'ListItem',
                  position: itemCount++,
                  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | number'. */
                  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                  name: node.label,
                  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
                  ...(hasLink && { item: global.locationOrigin + node.link }),
                  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
                  ...(hasLink && { url: global.locationOrigin + node.link }),
                };
                return listItem;
              }
            }),
          ],
        }) ||
      null;

    const styles: BreadcrumbsFactoryOptionsStyles = getStyles();
    const breadcrumbItems = items?.edges || [];
    const lastBreadcrumbItem =
      breadcrumbItems && breadcrumbItems[breadcrumbItems.length - 1];
    const filteredBreadcrumbItems =
      breadcrumbItems?.filter(({ node }) => node?.link && node?.label) || [];

    if (!items || breadcrumbItems.length === 0 || !pageUrl) {
      if (
        hasPlaceholder &&
        typeof hasPlaceholder === 'function' &&
        hasPlaceholder(props)
      ) {
        return <div className={styles.Placeholder} />;
      } else {
        return null;
      }
    }

    return (
      <>
        {breadcrumbsSchema && __TESTING__ && (
          // to validate breadcrumb json-ld in jest unit tests
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbsSchema, null, 2)}
          </script>
        )}
        {(breadcrumbsSchema && (
          <Helmet
            script={[
              {
                type: 'application/ld+json',
                innerHTML: JSON.stringify(breadcrumbsSchema),
              },
            ]}
          />
        )) ||
          null}
        <div className={styles.OuterWrapper}>
          <div className={classNames(styles.Wrapper, grid.HideForPrint)}>
            <ol ref={itemList} className={styles.List}>
              <li>
                <Link className={styles.Link} link={{ path: '/' }}>
                  {homeLabel}
                </Link>
              </li>
              {filteredBreadcrumbItems.map((breadcrumb) => (
                <li key={`breadcrumb-item-${breadcrumb?.node?.id}`}>
                  <Link
                    className={styles.Link}
                    link={{ path: breadcrumb?.node?.link || '' }}
                  >
                    {breadcrumb?.node?.label || ''}
                  </Link>
                </li>
              ))}
              <li>
                <span className={classNames(styles.Link, styles.Title)}>
                  {(!staticData && lastBreadcrumbItem?.node?.label) ||
                    title ||
                    ''}
                </span>
              </li>
            </ol>
            {(!isAuthorPage?.(props.origin || '') && ScrollButton && (
              <ScrollButton container={itemList} />
            )) ||
              null}
          </div>
        </div>
      </>
    );
  };

  /* @ts-ignore TODO: TS2322 ->  Type '(props */
  return Breadcrumbs;
};

export default BreadcrumbsFactory;
