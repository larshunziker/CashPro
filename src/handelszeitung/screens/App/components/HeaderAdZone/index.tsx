/* istanbul ignore file */

import React from 'react';
import { connect } from 'react-redux';
import headerAdZoneFactory from '../../../../../common/components/HeaderAdZone/factory';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import {
  MARKETING_PAGE,
  MARKETING_PAGE_DEFAULT_HEADER,
  NO_ADS,
} from '../../../../shared/actions/route';
import AppNexusAdZone from '../Header/components/AppNexusAdZone';
import MonsterSky from '../MonsterSky';

type HeaderAdZonePropsInner = {
  routeVertical: string;
};

const getMonsterSkyByProps = ({ routeVertical }: HeaderAdZonePropsInner) => {
  if (
    [NO_ADS, MARKETING_PAGE, MARKETING_PAGE_DEFAULT_HEADER].includes(
      routeVertical,
    )
  ) {
    return null;
  }
  return <MonsterSky />;
};

const getLeaderBoardByProps = (props: HeaderAdZonePropsInner) => {
  const { routeVertical } = props;
  if (
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
  /* @ts-ignore TODO: TS2322 ->  Type '({ routeVertical } */
  MonsterSky: getMonsterSkyByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '(props */
  LeaderBoard: getLeaderBoardByProps,
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  routeVertical: locationStateSelector(state).vertical,
});

export default connect(mapStateToProps)(HeaderAdZone);
