import React, { ReactElement } from 'react';
import Logo from '../../../Logo';
import RefetchGqlDataLink from '../../../RefetchGqlDataLink';
import {
  PUBLICATION_BIL,
  PUBLICATION_HZ,
  PUBLICATION_HZB,
  PUBLICATION_SWISS_INSURANCE,
} from '../../../../../../../shared/constants/publications';
import {
  LANDING_PAGE_BILANZ_HOME,
  LANDING_PAGE_HZB_HOME,
  LANDING_PAGE_SV_HOME,
} from '../../../../screens/LandingPage/constants';
import { LOGO_BIL, LOGO_HZ, LOGO_HZ_INSURANCE } from '../../../Logo/constants';
import styles from './styles.legacy.css';
import { HeaderLogoProps } from './typings';

const HeaderLogo = ({ publication }: HeaderLogoProps): ReactElement => {
  const isHZActive = publication === PUBLICATION_HZ;
  const isBilanzActive = publication === PUBLICATION_BIL;
  const isSVActive = publication === PUBLICATION_SWISS_INSURANCE;
  const isHZBankingActive = publication === PUBLICATION_HZB;

  return (
    <div className={styles.LinkWrapper}>
      {isBilanzActive && (
        <RefetchGqlDataLink
          path={LANDING_PAGE_BILANZ_HOME}
          className={styles.BilanzLogo}
        >
          <Logo type={LOGO_BIL} />
        </RefetchGqlDataLink>
      )}
      {isHZActive && (
        <span>
          <RefetchGqlDataLink path="/" className={styles.HZLogo}>
            <Logo type={LOGO_HZ} />
          </RefetchGqlDataLink>
        </span>
      )}
      {isSVActive && (
        <RefetchGqlDataLink
          path={LANDING_PAGE_SV_HOME}
          className={styles.SVLogo}
        >
          <Logo type={LOGO_HZ_INSURANCE} />
        </RefetchGqlDataLink>
      )}
      {isHZBankingActive && (
        <RefetchGqlDataLink
          path={LANDING_PAGE_HZB_HOME}
          className={styles.HZLogo}
        >
          <Logo type={LOGO_HZ} />
        </RefetchGqlDataLink>
      )}
    </div>
  );
};

export default HeaderLogo;
