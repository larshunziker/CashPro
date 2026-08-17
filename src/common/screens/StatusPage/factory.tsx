import React, { ReactElement } from 'react';
import { connect, useDispatch } from 'react-redux';
import classNames from 'classnames';
import raf from 'raf';
import { getTealiumData } from '../../../shared/helpers/tealium/helper';
import { tealiumTrackEvent } from './../../../shared/helpers/tealium';
import locationStateSelector from '../../../shared/selectors/locationStateSelector';
import { setStatusCode } from './../../../shared/actions/ssr';
import type {
  StatusPageComponent,
  StatusPageFactoryOptions,
  StatusPageProps,
} from './typings';

type StatusPagePropsInner = StatusPageProps & {
  setStatusCode: typeof setStatusCode;
};

const statusPageFactory = ({
  statusCodeConfig,
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
  searchForm = null,
  Helmet,
  styles,
  setLoading,
  setScreenReady,
}: StatusPageFactoryOptions): StatusPageComponent => {
  const StatusPage = ({
    setStatusCode,
    statusCode = 404,
    logMessage,
    children,
  }: StatusPagePropsInner): ReactElement => {
    const dispatch = useDispatch();
    // do not change status code on 451 because of akamai caching logic
    if (__SERVER__) {
      setStatusCode(statusCode);
    }

    if (!__SERVER__ && setLoading && setScreenReady) {
      raf(() => {
        dispatch(setLoading(false));
        if (statusCode !== 404) {
          dispatch(
            setScreenReady(true, {
              pathname: location.pathname,
              ...getTealiumData({
                object: {
                  preferredUri: location.pathname,
                  __typename: 'ErrorPage',
                },
              }),
            }),
          );
        }
      });
    } else if (!setLoading && !setScreenReady) {
      tealiumTrackEvent({ payload: { cms_page_type: 'ErrorPage' } });
    }

    const {
      title = {},
      icon = null,
      description = {},
      metaTitle = 'Seite kann nicht angezeigt werden',
      showSearchForm = true,
    } = statusCodeConfig?.[statusCode] || {};

    return (
      <>
        <div className={styles.Wrapper} data-testid="status-page-wrapper">
          {Helmet && <Helmet title={metaTitle} />}

          <div className={styles.Container}>
            <div className={styles.Row}>
              <div className={styles.Columns}>
                <div className={styles.HeaderWrapper}>
                  {icon && (
                    <div
                      className={styles.IconWrapper}
                      data-testid="status-page-icon-wrapper"
                    >
                      {icon}
                    </div>
                  )}
                  <div
                    className={classNames(styles.Title, title.className)}
                    data-testid="status-page-title-wrapper"
                  >
                    {title.text}
                  </div>
                </div>

                {description && description.text && (
                  <div
                    className={classNames(
                      styles.Description,
                      description.className,
                    )}
                    data-testid="status-page-description-wrapper"
                  >
                    {description.text}
                  </div>
                )}
              </div>
            </div>

            {showSearchForm && searchForm && (
              <div className={styles.Row}>
                <div className={styles.Columns}>
                  <div
                    className={styles.SearchWrapper}
                    data-testid="status-page-searchform-wrapper"
                  >
                    {searchForm}
                  </div>
                </div>
              </div>
            )}
          </div>
          {(children &&
            children({
              statusCodeConfig: statusCodeConfig?.[statusCode],
              statusCode,
            })) ||
            null}
        </div>

        {logMessage && (
          <>
            <div id="errorMessage" style={{ display: 'none' }}>
              <>{JSON.stringify(logMessage, null, 2)}</>
            </div>

            {
              // eslint-disable-next-line no-console
              console.error(`ErrorMessage:`, logMessage)
            }
          </>
        )}
      </>
    );
  };

  const mapStateToProps = (state: ReduxState) => ({
    isHybridApp: locationStateSelector(state)?.isHybridApp || false,
  });

  const mapDispatchToProps = {
    setStatusCode,
  };

  return connect(mapStateToProps, mapDispatchToProps)(StatusPage);
};

export default statusPageFactory;
