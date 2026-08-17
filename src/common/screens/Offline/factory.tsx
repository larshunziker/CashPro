import React, { ReactElement, ComponentType } from 'react';
import grid from './../../assets/styles/grid.legacy.css';
import { OfflineFactoryOptions } from './typings';

const offlineFactory = ({
  SVGIcon,
  iconType,
  Helmet,
  styles,
  callToAction = null,
}: OfflineFactoryOptions): ComponentType => {
  const Offline: ComponentType = (): ReactElement => (
    <div className={styles.Wrapper} data-testid="wrapper">
      <Helmet title="Offline" />
      <div className={grid.Container}>
        {SVGIcon && (
          <div className={grid.Row}>
            {/* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */}
            <SVGIcon type={iconType} className={styles.Icon} />
          </div>
        )}
        <div className={grid.Row}>
          <div className={grid.ColXs24}>
            <div className={styles.Title} data-testid="title-wrapper">
              Keine Internetverbindung
            </div>
            <div
              className={styles.Description}
              data-testid="description-wrapper"
            >
              Prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.
            </div>

            {callToAction && (
              <div
                className={styles.CallToActionWrapper}
                data-testid="cta-wrapper"
              >
                {callToAction}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return Offline;
};

export default offlineFactory;
