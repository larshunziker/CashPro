import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import cssClassByChannel from '../../../../../../shared/helpers/cssClassByChannel';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import SubscribeButton from '../../../SubscribeButton/themes/SubscribeButtonOverviewPage';
import { getAlertItemTypeByTypename } from '../../../../../../../common/components/SubscribeButton/helper';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ActiveMainChannel } from '../../../../../../shared/types';
import { OverviewPageHeaderProps } from '../../typings';

export type DefaultPropsInner = OverviewPageHeaderProps & {
  activeMainChannel: ActiveMainChannel;
};

const Default = ({
  title,
  lead,
  activeMainChannel,
  alertId,
  alertType,
  showFollowButton = false,
}: DefaultPropsInner): ReactElement | null => {
  if (!title) {
    return null;
  }

  const getThemedClass = cssClassByChannel(styles, activeMainChannel);

  return (
    <div
      data-testid="overview-page-header-default-wrapper"
      className={classNames(grid.Container, styles.Wrapper, {
        [styles.NoLead]: !lead,
      })}
    >
      <div className={grid.Row}>
        <div
          className={classNames(grid.ColXs24, grid.ColSm20, grid.ColOffsetSm2)}
        >
          <div
            className={classNames(getThemedClass('HeadingOverviewWrapper'), {
              /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
              [getThemedClass('HeadingOverviewWrapperWithAlerts')]:
                alertId && alertType,
            })}
          >
            <h1 className={getThemedClass('HeadingOverview')}>{title}</h1>
          </div>

          {alertId && alertType && showFollowButton && (
            <div className={styles.SubscribeButtonWrapper}>
              <SubscribeButton
                id={Number(alertId)}
                label={title}
                type={getAlertItemTypeByTypename(alertType)}
              />
            </div>
          )}
        </div>
      </div>

      {lead && (
        <div
          data-testid="overview-page-header-default-lead"
          className={grid.Row}
        >
          <div
            className={classNames(
              grid.ColXs24,
              grid.ColSm16,
              grid.ColOffsetSm4,
              grid.ColXl12,
              grid.ColOffsetXl6,
            )}
          >
            <div className={getThemedClass('Lead')}>{lead}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

export default connect(mapStateToProps)(Default);
