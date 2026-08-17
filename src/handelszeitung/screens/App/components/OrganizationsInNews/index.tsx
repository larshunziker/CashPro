import React, { ReactElement } from 'react';
import { ensureTeaserInterface } from '../Teaser/shared/helpers';
import TeaserGrid from '../TeaserGrid';
import { GRID_LAYOUT_ORGANIZATION_IN_NEWS_3X2 } from '../TeaserGrid/gridConfigs/constants';
import styles from './styles.legacy.css';

const OrganizationsInNews = ({
  organizations,
}: {
  organizations: OrganizationConnection;
}): ReactElement => {
  if (
    (!organizations && typeof organizations !== 'object') ||
    !organizations ||
    !organizations.edges ||
    organizations.edges.length === 0
  ) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Title}>Unternehmen in den Nachrichten</div>
      <p className={styles.SubTitle}>
        Meiste Erwähnungen in den letzten 30 Tagen
      </p>
      <div>
        <TeaserGrid
          layout={GRID_LAYOUT_ORGANIZATION_IN_NEWS_3X2}
          items={ensureTeaserInterface(organizations.edges)}
        />
      </div>
    </div>
  );
};

export default OrganizationsInNews;
