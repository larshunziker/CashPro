/**
 * @TODO
 *
 * 1. Use location vertical instead of body class?
 */

import React, { ComponentType } from 'react';
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
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../shared/decorators/withEnvironmentMap'. '/Users/bhs/code/wo */
import withEnvironmentMap from '../../../../../shared/decorators/withEnvironmentMap';
import withParams from '../../../../../shared/decorators/withParams';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../shared/decorators/withHelmet';
import { setStatusCode } from '../../../../../shared/actions/ssr';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import TermsOverview from '../../components/TermsOverview';
import StatusPage from './../StatusPage';
import KeywordList from './components/KeywordList';
import { WithRaschRouter } from '../../../../../shared/@types/gql';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../shared/constants/structuredData';
import { ROUTE_KEYWORDS } from '../../constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
// @ts-ignore
import fallbackImage from '../../assets/graphics/beobachter-fb-fallback.jpg';
import { BreadcrumbsItems } from '../../../../../common/components/Breadcrumbs/typings';

type SetStatusCode = typeof setStatusCode;

type KeywordArticlesPropsInner = Pick<WithRaschRouter, 'data'> & {
  setStatusCode: SetStatusCode;
  searchString: string;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'keywordsByChar' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'setStatusCode' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'loading' implicitly has an 'any' type. */
const renderKeywordList = (keywordsByChar, setStatusCode, loading) => {
  if (!loading && !keywordsByChar) {
    if (__SERVER__) {
      setStatusCode(404);
    }

    return (
      <div data-testid="keywords-noresult-wrapper">
        Keine Stichworte zu diesem Buchstaben vorhanden.
      </div>
    );
  }

  return (
    <TestFragment data-testid="keywords-keywordlist-wrapper">
      <KeywordList list={keywordsByChar} />
    </TestFragment>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
export function keywordsBreadcrumbsData(data: any, props): any {
  if (props?.params && props?.params['*']) {
    const letter = props?.params['*'].split('/')[1]?.toUpperCase();
    const breadcrumbItems: BreadcrumbsItems = {
      edges: [
        {
          node: {
            link: `/${ROUTE_KEYWORDS}`,
            label: 'Stichworte',
          },
        },
        {
          node: {
            link: `/${ROUTE_KEYWORDS}/${letter}`,
            label: letter,
          },
        },
      ],
    };
    data.breadcrumbsData = {
      activeMenuTrail: breadcrumbItems,
      title: data?.environment?.routeByPath?.object?.label,
    };
  } else {
    data.breadcrumbsData = {
      label: 'Stichworte',
      link: `/${ROUTE_KEYWORDS}`,
      title: data?.environment?.routeByPath?.object?.label,
    };
  }
}

const KeywordsArticles: ComponentType<KeywordArticlesPropsInner> = ({
  data,
  setStatusCode,
  searchString = 'A',
}: KeywordArticlesPropsInner) => {
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
  const loading = useSelector((state) => locationStateSelector(state).loading);

  return (
    <BodyClassName className={`keywords-detail ${styles.ArticleBody}`}>
      <div className={styles.Wrapper} data-testid="keywords-wrapper">
        <TermsOverview
          activeLetter={searchString}
          lettersUrl={'/stichworte/list'}
          title={'Stichworte'}
        />

        <div className={grid.Container}>
          <div className={grid.Row}>
            <div className={classNames(grid.ColMd16, grid.ColOffsetMd4)}>
              {renderKeywordList(data?.keywordsByChar, setStatusCode, loading)}
            </div>
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
  withEnvironmentMap,
  withHelmet({
    getNode: ({ searchString }: KeywordArticlesPropsInner) => ({
      title: searchString,
      preferredUri: '/stichworte',
    }),
    getImage: () => ({
      relativeOriginPath: fallbackImage,
    }),
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'data' implicitly has an 'any' type. */
    getNodes: ({ data }) => data?.keywordsByChar?.edges || [],
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
