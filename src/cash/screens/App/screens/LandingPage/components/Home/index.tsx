import React from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-body-classname'. '/Users/bhs/code/work/rasch-stack/node_modules/rea */
import BodyClassName from 'react-body-classname';
import { useSelector } from 'react-redux';

import { compose } from 'recompose';
import classNames from 'classnames';
import { enrichOverviewBodyWithADs } from '../../../../../../../shared/helpers/ads';
import { getRestrictedClassName } from '../../../../../../../shared/helpers/withHelmet';
import { isWarning } from '../../helpers';
import locationStateSelector from '../../../../../../shared/selectors/locationStateSelector';
import withHelmet from '../../../../../../shared/decorators/withHelmet';
import withScrollToAnchor from '../../../../../../shared/decorators/withScrollToAnchor';
import {
  INVESTMENT,
  VERTICAL_TITLES,
} from '../../../../../../shared/actions/route';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import Paragraphs from '../../../../components/Paragraphs';
import UtilityBar from '../../../../components/UtilityBar';
import UtilityOverlay from '../../../../components/UtilityBar/components/UtilityOverlay';
import { ROOT_SCHEMA_TYPE_ORGANIZATION } from '../../../../../../../shared/constants/structuredData';
import {
  getAdSlotNameByEntryIndex,
  getAdSlotNameByEntryIndexOnError,
} from '../../../../components/AppNexus/constants';
import {
  UTILITYBAR_INVESTMENT_CONFIG,
  UTILITYBAR_OVERLAY_CONFIG,
} from '../../../../components/UtilityBar/constants';
import { LANDING_PAGE_TYPE } from './../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { LandingPageProps } from './../../typings';

type LandingPagePropsInner = LandingPageProps;

const LandingPage = ({ landingPage }: LandingPagePropsInner) => {
  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );

  if (!landingPage) {
    return null;
  }

  let utilityConfig = null;

  if (landingPage?.channel?.title === VERTICAL_TITLES[INVESTMENT]) {
    utilityConfig = UTILITYBAR_INVESTMENT_CONFIG;
  }

  const preparedBodyWithAds = enrichOverviewBodyWithADs({
    pageBody: landingPage?.body,
    hasEQsWithMMR: true,
    ignoreFirstIndexLogic: true,
    enhanceAdslotByEntryIndex: isWarning(landingPage?.body)
      ? getAdSlotNameByEntryIndexOnError
      : getAdSlotNameByEntryIndex,
    noLastSlotOverride: true,
  });

  return (
    <TestFragment data-testid="landing-page-wrapper">
      <div className={getRestrictedClassName(landingPage.__typename)}>
        <Paragraphs
          pageBody={preparedBodyWithAds}
          origin={LANDING_PAGE_TYPE}
          colStyle={classNames(grid.ColXs24)}
          landingPagePullOut
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
          isAdSuppressed={landingPage?.channel?.suppressAds}
        />
      </div>
      {utilityConfig && !isHybridApp && (
        <BodyClassName className="">
          <div
            className={classNames(
              'utility-bar-wrapper',
              styles.UtilityBarWrapper,
            )}
          >
            <UtilityBar enabledUtilities={utilityConfig}>
              {({ isOverlayVisible, toggleOverlayVisible, visibleId }) => (
                <UtilityOverlay
                  visibleId={visibleId}
                  overlayTitle="Artikel teilen"
                  isOverlayVisible={isOverlayVisible}
                  toggleOverlayVisible={toggleOverlayVisible}
                  enabledUtilities={UTILITYBAR_OVERLAY_CONFIG}
                />
              )}
            </UtilityBar>
          </div>
        </BodyClassName>
      )}
    </TestFragment>
  );
};

export default compose<any, any>(
  withHelmet({
    getNode: (mapProps: LandingPagePropsInner) => mapProps.landingPage,
    rootSchemaType: ROOT_SCHEMA_TYPE_ORGANIZATION,
  }),
  withScrollToAnchor(),
)(LandingPage);
