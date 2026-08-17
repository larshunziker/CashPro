import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { TIME_ELAPSED_FORMAT_DATE_WITH_TIME } from '../../../../../../../../../shared/helpers/dateTimeElapsed';
import {
  ensureTeaserInterfaceItem,
  renderDates,
} from '../../../../../Teaser/shared/helpers';
import useRecommendations from '../../../../../../../../../shared/hooks/useRecommendations';
import Teaser from '../../../../../Teaser';
import ContentBoxSkeleton from '../ContentBoxSkeleton';
import { ContentBoxBodyProps } from '../..';
import { useSSRContext } from '../../../../../../../../../common/components/SSRContext';
import { CONTENT_BOX_STYLE_NUMBERED_LIST } from '../../../../../../../../../shared/constants/content';
import { PUBLICATION_GROUP_CASH } from '../../../../../../../../../shared/constants/publications';
import { RECOMMENDATION_OPERATION } from '../../../../../../../../../shared/constants/recommendations';
import { TEASER_LAYOUT_TEXT } from '../../../../../../../../../shared/constants/teaser';
import styles from './styles.legacy.css';

const recommendationsOperation = RECOMMENDATION_OPERATION.MOST_READ;

const MostReadBody = ({ currentTab }: ContentBoxBodyProps) => {
  const { recommendations, fetchRecommendations } = useRecommendations();
  const fetchRecommendationsRef = useRef(fetchRecommendations);
  const { isSSR } = useSSRContext();

  useEffect(() => {
    fetchRecommendationsRef.current({
      publication: PUBLICATION_GROUP_CASH,
      excludeHistory: false,
      articleKeywords: {},
      contentId: '1', // random number as it gets igonred by mostread anyway
      operation: recommendationsOperation,
      limit: 5,
    });
  }, [currentTab]);

  const isNumberedList = currentTab.style === CONTENT_BOX_STYLE_NUMBERED_LIST;

  return isSSR ? (
    <ContentBoxSkeleton />
  ) : (
    <div>
      {recommendations?.[recommendationsOperation]?.items?.map(
        (item, index) => (
          <div
            className={classNames({
              [styles.Divider]: index > 0,
            })}
            key={`content-box-item-${(item as any).id}`}
          >
            <div className={styles.ContentBoxBodyWrapper}>
              {isNumberedList && (
                <div className={styles.NumberedList}>{index + 1}</div>
              )}
              <div>
                <Teaser
                  component={TEASER_LAYOUT_TEXT}
                  contentBoxType={currentTab.sortBy}
                  {...ensureTeaserInterfaceItem(item)}
                />
                <div
                  className={classNames(styles.PublicationDate, {
                    [styles.PublicationDateWithNumberedList]: isNumberedList,
                  })}
                >
                  {renderDates(
                    item as any,
                    false,
                    TIME_ELAPSED_FORMAT_DATE_WITH_TIME,
                  )}
                </div>
              </div>
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export default MostReadBody;
