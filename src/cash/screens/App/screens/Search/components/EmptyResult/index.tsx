import React, { ComponentType } from 'react';
import EsiRenderer from '../../../../components/EsiRenderer';
import styles from './styles.legacy.css';
import { EmptyResultProps } from './typings';

const EmptyResult: ComponentType<EmptyResultProps> = ({ searchQuery }) => {
  return (
    <div className={styles.NoResultWrapper}>
      <p className={styles.NoResultText}>
        Leider wurden keine mit Ihrer Suchanfrage übereinstimmenden Dokumente
        gefunden.
      </p>
      <div>
        <p className={styles.SearchAdviceWrapperText}>Für die nächste Suche:</p>
        <ul className={styles.SearchAdviceWrapper}>
          <li>Achten Sie darauf, dass alle Wörter richtig geschrieben sind</li>
          <li>Probieren Sie es mit anderen Suchbegriffen</li>
          <li>Probieren Sie es mit allgemeineren Suchbegriffen</li>
        </ul>
      </div>
      <div className={styles.EsiWidgetWrapper}>
        <EsiRenderer
          esiSrc={`${__FI_BOX_SERVICE_ENDPOINT__}/services/esi-widgets/integrations/search_integration/${searchQuery}`}
          publication="cash"
        />
      </div>
    </div>
  );
};

export default EmptyResult;
