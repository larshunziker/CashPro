/**
 * @TODO
 *
 * 1. Use location vertical instead of body class?
 */

import React, { ReactElement } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-body-classname'. '/Users/bhs/code/work/rasch-stack/node_modules/rea */
import BodyClassName from 'react-body-classname';
import { connect, useSelector } from 'react-redux';
import branch from 'recompose/branch';
import compose from 'recompose/compose';
import renderComponent from 'recompose/renderComponent';
import classNames from 'classnames';
import { EXTRACT_DATA_FROM_PATH } from '../../../../../shared/helpers/extractDataFromPropsByConfigMap';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import withParams from '../../../../../shared/decorators/withParams';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../shared/decorators/withHelmet';
import { setStatusCode } from '../../../../../shared/actions/ssr';
import Helmet from '../../components/Helmet';
import TermsOverview from '../../components/TermsOverview';
import StatusPage from '../StatusPage';
import KeywordList from './components/KeywordList';
import { WithRaschRouter } from '../../../../../shared/@types/gql';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../shared/constants/structuredData';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';

type SetStatusCode = typeof setStatusCode;

type KeywordArticlesPropsInner = Pick<WithRaschRouter, 'data'> & {
  setStatusCode: SetStatusCode;
  searchString: string;
};

const renderNoKeywordsFound = (setStatusCode: SetStatusCode) => {
  if (__SERVER__) {
    setStatusCode(404);
  }

  return (
    <div
      className={classNames(styles.NoKeywordsTextWrapper, grid.ColXs24)}
      data-testid="keywords-noresult-wrapper"
    >
      Keine Stichworte zu diesem Buchstaben vorhanden
    </div>
  );
};

const KeywordsArticles = ({
  data,
  setStatusCode,
  searchString = 'A',
}: KeywordArticlesPropsInner): ReactElement => {
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
  const loading = useSelector((state) => locationStateSelector(state).loading);
  const breadcrumbItems = {
    edges: [
      {
        node: {
          id: 'stichworte',
          link: '/stichworte',
          label: 'Stichworte',
        },
      },
    ],
  };

  return (
    <BodyClassName className={`keywords-detail`}>
      <div data-testid="keywords-wrapper">
        <Helmet
          title={searchString}
          socialMetaValues={{
            field_short_title: searchString,
            field_short_description: searchString,
            field_heroimage: '',
            field_lead: searchString,
          }}
        />

        <TermsOverview
          activeLetter={searchString}
          lettersUrl="/stichworte"
          breadcrumbItems={breadcrumbItems}
          title="Stichworte"
        />

        <div className={sections.Container}>
          <div className={grid.Row}>
            {(data?.environment?.keywordsByChar && (
              <div
                className={grid.ColXs24}
                data-testid="keywords-keywordlist-wrapper"
              >
                <KeywordList list={data.environment?.keywordsByChar} />
              </div>
            )) ||
              (!loading && renderNoKeywordsFound(setStatusCode)) ||
              null}
          </div>
        </div>
      </div>
    </BodyClassName>
  );
};

const withBranch = branch<any>(
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  (props) =>
    typeof props !== 'object' ||
    (props.searchString && props.searchString.length > 1),
  renderComponent(StatusPage),
  renderComponent(KeywordsArticles),
);

const mapDispatchToProps = {
  setStatusCode,
};

const withStoreConnection = connect(null, mapDispatchToProps);

export default compose<any, any>(
  withParams,
  withStoreConnection,
  withHelmet({
    getNode: ({ searchString }: KeywordArticlesPropsInner) => ({
      title: searchString,
      preferredUri: '/stichworte',
    }),
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'data' implicitly has an 'any' type. */
    getNodes: ({ data }) => data?.environment?.keywordsByChar?.edges || [],
  }),
  withAppNexus({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTrackingData: (props) =>
      parseTrackingData({
        ...props,
        articleType: 'LandingPage',
        contentType: 'Keyword',
        articleId: `keywords_${props.searchString}`,
        subsection: {
          type: EXTRACT_DATA_FROM_PATH,
          value: ['props.searchString'],
        },
      }),
  }),
  withBranch,
)(KeywordsArticles);
