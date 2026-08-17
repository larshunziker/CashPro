import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { TIME_ELAPSED_FORMAT_DATE_WITH_TIME } from '../../../../../../../../../shared/helpers/dateTimeElapsed';
import {
  ensureTeaserInterfaceItem,
  renderDateTime,
} from '../../../../../Teaser/shared/helpers';
import pianoStateSelector from '../../../../../../../../../shared/selectors/pianoStateSelector';
import useRecommendations from '../../../../../../../../../shared/hooks/useRecommendations';
import Teaser from '../../../../../Teaser';
import ContentBoxSkeleton from '../ContentBoxSkeleton';
import { ContentBoxBodyProps } from '../..';
import { useSSRContext } from '../../../../../../../../../common/components/SSRContext';
import { CONTENT_BOX_STYLE_NUMBERED_LIST } from '../../../../../../../../../shared/constants/content';
import { PUBLICATION_ENUM_MAPPING } from '../../../../../../../../../shared/constants/publications';
import { RECOMMENDATION_OPERATION } from '../../../../../../../../../shared/constants/recommendations';
import { TEASER_LAYOUT_TEXT } from '../../../../../../../../../shared/constants/teaser';
import styles from './styles.legacy.css';

const recommendationsOperation = RECOMMENDATION_OPERATION.MOST_READ;

const MostReadBody = ({ currentTab }: ContentBoxBodyProps) => {
  const { recommendations, fetchRecommendations } = useRecommendations();
  const fetchRecommendationsRef = useRef(fetchRecommendations);
  const { isSSR } = useSSRContext();

  const publication = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => pianoStateSelector(state).pageMetadata.publication,
  );

  const section = useSelector((state) =>
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    pianoStateSelector(state).pageMetadata.section.toLowerCase(),
  );

  useEffect(() => {
    if (currentTab) {
      fetchRecommendationsRef.current({
        publication:
          /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ beobachter */
          PUBLICATION_ENUM_MAPPING[section] || // better indicator for subPublicatons (HZB / SV / BIL)
          /* @ts-ignore TODO: TS2538 ->  Type 'null' cannot be used as an index type. */
          PUBLICATION_ENUM_MAPPING[publication], // as default we take the publication to at least show any content
        excludeHistory: false,
        articleKeywords: {},
        contentId: '1', // random number as it gets ignored by mostread anyway
        operation: recommendationsOperation,
        limit: 5,
      });
    }
  }, [currentTab, section, publication]);

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
                  {renderDateTime(
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
