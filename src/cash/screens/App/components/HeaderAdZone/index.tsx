/* istanbul ignore file */

import React from 'react';
import { connect } from 'react-redux';
import headerAdZoneFactory from '../../../../../common/components/HeaderAdZone/factory';
import authStateSelector from '../../../../../shared/selectors/authStateSelector';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import {
  MARKETING_PAGE,
  MARKETING_PAGE_DEFAULT_HEADER,
  NO_ADS,
} from '../../../../shared/actions/route';
import AppNexusAdZone from '../Header/components/AppNexusAdZone';
import MiniPortfolio from '../MiniPortfolio';
import MiniWatchlist from '../MiniWatchlist';
import MonsterSky from '../MonsterSky';

type HeaderAdZonePropsInner = {
  routeVertical: string;
  isAdSuppressed?: boolean;
  isAuthenticated?: boolean;
};

const getMonsterSkyByProps = ({
  routeVertical,
  isAuthenticated,
  isAdSuppressed = false,
}: HeaderAdZonePropsInner) => {
  const suppressedAds =
    isAdSuppressed ||
    [NO_ADS, MARKETING_PAGE, MARKETING_PAGE_DEFAULT_HEADER].includes(
      routeVertical,
    );

  let excludedSizes = null;

  if (isAuthenticated) {
    // size limit restrictions to not overlap with mini-PF/-WL
    excludedSizes = ['500x1000', '1000x1000', '1200x1200'];
  }

  return (
    <MonsterSky
      isAdSuppressed={suppressedAds}
      addClass="hide-on-print"
      excludeSizes={excludedSizes}
    >
      {() =>
        !suppressedAds && (
          <>
            <MiniPortfolio />
            <MiniWatchlist />
          </>
        )
      }
    </MonsterSky>
  );
};

const getLeaderBoardByProps = (props: HeaderAdZonePropsInner) => {
  const { routeVertical, isAdSuppressed = false } = props;
  if (
    isAdSuppressed ||
    [NO_ADS, MARKETING_PAGE, MARKETING_PAGE_DEFAULT_HEADER].includes(
      routeVertical,
    )
  ) {
    return null;
  }
  // @ts-ignore
  return <AppNexusAdZone {...props} />;
};

const HeaderAdZone = headerAdZoneFactory({
  MonsterSky: getMonsterSkyByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '(props */
  LeaderBoard: getLeaderBoardByProps,
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  routeVertical: locationStateSelector(state).vertical,
  isAuthenticated: authStateSelector(state).isAuthenticated,
});

export default connect(mapStateToProps)(HeaderAdZone);
