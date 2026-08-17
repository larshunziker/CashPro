import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import cssClassByChannel from '../../../../../../shared/helpers/cssClassByChannel';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import Picture from '../../../../../../../common/components/Picture';
import SubscribeButton from '../../../SubscribeButton/themes/SubscribeButtonOverviewPage';
import { getAlertItemTypeByTypename } from '../../../../../../../common/components/SubscribeButton/helper';
import { STYLE_1X1_140 } from '../../../../../../../shared/constants/images';
import { TEASER_PLACEHOLDER_PATH } from '../../../Teaser/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ActiveMainChannel } from '../../../../../../shared/types';
import { OverviewPageHeaderProps } from '../../typings';

export type CelebrityPropsInner = OverviewPageHeaderProps & {
  activeMainChannel: ActiveMainChannel;
};

const OVERVIEW_PAGE_HEADER_IDENTIFIER = 'celebrity-overview-page-header';

const Celebrity = ({
  title,
  lead,
  headerImage,
  activeMainChannel,
  alertId,
  alertType,
}: CelebrityPropsInner): ReactElement | null => {
  if (!title || !headerImage) {
    return null;
  }

  const getThemedClass = cssClassByChannel(styles, activeMainChannel);

  const imgRelativeOriginPath =
    headerImage?.file?.relativeOriginPath || TEASER_PLACEHOLDER_PATH;
  const focalPointX = headerImage?.file?.focalPointX || null;
  const focalPointY = headerImage?.file?.focalPointY || null;
  const imgAlt = headerImage?.file?.alt || '';

  return (
    <div
      className={classNames(styles.Wrapper, grid.Container)}
      data-testid="overview-page-header-celebrity-wrapper"
    >
      <div className={grid.Row}>
        <div
          className={classNames(
            grid.ColXs24,
            grid.ColSm20,
            grid.ColOffsetSm2,
            grid.ColMd18,
            grid.ColOffsetSm3,
          )}
        >
          <div className={getThemedClass('HeaderImageWrapper')}>
            <div className={styles.HeaderImageWrapperInner}>
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
                  style_320={STYLE_1X1_140}
                />
              )) ||
                null}
            </div>
          </div>
        </div>
      </div>
      <div className={getThemedClass('HeadingOverviewWrapper')}>
        <div className={grid.Row}>
          <div
            className={classNames(
              grid.ColXs24,
              grid.ColSm16,
              grid.ColOffsetSm4,
              grid.ColMd14,
              grid.ColOffsetSm5,
            )}
          >
            <h1
              className={classNames(getThemedClass('HeadingOverview'), {
                [styles.HeadingOverviewWithAlerts]: alertId && alertType,
              })}
            >
              {title}
            </h1>
            {alertId && alertType && (
              <div className={styles.SubscribeButtonWrapper}>
                <SubscribeButton
                  id={Number(alertId)}
                  label={title}
                  type={getAlertItemTypeByTypename(alertType)}
                />
              </div>
            )}
            {lead && (
              <div
                data-testid="overview-page-header-celebrity-lead"
                className={classNames(getThemedClass('Lead'))}
              >
                {lead}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

export default connect(mapStateToProps)(Celebrity);
