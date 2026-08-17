import kursAlerts from 'src/cash/screens/App/assets/graphics/mycash/kurs-alerts.svg';
import merkliste from 'src/cash/screens/App/assets/graphics/mycash/merkliste.svg';
import portfolio from 'src/cash/screens/App/assets/graphics/mycash/portfolio.svg';
import watchlist from 'src/cash/screens/App/assets/graphics/mycash/watchlist.svg';

export const PROTECTED_ROUTE_PROPS = {
  account: {
    title: null,
    loginTitle: 'Loggen Sie sich bitte ein, um Ihr Nutzerkonto zu verwalten.',
    description: ' ',
    image: merkliste,
  },
  portfolio: {
    title: 'Portfolio',
    description:
      'Entwickeln Sie Ihre Trading-Fähigkeiten auf Tausenden von Märkten mit Ihrem eigenen ' +
      'personalisierbaren Portfolio.',
    image: portfolio,
  },
  alerts: {
    title: 'Kurs-Alerts',
    description:
      'Zur richtigen Zeit reagieren - die Kursalerts sind Ihr persönlicher Alarm: Preislimite ' +
      'festlegen und in Echtzeit benachrichtigt werden.',
    image: kursAlerts,
  },
  customView: {
    loginMessage: `
      <p>Passen Sie die Reihenfolge der Inhalte an Ihre Bedürfnisse an. Ganz einfach per Drag & Drop.</p>
    `,
  },
  watchlist: {
    title: 'Watchlist',
    description:
      'Optimieren Sie Ihr Trading: Konsolidieren Sie die Aktien und Kurslisten Ihrer Wahl an ' +
      'einem einzigen und leicht auffindbaren Ort.',
    image: watchlist,
  },
  bookmarks: {
    title: 'Merkliste',
    description:
      'Sobald Sie eingeloggt sind, tippen sie bei einem Artikel auf das Lesezeichen, um den ' +
      'Inhalt hier hinzuzufügen.',
    image: merkliste,
  },
};
