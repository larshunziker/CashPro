import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import cssClassByChannel from '../../../../../../shared/helpers/cssClassByChannel';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import Picture from '../../../../../../../common/components/Picture';
import SubscribeButton from '../../../SubscribeButton/themes/SubscribeButtonOverviewPage';
import { getAlertItemTypeByTypename } from '../../../../../../../common/components/SubscribeButton/helper';
import {
  STYLE_2X1_1280,
  STYLE_2X1_800,
} from '../../../../../../../shared/constants/images';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ActiveMainChannel } from '../../../../../../shared/types';
import { OverviewPageHeaderProps } from '../../typings';

export type DossierPropsInner = OverviewPageHeaderProps & {
  activeMainChannel: ActiveMainChannel;
};

const OVERVIEW_PAGE_HEADER_IDENTIFIER = 'dossier-overview-page-header';

const Dossier = ({
  title,
  lead,
  headerImage,
  activeMainChannel,
  alertId,
  alertType,
}: DossierPropsInner): ReactElement | null => {
  if (!title || !headerImage) {
    return null;
  }

  const getThemedClass = cssClassByChannel(styles, activeMainChannel);

  const imgRelativeOriginPath = headerImage?.file?.relativeOriginPath || '';
  const focalPointX = headerImage?.file?.focalPointX || null;
  const focalPointY = headerImage?.file?.focalPointY || null;
  const imgAlt = headerImage?.file?.alt || '';
  const imageStyles = {
    style_320: STYLE_2X1_800,
    style_1680: STYLE_2X1_1280,
  };

  return (
    <>
      <div
        className={classNames(styles.Wrapper, grid.Container, {
          [styles.WrapperWithAlerts]: alertId && alertType,
        })}
      >
        {(imgRelativeOriginPath && (
          <Picture
            relativeOrigin={imgRelativeOriginPath}
            /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
            focalPointX={focalPointX}
            /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
            focalPointY={focalPointY}
            alt={imgAlt}
            className={classNames(
              OVERVIEW_PAGE_HEADER_IDENTIFIER,
              styles.HeaderImage,
            )}
            disableWrapperClassName
            {...imageStyles}
          />
        )) ||
          null}
        <div
          className={classNames(getThemedClass('HeadingOverviewWrapper'), {
            [styles.HeadingOverviewWrapperWithAlerts]: alertId && alertType,
          })}
        >
          <div className={grid.Row}>
            <div
              className={classNames(
                grid.ColXs24,
                grid.ColSm20,
                grid.ColOffsetSm2,
              )}
            >
              <h1 className={getThemedClass('HeadingOverview')}>{title}</h1>
              {lead && (
                <div
                  className={classNames(
                    getThemedClass('Lead'),
                    grid.HiddenSmDown,
                  )}
                >
                  {lead}
                </div>
              )}
            </div>
            {alertId && alertType && (
              <div className={getThemedClass('SubscribeButtonWrapper')}>
                <SubscribeButton
                  id={Number(alertId)}
                  label={title}
                  type={getAlertItemTypeByTypename(alertType)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {lead && (
        <div
          className={classNames(
            getThemedClass('Lead'),
            styles.Mobile,
            grid.Container,
            grid.HiddenSmUp,
          )}
        >
          {lead}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

export default connect(mapStateToProps)(Dossier);
