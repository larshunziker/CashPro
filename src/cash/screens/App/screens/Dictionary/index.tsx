import React from 'react';
import { connect, useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';

import { compose } from 'recompose';
import branch from 'recompose/branch';
import renderComponent from 'recompose/renderComponent';
import classNames from 'classnames';
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
import { TOP_AD_1 } from '../../../../../shared/constants/adZone';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../shared/constants/structuredData';
import {
  DICTIONARY_TITLE,
  ROUTE_DICTIONARY,
  ROUTE_DICTIONARY_LIST,
} from '../../constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { DictionaryProps } from './typings';

type DictionaryPropsInner = DictionaryProps & {
  setStatusCode: typeof setStatusCode;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'environment' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'setStatusCode' implicitly has an 'any' type. */
const renderEntriesList = (environment, setStatusCode) => {
  const dictionaryItems = environment?.onmedaByChar || null;

  if (Array.isArray(dictionaryItems?.edges) && dictionaryItems?.edges?.length) {
    return (
      <TestFragment data-testid="dictionary-entries-list-wrapper">
        <EntriesList list={dictionaryItems} />
      </TestFragment>
    );
  }

  if (!dictionaryItems) {
    if (__SERVER__) {
      setStatusCode(404);
    }

    return (
      <div
        className={styles.NoEntriesTextWrapper}
        data-testid="dictionary-no-entry-wrapper"
      >
        Keine Artikel zu diesem Buchstaben vorhanden
      </div>
    );
  }
};

const Dictionary = ({
  data,
  setStatusCode,
  char = 'A',
  error,
}: DictionaryPropsInner) => {
  const useDefaultChar = useMatch(`/${ROUTE_DICTIONARY}`);
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
  const loading = useSelector((state) => locationStateSelector(state).loading);
  const location = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).locationBeforeTransitions,
  );
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  const canonicalUrl = `${global.locationOrigin}/${ROUTE_DICTIONARY_LIST}/A`;

  const metaLinks = generateMetaLinks(
    location,
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | null' is not assignable to parameter of type 'string | undefined'. */
    useDefaultChar ? canonicalUrl : null,
  );

  const landingPage = (data?.routeByPath?.object as LandingPage) || null;

  const breadcrumbItems = {
    edges: [
      {
        node: {
          id: 'dictionary-uuid',
          link: `/${ROUTE_DICTIONARY}`,
          label: landingPage?.title || DICTIONARY_TITLE,
        },
      },
    ],
  };

  return (
    <>
      <div className={styles.PageWrapper}>
        <div className={grid.Row}>
          <div className={classNames(grid.ColXs24, styles.Print)}>
            <Helmet
              title={`${landingPage?.title || DICTIONARY_TITLE} ${char}`}
              link={metaLinks}
              socialMetaValues={{
                field_short_title: `${
                  landingPage?.title || DICTIONARY_TITLE
                }: ${char}`,
              }}
            />
            <TestFragment data-testid="dictionary-termsoverview-wrapper">
              <TermsOverview
                activeLetter={char}
                lettersUrl={`/${ROUTE_DICTIONARY_LIST}`}
                breadcrumbItems={breadcrumbItems}
                title={landingPage?.title || DICTIONARY_TITLE}
              />
            </TestFragment>
            {
              // @ts-ignore
              !data?.environment?.routeByPath?.object?.channel?.suppressAds && (
                <div className={'ad-wrapper ad-wrapper-mobile'}>
                  <AppNexus slot={TOP_AD_1} deviceType="mobile" />
                </div>
              )
            }
            <div data-testid="dictionary-entry-wrapper">
              {(!loading &&
                !error &&
                renderEntriesList(data?.environment, setStatusCode)) ||
                null}
            </div>
          </div>
        </div>
      </div>
      {error && <StatusPage statusCode={503} logMessage={error} />}
    </>
  );
};

const withBranch = branch<any>(
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  (props) => typeof props !== 'object' || (props.char && props.char.length > 1),
  renderComponent(StatusPage),
  renderComponent(Dictionary),
);

const mapDispatchToProps = {
  setStatusCode,
};

const withStoreConnection = connect(null, mapDispatchToProps);

export default compose<any, any>(
  withParams,
  withStoreConnection,
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
  withHelmet({
    getNode: (mapProps: DictionaryPropsInner) =>
      mapProps.data?.routeByPath?.object || null,
    getNodesCount: (mapProps: DictionaryPropsInner) =>
      mapProps?.data?.environment?.onmedaByChar?.edges?.length || 0,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    getNodes: (mapProps: DictionaryPropsInner) =>
      mapProps?.data?.environment?.onmedaByChar?.edges || [],
  }),
  withBranch,
)(Dictionary);
