import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { compose, withHandlers, withState } from 'recompose';
import classNames from 'classnames';
import Icon from '../../../../../../../../components/Icon';
import PinDrop from './components/PinDrop';
import PinRing from './components/PinRing';
import gaultMillau from '../../../../../../../../assets/styles/gaultMillau.legacy.css';
import styles from './styles.legacy.css';
import { AroundMeButtonProps } from './typings';

const AroundMeButton = ({
  retrieveBrowserLocation,
  hasGeolocationSupport,
  handleCloseBrowserNote,
  browserLocationError,
  browserLocationPending,
  isBrowserNoteVisible,
}: AroundMeButtonProps) => {
  return (
    (hasGeolocationSupport && (
      <div className={styles.Wrapper}>
        <button
          className={classNames(styles.FindMyLocation, {
            [styles.Active]: browserLocationPending,
          })}
          onClick={retrieveBrowserLocation}
          disabled={browserLocationPending}
        >
          <span className={styles.ButtonContent}>
            <span className={styles.Pin}>
              <PinDrop
                className={classNames({
                  [styles.Flip]: browserLocationPending,
                })}
              />
              <PinRing className={styles.PinRing} />
            </span>
            <span className={styles.ButtonText}>
              <FormattedMessage
                id="app.map.filter.restaurantsNearby"
                description="Around me button text"
                defaultMessage="Restaurants in&nbsp;meiner&nbsp;Nähe"
              />
            </span>
          </span>
        </button>
        {browserLocationError && isBrowserNoteVisible && (
          <div className={styles.NoteWrapper}>
            <p className={styles.Note}>
              <FormattedMessage
                id="app.map.filter.geolocationDenied"
                description="Message when geolocation is not accessible"
                defaultMessage="Auf Ihren Standort kann nicht zugegriffen werden. Prüfen Sie bitte die Einstellungen in Ihrem Browser." // eslint-disable-line max-len
              />
            </p>
            <button
              className={styles.NoteAction}
              onClick={handleCloseBrowserNote}
            >
              <Icon type="IconCross" iconsOverride={gaultMillau} />
            </button>
          </div>
        )}
      </div>
    )) ||
    null
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'BaseComponent' implicitly has an 'any' type. */
const withBrowserLocationSetter = (BaseComponent) => {
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  const ArroundMeHoC = (props) => {
    const hasGeolocationSupport =
      __CLIENT__ && window?.navigator && window.navigator?.['geolocation'];
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);

    const handleSuccess = useCallback(
      /* @ts-ignore TODO: TS7031 ->  Binding element 'coords' implicitly has an 'any' type. */
      ({ coords }) => {
        setPending(false);
        setError(null);

        if (coords.latitude && coords.longitude) {
          props.setLocation({
            lat: coords.latitude,
            lng: coords.longitude,
          });
        }
      },
      [props],
    );

    const handleError = useCallback(
      /* @ts-ignore TODO: TS7006 ->  Parameter 'error' implicitly has an 'any' type. */
      (error) => {
        setPending(false);
        setError(error);
        props.setBrowserNoteVisible(true);
        props.setLocation(null);
      },
      [props],
    );

    const retrieveBrowserLocation = useCallback(() => {
      if (!hasGeolocationSupport || typeof hasGeolocationSupport !== 'object') {
        return;
      }

      setPending(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    }, [handleSuccess, handleError, hasGeolocationSupport]);

    const retrieveBrowserLocationRef = useRef(retrieveBrowserLocation);

    const activateAroundMeOnInit = useCallback(() => {
      if (
        props.routerLocation &&
        props.routerLocation.query &&
        props.routerLocation.query.aroundme
      ) {
        retrieveBrowserLocationRef.current();
      }
    }, [props.routerLocation]);

    useEffect(() => {
      activateAroundMeOnInit();
    }, [activateAroundMeOnInit]);

    return (
      <BaseComponent
        {...props}
        hasGeolocationSupport={hasGeolocationSupport}
        retrieveBrowserLocation={retrieveBrowserLocation}
        browserLocationError={error}
        browserLocationPending={pending}
        activateAroundMeOnInit={activateAroundMeOnInit}
      />
    );
  };

  return ArroundMeHoC;
};

const withBrowserNoteProps = compose<any, any>(
  withState('isBrowserNoteVisible', 'setBrowserNoteVisible', true),
  withHandlers({
    handleCloseBrowserNote:
      /* @ts-ignore TODO: TS7031 ->  Binding element 'setBrowserNoteVisible' implicitly has an 'any' type. */


        ({ setBrowserNoteVisible }) =>
        () => {
          setBrowserNoteVisible(false);
        },
  }),
);

export default compose<any, any>(
  withBrowserNoteProps,
  withBrowserLocationSetter,
)(AroundMeButton);
