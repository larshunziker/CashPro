import React, { ReactElement, useCallback, useState } from 'react';
import { connect, useSelector } from 'react-redux';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views'. '/Users/bhs/code/work/rasch-stack/node_modules/re */
import SwipeableViews from 'react-swipeable-views';
import classNames from 'classnames';
import selectLocationState from '../../../../../../../shared/selectors/locationStateSelector';
import navigationStateSelector from '../../../../../../../shared/selectors/navigationStateSelector';
import { MARKETING_PAGE } from '../../../../../../shared/actions/route';
import RefetchGqlDataLink from '../../../RefetchGqlDataLink';
import SVGIcon from '../../../SVGIcon';
import {
  SVG_ICONS_TYPE_CHEVRON_LEFT,
  SVG_ICONS_TYPE_CHEVRON_RIGHT,
} from '../../../../../../../shared/constants/svgIcons';
import { NavigationMenuType } from '../../../../../../shared/constants/enums';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { NavigationBarComponent, NavigationBarProps } from './typings';

type NavigationBarPropsInner = NavigationBarProps & {
  routePathname: string;
  routeVertical: string;
};

const MAX_NAV_ITEMS = 10;

const MenuItems = ({
  node,
  toggleNavigation,
  routePathname,
  focusLink,
  visibleNavigation,
}: {
  node: Maybe<MenuTreeItem>;
  routePathname: string;
  visibleNavigation: string;
} & Pick<NavigationBarPropsInner, 'toggleNavigation' | 'focusLink'>) => {
  if (!node?.link?.path || !node?.link?.label) {
    return null;
  }
  return (
    <div
      data-testid="navigationbar-item"
      className={styles.ListItem}
      onMouseOver={() => {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        toggleNavigation(NavigationMenuType.FLYOUT_NAVI_MENU, node);
      }}
      onFocus={() => {
        {
          /* TODO: implement opening on tab for accessibility, but not after click */
        }
      }}
    >
      <RefetchGqlDataLink
        path={node?.link?.path || ''}
        className={classNames(styles.Link, {
          [styles.Active]: routePathname === node?.link?.path,
          [styles.Focus]: focusLink === (visibleNavigation && node?.id),
        })}
      >
        <>{node?.link?.label || ''}</>
      </RefetchGqlDataLink>
    </div>
  );
};

const NavigationBar: NavigationBarComponent = ({
  menuLinks,
  routeVertical,
  routePathname,
  toggleNavigation,
  closeFlyoutMenuDebounced,
  focusLink,
}: NavigationBarPropsInner): ReactElement => {
  const visibleNavigation = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => navigationStateSelector(state).visibleNavigation,
  );

  const handleMouseEnter = useCallback(() => {
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    if (closeFlyoutMenuDebounced.cancel) {
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      closeFlyoutMenuDebounced.cancel();
    }
  }, [closeFlyoutMenuDebounced]);

  /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
  const handleIndexChange = (index) => {
    setActiveIndex(index);
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'limit' implicitly has an 'any' type. */
  const groupItemsByLimit = (limit): Record<string, any> => {
    const chunk = [];
    if (!menuLinks) {
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Record<string, any>'. */
      return null;
    }
    for (let i = 0; i < menuLinks.length; i += limit) {
      if (i > 0) {
        if (menuLinks.slice(i, i + limit).length < limit) {
          chunk.push(
            menuLinks.slice(
              i - (limit - menuLinks.slice(i, i + limit).length),
              i + limit,
            ),
          );
        } else {
          chunk.push(menuLinks.slice(i - 1, i + limit));
        }
      } else {
        chunk.push(menuLinks.slice(i, i + limit));
      }
    }
    return chunk;
  };

  const reducedItems = groupItemsByLimit(MAX_NAV_ITEMS);
  const activeIndexByPath =
    reducedItems &&
    reducedItems.findIndex((items: MenuTreeItemEdge[]) => {
      return items.some((item) => item.node?.link?.path === routePathname);
    });

  const [activeIndex, setActiveIndex] = useState(
    activeIndexByPath === -1 ? 0 : activeIndexByPath,
  );

  if (!menuLinks || !Array.isArray(menuLinks) || menuLinks.length === 0) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  return (
    <nav
      className={classNames(styles.Navigation, {
        [styles.Hidden]: routeVertical === MARKETING_PAGE,
      })}
      data-testid="navigationbar-container"
      onMouseLeave={closeFlyoutMenuDebounced}
      onMouseEnter={handleMouseEnter}
    >
      <div className={classNames(styles.List, grid.HiddenXlUp)}>
        <SwipeableViews
          index={activeIndex}
          resistance
          onChangeIndex={handleIndexChange}
          enableMouseEvents={true}
          className={styles.Slider}
          containerStyle={{ width: '100%' }}
        >
          {reducedItems &&
            /* @ts-ignore TODO: TS7006 ->  Parameter 'items' implicitly has an 'any' type. */
            /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
            reducedItems.map((items, index) => {
              return (
                <div
                  key={`slide-navigation-wrapper-${index}`}
                  className={styles.Slide}
                >
                  {/* @ts-ignore TODO: TS7031 ->  Binding element 'node' implicitly has an 'any' type. */}
                  {items.map(({ node }) => {
                    return (
                      <MenuItems
                        key={`navigation-menu-item-${node?.link?.label}`}
                        node={node}
                        toggleNavigation={toggleNavigation}
                        routePathname={routePathname}
                        focusLink={focusLink}
                        /* @ts-ignore TODO: TS2322 ->  Type 'string | null | undefined' is not assignable to type 'string'. */
                        visibleNavigation={visibleNavigation}
                      />
                    );
                  })}
                </div>
              );
            })}
        </SwipeableViews>
        <button
          onClick={() => {
            handleIndexChange(activeIndex - 1);
          }}
          title="Zurück"
          aria-label="zurück"
          className={classNames(styles.PrevButton, {
            [styles.Hide]: activeIndex === 0,
          })}
        >
          <span className={styles.AnimationLeft}>
            <SVGIcon type={SVG_ICONS_TYPE_CHEVRON_LEFT} />
          </span>
        </button>
        <button
          onClick={() => {
            handleIndexChange(activeIndex + 1);
          }}
          title="Weiter"
          aria-label="weiter"
          className={classNames(styles.NextButton, {
            [styles.Hide]:
              activeIndex === 1 || menuLinks.length < MAX_NAV_ITEMS,
          })}
        >
          <span className={styles.AnimationRight}>
            <SVGIcon type={SVG_ICONS_TYPE_CHEVRON_RIGHT} />
          </span>
        </button>
      </div>
      <div className={classNames(styles.List, grid.HiddenXlDown)}>
        {menuLinks.map(({ node }) => {
          return (
            <MenuItems
              key={`navigation-menu-item-${node?.link?.label}`}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<MenuTreeItem> | undefined' is not assignable to type 'Maybe<MenuTreeItem>'. */
              node={node}
              toggleNavigation={toggleNavigation}
              routePathname={routePathname}
              focusLink={focusLink}
              /* @ts-ignore TODO: TS2322 ->  Type 'string | null | undefined' is not assignable to type 'string'. */
              visibleNavigation={visibleNavigation}
            />
          );
        })}
      </div>
    </nav>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  routePathname: selectLocationState(state).locationBeforeTransitions.pathname,
  routeVertical: selectLocationState(state).vertical,
});

export default connect(mapStateToProps)(NavigationBar);
