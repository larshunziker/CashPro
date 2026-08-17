import React, { ReactElement } from 'react';
import Link from '../../../Link';
import { TYPE_RIGHT_WIDGET } from '../../../TeaserGrid/gridConfigs/constants';
import {
  EntityQueueParagraphComponent,
  EntityQueueParagraphFactoryOptions,
  EntityQueueParagraphFactoryOptionsStyles,
  EntityQueueParagraphProps,
} from './typings';

export type EntityQueueParagraphPropsInner = EntityQueueParagraphProps;

const defaultStyles: EntityQueueParagraphFactoryOptionsStyles = {
  TitleWrapper: '',
  InnerContainer: '',
  Title: '',
  IconRight: '',
};

const entityQueueParagraphFactory = ({
  ensureTeaserInterface,
  TeaserGrid,
  gridConfigLayout: appGridLayout,
  styles: appStyles,
  utmTrackingParams,
  trackingClass,
  appTitle,
  Icon,
}: EntityQueueParagraphFactoryOptions) => {
  const EntityQueueParagraph: EntityQueueParagraphComponent = (
    props,
  ): ReactElement => {
    const { entityQueue, origin, latestNAGenerator } = props;
    if (typeof ensureTeaserInterface !== 'function') {
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
      return null;
    }

    const title =
      (typeof appTitle === 'function' && appTitle(props)) ||
      (typeof appTitle === 'string' && appTitle) ||
      props?.entityQueue?.landingPage?.title ||
      props?.entityQueue?.title ||
      null;

    const isTitleShown = !!title && !!appStyles;

    const path = props?.entityQueue?.landingPage?.preferredUri || null;

    const showLinkIcon = Icon && props.iconTypeRight && path;

    const styles =
      (typeof appStyles === 'object' && appStyles) || defaultStyles;

    const gridConfigLayout: string =
      (typeof appGridLayout === 'function' && appGridLayout(props)) ||
      (typeof appGridLayout === 'string' && appGridLayout) ||
      null;

    if (
      !entityQueue ||
      !entityQueue.entityQueue ||
      !entityQueue.entityQueue.items ||
      !Array.isArray(entityQueue.entityQueue.items.edges) ||
      entityQueue.entityQueue.items.edges.length === 0
    ) {
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
      return null;
    }

    const appendTrackingToUrl = (
      edges: Array<RouteObjectInterfaceEdge>,
      tracking: string,
    ) => {
      return edges.map((entry: RouteObjectInterfaceEdge) => {
        if (
          !entry.node ||
          (!(entry.node as Product | Teaser).link && !entry.node.preferredUri)
        ) {
          return entry;
        }
        if (entry.node.preferredUri) {
          return {
            node: {
              ...entry.node,
              preferredUri: `${entry.node.preferredUri}${tracking}`,
            },
          };
        }
        return {
          node: {
            ...entry.node,
            link: {
              /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
              path: `${(entry.node as Product | Teaser).link.path}${tracking}`,
            },
          },
        };
      });
    };

    // enrich the EQ with NAs from reco-service (if set in CMS via useNativeAdvertising)
    const edges =
      (latestNAGenerator &&
        entityQueue.entityQueue.items.edges.map((entry) => {
          /* @ts-ignore TODO: TS2339 ->  Property 'node' does not exist on type 'Maybe<RouteObjectInterfaceEdge>'. */
          const { node } = entry;
          if (
            // @ts-ignore
            node?.useNativeAdvertising &&
            // @ts-ignore
            node?.useNativeAdvertising === true
          ) {
            const nativeAdvertising = latestNAGenerator.next().value;
            if (nativeAdvertising) {
              return {
                node: {
                  ...nativeAdvertising,
                },
              };
            }
          }
          return entry;
        })) ||
      entityQueue.entityQueue.items.edges;
    if (entityQueue.annexWidget) {
      edges.push({
        node: {
          type: TYPE_RIGHT_WIDGET,
          ...entityQueue.annexWidget,
        },
      } as RouteObjectInterfaceEdge);
    }
    return (
      <div className={trackingClass}>
        {isTitleShown && (
          <div className={styles.TitleWrapper}>
            <div className={styles.InnerContainer}>
              {/* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */}
              <Link path={path}>
                <h2
                  className={styles.Title}
                  data-testid="entity-queue-paragraph-title"
                >
                  {title}
                  {showLinkIcon && (
                    <Icon
                      /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
                      type={props.iconTypeRight}
                      addClass={styles.IconRight}
                    />
                  )}
                </h2>
              </Link>
            </div>
          </div>
        )}
        <TeaserGrid
          items={ensureTeaserInterface(
            (utmTrackingParams &&
              /* @ts-ignore TODO: TS2345 ->  Argument of type '(RouteObjectInterfaceEdge | { node */
              appendTrackingToUrl(edges, utmTrackingParams)) ||
              edges,
          )}
          layout={gridConfigLayout}
          origin={origin || ''}
        />
      </div>
    );
  };

  return EntityQueueParagraph;
};

export default entityQueueParagraphFactory;
