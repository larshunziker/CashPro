import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getTealiumData } from '../../../../../../../shared/helpers/tealium/helper';
import { getHasAccess } from '../../helpers';
import authStateSelector from '../../../../../../../shared/selectors/authStateSelector';
import { setScreenReady } from '../../../../../../shared/actions/route';
import Helmet from '../../../../components/Helmet';
import Teaser from '../../../../components/Teaser';
import { TEASER_LAYOUT_PUZZLE } from '../../../../../../../shared/constants/teaser';
import styles from './styles.legacy.css';
import binoxxoLogo from '../../../../assets/graphics/puzzles/binoxxo.svg';
import kleinesKreuzwortLogo from '../../../../assets/graphics/puzzles/kleines-kreuzwort.svg';
import kreuzwortchaosLogo from '../../../../assets/graphics/puzzles/kreuzwortchaos.svg';
import kreuzwortraetselLogo from '../../../../assets/graphics/puzzles/kreuzwortraetsel.svg';
import sudokuLogo from '../../../../assets/graphics/puzzles/sudoku-einfach.svg';
import woertliLogo from '../../../../assets/graphics/puzzles/woertli.svg';
import wortsucheLogo from '../../../../assets/graphics/puzzles/wortsuche.svg';
import { Puzzle, PuzzleOverviewProps } from '../../typings';

const PUZZLES: Puzzle[] = [
  {
    title: 'Kleines<br/>Kreuzwort',
    description: 'Täglich gratis ein neues Kreuzworträtsel',
    icon: kleinesKreuzwortLogo,
    name: 'kleines-kreuzwort',
    badge: 'Kostenlos',
  },
  {
    title: 'Kreuzwort<br/>rätsel',
    description: 'Täglich ein neues Kreuzworträtsel',
    icon: kreuzwortraetselLogo,
    name: 'kreuzwortraetsel',
    badge: 'Nur mit Abo',
    restricted: true,
  },
  {
    title: 'Sudoku',
    description: 'Spiele Sudoku in 3 Spielstufen',
    icon: sudokuLogo,
    name: 'sudoku',
  },
  {
    title: 'Binoxxo',
    description: 'Wo kommt welches Symbol hin?',
    icon: binoxxoLogo,
    name: 'binoxxo',
  },
  {
    title: 'Wörtli',
    description: 'Wer findet das Wort?',
    icon: woertliLogo,
    name: 'woertli',
  },
  {
    title: 'Wörter<br/>suche',
    description: 'Wer findet die gesuchten Begriffe?',
    icon: wortsucheLogo,
    name: 'woertersuche',
  },
  {
    title: 'Kreuzwort<br/>chaos',
    description: 'Die Krux mit den verdrehten Wörtern',
    icon: kreuzwortchaosLogo,
    name: 'kreuzwortchaos',
  },
];

const PuzzlesOverview = ({ subscriptions }: PuzzleOverviewProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setScreenReady(true, {
        pathname: location.pathname,
        ...getTealiumData({
          object: {
            preferredUri: location.pathname,
            __typename: 'PuzzlesOverview',
          },
        }),
      }),
    );
  });
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string[] | undefined' is not assignable to parameter of type 'string[]'. */
  const hasAccess = getHasAccess(subscriptions);

  return (
    <div className={styles.PageWrapper}>
      <Helmet
        title="Rätselecke"
        socialMetaValues={{
          field_short_title: 'Rätselecke',
          field_short_description: 'Jeden Tag neue Rätsel entdecken',
          field_heroimage: '',
        }}
      />
      <div className={styles.OverviewCatch}>Rätselecke</div>
      <div className={styles.OverviewHeading}>
        Jeden Tag neue Rätsel entdecken
      </div>
      <div className={styles.OverviewLead}>
        Bedient euch aus unserem Fundus der besten Rätsel und knobelt nach
        Herzenslust.
      </div>
      <div className={styles.GameTeaserGrid}>
        <Teaser
          component={TEASER_LAYOUT_PUZZLE}
          {...PUZZLES[0]}
          {...{ badge: hasAccess ? '' : PUZZLES[0].badge }}
        />
        <Teaser
          component={TEASER_LAYOUT_PUZZLE}
          {...PUZZLES[1]}
          {...{ badge: hasAccess ? '' : PUZZLES[1].badge }}
        />
      </div>
      <div className={styles.AboSectionTitleWrapper}>
        <div className={styles.AboSectionTitleLines}>
          <span className={styles.AboSectionTitle}>
            Weitere Rätsel{!hasAccess ? ' mit Abo' : ''}
          </span>
        </div>
      </div>
      <div className={styles.GameTeaserGrid}>
        <Teaser component={TEASER_LAYOUT_PUZZLE} {...PUZZLES[2]} />
        <Teaser component={TEASER_LAYOUT_PUZZLE} {...PUZZLES[3]} />
        <Teaser component={TEASER_LAYOUT_PUZZLE} {...PUZZLES[4]} />
        <Teaser component={TEASER_LAYOUT_PUZZLE} {...PUZZLES[5]} />
        <Teaser component={TEASER_LAYOUT_PUZZLE} {...PUZZLES[6]} />
      </div>
      <div
        className={styles.OfferWrapper}
        id="raetselecke-overview-offer"
      ></div>
    </div>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  subscriptions: authStateSelector(state).subscriptions,
});

export default connect(mapStateToProps)(PuzzlesOverview);
