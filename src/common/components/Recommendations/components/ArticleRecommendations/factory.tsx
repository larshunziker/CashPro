import React, { ReactElement } from 'react';
import classNames from 'classnames';
import useInView from '../../../../../shared/hooks/useInView';
import useRecommendations from '../../../../../shared/hooks/useRecommendations';
import {
  EXPLAINING_ARTICLE_CONTENT_TYPE,
  FINANCE_DICTIONARY_TYPE,
} from '../../../../../shared/constants/content';
import { STYLE_3X2_PLACEHOLDER_DATA } from '../../../../../shared/constants/images';
import {
  RECOMMENDATION_OPERATION,
  RECOMMENDATION_TYPE,
} from '../../../../../shared/constants/recommendations';
import {
  FULL_PAGE_LAYOUT_TYPE,
  RIGHT_COLUMN_PAGE_LAYOUT_TYPE,
} from '../../../../screens/PageTemplate/constants';
import { useRecommendationsResponse } from '../../../../../shared/hooks/useRecommendations/typings';
import {
  ArticleRecommendationsFactoryOptions,
  ArticleRecommendationsFactoryOptionsStyles,
  ArticleRecommendationsProps,
} from './typings';

const IDENTIFIER = 'recommendations-container';

const recommendationsOperation = RECOMMENDATION_OPERATION.DEFAULT;

export type ArticleRecommendationsPropsInner = ArticleRecommendationsProps;

const defaultStyles: ArticleRecommendationsFactoryOptionsStyles = {
  Container: '',
  Row: '',
  Title: '',
  TitleWrapper: '',
  Wrapper: '',
};

export default ({
  ensureTeaserInterface,
  TeaserGrid,
  teaserGridLayout: appTeaserGridLayout,
  styles: appStyles,
  fallbackNativeAdvertisingGcIds,
}: ArticleRecommendationsFactoryOptions) => {
  const ArticleRecommendations = (
    props: ArticleRecommendationsPropsInner,
  ): ReactElement => {
    const {
      contentGcid,
      origin,
      articleKeywords,
      publication,
      articleColStyle,
      title,
      prerenderSkeletonItems = 3,
      nativeAdvertisingConfig,
      pageLayoutType = FULL_PAGE_LAYOUT_TYPE,
      ignoreTeaserImpressions = false,
      type,
    } = props;
    const { setRef, isInView } = useInView({
      rootMargin: '200px',
      triggerOnce: true,
    });

    const {
      recommendations,
      fetchRecommendations,
    }: useRecommendationsResponse = useRecommendations();

    const getTeaserGridLayout = () => {
      const teaserGridLayout =
        (typeof appTeaserGridLayout === 'function' &&
          appTeaserGridLayout(props)) ||
        (typeof appTeaserGridLayout === 'string' && appTeaserGridLayout);
      return teaserGridLayout;
    };

    const teaserGridLayout = getTeaserGridLayout();

    const getStyles = (): ArticleRecommendationsFactoryOptionsStyles => {
      const styles =
        (typeof appStyles === 'function' && appStyles(props)) ||
        (typeof appStyles === 'object' && appStyles) ||
        defaultStyles;

      return styles;
    };

    const styles = getStyles();

    const recoType = [
      EXPLAINING_ARTICLE_CONTENT_TYPE,
      FINANCE_DICTIONARY_TYPE,
    ].includes(origin)
      ? RECOMMENDATION_TYPE.ATERMS
      : RECOMMENDATION_TYPE.NATGOAL;

    if (isInView && contentGcid) {
      fetchRecommendations({
        contentId: contentGcid,
        articleKeywords,
        publication,
        type: type || recoType,
        operation: recommendationsOperation,
        excludeHistory: false,
        nativeAdvertisingConfig,
        ignoreTeaserImpressions,
        fallbackNativeAdvertisingGcIds,
      });
    }

    // article ids for impression tracking
    const articleIds: Array<string> = [];

    const mappedItems =
      (recommendations &&
        recommendations?.[recommendationsOperation]?.items?.length &&
        recommendations[recommendationsOperation].items.map((item) => {
          if (item.node.gcid) {
            articleIds.push(item.node.gcid);
          }
          return {
            node: {
              ...item.node,
              publicationDate: item.node.createDate,
              lead: null,
            },
          };
        })) ||
      [];

    return (
      <div
        data-nosnippet
        className={classNames({
          [styles.Container]: pageLayoutType !== RIGHT_COLUMN_PAGE_LAYOUT_TYPE,
        })}
      >
        <div className={styles.Row}>
          <div className={articleColStyle}>
            <div className={styles.Wrapper}>
              <div className={styles.TitleWrapper}>
                <div className={styles.Title}>{title || 'Mehr zum Thema'}</div>
              </div>
              <div
                /* @ts-ignore TODO: TS2322 ->  Type 'Dispatch<HTMLElement>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */
                ref={setRef}
                className={IDENTIFIER}
                data-type={
                  recommendations?.[recommendationsOperation]?.metaData?.type ||
                  ''
                }
                data-correlationid={
                  recommendations?.[recommendationsOperation]?.metaData
                    ?.correlationId || ''
                }
                data-articleids={articleIds}
              >
                {((!isInView || mappedItems.length === 0) && (
                  <TeaserGrid
                    layout={teaserGridLayout}
                    items={ensureTeaserInterface(
                      [...Array(prerenderSkeletonItems)].map((_, index) => {
                        return {
                          node: {
                            id: `skeleton-reco-item-${index}`,
                            isSkeleton: true,
                            skeletonPlaceholderImg: STYLE_3X2_PLACEHOLDER_DATA,
                          },
                        };
                      }),
                    )}
                  />
                )) || (
                  <TeaserGrid
                    layout={teaserGridLayout}
                    items={ensureTeaserInterface(mappedItems)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return ArticleRecommendations;
};
