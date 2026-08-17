import React, { ReactElement } from 'react';

import { compose } from 'recompose';
import withHelmet from '../../../../shared/decorators/withHelmet';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import AppNexus from '../../components/AppNexus';
import Breadcrumbs from '../../components/Breadcrumbs';
import OverviewPage from '../../components/OverviewPage';
import StatusPage from './../StatusPage';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../shared/constants/structuredData';
import { MMR_1 } from '../../components/AppNexus/constants';
import { GRID_LAYOUT_TEASER_KEYWORD } from '../../components/TeaserGrid/gridConfigs/constants';
import { SITE_TITLE } from '../../constants';
import { KeywordProps } from './typings';

type KeywordPropsInner = KeywordProps & Pick<RouterProps, 'location'>;

const KeywordComponent = ({
  keyword,
  location,
  page,
}: KeywordPropsInner): ReactElement => {
  if (
    !keyword?.entities?.edges ||
    !Array.isArray(keyword?.entities?.edges) ||
    !keyword?.entities?.edges.length
  ) {
    return <StatusPage />;
  }

  return (
    <TestFragment data-testid="keyword-container">
      {keyword.preferredUri && keyword.activeMenuTrail && (
        <Breadcrumbs
          pageUrl={keyword.preferredUri}
          items={keyword.activeMenuTrail}
        />
      )}

      <div className="ad-wrapper ad-wrapper-mobile">
        <AppNexus slot={MMR_1} deviceType="mobile" />
      </div>

      <OverviewPage
        location={location}
        page={page}
        routeObject={keyword}
        gridConfig={GRID_LAYOUT_TEASER_KEYWORD}
        paragraphType="KeywordScreen"
      />
    </TestFragment>
  );
};

export default compose<any, any>(
  withHelmet({
    /* @ts-ignore TODO: TS2322 ->  Type '(mapProps */
    getImage: (mapProps: KeywordPropsInner) =>
      mapProps?.keyword?.settings?.headerImage?.file,
    getNode: (mapProps: KeywordPropsInner) => ({
      ...mapProps?.keyword,
      metaTitle: mapProps?.keyword?.settings?.seoTitle || '',
    }),
    getFallbackTitle: (mapProps: KeywordPropsInner) =>
      `${mapProps?.keyword?.label || ''} - Alles zum Thema ${
        mapProps?.keyword?.label || ''
      } im Überblick | ${SITE_TITLE}`,
    getFallbackDescription: (mapProps: KeywordPropsInner) =>
      `Die neusten Artikel, Infos und News zu ${
        mapProps?.keyword?.label || ''
      } im Überblick - Alle Schlagzeilen und die letzten Nachrichten für Sie zusammengestellt.`,
    getNodesCount: (mapProps: KeywordPropsInner) =>
      mapProps?.keyword?.entities?.count || 0,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    getNodes: (mapProps: KeywordPropsInner) =>
      mapProps?.keyword?.entities?.edges || [],
  }),
)(KeywordComponent);
