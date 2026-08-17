import React, { ReactElement } from 'react';
import AppNexus from '../../../AppNexus';
import styles from './styles.legacy.css';

const AppNexusAdZone = (): ReactElement => (
  <div data-testid="app-nexus-adzone-wrapper-client" className={styles.Wrapper}>
    <div className={styles.Preroll}>
      <AppNexus slot={''} />
    </div>
  </div>
);

export default AppNexusAdZone;
