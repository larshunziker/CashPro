/* istanbul ignore file */

import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import headerAdZoneFactory from '../../../../../common/components/HeaderAdZone/factory';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import {
  MARKETING_PAGE,
  MARKETING_PAGE_DEFAULT_HEADER,
  SOS_BEOBACHTER,
} from '../../../../shared/actions/route';
import AppNexusAdZone from '../Header/components/AppNexusAdZone';
import MonsterSky from '../MonsterSky';
// eslint-disable-next-line
import styles from '../MonsterSky/styles.legacy.css';

type HeaderAdZonePropsInner = {
  routeVertical: string;
  isInArticle?: boolean;
};

const getLeaderBoardByProps = (props: HeaderAdZonePropsInner) => {
  const { routeVertical } = props;
  if (
    [SOS_BEOBACHTER, MARKETING_PAGE, MARKETING_PAGE_DEFAULT_HEADER].includes(
      routeVertical,
    )
  ) {
    return null;
  }
  // @ts-ignore
  return <AppNexusAdZone {...props} />;
};

const getMonsterSkyByProps = (props: HeaderAdZonePropsInner) => {
  const { routeVertical, isInArticle = false } = props;
  if (
    [SOS_BEOBACHTER, MARKETING_PAGE, MARKETING_PAGE_DEFAULT_HEADER].includes(
      routeVertical,
    )
  ) {
    return null;
  }
  return (
    <MonsterSky addClass={classNames({ [styles.ArticleAdSky]: isInArticle })} />
  );
};

const HeaderAdZone = headerAdZoneFactory({
  /* @ts-ignore TODO: TS2322 ->  Type '(props */
  MonsterSky: getMonsterSkyByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '(props */
  LeaderBoard: getLeaderBoardByProps,
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  routeVertical: locationStateSelector(state).vertical,
});

export default connect(mapStateToProps)(HeaderAdZone);
