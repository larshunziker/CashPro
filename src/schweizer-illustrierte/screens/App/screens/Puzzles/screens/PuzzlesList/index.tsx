import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames';
import { getTealiumData } from '../../../../../../../shared/helpers/tealium/helper';
import { getDaysArray, getHasAccess, getWeekArray } from '../../helpers';
import authStateSelector from '../../../../../../../shared/selectors/authStateSelector';
import withPagePager from '../../../../../../../shared/decorators/withPagePager';
import withParams from '../../../../../../../shared/decorators/withParams';
import { setScreenReady } from '../../../../../../shared/actions/route';
import Link from '../../../../../../../common/components/Link';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import ButtonWithLoading from '../../../../components/ButtonWithLoading';
import Helmet from '../../../../components/Helmet';
import Icon from '../../../../components/Icon';
import Img from '../../../../components/Img';
import StatusPage from '../../../StatusPage';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../../../../components/Pager';
import { ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE } from '../../../../../../../shared/constants/structuredData';
import { ROUTE_PUZZLES_PLAY } from '../../../../constants';
import {
  INITIAL_DATE,
  PAGE_SIZE,
  PUZZLES,
  PUZZLE_WORD_SEARCH,
} from '../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { PuzzleItemProps, PuzzlesListProps } from '../../typings';

type PuzzlesListPropsInner = PuzzlesListProps & {
  isAuthenticated?: boolean;
  subscriptions?: string[];
  initialAuthRequest?: boolean;
};

const PuzzlesList = ({
  puzzle,
  location,
  page,
  isAuthenticated,
  subscriptions,
  initialAuthRequest,
}: PuzzlesListPropsInner) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setScreenReady(true, {
        pathname: location.pathname,
        ...getTealiumData({
          object: {
            preferredUri: location.pathname,
            __typename: 'PuzzlesList',
          },
        }),
      }),
    );
  });
  const currentPuzzle = PUZZLES.find(
    (puzzleItem) => puzzleItem.name === puzzle,
  );

  const [gameInstructionsVisible, setGameInstructionsVisible] = useState(false);

  if (!currentPuzzle) {
    return <StatusPage />;
  }

  const dateOneYearBack = new Date();
  dateOneYearBack.setFullYear(dateOneYearBack.getFullYear() - 1);

  const shouldOnlyAddNewGameOnceAWeek = puzzle === PUZZLE_WORD_SEARCH;

  const startDate =
    INITIAL_DATE > dateOneYearBack ? INITIAL_DATE : dateOneYearBack;

  const dateList = shouldOnlyAddNewGameOnceAWeek
    ? getWeekArray(startDate, new Date())
    : getDaysArray(startDate, new Date());

  const dateListStart = PAGE_SIZE * ((page || 0) - 1);
  const dateListEnd = PAGE_SIZE * (page || 0);

  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string[] | undefined' is not assignable to parameter of type 'string[]'. */
  const hasAccess = getHasAccess(subscriptions);

  return (
    <TestFragment data-testid="puzzles-container">
      <Helmet
        title={`${currentPuzzle.title} Archiv`}
        meta={[
          {
            name: 'robots',
            content: ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE,
          },
        ]}
      />
      <div className={classNames(grid.Container)}>
        <div className={styles.Wrapper}>
          <div className={styles.HeaderIcon}>
            <Img
              url={currentPuzzle.icons[0]}
              width={100}
              alt={currentPuzzle.title}
            />
          </div>
          <div className={styles.Title}>{currentPuzzle.title}</div>
          {((hasAccess || !currentPuzzle.freeGame) && (
            <div className={styles.Description}>
              {currentPuzzle.description}
            </div>
          )) || (
            <div className={styles.Description}>
              Jetzt gratis TESTSPIEL ausprobieren
              <Link
                path={currentPuzzle.freeGame}
                className={styles.FreePlayButton}
              >
                <TestFragment data-testid="puzzles-freegame">
                  <ButtonWithLoading
                    size="small"
                    type="button"
                    ariaLabel={isAuthenticated ? 'Spielen' : 'Anmelden'}
                    role="link"
                  >
                    {isAuthenticated && initialAuthRequest
                      ? 'Spielen'
                      : 'Anmelden'}
                  </ButtonWithLoading>
                </TestFragment>{' '}
              </Link>
            </div>
          )}
          {currentPuzzle?.instruction && (
            <>
              <button
                className={styles.GameInstructionsButton}
                onClick={() =>
                  setGameInstructionsVisible(!gameInstructionsVisible)
                }
              >
                Spielanleitung
                <Icon
                  type="IconChevronDown"
                  addClass={classNames(styles.Icon, {
                    [styles.IconChevronUpActive]: gameInstructionsVisible,
                  })}
                />
              </button>
              {gameInstructionsVisible && (
                <div className={styles.GameInstructionsContainer}>
                  {currentPuzzle.instruction}
                </div>
              )}
            </>
          )}
          <ul className={styles.ListingWrapper}>
            {dateList.slice(dateListStart, dateListEnd).map((day) => {
              return new Array(currentPuzzle.levels?.length || 1)
                .fill(null)
                .map((_, index) => (
                  <PuzzleItem
                    index={index}
                    level={currentPuzzle.levels?.[index] || ''}
                    key={`puzzle-${day}-${currentPuzzle.levels?.[index] || ''}`}
                    day={day}
                    puzzle={currentPuzzle}
                  />
                ));
            })}
          </ul>
          <Pager
            component={PAGER_TYPE_PAGE_LOADER}
            currentPage={page}
            itemsCount={dateList.length}
            itemsPerPage={PAGE_SIZE}
          />
        </div>
      </div>
    </TestFragment>
  );
};

const PuzzleItem = ({ index, level, puzzle, day }: PuzzleItemProps) => {
  const puzzleName = level ? `${puzzle.name}-${level}` : puzzle.name;
  const LinkOptions = {
    path: `/${ROUTE_PUZZLES_PLAY}/${puzzleName}/${day.date}`,
  };

  return (
    <TestFragment data-testid="puzzle-listing-gamelink">
      <li
        className={styles.PuzzleListItem}
        key={`puzzle-${puzzleName}-${day.date}`}
      >
        <Link path={LinkOptions?.path} className={styles.Link}>
          <>
            <div className={styles.PuzzleIcon}>
              <Img url={puzzle.icons[index]} />
            </div>
            <span className={styles.PuzzleTitle}>
              {puzzle.title} {level && `(${level})`}
            </span>
            <span className={styles.Date}>{day.dateFormatted}</span>
          </>
        </Link>
      </li>
    </TestFragment>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  isAuthenticated: authStateSelector(state).isAuthenticated,
  subscriptions: authStateSelector(state).subscriptions,
  initialAuthRequest: authStateSelector(state).initialAuthRequest,
});

export default compose<any, any>(
  withParams,
  connect(mapStateToProps),
  withPagePager,
)(PuzzlesList);
