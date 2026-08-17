import React from 'react';
import { useLocation, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import StatusPage from '../StatusPage';
import locationStateSelector from '../../../../shared/selectors/locationStateSelector';
import AppNexus from '../../components/AppNexus';
import EsiContext from '../../../../../common/components/EsiRenderer/context';
import Paragraphs from '../../components/Paragraphs';
import Breadcrumbs from '../../../../screens/App/components/Breadcrumbs';
import { breadcrumbItems, enrichBody } from '../FullquotePage/helpers';
import { useBNPDerivativeFullquote } from '../../../../shared/hooks/useBNPDerivative';
import { FULLQUOTE_PAGE_TYPE } from '../FullquotePage/constants';
import { TOP_AD_1 } from '../../components/AppNexus/constants';
import styles from '../FullquotePage/styles.legacy.css';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import { RasRouterProps } from '../../components/Router/typings';

const FullquotePageBNP = ({ data, error, loading }: RasRouterProps) => {
  const { data: fullquoteData } = useBNPDerivativeFullquote();
  const { valorName = '', market = '', currency = '' } = useParams();
  const isHybridApp = useSelector(
    (state: ReduxState) => locationStateSelector(state).isHybridApp,
  );
  const location = useLocation();

  const routeByPathObject = (data?.environment?.routeByPath?.object ||
    data?.environment?.routeByPath?.object ||
    null) as LandingPage;

  const errorStatusCode = error?.graphQLErrors?.[0]?.extensions?.code;

  if (!valorName || error) {
    if (loading) {
      return null;
    }

    if (
      ((!errorStatusCode || errorStatusCode < 500) &&
        !routeByPathObject?.body) ||
      errorStatusCode === 404
    ) {
      return <StatusPage statusCode={errorStatusCode} />;
    }
  }

  const enrichedBody = enrichBody({
    body: routeByPathObject?.body,
    data: {
      pageType: 'derivate',
      valorName,
      market,
      currency,
    },
  });

  return (
    <>
      {(!routeByPathObject?.channel?.suppressAds && (
        <div className="ad-wrapper ad-wrapper-mobile">
          <AppNexus slot={TOP_AD_1} deviceType="mobile" />
        </div>
      )) ||
        null}

      <div className={styles.Wrapper} key={`fullquote-${valorName}`}>
        {isHybridApp ? null : (
          <div className={styles.Breadcrumbs}>
            <Breadcrumbs
              pageUrl={location.pathname}
              items={breadcrumbItems({
                canonicalUrl: `derivate`,
                title: fullquoteData?.getFullquotePage.title,
              })}
            />
          </div>
        )}
        <EsiContext.Provider value={{ timeout: 30000 }}>
          <Paragraphs
            pageBody={enrichedBody}
            origin={`${FULLQUOTE_PAGE_TYPE}`}
            colStyle={grid.ColXs24}
            landingPagePullOut
            isAdSuppressed={
              routeByPathObject?.channel?.suppressAds || undefined
            }
          />
        </EsiContext.Provider>
      </div>
    </>
  );
};

export default FullquotePageBNP;
