import React, { useEffect } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-async-script-loader'. '/Users/bhs/code/work/rasch-stack/node_module */
import scriptLoader from 'react-async-script-loader';
import { connect, useDispatch } from 'react-redux';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import classNames from 'classnames';
import { getTealiumData } from '../../../../../../../shared/helpers/tealium/helper';
import { getGameDetails } from '../../helpers';
import authStateSelector from '../../../../../../../shared/selectors/authStateSelector';
import withParams from '../../../../../../../shared/decorators/withParams';
import { setScreenReady } from '../../../../../../shared/actions/route';
import Link from '../../../../../../../common/components/Link';
import Helmet from '../../../../components/Helmet';
import StatusPage from '../../../StatusPage';
import { useSSRContext } from '../../../../../../../common/components/SSRContext';
import { ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE } from '../../../../../../../shared/constants/structuredData';
import {
  API_ENDPOINT_PUZZLES,
  API_SECRET_PUZZLES,
  ROUTE_PUZZLES,
} from '../../../../constants';
import styles from './styles.legacy.css';
import logo from '../../../../assets/graphics/puzzles/puzzles-logo.svg';
import { PuzzlesDetailProps } from '../../typings';

type PuzzlesDetailPropsInner = PuzzlesDetailProps & {
  puzzle?: string;
  date?: string;
  isAuthenticated?: boolean;
  isScriptLoadSucceed?: boolean;
};

const PUZZLES_API_ENDPOINT =
  'https://raetselfabrik.de/vendor/manager/AdvancedIntegrationHandler.js';

const integration_setup = (id: number, date: string, name: string) => {
  try {
    // @ts-ignore
    const iIntegrationHandler = new Kanzlit.AdvancedIntegrationHandler(
      API_ENDPOINT_PUZZLES,
    );
    iIntegrationHandler.add(API_SECRET_PUZZLES, id, date, {
      header: {
        title: false, // true|false – Zeigt den Namen der Rätselserie im Header an
        riddleType: false, // true|false – Zeigt den Namen der Rätselart im Header an
        // true|false|object – Zeigt ein Select-Dropdown mit insgesamt 7 Rätseln (Datum) im Header an
        dropdownNavigation: {
          dateFormat: 'dd. MMMM yyyy',
        },
        prevNextButtons: false,
        // {
        //   // true|false|object — Zeigt den Button für "vorheriges Rätsel" im Header an
        //   prevButton: {
        //     classes: [], // string[] — Zusätzliche CSS-Klassen, die an den Button für "vorheriges Rätsel" gehängt werden
        //     icon: 'M352,127.3v257.3c0,17.8-21.5,26.7-34.1,14.1L189.2,270.1c-7.8-7.8-7.8-20.5,0-28.3l128.7-128.7 C330.5,100.6,352,109.5,352,127.3z', // string — Ein SVG-Pfad für das Icon das im "vorheriges Rätsel"-Button angezeigt wird (Größe 512x512)
        //     title: 'Vorheriges Rätsel', // string — Der Titel des "vorheriges Rätsel"-Button
        //   },
        //   // true|false|object — Zeigt den Button für "nächstes Rätsel" im Header an
        //   nextButton: {
        //     classes: [], // string[] — Zusätzliche CSS-Klassen, die an den Button für "nächstes Rätsel" gehängt werden
        //     icon: 'M160,384.7V127.3c0-17.8,21.5-26.7,34.1-14.1l128.7,128.7c7.8,7.8,7.8,20.5,0,28.3L194.1,398.8 C181.5,411.4,160,402.5,160,384.7z', // string — Ein SVG-Pfad für das Icon das im "nächstes Rätsel"-Button angezeigt wird (Größe 512x512)
        //     title: 'Vorheriges Rätsel', // string — Der Titel des "nächstes Rätsel"-Button
        //   },
        // },
        // true|false|object — Zeigt den Archiv-Button im Header an
        archiveButton: {
          classes: [], // string[] — Zusätzliche CSS-Klassen, die an den Archiv-Button gehängt werden
          icon: 'M47.1859 380.109C47.1859 361.235 62.3903 346.03 81.2646 346.03C100.139 346.03 115.343 361.235 115.343 380.109C115.343 398.983 100.139 414.188 81.2646 414.188C62.3903 414.188 47.1859 398.983 47.1859 380.109V380.109ZM167.772 361.759H466.616V398.459H167.772V361.759V361.759ZM47.1859 249.037C47.1859 230.162 62.3903 214.958 81.2646 214.958C100.139 214.958 115.343 230.162 115.343 249.037C115.343 267.911 100.139 283.116 81.2646 283.116C62.3903 283.116 47.1859 267.911 47.1859 249.037V249.037ZM167.772 230.687H466.616V267.387H167.772V230.687V230.687ZM47.1859 117.965C47.1859 99.0905 62.3903 83.8861 81.2646 83.8861C100.139 83.8861 115.343 99.0905 115.343 117.965C115.343 136.839 100.139 152.044 81.2646 152.044C62.3903 152.044 47.1859 136.839 47.1859 117.965V117.965ZM167.772 99.6147H466.616V136.315H167.772V99.6147V99.6147Z', // string — Ein SVG-Pfad für das Icon das im Archiv-Button angezeigt wird (Größe 512x512)
          title: 'Zum Archiv', // string — Der Titel des "Archiv"-Button
          link: `/${ROUTE_PUZZLES}/${name}`, // string — Die URL zur Archiv-Seite
        },
        errors: {
          showBackButton: false, // true|false – Zeigt den "Zurück"-Button in den Fehlermeldungen an
          noValidRiddlesFound:
            'Leider konnten wir keine gültigen Rätsel für das gewünschte Datum finden. Bitte wenden Sie sich an den Administrator.', // string – Ein alternativer Text für die Fehlermeldung, falls keine Rätsel abgerufen werden konnten
        },
      },
    });
    iIntegrationHandler.init();
  } catch (Exception) {
    console.warn('Kanzlit Third-Part Error', Exception); // eslint-disable-line
  }
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'title' implicitly has an 'any' type. */
const Header = ({ title }) => (
  <div className={styles.HeaderContainer}>
    <div className={styles.HeaderGameTitle}>{title}</div>
    <Link path={`/${ROUTE_PUZZLES}`}>
      <img
        src={logo}
        alt="Schweizer Illustrierte Logo"
        className={styles.HeaderGameLogo}
      />
    </Link>
  </div>
);

const PuzzlesDetail = ({
  puzzle,
  date,
  isAuthenticated,
  isScriptLoadSucceed,
}: PuzzlesDetailPropsInner) => {
  const { isSSR } = useSSRContext();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setScreenReady(true, {
        pathname: location.pathname,
        ...getTealiumData({
          object: {
            preferredUri: location.pathname,
            __typename: 'PuzzlesDetail',
          },
        }),
      }),
    );
  });

  const isFreeGame = date === 'free';
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  const game = getGameDetails(puzzle, isFreeGame);

  const { title, id: apiID } = game || {};
  const apiDate = game?.date ? game.date : date;
  const name = game?.parent ? game.parent : puzzle;

  useEffect(() => {
    if (isAuthenticated && game && isScriptLoadSucceed) {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
      integration_setup(apiID, apiDate, name);
    }
  }, [apiID, apiDate, name, isAuthenticated, game, isScriptLoadSucceed]);

  if (!game) {
    return <StatusPage />;
  }

  const shouldRenderGame = isAuthenticated;

  return (
    <div
      style={{ height: !isSSR ? window.innerHeight : '100vh' }}
      className={styles.PageWrapper}
    >
      <Helmet
        title={game.title}
        meta={[
          {
            name: 'robots',
            content: ROBOTS_META_NOINDEX_FOLLOW_NOODP_NOARCHIVE,
          },
        ]}
      />
      <Header title={title} />
      {shouldRenderGame && (
        <div
          className={classNames('k-body', styles.GameContainer, {
            ['k-free-game']: isFreeGame,
          })}
          id="kanzlit-app"
        ></div>
      )}
    </div>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  isAuthenticated: authStateSelector(state).isAuthenticated,
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'nextProps' implicitly has an 'any' type. */
const withUpdatePolicy = shouldUpdate((props, nextProps: any) => {
  // update page on successfull load of third-party script
  return props.isScriptLoadSucceed !== nextProps.isScriptLoadSucceed;
});

export default compose<any, any>(
  withParams,
  scriptLoader(PUZZLES_API_ENDPOINT),
  withUpdatePolicy,
  connect(mapStateToProps),
)(PuzzlesDetail);
