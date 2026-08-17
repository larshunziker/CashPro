import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views'. '/Users/bhs/code/work/rasch-stack/node_modules/re */
import SwipeableViews from 'react-swipeable-views';
import { useQuery } from '@apollo/client';
import classNames from 'classnames';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import { getChunks, getCombinedData } from './helpers';
import windowStateSelector from '../../../../../../../shared/selectors/windowStateSelector';
import { useUserSnap } from '../../../../../../shared/hooks/useUserSnap';
import Icon from '../../../Icon';
import Skeleton from '../../../Skeleton';
import Card from './components/Card';
import MobilePagination from './components/MobilePagination';
import {
  dividendCalendarApolloConfig,
  dividendQuoteApolloConfig,
} from './apolloConfig';
import useInView from '../../../../../../../shared/hooks/useInView';
import emptyStateIllustration from './assets/empty-state.svg';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { CalendarData, DividendCalendarProps, QueryResult } from './typings';

const DividendCalendar = ({
  widgetParagraph,
  origin,
}: DividendCalendarProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const userSnapAPI = useUserSnap();
  const { setRef, isInView } = useInView({
    rootMargin: '200px',
    triggerOnce: true,
  });
  const wasTriggered = useRef(false);

  const isArticleAside = origin === 'articleAside';

  const today = new Date();
  today.setFullYear(today.getFullYear() - 4);

  const openSurvey = () => {
    if (userSnapAPI) {
      userSnapAPI.logEvent('dividend_calendar');
    }
  };

  const title = widgetParagraph?.title || null;

  const viewport = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => windowStateSelector(state)?.viewport?.from,
  );

  const cardsPerViewport =
    (isArticleAside && 1) ||
    (viewport >= 1680 && 3) ||
    (viewport >= 760 && 2) ||
    1;

  const { query: dividendCalendarQuery, ...dividendCalendarOptions } =
    dividendCalendarApolloConfig.options({
      /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
      params: { cardsPerViewport: 0, offset: 0 },
    });

  const {
    data: dividendData,
    loading: dividendLoading,
    error: dividendError,
  } = useQuery<QueryResult>(dividendCalendarQuery, dividendCalendarOptions);

  const slideData = dividendData?.integration?.edi?.dividendCalendar.data || [];

  let instrumentKeys = null;
  if (slideData) {
    instrumentKeys = slideData.map((item) => item.instrumentKey);
  }

  const { query: dividendQuoteQuery, ...dividendQuoteOptions } =
    dividendQuoteApolloConfig.options({
      /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
      params: { instrumentKeys: instrumentKeys?.join() },
    });

  const {
    data: quoteData,
    loading: quoteLoading,
    error: quotesError,
  } = useQuery(dividendQuoteQuery, dividendQuoteOptions);

  const finalData = useRef<CalendarData[]>([]);

  if (!finalData.current.length && slideData.length && quoteData) {
    finalData.current = getCombinedData(slideData, quoteData);
  }

  if (!finalData.current) {
    return null;
  }

  if (
    !finalData.current ||
    dividendLoading ||
    quoteLoading ||
    quotesError ||
    dividendError
  ) {
    return <Skeleton show={true} addClass={styles.Skeleton} />;
  }

  const handleIndexChange = (index: number) => {
    if (index >= 0) {
      setActiveIndex(index);
    }
  };

  const isLastSlide =
    (dividendData?.integration?.edi?.dividendCalendar?.count || 0) /
      cardsPerViewport <=
    activeIndex + 1;

  const dataChunk: Array<CalendarItem[]> = getChunks(
    finalData.current,
    cardsPerViewport,
  );
  const hasNoData = finalData.current.length === 0;

  if (isInView && wasTriggered?.current === false) {
    wasTriggered.current = true;
    tealiumTrackEvent({
      type: 'view',
      payload: {
        event_name: 'element_interaction',
        element: 'dividend_calendar',
        element_action: 'Impression',
        element_position: `${origin}`,
      },
    });
  }

  if (hasNoData) {
    return (
      /* @ts-ignore TODO: TS2322 ->  Type 'Dispatch<HTMLElement>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */
      <div className={styles.Wrapper} ref={setRef}>
        {title && (
          <div>
            <h2 className={styles.Title}>{title}</h2>
          </div>
        )}
        <div className={styles.EmptyState}>
          <img
            src={emptyStateIllustration}
            alt="Illustration: derzeit keine Daten verfuegbar"
            aria-hidden="true"
            className={styles.EmptyStateIllustration}
          />
          <p className={styles.EmptyStateText}>Derzeit keine Daten verfügbar</p>
        </div>
      </div>
    );
  }

  return (
    /* @ts-ignore TODO: TS2322 ->  Type 'Dispatch<HTMLElement>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */
    <div className={styles.Wrapper} ref={setRef}>
      {title && (
        <div>
          <h2 className={styles.Title}>{title}</h2>
        </div>
      )}
      {dataChunk.length > 1 && (
        <button
          onClick={() => {
            handleIndexChange(activeIndex - 1);
            tealiumTrackEvent({
              type: 'link',
              payload: {
                event_name: 'element_interaction',
                element: 'dividend_calendar',
                element_action: 'swipe_left',
                element_position: `${origin}`,
                currentSlide:
                  activeIndex - 1 > 0 ? activeIndex - 1 : 'is_first_slide',
                previousSlide: activeIndex,
                isMobile: false,
              },
            });
          }}
          title="Zurück"
          aria-label="zurück"
          className={classNames(
            { [styles.Hidden]: isArticleAside },
            grid.HiddenSmDown,
            styles.NavigationItem,
            styles.Left,
          )}
        >
          <Icon
            addClass={classNames({
              [styles.Disabled]: activeIndex === 0,
            })}
            type={'IconChevronLeft'}
          />
        </button>
      )}
      <SwipeableViews
        index={activeIndex}
        onChangeIndex={(index: number) => {
          handleIndexChange(index);

          if (index > activeIndex) {
            tealiumTrackEvent({
              type: 'link',
              payload: {
                event_name: 'element_interaction',
                element: 'dividend_calendar',
                element_action: 'swipe_right (mouse)',
                element_position: `${origin}`,
                currentSlide: (!isLastSlide && index) || 'is_last_slide',
                previousSlide: activeIndex,
              },
            });
          }
          if (index < activeIndex) {
            tealiumTrackEvent({
              type: 'link',
              payload: {
                event_name: 'element_interaction',
                element: 'dividend_calendar',
                element_action: 'swipe_left (mouse)',
                element_position: `${origin}`,
                currentSlide: index > 0 ? index : 'is_first_slide',
                previousSlide: activeIndex,
              },
            });
          }
        }}
        enableMouseEvents={true}
        resistance
        className={''}
        containerStyle={{ width: '100%' }}
      >
        {dataChunk?.map((slide: CalendarItem[], idx: number) => {
          return (
            <div
              className={styles.CardsWrapper}
              key={`dividend-calendar-cards-${idx}-${JSON.stringify(slide)}`}
            >
              {slide?.map((item: CalendarData, index: number) => {
                return (
                  <Card
                    key={`dividend-calendar-card-${index}-${item.isin}`}
                    data={item}
                    cardsPerViewport={cardsPerViewport}
                    origin={origin}
                  />
                );
              })}
            </div>
          );
        })}
      </SwipeableViews>

      {dataChunk.length > 1 && (
        <button
          onClick={() => {
            !isLastSlide && handleIndexChange(activeIndex + 1);
            tealiumTrackEvent({
              type: 'link',
              payload: {
                event_name: 'element_interaction',
                element: 'dividend_calendar',
                element_action: 'swipe_right',
                element_position: `${origin}`,
                currentSlide:
                  (!isLastSlide && activeIndex + 1) || 'is_last_slide',
                previousSlide: activeIndex,
                isMobile: false,
              },
            });
          }}
          title="Weiter"
          aria-label="weiter"
          className={classNames(
            { [styles.Hidden]: isArticleAside },
            grid.HiddenSmDown,
            styles.NavigationItem,
            styles.Right,
          )}
        >
          <Icon
            type={'IconChevronRight'}
            addClass={classNames({
              [styles.Disabled]: isLastSlide,
            })}
          />
        </button>
      )}

      {dataChunk.length > 1 && (
        <MobilePagination
          isArticleAside={isArticleAside}
          activeIndex={activeIndex}
          isLastSlide={isLastSlide}
          handleIndexChange={handleIndexChange}
          dataCount={
            dividendData?.integration?.edi?.dividendCalendar?.count || 0
          }
          origin={origin}
        />
      )}
      {!isArticleAside && (
        <div className={styles.SurveyWrapper}>
          <span>
            {`Was denken Sie über den Dividenden-Kalender? `}
            <button
              className={styles.Link}
              onClick={() => {
                openSurvey();
                tealiumTrackEvent({
                  type: 'link',
                  payload: {
                    event_name: 'element_interaction',
                    element: 'dividend_calendar',
                    element_action: 'survey_click',
                    element_position: `${origin}`,
                  },
                });
              }}
            >
              Teilen Sie uns bitte Ihre Meinung mit.
            </button>
          </span>
        </div>
      )}
    </div>
  );
};

export default DividendCalendar;
