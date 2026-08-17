import React from 'react';
import Link from '../../../../../../../common/components/Link';
import Icon from '../../../../components/Icon';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { DossierFooterProps } from './typings';

const DossierFooter = ({ link, dossierName }: DossierFooterProps) => (
  <section className={styles.Wrapper}>
    <div className={sections.Container}>
      <div className={grid.Row}>
        <div className={grid.ColXs24}>
          <Link className={styles.Link} path={link}>
            <>
              <h1 className={styles.Title}>
                Dieser Artikel gehört zu <strong>{dossierName}</strong>.
              </h1>
              <div className={styles.IconWrap}>
                <Icon type="IconArrowRight" />
              </div>
            </>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default DossierFooter;
