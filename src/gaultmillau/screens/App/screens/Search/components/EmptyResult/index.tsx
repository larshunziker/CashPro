import React from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './styles.legacy.css';

const EmptyResult = () => (
  <div className={styles.EmptyResultWrapper}>
    <h2 className={styles.EmptyResultTitle}>
      <FormattedMessage
        id="app.search.noResults"
        description="Message when search delivers no results"
        defaultMessage="Leider wurden keine mit Ihrer Suchanfrage übereinstimmenden Dokumente gefunden."
      />
    </h2>
    <span className={styles.EmptyResultSubTitle}>
      <FormattedMessage
        id="app.search.noResults.hint"
        description="Hint for the next search when search delivers no results"
        defaultMessage="Für die nächste Suche"
      />
      :
    </span>
    <ul className={styles.EmptyResultList}>
      <li className={styles.EmptyResultListEntry}>
        <FormattedMessage
          id="app.search.noResults.hint.first"
          description="Hint, first tip for the next search when search delivers no results"
          defaultMessage="Achten Sie darauf, dass alle Wörter richtig geschrieben sind."
        />
      </li>
      <li className={styles.EmptyResultListEntry}>
        <FormattedMessage
          id="app.search.noResults.hint.second"
          description="Hint, second tip for the next search when search delivers no results"
          defaultMessage="Probieren Sie es mit anderen Suchbegriffen."
        />
      </li>
      <li className={styles.EmptyResultListEntry}>
        <FormattedMessage
          id="app.search.noResults.hint.third"
          description="Hint, third tip for the next search when search delivers no results"
          defaultMessage="Probieren Sie es mit allgemeineren Suchbegriffen."
        />
      </li>
    </ul>
  </div>
);

export default EmptyResult;
