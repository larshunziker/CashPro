import React, { Component, ReactElement } from 'react';
import classNames from 'classnames';
import Link from '../../../../../common/components/Link';
import { TRACKING_CLASS_CONTENT_RECOMMENDATIONS } from '../../../../../shared/constants/tracking';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import {
  RecommendationsProps,
  RecommendationsItem,
  RecommendationsFactoryOptions,
  RecommendationsFactoryOptionsStyles,
} from './typings';

const defaultStyles: RecommendationsFactoryOptionsStyles = {
  RecommendationItem: '',
  Wrapper: '',
  Title: '',
  RecommendationsListContainer: '',
};

const RecommendationsFactory = ({
  Teaser,
  skeletonPlaceholderImg,
  styles: appStyles,
  ensureTeaserInterfaceItem,
  mapTeaserInterface,
}: RecommendationsFactoryOptions) => {
  class Recommendations extends Component<RecommendationsProps> {
    render(): ReactElement {
      const {
        items,
        title,
        titleLinkPath = '',
        trackingOrigin = 'top',
        isBlack = false,
        teaserLayout,
      }: RecommendationsProps = this.props;

      if (!items || !items.length) {
        /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
        return null;
      }

      const getStyles = (): RecommendationsFactoryOptionsStyles => {
        const styles =
          (typeof appStyles === 'function' && appStyles(this.props)) ||
          (typeof appStyles === 'object' && appStyles) ||
          defaultStyles;

        return styles;
      };

      const styles = getStyles();

      /* @ts-ignore TODO: TS7031 ->  Binding element 'items' implicitly has an 'any' type. */
      const RecommendationList = ({ items }) =>
        items.reduce(
          (
            acc: ReactElement[] = [],
            item: RecommendationsItem,
            index: number,
          ): ReactElement[] => {
            const trackingData: TrackingData[] = [
              {
                type: 'block-position',
                value: `${trackingOrigin}-${index}`,
              },
            ];

            if (mapTeaserInterface) {
              mapTeaserInterface(item);
            }

            item?.node &&
              acc.push(
                <div
                  data-testid="article-recommendations-item"
                  className={styles.RecommendationItem}
                  key={`recommendation-item-${
                    item?.node?.id || (Math.random() * 1000).toString()
                  }`}
                >
                  <Teaser
                    trackingSelector="recommendation-teaser"
                    trackingData={trackingData}
                    component={teaserLayout}
                    {...(ensureTeaserInterfaceItem?.(item.node) ||
                      (item.node as TeaserInterface))}
                    isBlack={isBlack}
                    isSkeleton={item?.skeleton || false}
                    skeletonPlaceholderImg={skeletonPlaceholderImg}
                  />
                </div>,
              );
            return acc;
          },
          [],
        );

      return (
        <div
          data-nosnippet
          data-testid="article-recommendations-container"
          className={classNames(
            TRACKING_CLASS_CONTENT_RECOMMENDATIONS,
            styles.Wrapper,
            grid.HideForPrint,
          )}
        >
          <Link path={titleLinkPath} title={title}>
            <div
              data-testid="article-recommendations-header"
              className={styles.Title}
            >
              {title}
            </div>
          </Link>

          <div className={classNames(styles.RecommendationsListContainer)}>
            <RecommendationList items={items} />
          </div>
        </div>
      );
    }
  }

  return Recommendations;
};

export default RecommendationsFactory;
