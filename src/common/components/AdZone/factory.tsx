import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import classNames from 'classnames';
import locationStateSelector from '../../../shared/selectors/locationStateSelector';
import { PREROLL_1, TOP_AD_1 } from '../../../shared/constants/adZone';
import grid from '../../assets/styles/grid.legacy.css';
import defaultStyles from './defaultStyles.legacy.css';
import {
  AdZoneFactoryDefaultStyles,
  AdZoneFactoryOptions,
  AdZoneFactoryProps,
  AdZoneFactoryStyles,
  AdZoneState,
} from './typings';

export type AdZoneFactoryPropsInner = AdZoneFactoryProps & {
  routeScreenReady: boolean;
};

export default ({ AppNexus, styles: appStyles }: AdZoneFactoryOptions) => {
  class AdZone extends React.Component<AdZoneFactoryPropsInner, AdZoneState> {
    getStyles(): AdZoneFactoryStyles | AdZoneFactoryDefaultStyles {
      return (
        (typeof appStyles === 'function' && appStyles(this.props)) ||
        (typeof appStyles === 'object' && appStyles) ||
        defaultStyles
      );
    }

    render(): ReactElement {
      const styles = this.getStyles();

      return (
        <div
          data-testid="adzone-wrapper-client"
          className={classNames(
            'ad-wrapper',
            'ad-wrapper-tabletDesktop',
            styles.Wrapper,
            grid.HideForPrint,
          )}
        >
          <div className={styles.InnerWrapper}>
            <AppNexus slot={TOP_AD_1} deviceType="tabletDesktop" />
          </div>

          <div className={defaultStyles.Preroll}>
            <AppNexus slot={PREROLL_1} />
          </div>
        </div>
      );
    }
  }

  const mapStateToProps = (state: ReduxState) => ({
    routeScreenReady: locationStateSelector(state).screenReady,
  });

  return pure<AdZoneFactoryPropsInner>(connect<any>(mapStateToProps)(AdZone));
};
