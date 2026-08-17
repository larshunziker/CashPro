import React from 'react';
import { connect, useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';

import { compose } from 'recompose';
import branch from 'recompose/branch';
import renderComponent from 'recompose/renderComponent';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import { generateMetaLinks } from '../../../../../shared/helpers/withHelmet';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import withParams from '../../../../../shared/decorators/withParams';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../shared/decorators/withHelmet';
import { setStatusCode } from '../../../../../shared/actions/ssr';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import AppNexus from '../../components/AppNexus';
import Helmet from '../../components/Helmet';
import TermsOverview from '../../components/TermsOverview';
import StatusPage from './../StatusPage';
import EntriesList from './components/EntriesList';
import { MMR_1 } from '../../../../../shared/constants/adZone';
import {
  ROBOTS_META_INDEX_FOLLOW_NOODP_NOOPENER_NOARCHIVE,
  ROOT_SCHEMA_TYPE_WEBSITE,
} from '../../../../../shared/constants/structuredData';
import sections from '../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { DictionaryProps } from './typings';

type DictionaryPropsInner = DictionaryProps & {
  setStatusCode: typeof setStatusCode;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'environment' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'setStatusCode' implicitly has an 'any' type. */
const renderEntriesList = (environment, setStatusCode) => {
  const onmedaByChar = environment?.onmedaByChar || null;

  if (Array.isArray(onmedaByChar?.edges) && onmedaByChar?.edges?.length) {
    return (
      <TestFragment data-testid="finance-dictionary-entries-list-wrapper">
        <EntriesList list={onmedaByChar} />
      </TestFragment>
    );
  }

  if (!onmedaByChar) {
    if (__SERVER__) {
      setStatusCode(404);
    }

    return (
      <div
        className={styles.NoEntriesTextWrapper}
        data-testid="finance-dictionary-no-entry-wrapper"
      >
        Keine Artikel zu diesem Buchstaben vorhanden
      </div>
    );
  }
};

const FinanceDictionary = ({
  data,
  setStatusCode,
  char = 'A',
}: DictionaryPropsInner) => {
  const useDefaultChar = useMatch('/finanzlexikon');
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
  const loading = useSelector((state) => locationStateSelector(state).loading);
  const location = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).locationBeforeTransitions,
  );
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  const canonicalUrl = `${global.locationOrigin}/finanzlexikon/list/A`;

  const metaLinks = generateMetaLinks(
    location,
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | null' is not assignable to parameter of type 'string | undefined'. */
    useDefaultChar ? canonicalUrl : null,
  );

  const breadcrumbItems = {
    edges: [
      {
        node: {
          id: 'finance-lexicon-uuid',
          link: '/finanzlexikon',
          label: 'Finanzlexikon',
        },
      },
    ],
  };

  return (
    <>
      <Helmet
        title={`Finanzlexikon ${char}`}
        link={metaLinks}
        socialMetaValues={{
          field_short_title: `Finanzlexikon: ${char}`,
        }}
        meta={[
          {
            name: 'robots',
            content: 'max-image-preview:large',
          },
          {
            name: 'robots',
            content: ROBOTS_META_INDEX_FOLLOW_NOODP_NOOPENER_NOARCHIVE,
          },
        ]}
      />
      <TestFragment data-testid="finance-dictionary-termsoverview-wrapper">
        <TermsOverview
          activeLetter={char}
          lettersUrl="/finanzlexikon/list"
          breadcrumbItems={breadcrumbItems}
          title="Finanzlexikon"
        />
      </TestFragment>
      {
        // @ts-ignore
        !data?.environment?.routeByPath?.object?.channel?.suppressAds && (
          <div className={'ad-wrapper ad-wrapper-mobile'}>
            <AppNexus slot={MMR_1} deviceType="mobile" />
          </div>
        )
      }
      <div
        className={sections.Container}
        data-testid="finance-dictionary-entry-wrapper"
      >
        {(!loading && renderEntriesList(data?.environment, setStatusCode)) ||
          null}
      </div>
    </>
  );
};

const withBranch = branch<any>(
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  (props) => typeof props !== 'object' || (props.char && props.char.length > 1),
  renderComponent(StatusPage),
  renderComponent(FinanceDictionary),
);

const mapDispatchToProps = {
  setStatusCode,
};

const withStoreConnection = connect(null, mapDispatchToProps);

export default compose<any, any>(
  withParams,
  withStoreConnection,
  withHelmet({
    getNode: (mapProps: DictionaryPropsInner) =>
      mapProps.data?.routeByPath?.object || null,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEBSITE,
  }),
  withAppNexus({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTrackingData: (props) =>
      parseTrackingData({
        ...props,
        articleType: 'LandingPage',
        contentType: 'Keyword',
        articleId: `dictionary_${props.char}`,
      }),
  }),
  withBranch,
)(FinanceDictionary);
