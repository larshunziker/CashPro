/* istanbul ignore file */

import React from 'react';
import headerAdZoneFactory from '../../../../../common/components/HeaderAdZone/factory';
import AppNexusAdZone from '../Header/components/AppNexusAdZone';
import MonsterSky from '../MonsterSky';

const HeaderAdZone = headerAdZoneFactory({
  MonsterSky: () => <MonsterSky />,
  LeaderBoard: (props) => <AppNexusAdZone {...props} />,
});

export default HeaderAdZone;
