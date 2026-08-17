import React, { ReactElement } from 'react';
import classNames from 'classnames';
import TestFragment from '../../../shared/tests/components/TestFragment';
import {
  RelatedContentFactoryOptions,
  RelatedContentFactoryOptionsStyles,
  RelatedContentProps,
} from './typings';

export type RelatedContentPropsInner = RelatedContentProps;

const defaultStyles: RelatedContentFactoryOptionsStyles = {
  OuterWrapper: '',
  Wrapper: '',
  TitleWrapper: '',
  Title: '',
  TeaserListSpacing: '',
  Container: '',
};

const RelatedContentFactory = ({
  Pager,
  styles: appStyles,
  teaserGrid: appTeaserGrid,
}: RelatedContentFactoryOptions) => {
  const RelatedContent = ({ ...props }: RelatedContentPropsInner) => {
    const {
      title,
      relatedContent,
      outerWrapperClass = '',
      page,
      pageSize,
      pagerType,
    } = props;
    if (!relatedContent) {
      return null;
    }

    const getStyles = () =>
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    const styles = getStyles();

    const teaserGrid: ReactElement | null =
      (typeof appTeaserGrid === 'function' && appTeaserGrid(props)) || null;

    return (
      <div
        data-nosnippet
        className={classNames(styles.OuterWrapper, outerWrapperClass)}
      >
        <div className={classNames('related-content', styles.Wrapper)}>
          {title && (
            <div className={styles.TitleWrapper}>
              <div className={styles.Container}>
                <div className={styles.Title} data-testid="title">
                  {title}
                </div>
              </div>
            </div>
          )}

          <div className={styles.TeaserListSpacing}>
            <TestFragment data-testid="teaser-list-wrapper">
              {teaserGrid}
            </TestFragment>
          </div>
          {Pager && pageSize && page && pagerType && (
            <TestFragment data-testid="pager-wrapper">
              <Pager
                itemsCount={relatedContent.count || 0}
                itemsPerPage={pageSize}
                currentPage={page}
                component={pagerType}
                anchorScrollId={`related-content-pager-${Math.floor(
                  Math.random() * 10000,
                )}`}
              />
            </TestFragment>
          )}
        </div>
      </div>
    );
  };

  return RelatedContent;
};

export default RelatedContentFactory;
