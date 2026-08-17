import React from 'react';
import { HeaderAdZoneFactoryOptions } from './typings';

const headerAdZoneFactory = ({
  MonsterSky: appMonsterSky,
  LeaderBoard: appLeaderBoard,
}: HeaderAdZoneFactoryOptions) => {
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  const HeaderAdZone = (props) => {
    const MonsterSky =
      (typeof appMonsterSky === 'function' && appMonsterSky(props)) || null;
    const LeaderBoard =
      (typeof appLeaderBoard === 'function' && appLeaderBoard(props)) || null;

    return (
      <>
        {MonsterSky}
        {LeaderBoard}
      </>
    );
  };

  return HeaderAdZone;
};

export default headerAdZoneFactory;
