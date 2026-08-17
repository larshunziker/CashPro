import React, { ComponentType, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import locationStateSelector from '../../../../../../../../../../../shared/selectors/locationStateSelector';
import Logo from '../../../../../../../Logo';
import RefetchGqlDataLink from '../../../../../../../RefetchGqlDataLink';
import {
  LANDING_PAGE_BILANZ_HOME,
  LANDING_PAGE_HZB_HOME,
  LANDING_PAGE_SV_HOME,
} from '../../../../../../../../screens/LandingPage/constants';
import {
  LOGO_BIL,
  LOGO_HZ,
  LOGO_HZ_CLAIM,
  LOGO_HZ_INSURANCE,
} from '../../../../../../../Logo/constants';
import styles from './styles.legacy.css';

const MinistageListicleHeader: ComponentType = () => {
  const pathname = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).locationBeforeTransitions.pathname,
  );
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
  const loading = useSelector((state) => locationStateSelector(state).loading);
  const [routePathname, setRoutePathname] = useState<string>(pathname);

  useEffect(() => {
    if (!loading) {
      setRoutePathname(pathname);
    }
  }, [pathname, loading]);

  const isBilanzActive = routePathname === LANDING_PAGE_BILANZ_HOME;
  const isSVActive = routePathname === LANDING_PAGE_SV_HOME;
  const isHZActive = routePathname === '/';
  const isHZBActive = routePathname === LANDING_PAGE_HZB_HOME;

  return (
    <div className={styles.LinkWrapper} id="subnav-logo">
      {isBilanzActive && (
        <RefetchGqlDataLink
          path={LANDING_PAGE_BILANZ_HOME}
          className={styles.BilanzLogo}
        >
          <Logo type={LOGO_BIL} />
        </RefetchGqlDataLink>
      )}
      {isSVActive && (
        <RefetchGqlDataLink
          path={LANDING_PAGE_SV_HOME}
          className={styles.SVLogo}
        >
          <Logo type={LOGO_HZ_INSURANCE} />
        </RefetchGqlDataLink>
      )}
      {isHZBActive && (
        <RefetchGqlDataLink
          path={LANDING_PAGE_HZB_HOME}
          className={styles.HZLogo}
        >
          <Logo type={LOGO_HZ} />
        </RefetchGqlDataLink>
      )}
      {isHZActive && (
        <span>
          <RefetchGqlDataLink path={'/'} className={styles.HZLogo}>
            <Logo type={LOGO_HZ_CLAIM} />
          </RefetchGqlDataLink>
        </span>
      )}
    </div>
  );
};

export default MinistageListicleHeader;
