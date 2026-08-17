import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { getTealiumData } from '../../../../../shared/helpers/tealium/helper';
import authStateSelector from '../../../../../shared/selectors/authStateSelector';
import grid from '../../../../assets/styles/grid.legacy.css';
import {
  UserProfileComponent,
  UserProfileFactoryOptions,
  UserProfileProps,
} from './typings';

type UserProfilePropsInner = UserProfileProps;

const UserProfileFactory = ({
  Helmet,
  styles,
  titleText = 'Profil',
  LoginForm,
  LoadingSpinner,
  UserMenu,
  seoTitle,
  hasContainer = true,
  setLoading,
  setScreenReady,
  message,
}: UserProfileFactoryOptions): UserProfileComponent => {
  const UserProfile = ({ location }: UserProfilePropsInner) => {
    const dispatch = useDispatch();

    const { isAuthenticated, initialAuthRequest, deviceId } = useSelector(
      (state) => {
        return {
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
          isAuthenticated: authStateSelector(state).isAuthenticated,
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
          initialAuthRequest: authStateSelector(state).initialAuthRequest,
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
          deviceId: authStateSelector(state)?.deviceId,
        };
      },
    );

    useEffect(() => {
      if (setLoading && setScreenReady) {
        dispatch(setLoading(false));
        dispatch(
          setScreenReady(true, {
            pathname: location?.pathname,
            ...getTealiumData({
              object: {
                /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                preferredUri: location.pathname,
                __typename: 'UserProfile',
                pageId: 'userprofile',
              },
            }),
          }),
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <>
        <Helmet title={seoTitle || titleText} />
        <div className={styles.UserProfileWrapper}>
          <div className={classNames({ [grid.Container]: hasContainer })}>
            <div className={styles.Title}>{titleText}</div>

            {!isAuthenticated &&
              ((!initialAuthRequest && <LoadingSpinner />) || (
                <LoginForm message={message} />
              ))}

            {isAuthenticated && <UserMenu />}
          </div>
        </div>
        {deviceId && (
          <p className={styles.DeviceIdWrapper}>Device ID: {deviceId}</p>
        )}
      </>
    );
  };

  return UserProfile;
};

export default UserProfileFactory;
