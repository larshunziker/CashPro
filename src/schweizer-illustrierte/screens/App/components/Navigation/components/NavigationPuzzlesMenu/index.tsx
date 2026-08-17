import React, { Component, MouseEvent, ReactElement } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/tests/helpers'. '/Users/bhs/code/work/rasch-s */
import { testLog } from '../../../../../../../shared/tests/helpers';
import navigationStateSelector from '../../../../../../../shared/selectors/navigationStateSelector';
import locationStateSelector from '../../../../../../shared/selectors/locationStateSelector';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import { setNavigationVisible } from '../../../../../../../shared/actions/navigation';
import Link from '../../../../../../../common/components/LinkLegacy';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import Img from '../../../Img';
import MenuHeader from './components/MenuHeader';
import menu from './menu.json';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import binoxxo from './../../../../assets/graphics/puzzles/binoxxo.svg';
import crosswordChaos from './../../../../assets/graphics/puzzles/kreutzwortchaos.svg';
import crosswordPuzzle from './../../../../assets/graphics/puzzles/kreutzwortraetsel.svg';
import crosswordPuzzleMini from './../../../../assets/graphics/puzzles/kreuzwortraetsel-mini.svg';
import sudoku from './../../../../assets/graphics/puzzles/sudoku-hard.svg';
import woertli from './../../../../assets/graphics/puzzles/woertli.svg';
import wordSearch from './../../../../assets/graphics/puzzles/wortsuche.svg';
import { ActiveMainChannel } from '../../../../../../shared/types';
import { NavigationMenuProps } from './typings';

export type NavigationMenuPropsInner = NavigationMenuProps & {
  activeMainChannel: string;
  routePathname: string;
  setNavigationVisible: (visibleNavigation: string) => void;
  visibleNavigation: string;
};

type MainLinksProps = {
  currentPathname: string;
  closeMenuHandler: (event: KeyboardEvent | MouseEvent) => void;
};

type PuzzlesMenuTreeItemEdge = {
  __typename?: 'MenuTreeItemEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<PuzzlesMenuTreeItem>;
};

type PuzzlesMenuTreeItem = {
  __typename?: 'MenuTreeItem';
  id?: Maybe<Scalars['String']>;
  link?: Maybe<MenuLink>;
  subtree?: Maybe<MenuTreeItemConnection>;
  icon?: boolean;
};

const loadPuzzlesIcon = (iconTitle: string) => {
  switch (iconTitle) {
    case 'Kleines Kreuzwort':
      return crosswordPuzzleMini;
    case 'Kreuzworträtsel':
      return crosswordPuzzle;
    case 'Sudoku':
      return sudoku;
    case 'Binoxxo':
      return binoxxo;
    case 'Wörtli':
      return woertli;
    case 'Wörtersuche':
      return wordSearch;
    case 'Kreuzwortchaos':
      return crosswordChaos;
    default:
      return crosswordPuzzleMini;
  }
};

const MainLinks = ({
  currentPathname,
  closeMenuHandler,
}: MainLinksProps): any => {
  return menu.map(
    ({ node }: PuzzlesMenuTreeItemEdge, index: number): ReactElement => {
      const outerIndex = index;
      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
      if (node.icon) {
        return (
          <li
            className={classNames('track-menu', styles.MenuItem)}
            key={`navigation-menu-item-${index}`}
            data-track-action="click"
            data-track-element={`menu-category-${index}`}
            data-testid={`menu-item-${index}`}
          >
            <Link
              onClick={closeMenuHandler}
              className={classNames('track-menu', styles.MenuSubItem, {
                [styles.ActiveLink]: node?.link?.path === currentPathname,
              })}
              data-track-action="click"
              data-track-element={`menu-link-${outerIndex}-${index}`}
              /* @ts-ignore TODO: TS2322 ->  Type 'MenuLink | null' is not assignable to type 'LinkType | MenuLink | undefined'. */
              link={node?.link || null}
            >
              <section className={classNames(styles.MenuEntry)}>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                <div className={styles.Header} role="button">
                  <div className={styles.HeaderContentWrapper}>
                    <Img
                      addClass={styles.PuzzleIcon}
                      alt="Logo Rätselecke"
                      url={loadPuzzlesIcon(node?.link?.label || '')}
                    />
                    <span
                      className={classNames(styles.Title)}
                      data-testid="expansion-panel-header-title"
                    >
                      {node?.link?.label || ''}
                    </span>
                    <div className={styles.Spacer} />
                    <div
                      className={classNames(styles.Icon, styles.ArrowIcon)}
                    />
                  </div>
                </div>
              </section>
            </Link>
          </li>
        );
      } else {
        return (
          <li
            className={classNames(styles.MenuItem, styles.SingleMenuItem)}
            key={`navigation-menu-item-${index}`}
            data-testid={`menu-item-${index}`}
          >
            <Link
              onClick={closeMenuHandler}
              data-track-action="click"
              data-track-element={`menu-link-${index}`}
              className={classNames('track-menu', styles.MenuSubItem, {
                [styles.ActiveLink]: node?.link?.path === currentPathname,
              })}
              /* @ts-ignore TODO: TS2322 ->  Type 'MenuLink | null' is not assignable to type 'LinkType | MenuLink | undefined'. */
              link={node?.link || null}
            >
              {node?.link?.label || ''}
            </Link>
          </li>
        );
      }
    },
  );
};

class NavigationPuzzlesMenu extends Component<NavigationMenuPropsInner> {
  constructor(props: NavigationMenuPropsInner) {
    super(props);
    this.closeMenuHandler = this.closeMenuHandler.bind(this);
  }

  componentDidMount() {
    global.addEventListener('keydown', this.closeMenuHandler);
  }

  closeMenuHandler(event: KeyboardEvent | MouseEvent) {
    if (
      !this.props.visibleNavigation ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      event.ctrlKey
    ) {
      return;
    }

    //@ts-ignore
    if (event?.keyCode === 27) {
      tealiumTrackEvent({
        type: 'link',
        payload: {
          event: 'menu_close_esc',
        },
      });
    }

    if (
      //@ts-ignore
      event?.keyCode === 27 ||
      event === undefined ||
      //@ts-ignore
      event?.keyCode === undefined
    ) {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'string'. */
      this.props.setNavigationVisible(null);

      testLog('closeMenuHandler has beed called');
    }
  }

  componentWillUnmount() {
    global.removeEventListener('keydown', this.closeMenuHandler);
  }

  render(): ReactElement | null {
    const { visibleNavigation, routePathname } = this.props;
    return (
      <div className={styles.Wrapper}>
        {visibleNavigation && (
          <TestFragment data-testid="menuheader-wrapper">
            <MenuHeader menuCloseHandler={this.closeMenuHandler} />
          </TestFragment>
        )}
        <div className={styles.ContentWrapper}>
          <div className={classNames(grid.Container, styles.MarginTop)}>
            <div className={grid.Row}>
              <ul
                data-testid="menu-items-wrapper"
                className={classNames(grid.ColSm17, styles.MenuListWrapper)}
              >
                <MainLinks
                  currentPathname={routePathname}
                  closeMenuHandler={this.closeMenuHandler}
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  activeMainChannel: settingsStateSelector(state)
    .activeMainChannel as ActiveMainChannel,
  routePathname:
    locationStateSelector(state).locationBeforeTransitions.pathname,
  visibleNavigation: navigationStateSelector(state).visibleNavigation,
});

const mapDispatchToProps = {
  setNavigationVisible,
};

export default compose<any, any>(connect(mapStateToProps, mapDispatchToProps))(
  NavigationPuzzlesMenu,
);
