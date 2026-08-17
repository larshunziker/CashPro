/**
 * @file   Trending Topics Ministage
 */

import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import locationStateSelector from '../../../../../../../shared/selectors/locationStateSelector';
import Link from '../../../../../Link';
import {
  TRACKING_CLASS_MINISTAGE_TRENDING_TOPICS_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../shared/constants/tracking';
import {
  MinistageTrendingTopicsFactoryOptions,
  MinistageTrendingTopicsFactoryOptionsStyles,
  MinistageTrendingTopicsProps,
} from './typings';

type MinistageTrendingTopicsPropsInner = MinistageTrendingTopicsProps;

const defaultStyles: MinistageTrendingTopicsFactoryOptionsStyles = {
  Wrapper: '',
  ContentWrapper: '',
  Title: '',
  KeywordWrapper: '',
  Keyword: '',
};

const ministageTrendingTopicsFactory = ({
  styles: appStyles,
  labelPrefix = '#',
  titleFallback = 'Aktuelle Themen',
}: MinistageTrendingTopicsFactoryOptions) => {
  const MinistageTrendingTopics = (
    props: MinistageTrendingTopicsPropsInner,
  ) => {
    const { ministageParagraph } = props;

    const ministageTrendingTopics: MinistageTrendingTopics | null =
      (ministageParagraph?.ministage &&
        (ministageParagraph.ministage as MinistageTrendingTopics)) ||
      null;

    const pathname = useSelector(
      (state) =>
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
        locationStateSelector(state).locationBeforeTransitions.pathname,
    );

    if (
      !ministageTrendingTopics ||
      !Array.isArray(ministageTrendingTopics.keywords?.edges) ||
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      ministageTrendingTopics?.keywords?.edges?.length < 1
    ) {
      return null;
    }

    const styles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    const title = ministageTrendingTopics.headline || titleFallback;

    return (
      <div
        className={classNames(
          TRACKING_CLASS_PARAGRAPH,
          TRACKING_CLASS_MINISTAGE_TRENDING_TOPICS_PARAGRAPH,
          styles.Wrapper,
        )}
      >
        <div className={styles.ContentWrapper}>
          {title && <div className={styles.Title}>{title}</div>}
          <div className={styles.KeywordWrapper}>
            {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
            {ministageTrendingTopics.keywords.edges.map(
              ({ node }: KeywordEdge) => {
                const linkPath = node?.link ?? node?.preferredUri;
                return (
                  <Link
                    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                    key={node.id}
                    className={classNames(styles.Keyword, {
                      /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                      [styles.ActivePath]: linkPath === pathname,
                    })}
                    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                    path={linkPath}
                    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                    label={`${labelPrefix}${node.label}`}
                  />
                );
              },
            )}
          </div>
        </div>
      </div>
    );
  };

  return MinistageTrendingTopics;
};

export default ministageTrendingTopicsFactory;
