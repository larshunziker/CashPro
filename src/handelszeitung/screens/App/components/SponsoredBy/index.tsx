import React from 'react';
import Teaser from '../Teaser';
import { TEASER_LAYOUT_SPONSOR } from '../../../../../shared/constants/teaser';
import { SPONSORED_BY_TYPE } from './constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'node' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
const renderSponsors = ({ node }, index) => (
  <div className={grid.ColSm8} key={`render-sponsor-item-${index}`}>
    <div className={styles.SponsorItem}>
      <Teaser
        component={TEASER_LAYOUT_SPONSOR}
        {...node}
        origin={SPONSORED_BY_TYPE}
      />
    </div>
  </div>
);

/* @ts-ignore TODO: TS7031 ->  Binding element 'title' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'sponsors' implicitly has an 'any' type. */
const SponsoredBy = ({ title, sponsors }) => {
  if (!sponsors || !sponsors.edges || sponsors.edges.length === 0) {
    return null;
  }
  return (
    <div className={styles.Wrapper}>
      <section className={grid.Container}>
        {title && <h2 className={styles.Title}>{title}</h2>}
        <div className={grid.Row}>{sponsors.edges.map(renderSponsors)}</div>
      </section>
    </div>
  );
};

export default SponsoredBy;
