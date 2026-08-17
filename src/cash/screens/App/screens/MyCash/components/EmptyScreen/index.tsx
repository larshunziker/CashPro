import React from 'react';
import kursAlerts from 'src/cash/screens/App/assets/graphics/mycash/kurs-alerts.svg';
import emtpyPortfolio from 'src/cash/screens/App/assets/graphics/mycash/portfolio.svg';
import emptyWatchlist from 'src/cash/screens/App/assets/graphics/mycash/watchlist.svg';
import ButtonWithLoading from '../../../../components/ButtonWithLoading';
import { portfolioCreate } from '../../../../components/PortfolioManagementForm';
import { watchlistCreate } from '../../../../components/WatchlistManagementForm';
import { useStableNavigate } from '../../../../../../../shared/hooks/useStableNavigateContext';
import styles from './styles.legacy.css';

type EmptyScreenProps = {
  entity: 'portfolio' | 'watchlist' | 'alert';
};

const config = {
  portfolio: {
    /* @ts-ignore TODO: TS7006 ->  Parameter 'navigate' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'origin' implicitly has an 'any' type. */
    callbackFunction: (navigate, origin) =>
      portfolioCreate({ navigate, origin }),
    title: 'Erstellen Sie Ihr erstes Portfolio',
    description: `Das Erstellen eines Portfolios ist der einfachste Weg, über die von
    Ihnen verfolgten Aktien auf dem Laufenden zu bleiben. Das Beste ist,
    es ist kostenlos.`,
    graphic: {
      image: emtpyPortfolio,
      alt: 'keine portfolios',
    },
    buttonText: 'Portfolio anlegen',
  },
  watchlist: {
    /* @ts-ignore TODO: TS7006 ->  Parameter 'navigate' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'origin' implicitly has an 'any' type. */
    callbackFunction: (navigate, origin) =>
      watchlistCreate({ navigate, origin }),
    title: 'Erstellen Sie Ihre erste Watchlist',
    description: `Behalten Sie Ihre Lieblingsaktien im Blick! Verwenden Sie
    Watchlisten, um den Überblick über Ihre Investitionen zu
    behalten und informierte Entscheidungen zu treffen. Starten
    Sie jetzt und legen Sie los!`,
    graphic: {
      image: emptyWatchlist,
      alt: 'keine watchlist',
    },
    buttonText: 'Watchlist anlegen',
  },
  alert: {
    callbackFunction: () => {
      const el = document.querySelector(
        '.add-alert-button button',
      ) as HTMLElement;
      el.click();
    },
    title: 'Erstellen Sie Ihren ersten Kurs-Alert',
    description: `Wenn der Preis, den von Ihnen gesetzten Zielpreis erreicht,
    erhalten Sie einmalig eine Benachrichtigung. Der Versand
    erfolgt per E-Mail. Mit einem Börsenabo profitieren Sie von
    kostenlosen SMS-Alerts. Den Alert-Button finden Sie auf den
    Fullquote-Seiten und im Portfolio und den Watchlists.`,
    graphic: {
      image: kursAlerts,
      alt: 'keine Alerts',
    },
    buttonText: 'Alert setzen',
  },
};

const EmptyScreen = ({ entity }: EmptyScreenProps) => {
  const navigate = useStableNavigate();

  if (!entity) {
    return null;
  }

  return (
    <div data-testid="mycash-empty-screen" className={styles.NoResultsWrapper}>
      <div>
        <img
          src={config[entity].graphic.image}
          className={styles.Image}
          alt={config[entity].graphic.alt}
        />
      </div>
      <div>
        <p className={styles.NoResultsTitle}>{config[entity].title}</p>
        <p className={styles.NoResultsDescription}>
          {config[entity].description}
        </p>
        <ButtonWithLoading
          size="big"
          onClick={(event) => {
            event.preventDefault();
            config[entity].callbackFunction(navigate, entity);
          }}
          variant="primary"
          ariaLabel={config[entity].buttonText}
          mobileFullWidth={false}
          type="button"
          tabIndex={-1}
        >
          {config[entity].buttonText}
        </ButtonWithLoading>
      </div>
    </div>
  );
};

export default EmptyScreen;
