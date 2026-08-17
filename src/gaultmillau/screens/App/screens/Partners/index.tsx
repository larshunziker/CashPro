import React, { useEffect } from 'react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import classNames from 'classnames';
import raf from 'raf';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import { getTealiumData } from '../../../../../shared/helpers/tealium/helper';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../shared/decorators/withHelmet';
import { setLoading, setScreenReady } from '../../../../shared/actions/route';
import Link from '../../../../../common/components/Link';
import Helmet from '../../components/Helmet';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import ubsLogo from '../../assets/graphics/sponsorLogos/ubs_logo.svg';
import amex from 'graphics/sponsorLogos/amex.svg';
import mercedes from 'graphics/sponsorLogos/mercedes_logo.svg';
import mondoVino from 'graphics/sponsorLogos/mondovino.svg';
import nespresso from 'graphics/sponsorLogos/nespresso.svg';
import fleisch_de from 'graphics/sponsorLogos/sf_logo_de.svg';
import fleisch_fr from 'graphics/sponsorLogos/sf_logo_fr.svg';
import sdh from 'graphics/sponsorLogos/swiss-deluxe-hotels.svg';
import swisswine from 'graphics/sponsorLogos/swisswine_logo.svg';
import vinvaudois from 'graphics/sponsorLogos/vinvaudois.svg';
import vzug from 'graphics/sponsorLogos/vzug.svg';
import { PartnersProps } from './typings';

type PartnersInnerProps = PartnersProps & {
  renderEntries: (props: PartnersProps) => JSX.Element;
};

const msgs = defineMessages({
  textTitle: {
    id: 'app.partner.text.title',
    description: 'The title of the partner page',
    defaultMessage: 'Partner',
  },
  textTwo: {
    id: 'app.partner.text.two',
    description: 'The text for partner two',
    defaultMessage:
      'Schweizer Perfektion für zuhause! Seit über 100 Jahren entwickelt und produziert die V-ZUG AG hochwertige Haushaltgeräte. Unsere Werte: Innovation, Präzision, Qualität.', // eslint-disable-line max-len
  },
  textThree: {
    id: 'app.partner.text.three',
    description: 'The text for partner three',
    defaultMessage:
      'Coop ist Nr. 1 im Schweizer Weinhandel. Wein-Aktivitäten werden bei Mondovino gebündelt. Clubmitglieder profitieren von Vorteilen, wie Exklusiv-Rabatten und Expertentipps:', // eslint-disable-line max-len
  },
  textFour: {
    id: 'app.partner.text.four',
    description: 'The text for partner four',
    defaultMessage:
      'Die Vereinigung der exklusivsten 5*-Hotels der Schweiz gründen ihre Einzigartigkeit auf ihrer Servicequalität und ihrer Tradition im Bereich der Luxus-Hotellerie.', // eslint-disable-line max-len
  },
  textFive: {
    id: 'app.partner.text.five',
    description: 'The text for partner five',
    defaultMessage:
      'Als Erfinder des Automobils verbindet Mercedes-Benz in einzigartiger Weise Innovationskraft und modernen Luxus. Lassen Sie sich von Performance, Technik und Design der Marke mit dem Stern begeistern.', // eslint-disable-line max-len
  },
  textSix: {
    id: 'app.partner.text.six',
    description: 'The text for partner six',
    defaultMessage:
      'Nestlé Nespresso SA ist weltweiter Pionier und die Referenz im Bereich des portionierten Spitzenkaffees. Das Unternehmen mit Hauptsitz in Lausanne ist in 64 Ländern tätig.', // eslint-disable-line max-len
  },
  textSeven: {
    id: 'app.partner.text.seven',
    description: 'The text for partner seven',
    defaultMessage:
      "OVV unterstützt die Weine der Waadt, vor allem die sechs Weinregionen und die acht «AOC» Bonvillars, Calamin, Chablais, Côtes de l'Orbe, Dézaley, La Côte, Lavaux und Vully.", // eslint-disable-line max-len
  },
  textEight: {
    id: 'app.partner.text.eight',
    description: 'The text for partner eight',
    defaultMessage:
      '«GaultMillau» ist der Reiseführer für Gourmets. Was liegt da näher, als die Zusammenarbeit mit American Express? American Express Mitglieder sind Feinschmecker, die gerne Neues entdecken und weiterempfehlen. «GaultMillau» kennt die angesagten Betriebe, American Express hat die interessierten und kaufkräftigen Kunden und die Restaurants gewinnen neue Gäste.', // eslint-disable-line max-len
  },
  textNine: {
    id: 'app.partner.text.nine',
    description: 'The text for partner nine',
    defaultMessage:
      'Ein Stück Genuss aus der Heimat: «Schweizer Fleisch» informiert im Namen der Branche über den feinen Unterschied, der Schweizer Fleisch besonders macht.', // eslint-disable-line max-len
  },
  textTen: {
    id: 'app.partner.text.ten',
    description: 'The text for partner ten',
    defaultMessage:
      'Die Swiss Wine Promotion (SWP) hat die Aufgabe, das Image des Schweizer Weins im In- und Ausland zu stärken. Durch die Tätigkeit der SWP soll der Schweizer Wein als hochwertiges Produkt positioniert und die Wertschöpfung in der gesamten Weinbranche gefördert werden.', // eslint-disable-line max-len
  },
  textEleven: {
    id: 'app.partner.text.eleven',
    description: 'The text for partner eleven',
    defaultMessage:
      'UBS ist die führende Universalbank in der Schweiz, tätig in allen fünf Geschäftsbereichen – Retail, Corporate und Institutional Banking, Wealth Management und Asset Management sowie Investment Banking. Alle stark getrieben durch die Digitalisierung und mit Nachhaltigkeit als weiteren wichtigen Fokus.', // eslint-disable-line max-len
  },
});

/* @ts-ignore TODO: TS7034 ->  Variable 'partnersData' implicitly has type 'any[]' in some locations where its type cannot be determined. */
let partnersData = [];
/* @ts-ignore TODO: TS7034 ->  Variable 'partnersDataRomandie' implicitly has type 'any[]' in some locations where its type cannot be determined. */
let partnersDataRomandie = [];
/* @ts-ignore TODO: TS7034 ->  Variable 'partnerDataAmex' implicitly has type 'any[]' in some locations where its type cannot be determined. */
let partnerDataAmex = [];

/* @ts-ignore TODO: TS7006 ->  Parameter 'entry' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'language' implicitly has an 'any' type. */
const doRenderEntries = (entry, language) => {
  if (entry.previewOnFr === false && language === 'fr') {
    return null;
  }

  return (
    <div className={styles.SponsorBox} key={`sponsorbox-${entry.link.text}`}>
      <Link
        path={language === 'fr' ? entry.link.pathFr : entry.link.path}
        rel="sponsored"
        className={classNames(
          styles.Item,
          grid.ColSm9,
          grid.ColMd7,
          grid.ColOffsetSm1,
          grid.ColOffsetMd3,
        )}
      >
        <img
          className={classNames(styles.SponsorLogo, {
            [styles.Small]: entry.logoSmall,
          })}
          src={entry.logoGraphic}
          alt={entry.logoAlt}
        />
      </Link>
      <div
        className={classNames(styles.SponsorText, grid.ColSm13, grid.ColMd11)}
      >
        <p className={styles.BodyText}>
          {entry.description}{' '}
          <Link
            path={language === 'fr' ? entry.link.pathFr : entry.link.path}
            className={styles.Link}
            rel="sponsored"
            label={entry.link.text}
          />
        </p>
      </div>
    </div>
  );
};

const Partners = ({ intl, renderEntries, language }: PartnersInnerProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    raf(() => {
      dispatch(setLoading(false));
      dispatch(
        setScreenReady(true, {
          pathname: location.pathname,
          ...getTealiumData({
            object: {
              preferredUri: location.pathname,
              __typename: 'Partners',
            },
          }),
        }),
      );
    });
  }, [dispatch]);
  if (partnersData.length === 0) {
    partnersData = [
      {
        link: {
          path: 'https://www.mercedes-benz.ch/de',
          pathFr: 'https://www.mercedes-benz.ch/fr',
          text: 'www.mercedes-benz.ch',
        },
        logoGraphic: mercedes,
        logoAlt: 'mercedes logo',
        logoSmall: true,
        description: intl.formatMessage(msgs.textFive),
      },
      {
        link: {
          path: 'http://www.vzug.com',
          pathFr: 'http://www.vzug.com/ch/fr/',
          text: 'www.vzug.com',
        },
        logoGraphic: vzug,
        logoAlt: 'vzug logo',
        logoSmall: true,
        description: intl.formatMessage(msgs.textTwo),
      },
      {
        link: {
          path: 'http://www.ubs.com',
          pathFr: 'http://www.ubs.com',
          text: 'www.ubs.com',
        },
        logoGraphic: ubsLogo,
        logoAlt: 'UBS logo',
        description: intl.formatMessage(msgs.textEleven),
      },
      {
        link: {
          path: 'http://www.nespresso.com',
          pathFr: 'https://www.nespresso.com/ch/fr/',
          text: 'www.nespresso.com',
        },
        logoGraphic: nespresso,
        logoAlt: 'nespresso logo',
        description: intl.formatMessage(msgs.textSix),
      },
      {
        link: {
          path: 'http://www.mondovino.ch',
          pathFr: 'https://www.mondovino.ch/?wec-locale=fr',
          text: 'www.mondovino.ch',
        },
        logoGraphic: mondoVino,
        logoAlt: 'mondovino logo',
        description: intl.formatMessage(msgs.textThree),
      },
      {
        link: {
          path: 'http://www.swisswine.ch',
          pathFr: 'https://www.swisswine.ch',
          text: 'www.swisswine.ch',
        },
        logoGraphic: swisswine,
        logoAlt: 'swisswine logo',
        logoSmall: true,
        description: intl.formatMessage(msgs.textTen),
      },
      {
        link: {
          path: 'https://www.schweizerfleisch.ch',
          pathFr: 'https://www.viandesuisse.ch',
          text:
            (language === 'fr' && 'www.viandesuisse.ch') ||
            'www.schweizerfleisch.ch',
        },
        logoGraphic: (language === 'fr' && fleisch_fr) || fleisch_de,
        logoAlt: 'Schweizer Fleisch Logo',
        description: intl.formatMessage(msgs.textNine),
      },
      {
        link: {
          path: 'http://www.swissdeluxehotels.com',
          pathFr: 'http://www.swissdeluxehotels.com/fr',
          text: 'www.swissdeluxehotels.com',
        },
        logoGraphic: sdh,
        logoAlt: 'swiss deluxe hotel logo',
        description: intl.formatMessage(msgs.textFour),
      },
    ];
  }
  if (partnerDataAmex.length === 0) {
    partnerDataAmex = [
      {
        link: {
          path: 'https://www.americanexpress.ch',
          pathFr: 'https://www.americanexpress.ch/fr/',
          text: 'www.americanexpress.ch',
        },
        logoGraphic: amex,
        logoAlt: 'amex logo',
        logoSmall: true,
        description: intl.formatMessage(msgs.textEight),
      },
    ];
  }
  if (partnersDataRomandie.length === 0) {
    partnersDataRomandie = [
      {
        link: {
          path: 'http://www.ovv.ch/accueil',
          pathFr: 'http://www.ovv.ch/accueil',
          text: 'www.ovv.ch',
        },
        logoGraphic: vinvaudois,
        logoAlt: 'Vins Vaudois logo',
        description: intl.formatMessage(msgs.textSeven),
      },
    ];
  }
  return (
    <div className={styles.Wrapper}>
      <Helmet title={intl.formatMessage(msgs.textTitle)} />

      <p className={styles.RubricTitle}>
        <FormattedMessage
          id="app.screen.partner.category.title"
          description="The category title of the partner screen"
          defaultMessage="Partner"
        />
      </p>
      <h3 className={styles.MainTitle}>
        <FormattedMessage
          id="app.screen.partner.title"
          description="The title of the partner screen"
          defaultMessage="Starke Partner für den GaultMillau-Channel"
        />
      </h3>
      <div className={styles.TextBox}>
        <p className={styles.Lead}>
          <FormattedMessage
            id="app.screen.partner.lead"
            description="The lead of the partner screen"
            defaultMessage="Der GaultMillau Channel ist stolz auf seine Partner:"
          />{' '}
          {language === 'fr' && (
            <span>
              <strong>l&acute;OVV</strong>,{' '}
            </span>
          )}
          <strong>Mercedes-Benz</strong>
          {', '}
          <strong>V-Zug</strong>
          {', '}
          <strong>UBS</strong>
          {', '}
          <strong>Nespresso</strong>
          {', '}
          <strong>Mondovino</strong>
          {', '}
          <strong>Swiss Wine</strong>
          {', '}
          <strong>
            {language === 'fr' ? 'Viande Suisse' : 'Schweizer Fleisch'}
          </strong>{' '}
          <FormattedMessage
            id="app.authors.separator.und"
            description="Last separor for authors listing up"
            defaultMessage="und"
          />{' '}
          <strong>Swiss Deluxe Hotels</strong>{' '}
          <FormattedMessage
            id="app.screen.partner.leadBottom"
            description="The end from the lead of the partner screen"
            defaultMessage="unterstützen das Projekt."
          />
        </p>
      </div>
      <div className={styles.ContentBox}>
        <div className={styles.TopBorderRow}>
          <div
            className={classNames(
              styles.TopBorder,
              grid.ColSm22,
              grid.ColMd18,
              grid.ColOffsetSm1,
              grid.ColOffsetMd3,
            )}
          />
        </div>

        <div className={styles.SponsorsWrapper}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'partnersData' implicitly has an 'any[]' type. */}
          {partnersData.map(renderEntries)}
          {language !== 'fr' && (
            <>
              <p className={styles.EssentialTitle}>
                <FormattedMessage
                  id="app.screen.partner.leadamex"
                  description="The lead of the amex partner section"
                  defaultMessage="Partner für GaultMillau POP und «Züri isst»"
                />
              </p>
              <div className={styles.TopBorderRow}>
                <div
                  className={classNames(
                    styles.TopBorder,
                    grid.ColSm22,
                    grid.ColMd18,
                    grid.ColOffsetSm1,
                    grid.ColOffsetMd3,
                  )}
                />
              </div>
              {/* @ts-ignore TODO: TS7005 ->  Variable 'partnerDataAmex' implicitly has an 'any[]' type. */}
              {partnerDataAmex.map(renderEntries)}
            </>
          )}
        </div>
      </div>
      <div className={styles.ContentBox}>
        <p className={styles.EssentialTitle}>
          <FormattedMessage
            id="app.screen.partner.leadromandie"
            description="The lead of the romandie partners"
            defaultMessage="Partner für die Romandie"
          />
        </p>
        <div className={styles.TopBorderRow}>
          <div
            className={classNames(
              styles.TopBorder,
              grid.ColSm22,
              grid.ColMd18,
              grid.ColOffsetSm1,
              grid.ColOffsetMd3,
            )}
          />
        </div>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'partnersDataRomandie' implicitly has an 'any[]' type. */}
        {partnersDataRomandie.map(renderEntries)}
      </div>
    </div>
  );
};

const extendWithHandler = withHandlers({
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'element' implicitly has an 'any' type. */
  renderEntries: (props: any) => (element) =>
    doRenderEntries(element, props.language),
});

export default compose<any, any>(
  extendWithHandler,
  injectIntl,
  withAppNexus({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTrackingData: (props) =>
      parseTrackingData({
        ...props,
        articleType: 'Partners',
      }),
  }),
  withHelmet({}),
)(Partners);
