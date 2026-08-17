import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Link from '../../../../../../../common/components/Link';
import SVGIcon from '../../../SVGIcon';
import { findMainChannelIndex } from './findMainChannelIndex';
import {
  SVG_ICONS_TYPE_CHEVRON_LEFT,
  SVG_ICONS_TYPE_CHEVRON_RIGHT,
} from '../../../../../../../shared/constants/svgIcons';
import styles from './styles.legacy.css';

const SCROLL_CHANGE = 150;
const SCROLL_OFFSET = 2;

type MainLinksProps = {
  menu: Menu;
  routePathname: string;
};
export const isNotExpanded = ({ node }: MenuTreeItemEdge) =>
  !(node && node.link && node.link.expanded);

const MainLinks = ({ menu, routePathname }: MainLinksProps) => {
  const scrollableLinks = useRef(null);
  const [isScrolledToLeft, setIsScrolledToLeft] = useState(true);
  const [isScrolledToRight, setIsScrolledToRight] = useState(false);

  const pathnameSegments = (routePathname || '/').split('/');
  const pathname = pathnameSegments.slice(0, 2).join('/');
  const linkRefs = useRef<HTMLSpanElement[]>([]);

  let currentMenu = menu?.links;
  // get the correct main channel
  if (menu?.links?.edges) {
    let mainChannelIndex = findMainChannelIndex(menu, routePathname);
    // if not found main channel, try to find home
    if (mainChannelIndex === -1) {
      mainChannelIndex = menu.links.edges.findIndex(
        ({
          /* @ts-ignore TODO: TS2339 ->  Property 'node' does not exist on type 'Maybe<MenuTreeItemEdge>'. */
          node: {
            link: { path },
          },
        }) => path === '/',
      );
    }
    if (mainChannelIndex > -1) {
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      currentMenu = menu.links.edges[mainChannelIndex].node?.subtree;
    }
  }

  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<MenuTreeItemEdge>[] | undefined' is not assignable to type 'MenuTreeItemEdge[]'. */
  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
  const mapLinks: MenuTreeItemEdge[] = currentMenu?.edges
    /* @ts-ignore TODO: TS2339 ->  Property 'node' does not exist on type 'Maybe<MenuTreeItemEdge>'. */
    .filter(({ node }) => node?.link?.label && node?.link?.path)
    .filter(isNotExpanded);

  useEffect(() => {
    const activeLinkIndex = mapLinks?.findIndex((link) => {
      return (
        routePathname === link.node?.link?.path ||
        pathname === link.node?.link?.path
      );
    });

    /* @ts-ignore TODO: TS2339 ->  Property 'scrollLeft' does not exist on type 'never'. */
    setIsScrolledToLeft(scrollableLinks.current?.scrollLeft <= 0);
    setIsScrolledToRight(
      /* @ts-ignore TODO: TS2339 ->  Property 'scrollLeft' does not exist on type 'never'. */
      scrollableLinks.current?.scrollLeft +
        /* @ts-ignore TODO: TS2339 ->  Property 'offsetWidth' does not exist on type 'never'. */
        scrollableLinks.current?.offsetWidth >=
        /* @ts-ignore TODO: TS2339 ->  Property 'scrollWidth' does not exist on type 'never'. */
        scrollableLinks.current?.scrollWidth - SCROLL_OFFSET,
    );

    setTimeout(() => {
      const linkToScroll = activeLinkIndex !== -1 ? activeLinkIndex : 0;
      linkRefs.current[linkToScroll]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
      });
    }, 0);
    // eslint-disable-next-line
  }, [routePathname, pathname]);

  if (
    !menu ||
    !menu.links ||
    !menu.links.edges ||
    menu.links.edges.length < 1
  ) {
    return null;
  }

  const scrollByStep = (direction = 1) => {
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    scrollableLinks.current.scrollLeft += SCROLL_CHANGE * direction;
  };

  return (
    <div className={styles.MainLinks}>
      <button
        onClick={() => scrollByStep(-1)}
        className={classNames(styles.IconButton, {
          [styles.Hide]: isScrolledToLeft,
        })}
      >
        <SVGIcon className={styles.Icon} type={SVG_ICONS_TYPE_CHEVRON_LEFT} />
      </button>
      <div
        className={styles.Links}
        ref={scrollableLinks}
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
        {mapLinks.map(({ node }, index) => {
          return (
            <span
              key={`navigation-subtree-${index}-${node?.link?.label}`}
              /* @ts-ignore TODO: TS2322 ->  Type 'HTMLSpanElement | null' is not assignable to type 'HTMLSpanElement'. */
              ref={(element) => (linkRefs.current[index] = element)}
            >
              <Link
                data-index={index}
                className={classNames(styles.Link, {
                  [styles.LinkActive]:
                    routePathname === node?.link?.path ||
                    pathname === node?.link?.path,
                })}
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                path={node?.link?.path}
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                label={node?.link?.label}
              />
            </span>
          );
        })}
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

export default MainLinks;
