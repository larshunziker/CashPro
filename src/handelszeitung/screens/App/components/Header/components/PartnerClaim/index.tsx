import React, { ReactElement } from 'react';
import classNames from 'classnames';
import Link from '../../../../../../../common/components/Link';
import Logo from '../../../Logo';
import {
  ADVERTISING_TYPE_LONGFORM,
  PAGE_TYPE_MARKETING,
} from '../../../../../../../shared/constants/content';
import { PUBLICATION_HZ } from '../../../../../../../shared/constants/publications';
import { LANDING_PAGE_BILANZ_HOME } from '../../../../screens/LandingPage/constants';
import {
  LOGO_PARTNER_BILANZ,
  LOGO_PARTNER_BILANZ_LABEL,
  LOGO_PARTNER_HZ,
  LOGO_PARTNER_HZ_LABEL,
} from '../../../Logo/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { PartnerClaimProps } from './typings';

const PartnerClaim = ({
  publication,
  subtypeValue,
}: PartnerClaimProps): ReactElement => {
  const isHZActive = publication === PUBLICATION_HZ;
  const isMarketingPage =
    subtypeValue === PAGE_TYPE_MARKETING ||
    subtypeValue === ADVERTISING_TYPE_LONGFORM;

  return (
    <div
      className={classNames(styles.Wrapper, {
        [grid.GridCentered]: isMarketingPage,
      })}
    >
      <div className={classNames(styles.Content)}>
        {(isHZActive && (
          <span>
            <Link
              path={LANDING_PAGE_BILANZ_HOME}
              className={styles.BilanzLogoWrapper}
              ariaLabel={LOGO_PARTNER_BILANZ_LABEL}
            >
              <Logo type={LOGO_PARTNER_BILANZ} />
            </Link>
          </span>
        )) || (
          <Link
            path="/"
            className={styles.HZLogoWrapper}
            ariaLabel={LOGO_PARTNER_HZ_LABEL}
          >
            <Logo type={LOGO_PARTNER_HZ} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default PartnerClaim;
