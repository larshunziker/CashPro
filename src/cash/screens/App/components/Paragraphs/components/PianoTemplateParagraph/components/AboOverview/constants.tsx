import { AboOverviewProps } from './typings';

export const ABO_DATA: AboOverviewProps = {
  desktopData: {
    titleRows: [
      {
        title: 'Basic',
        subtitle1: 'Gratis',
        subtitle2: '',
        buttonText: 'Registrieren',
        buttonIcon: '',
        buttonStyle: 'primary',
        buttonPath: 'https://welcome.s.onelog.ch/',
        bankPath: '',
      },
      {
        title: 'Anleger',
        subtitle1: 'Ab 9.90 CHF /',
        subtitle2: 'Monat',
        buttonText: 'Bestellen',
        buttonIcon: 'IconCart',
        buttonStyle: 'primary',
        buttonPath: '',
        bankPath: '',
      },
      {
        title: 'Realtime',
        subtitle1: 'Ab 20.75 CHF /',
        subtitle2: 'Monat',
        buttonText: 'Bestellen',
        buttonIcon: 'IconCart',
        buttonStyle: 'primary',
        buttonPath: '',
        bankPath: '',
      },
      {
        title: 'Profi',
        subtitle1: 'Ab 119 CHF /',
        subtitle2: 'Monat',
        buttonText: 'Bestellen',
        buttonIcon: 'IconCart',
        buttonStyle: 'primary',
        buttonPath: '',
        bankPath: '/services/boersenabo#bankInfoBox',
      },
    ],
    rows: [
      {
        text: 'Virtuelles Portfolio und Watchlist',
        ticks: [true, true, true, true],
        tooltip: '',
      },
      {
        text: 'Personalisierung der Ansichten für Portfolio und Watchlist',
        ticks: [true, true, true, true],
        tooltip: '',
      },
      {
        text: 'Portfolio-Alerts via E-Mail',
        ticks: [true, true, true, true],
        tooltip:
          'Periodische Zustellung von Portfolio-Bewertung und zugehöriger Newsartikel.',
      },
      {
        text: 'Realtime Quotes der SIX Swiss Exchange - Structured Products',
        ticks: [true, true, true, true],
        tooltip: '',
      },
      {
        text: 'Aktienmonitor theScreener',
        ticks: [true, true, true, true],
        tooltip:
          'Unabhängiges Aktienresearch zur Ermittlung von Anlageideen und zur Steuerung des Abwärtsrisikos.',
      },
      {
        text: 'Kursalerts per Email',
        ticks: [true, true, true, true],
        tooltip: '',
      },
      {
        text: 'Kursalerts per SMS',
        ticks: [false, true, true, true],
        tooltip: '',
      },
      {
        text: 'Werbefreie Nutzung (Display Ads)',
        ticks: [false, true, true, true],
        tooltip: '',
      },
      {
        text: 'Derivate Simulator',
        ticks: [false, true, true, true],
        tooltip:
          'Simulation der Preisbildung von strukturierten Produkten auf der Grundlage des zukünftigen Preises des Basiswerts oder einer Veränderung anderer Preiseinflussfaktoren (z. B. implizite Volatilität).',
      },
      {
        text: 'theScreener keyPoints',
        ticks: [false, true, false, true],
        tooltip:
          "theScreener keyPoints ist eine kompakte Zusammenfassung der wichtigsten Anlagefakten für mehr als 6'000 Aktien weltweit, basierend auf einem umfangreichen und stetig wachsenden Satz qualitätsgeprüfter Daten.",
      },
      {
        text: 'Corporate Actions',
        ticks: [false, true, false, true],
        tooltip:
          'Relevante Unternehmensereignisse wie Dividendenzahlungen, Aktiensplits, Kapitalerhöhungen oder Generalversammlungen.',
      },
      {
        text: 'AWP Analyser',
        ticks: [false, true, false, true],
        tooltip:
          'Der AWP Analyser bietet einen kompakten Überblick der Einschätzungen von Bankanalysten und Branchenexperten zu fast 200 börsennotierten Schweizer Aktien. Inkludiert sind Informationen zu Ratings, Kurszielen, Gewinnschätzungen und Dividendenerwartungen.',
      },
      {
        text: 'Realtime Quotes der Schweizer Börse SWX',
        ticks: [false, false, true, true],
        tooltip: '',
      },
      {
        text: 'Realtime Einblick ins Orderbuch der Schweizer Börse (10 Zeilen)',
        ticks: [false, false, false, true],
        tooltip: '',
      },
    ],
    footerRows: [
      { text: 'mehr erfahren', path: '/boersenabo/basic' },
      { text: 'mehr erfahren', path: '/boersenabo/anleger' },
      {
        text: 'mehr erfahren',
        path: '/boersenabo/realtime-kurse',
      },
      { text: 'mehr erfahren', path: '/boersenabo/profi' },
    ],
  },
  mobileData: {
    cards: [
      {
        title: 'Anleger Abo',
        text: 'Anlegen für Fortgeschrittene. Dies ist eine Erweiterung des gratis Basic-Abos mit zusätzlichen Möglichkeiten wie der Nutzung des Derivate-Simulators, dem Erhalt von Kursalerts per SMS und relevanten Corporate Actions.',
        price: 'Ab 9.90 CHF / Monat',
        buttonIcon: 'IconCart',
        buttonText: 'Bestellen',
        buttonStyle: 'primary',
        buttonPath: '',
        pianoTemplateId: 'TESTID',
        advantages: [
          { text: 'Alle Funktionen des Basic Abos', info: '' },
          {
            text: 'Corporate Actions',
            info: 'Relevante Unternehmensereignisse wie Dividendenzahlungen, Aktiensplits, Kapitalerhöhungen oder Generalversammlungen.',
          },
          { text: 'Kursalerts per SMS', info: '' },
          {
            text: 'Derivate Simulator',
            info: 'Simulation der Preisbildung von strukturierten Produkten auf der Grundlage des zukünftigen Preises des Basiswerts oder einer Veränderung anderer Preiseinflussfaktoren (z. B. implizite Volatilität).',
          },
          { text: 'Werbefreie Nutzung (Display Ads)', info: '' },
        ],
        linkText: 'Mehr erfahren',
        linkPath: '/boersenabo/anleger',
        profi: false,
      },
      {
        title: 'Realtime Abo',
        text: 'Börsenkurse in Echtzeit. Sie können die Kurse der SWX in Echtzeit verfolgen, Kurswarnungen per SMS erhalten und die Website und Apps ohne Display-Werbung nutzen.',
        price: 'Ab 20.75 CHF / Monat',
        buttonIcon: 'IconCart',
        buttonText: 'Bestellen',
        buttonStyle: 'primary',
        buttonPath: '',
        pianoTemplateId: 'TESTID',
        advantages: [
          { text: 'Alle Funktionen des Basic Abos', info: '' },
          {
            text: 'Realtime Quotes der Schweizer Börse SWX',
            info: '',
          },
          { text: 'Kursalerts per SMS', info: '' },
          {
            text: 'Derivate Simulator',
            info: 'Simulation der Preisbildung von strukturierten Produkten auf der Grundlage des zukünftigen Preises des Basiswerts oder einer Veränderung anderer Preiseinflussfaktoren (z. B. implizite Volatilität).',
          },
          { text: 'Werbefreie Nutzung (Display Ads)', info: '' },
        ],
        linkText: 'Mehr erfahren',
        linkPath: '/boersenabo/realtime-kurse',
        profi: false,
      },
      {
        title: 'Profi Abo',
        text: 'Das volle Programm für Profis. Das Profi-Abo vereint alle Funktionen des Anleger- und des Realtime-Abos und gibt Anlegern einen Realtime Einblick ins Orderbuch der Schweizer Börse.',
        price: 'Ab 119 CHF / Monat',
        buttonIcon: 'IconCart',
        buttonText: 'Bestellen',
        buttonStyle: 'primary',
        buttonPath: '',
        pianoTemplateId: 'TESTID',
        advantages: [
          { text: 'Alle Funktionen des Anleger Abos', info: '' },
          {
            text: 'Alle Funktionen des Realtime Abos',
            info: '',
          },
          {
            text: 'Realtime Einblick ins Orderbuch der Schweizer Börse (10 Zeilen)',
            info: '',
          },
          { text: '', info: '' },
          { text: '', info: '' },
        ],
        linkText: 'Mehr erfahren',
        linkPath: '/boersenabo/profi',
        profi: true,
      },
      {
        title: 'Basic Abo',
        text: 'Ihr Einstieg in die Welt von Börse & Trading ohne Abo und komplett kostenfrei.',
        price: '',
        buttonIcon: '',
        buttonText: 'Registrieren',
        buttonStyle: 'primary',
        buttonPath: 'https://welcome.s.onelog.ch/',
        pianoTemplateId: 'TESTID',
        advantages: [
          { text: 'Virtuelles Portfolio und Watchlist', info: '' },
          {
            text: 'Personalisierung der Ansichten für Portfolio und Watchlist',
            info: '',
          },
          {
            text: 'Kurs und Portfolio-Alerts via E-Mail',
            info: 'Periodische Zustellung von Portfolio-Bewertung und zugehöriger Newsartikel.',
          },
          {
            text: 'Aktienanalyse von theScreener.com',
            info: 'Unabhängiges Aktienresearch zur Ermittlung von Anlageideen und zur Steuerung des Abwärtsrisikos.',
          },
          {
            text: 'Realtime Quotes der SIX Swiss Exchange - Structured Products',
            info: '',
          },
        ],
        linkText: 'Mehr erfahren',
        linkPath: '/boersenabo/basic',
        profi: false,
      },
    ],
  },
};
