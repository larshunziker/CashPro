import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import breadcrumbsFactory from '../../../../../common/components/Breadcrumbs/factory';
import headerStateSelector from '../../../../../shared/selectors/headerStateSelector';
import Link from '../../../../../common/components/LinkLegacy';
import SVGIcon from '../SVGIcon';
import {
  SVG_ICONS_TYPE_CHEVRON_LEFT,
  SVG_ICONS_TYPE_CHEVRON_RIGHT,
} from '../../../../../shared/constants/svgIcons';
import styles from './styles.legacy.css';
import {
  BreadcrumbsProps,
  GetBreadcrumbsFactoryStylesByProps,
} from '../../../../../common/components/Breadcrumbs/typings';

type BreadcrumbsPropsInner = BreadcrumbsProps & { isInApp: boolean };

const SCROLL_CHANGE = 150;
const SCROLL_OFFSET = 16;

const getStylesByProps: GetBreadcrumbsFactoryStylesByProps<
  BreadcrumbsPropsInner
> = ({ addClass, isInApp }) => {
  return {
    OuterWrapper: styles.OuterWrapper,
    Wrapper: classNames(styles.Wrapper, {
      /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
      [addClass]: !!addClass,
    }),
    List: classNames(styles.BreadcrumbList, { [styles.NoMarginLeft]: isInApp }),
    Link: styles.BreadcrumbLink,
    Title: styles.Title,
  };
};

const BreadcrumbsInner = breadcrumbsFactory({
  Link,
  styles: getStylesByProps,
  homeLabel: 'Startseite',
});

const Breadcrumbs = ({
  isCollapsed,
  isInApp,
  pageUrl,
}: {
  isCollapsed: boolean;
  isInApp: boolean;
  pageUrl?: string;
}) => {
  const scrollableLinks = useRef(null);
  const [isScrolledToLeft, setIsScrolledToLeft] = useState(true);
  const [isScrolledToRight, setIsScrolledToRight] = useState(true);

  const articleData = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => headerStateSelector(state).articleData,
  );
  const breadcrumbData = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => headerStateSelector(state).breadcrumbsData,
  );

  const scrollByStep = (direction = 1) => {
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    scrollableLinks.current.scrollLeft += SCROLL_CHANGE * direction;
  };

  return (
    <div
      className={classNames(styles.Container, {
        [styles.ReducedBreadcrumbs]: isCollapsed,
      })}
    >
      <button
        onClick={() => scrollByStep(-1)}
        className={classNames(styles.IconButton, {
          [styles.Hide]: isScrolledToLeft,
        })}
      >
        <SVGIcon className={styles.Icon} type={SVG_ICONS_TYPE_CHEVRON_LEFT} />
      </button>
      <div
        className={styles.Scroll}
        ref={(element) => {
          if (element) {
            setIsScrolledToLeft(element.scrollLeft <= 0);
            setIsScrolledToRight(
              element.scrollLeft + element.offsetWidth >=
                element.scrollWidth - SCROLL_OFFSET,
            );

            /* @ts-ignore TODO: TS2322 ->  Type 'HTMLDivElement' is not assignable to type 'null'. */
            scrollableLinks.current = element;
          }
        }}
        onScroll={(event) => {
          const { scrollLeft, scrollWidth, offsetWidth } =
            event.target as HTMLElement;
          const isOnLeft = scrollLeft <= 0;
          const isOnRight =
            scrollLeft + offsetWidth >= scrollWidth - SCROLL_OFFSET;

          if (isScrolledToLeft !== isOnLeft) {
            setIsScrolledToLeft(isOnLeft);
          }

          if (isScrolledToRight !== isOnRight) {
            setIsScrolledToRight(isOnRight);
          }
        }}
      >
        <BreadcrumbsInner
          pageUrl={
            /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
            pageUrl || articleData.preferredUri || (breadcrumbData && '/') || ''
          }
          /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
          items={breadcrumbData || articleData.activeMenuTrail}
          isInApp={isInApp}
        />
      </div>
      <button
        onClick={() => scrollByStep()}
        className={classNames(styles.IconButton, styles.IconRight, {
          [styles.Hide]: isScrolledToRight,
        })}
      >
        <SVGIcon className={styles.Icon} type={SVG_ICONS_TYPE_CHEVRON_RIGHT} />
      </button>
    </div>
  );
};
export default Breadcrumbs;
