import React from 'react';
import classNames from 'classnames';
import Link from '../../../../../../../common/components/Link';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import ButtonWithLoading from '../../../../components/ButtonWithLoading';
import Img from '../../../Img';
import { ROUTE_PUZZLES } from '../../../../constants';
import styles from './styles.legacy.css';
import { Puzzle } from '../../../../screens/Puzzles/typings';

/* @ts-ignore TODO: TS7031 ->  Binding element 'content' implicitly has an 'any' type. */
const Badge = ({ content }) => {
  return (
    <TestFragment data-testid="teaser-puzzle-badge">
      <div className={styles.BadgeContainer}>
        <div className={styles.Badge}>{content}</div>
      </div>
    </TestFragment>
  );
};

const TeaserPuzzle = ({ title, description, icon, name, badge }: Puzzle) => {
  return (
    <div>
      {badge && <Badge content={badge} />}
      <div className={classNames(styles.TeaserContainer)}>
        <div className={styles.TeaserSection1}>
          {/* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */}
          <Img url={icon} addClass={styles.GameIcon} />
          <div
            className={styles.TeaserTitle}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>
        <div className={styles.TeaserSection2}>
          <div className={styles.TeaserShortTitle}>{description}</div>
          <Link
            path={`/${ROUTE_PUZZLES}/${name}`}
            className={styles.TeaserPlayContainer}
          >
            <ButtonWithLoading
              type="button"
              size="small"
              mobileFullWidth={true}
              ariaLabel="Spielen"
              data-testid="play-button"
              role="link"
            >
              Spielen
            </ButtonWithLoading>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeaserPuzzle;
