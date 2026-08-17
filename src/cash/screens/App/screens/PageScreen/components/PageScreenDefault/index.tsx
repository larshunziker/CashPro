import React, { ReactElement } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-body-classname'. '/Users/bhs/code/work/rasch-stack/node_modules/rea */
import BodyClassName from 'react-body-classname';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { enrichOverviewBodyWithADs } from '../../../../../../../shared/helpers/ads';
import { getRestrictedClassName } from '../../../../../../../shared/helpers/withHelmet';
import locationStateSelector from '../../../../../../shared/selectors/locationStateSelector';
import {
  INVESTMENT,
  VERTICAL_TITLES,
} from '../../../../../../shared/actions/route';
import EditButtons from '../../../../components/EditButtons';
import Paragraphs from '../../../../components/Paragraphs';
import UtilityBar from '../../../../components/UtilityBar';
import UtilityOverlay from '../../../../components/UtilityBar/components/UtilityOverlay';
import { getAdSlotNameByEntryIndex } from '../../../../components/AppNexus/constants';
import {
  UTILITYBAR_INVESTMENT_CONFIG,
  UTILITYBAR_OVERLAY_CONFIG,
} from '../../../../components/UtilityBar/constants';
import { PAGESCREEN_DEFAULT_TYPE } from '../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { PageScreenDefaultProps } from './typings';

type PageScreenPropsInner = PageScreenDefaultProps;

const PageScreenDefault = ({
  pageScreen,
}: PageScreenPropsInner): ReactElement => {
  let utilityConfig = null;
  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );

  if (pageScreen?.channel?.title === VERTICAL_TITLES[INVESTMENT]) {
    utilityConfig = UTILITYBAR_INVESTMENT_CONFIG;
  }

  const preparedBodyWithAds = enrichOverviewBodyWithADs({
    pageBody: pageScreen?.body,
    hasEQsWithMMR: true,
    ignoreFirstIndexLogic: true,
    enhanceAdslotByEntryIndex: getAdSlotNameByEntryIndex,
    noLastSlotOverride: true,
  });

  return (
    <div className={classNames('page-screen-default')}>
      <EditButtons
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        editContentUri={pageScreen.editContentUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        editRelationUri={pageScreen.editRelationUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        cloneContentUri={pageScreen.cloneContentUri}
      />
      <div className={styles.Wrapper}>
        {pageScreen.title && (
          <h2 itemProp="headline">
            <div className={styles.Title}>{pageScreen.title}</div>
          </h2>
        )}

        {pageScreen.lead && <p className={styles.Lead}>{pageScreen.lead}</p>}
      </div>

      <div
        className={classNames(getRestrictedClassName(pageScreen.__typename))}
      >
        <Paragraphs
          pageBody={preparedBodyWithAds}
          origin={PAGESCREEN_DEFAULT_TYPE}
          colStyle={grid.ColXs24}
          landingPagePullOut
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
          isAdSuppressed={pageScreen?.channel?.suppressAds}
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
    </div>
  );
};

export default PageScreenDefault;
