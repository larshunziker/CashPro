import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import classNames from 'classnames';
import Link from '../../../../../../../common/components/Link';
import SVGIcon from '../../../../components/SVGIcon';
import {
  SVG_ICONS_TYPE_CHEVRON_LEFT,
  SVG_ICONS_TYPE_CHEVRON_RIGHT,
} from '../../../../../../../shared/constants/svgIcons';
import styles from './styles.legacy.css';
import { LegalAdviceCategory } from '../../typings';

type LegalAdviceCategoriesProps = Partial<Pick<RouterProps, 'location'>> & {
  categories: LegalAdviceCategory[];
  label?: string;
};
const SCROLL_CHANGE = 150;
const SCROLL_OFFSET = 16;

const LegalAdviceCategories = ({
  categories = [],
  location,
  label = 'Unterthemen:',
}: LegalAdviceCategoriesProps) => {
  const scrollableLinks = useRef<HTMLDivElement>(null);
  const [isScrolledToLeft, setIsScrolledToLeft] = useState<boolean>(true);
  const [isScrolledToRight, setIsScrolledToRight] = useState<boolean>(false);
  const [swipeStart, setSwipeStart] = useState<number>(0);

  const scrollByStep = (direction = 1) => {
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    scrollableLinks.current.scrollLeft += SCROLL_CHANGE * direction;
  };
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
  if (categories.length === 0) {
    return;
  }

  return (
    <>
      {label && <p className={styles.CategoriesLabel}>{label}</p>}
      <div className={styles.CategoriesWrapper}>
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
          {...handlers}
          ref={scrollableLinks}
          onScroll={handleScroll}
        >
          {categories
            .sort((a, b) => Number(a.sortKey) - Number(b.sortKey))
            .map((category) => {
              return (
                <Link
                  key={category.id}
                  className={styles.Category}
                  path={category.path + (location?.search || '') + '#0'}
                >
                  {category.title} {!!category.count && `(${category.count})`}
                  {category.isKMU && <span className={styles.Badge}>KMU</span>}
                </Link>
              );
            })}
        </div>
        <button
          onClick={() => scrollByStep()}
          className={classNames(styles.IconButton, styles.IconRight, {
            [styles.Hide]: isScrolledToRight,
          })}
          data-testid="button-next"
        >
          <SVGIcon
            className={styles.Icon}
            type={SVG_ICONS_TYPE_CHEVRON_RIGHT}
          />
        </button>
      </div>
    </>
  );
};

export default LegalAdviceCategories;
