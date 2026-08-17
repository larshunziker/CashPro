import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { useSwipeable } from 'react-swipeable';
import useRaschRouterLocation from '../../../../../../../shared/hooks/useRaschRouterLocation';
import Link from '../../../../../../../common/components/Link';
import SVGIcon from '../../../../components/SVGIcon';
import {
  SVG_ICONS_TYPE_CHEVRON_LEFT,
  SVG_ICONS_TYPE_CHEVRON_RIGHT,
} from '../../../../../../../shared/constants/svgIcons';
import {
  SEARCH_FILTERS_ALL,
  SEARCH_FILTERS_ARTICLE,
  SEARCH_FILTERS_BOOKS,
  SEARCH_FILTERS_DOCUMENTS,
  SEARCH_FILTERS_LEGAL_ADVICE,
  SEARCH_FILTERS_SONSTIGES,
  SEARCH_FILTERS_VIDEOS,
} from '../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const SCROLL_CHANGE = 150;
const SCROLL_OFFSET = 16;

const getHref = (query: string, filter: string) => {
  if (!query) {
    return undefined;
  }
  if (!filter) {
    filter = SEARCH_FILTERS_ALL;
  }
  return `/suche/${filter ? filter + '/' : ''}${query}`;
};

type FiltersTypes = {
  label: string;
  value: string;
  amount?: number;
};

const SearchFilters = ({
  facets,
}: {
  facets: { name: string; count: number }[];
}) => {
  const { params } = useRaschRouterLocation();
  const scrollableLinks = useRef<HTMLDivElement>(null);
  const [isScrolledToLeft, setIsScrolledToLeft] = useState<boolean>(true);
  const [isScrolledToRight, setIsScrolledToRight] = useState<boolean>(false);
  const [swipeStart, setSwipeStart] = useState<number>(0);

  const scrollByStep = (direction = 1) => {
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    scrollableLinks.current.scrollLeft += SCROLL_CHANGE * direction;
  };

  const filters: Array<FiltersTypes> = useMemo(() => {
    const facetValues =
      facets?.reduce(
        (acc, facet: { name: string; count: number }) => {
          acc[facet.name] = facet.count;
          return acc;
        },
        {} as Record<string, number>,
      ) || {};
    return [
      {
        label: 'Alle',
        value: SEARCH_FILTERS_ALL,
        amount: facetValues[SEARCH_FILTERS_ALL],
      },
      {
        label: 'Artikel',
        value: SEARCH_FILTERS_ARTICLE,
        amount: facetValues[SEARCH_FILTERS_ARTICLE],
      },
      {
        label: 'Rechtsratgeber',
        value: SEARCH_FILTERS_LEGAL_ADVICE,
        amount: facetValues[SEARCH_FILTERS_LEGAL_ADVICE],
      },
      {
        label: 'Vorlagen & Checkliste',
        value: SEARCH_FILTERS_DOCUMENTS,
        amount: facetValues[SEARCH_FILTERS_DOCUMENTS],
      },
      {
        label: 'Videos',
        value: SEARCH_FILTERS_VIDEOS,
        amount: facetValues[SEARCH_FILTERS_VIDEOS],
      },
      {
        label: 'Bücher',
        value: SEARCH_FILTERS_BOOKS,
        amount: facetValues[SEARCH_FILTERS_BOOKS],
      },
      {
        label: 'Sonstiges',
        value: SEARCH_FILTERS_SONSTIGES,
        amount: facetValues[SEARCH_FILTERS_SONSTIGES],
      },
    ];
  }, [facets]);

  useEffect(() => {
    if (scrollableLinks.current) {
      setIsScrolledToLeft(scrollableLinks.current.scrollLeft <= 0);
      setIsScrolledToRight(
        scrollableLinks.current.scrollLeft +
          scrollableLinks.current.offsetWidth >=
          scrollableLinks.current.scrollWidth - SCROLL_OFFSET,
      );
    }
  }, []);
  const handleScroll = useCallback(
    /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
    (event) => {
      const { scrollLeft, scrollWidth, offsetWidth } =
        event.target as HTMLElement;
      const isOnLeft = scrollLeft <= 0;
      const isOnRight = scrollLeft + offsetWidth >= scrollWidth - SCROLL_OFFSET;

      if (isScrolledToLeft !== isOnLeft) {
        setIsScrolledToLeft(isOnLeft);
      }

      if (isScrolledToRight !== isOnRight) {
        setIsScrolledToRight(isOnRight);
      }
    },
    [isScrolledToLeft, isScrolledToRight],
  );
  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      // @ts-ignore
      scrollableLinks.current.scrollLeft = swipeStart - eventData.deltaX;
    },
    onSwipeStart: () => {
      setSwipeStart(scrollableLinks?.current?.scrollLeft || 0);
      // @ts-ignore
      scrollableLinks.current.style.pointerEvents = 'none';
    },
    onSwiped: () => {
      // @ts-ignore
      scrollableLinks.current.style.pointerEvents = 'auto';
    },
    trackMouse: true,
    trackTouch: false,
    delta: 1,
  });
  return (
    <div className={classNames(styles.Container, grid.Container)}>
      <button
        onClick={() => scrollByStep(-1)}
        className={classNames(styles.IconButton, {
          [styles.Hide]: isScrolledToLeft,
        })}
        data-testid="button-prev"
      >
        <SVGIcon className={styles.Icon} type={SVG_ICONS_TYPE_CHEVRON_LEFT} />
      </button>

      <div
        className={classNames(styles.Scroll)}
        data-testid="search-filters"
        {...handlers}
        ref={scrollableLinks}
        onScroll={handleScroll}
      >
        {filters.map((item, index) => (
          <Link
            path={
              params.filter !== item.value
                ? getHref(params.query, item.value)
                : getHref(params.query, '')
            }
            key={`filter-link-${item.label || index}`}
            className={classNames(styles.SearchButton, {
              [styles.Checked]: params.filter === item.value,
              [styles.Disabled]: item.amount === 0,
            })}
            label={`${item.label} (${item.amount})`}
          />
        ))}
      </div>
      <button
        onClick={() => scrollByStep()}
        className={classNames(styles.IconButton, styles.IconRight, {
          [styles.Hide]: isScrolledToRight,
        })}
        data-testid="button-next"
      >
        <SVGIcon className={styles.Icon} type={SVG_ICONS_TYPE_CHEVRON_RIGHT} />
      </button>
    </div>
  );
};

export default SearchFilters;
