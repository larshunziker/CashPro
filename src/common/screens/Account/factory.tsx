import React, { ComponentType, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import raf from 'raf';
import { getTealiumData } from '../../../shared/helpers/tealium/helper';
import authStateSelector from './../../../shared/selectors/authStateSelector';
import TestFragment from './../../../shared/tests/components/TestFragment';
import { PIANO_ACCOUNT_ROOT_ID } from './contants';
import { AccountFactoryOptions, AccountProps } from './typings';

type AccountPropsInner = AccountProps;

const accountPageFactory: (
  factoryOptions: AccountFactoryOptions,
) => ComponentType<AccountProps> = ({
  Helmet,
  styles: {
    AccountPanel = '',
    AccountWrapper = '',
    Background = '',
    Title = '',
    Wrapper = '',
  },
  title,
  seoTitle,
  setLoading,
  setScreenReady,
}) => {
  const AccountPage: ComponentType<AccountPropsInner> = ({ location }) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
      (state) => authStateSelector(state).isAuthenticated,
    );

    useEffect(() => {
      if (window.tp && isAuthenticated) {
        window.tp.push([
          'init',
          () => {
            window.tp.myaccount.show({
              displayMode: 'inline',
              containerSelector: `#${PIANO_ACCOUNT_ROOT_ID}`,
            });
          },
        ]);
        if (setLoading && setScreenReady) {
          raf(() => {
            dispatch(setLoading(false));
            dispatch(
              setScreenReady(true, {
                /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                pathname: location.pathname,
                ...getTealiumData({
                  object: {
                    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                    preferredUri: location.pathname,
                    __typename: 'Account',
                  },
                }),
              }),
            );
          });
        }
      } else if (!isAuthenticated && setLoading && setScreenReady) {
        raf(() => {
          dispatch(setLoading(false));
          dispatch(
            setScreenReady(true, {
              /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
              pathname: location.pathname,
              ...getTealiumData({
                object: {
                  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                  preferredUri: location.pathname,
                  __typename: 'Account',
                },
              }),
            }),
          );
        });
      }
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    }, [dispatch, isAuthenticated, location.pathname]);

    // TODO: render message and login button if not logged in
    return (
      <div className={Background} data-testid="background">
        <TestFragment data-testid="helmet-wrapper">
          <Helmet title={seoTitle || title} />
        </TestFragment>

        <div className={Wrapper} data-testid="wrapper">
          <div className={AccountWrapper} data-testid="account-wrapper">
            <h2 className={Title} data-testid="title">
              {title}
            </h2>
            <div className={AccountPanel} data-testid="account-panel">
              <div id={PIANO_ACCOUNT_ROOT_ID} data-testid="piano-root" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return AccountPage;
};

export default accountPageFactory;
