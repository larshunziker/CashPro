import React from 'react';
import { compose } from 'recompose';
import { useQuery } from '@apollo/client';
import authorFactory from '../../../../../common/screens/Author/factory';
import { ensureTeaserInterface } from '../../components/Teaser/shared/helpers';
import { WithHelmetProps } from '../../../../../shared/decorators/@types/withHelmetFactory';
import withHelmet from '../../../../shared/decorators/withHelmet';
import Breadcrumbs from '../../components/Breadcrumbs';
import Teaser from '../../components/Teaser';
import StatusPage from '../StatusPage';
import AuthorDetails from './components/AuthorDetails';
import ExpansionPanel from './components/ExpansionPanel';
import Pager, {
  PAGER_TYPE_PAGE_LOADER as pagerType,
} from '../../components/Pager';
import { WithRaschRouter } from '../../../../../shared/@types/gql';
import {
  AUTHOR_PAGE_GRID_PAGE_SIZE,
  AUTHOR_PAGE_SORT_ORDER,
  AUTHOR_PAGE_SORT_TYPE,
} from './constans';
import {
  ARTICLE_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE,
} from '../../../../../shared/constants/content';
import { ROOT_SCHEMA_TYPE_PERSON } from '../../../../../shared/constants/structuredData';
import { TEASER_LAYOUT_WIDE } from '../../../../../shared/constants/teaser';
import { ROUTE_AUTHORS, SITE_TITLE } from '../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/beobachter/screens/App/ */
import { GET_CONTENT_BY_AUTHOR } from './queries';
import styles from './styles.legacy.css';
import { AuthorPageProps } from '../../../../../common/screens/Author/typings';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const markStyleAsUsed = [styles.ShortDescription, styles.ShowMoreButton];

type AuthorPagePropsInner = AuthorPageProps &
  WithHelmetProps &
  Pick<WithRaschRouter, 'page'> & {
    contentByAuthor: any;
  };

const withAuthorContent =
  /* @ts-ignore TODO: TS7006 ->  Parameter 'Component' implicitly has an 'any' type. */

  (Component) =>
    /* @ts-ignore TODO: TS7031 ->  Binding element 'author' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'page' implicitly has an 'any' type. */
    ({ author, page, ...props }) => {
      const { data, loading } = useQuery(GET_CONTENT_BY_AUTHOR, {
        variables: {
          limit: AUTHOR_PAGE_GRID_PAGE_SIZE,
          offset: (page - 1) * AUTHOR_PAGE_GRID_PAGE_SIZE,
          contentTypes: [ARTICLE_CONTENT_TYPE, NATIVE_ADVERTISING_CONTENT_TYPE],
          authorId: author?.aid ? parseInt(author.aid, 10) : null,
          publication: 'BEO',
          sortOrder: AUTHOR_PAGE_SORT_ORDER,
          sort: AUTHOR_PAGE_SORT_TYPE,
        },
        skip: !author?.aid,
      });

      return (
        <Component
          author={author}
          page={page}
          contentByAuthor={data?.globalSearch}
          loading={loading}
          {...props}
        />
      );
    };
export function authorBreadcrumbsData(data: any): any {
  data.breadcrumbsData = {
    label: 'Unsere Redaktion',
    link: `/${ROUTE_AUTHORS}`,
    title: data?.environment?.routeByPath?.object?.name,
  };
}

const AuthorPage = authorFactory({
  PAGE_SIZE: AUTHOR_PAGE_GRID_PAGE_SIZE,
  ensureTeaserInterface,
  Teaser,
  teaserType: TEASER_LAYOUT_WIDE,
  StatusPage,
  Breadcrumbs,
  ROUTE_AUTHORS,
  Pager,
  pagerType,
  AuthorDetails,
  ExpansionPanel,
  additionalBreadcrumbText: ' - Mitglied der Handelszeitung-Redaktion',
  atPublisherSinceTitle: 'Arbeitet für Beobachter seit:',
  journalisticAgb: {
    path: 'https://www.beobachter.ch/home/code-of-conduct-552382',
    label: 'Journalistische Richtlinien',
  },
  styles: {
    HeaderWrapper: styles.HeaderWrapper,
    BreadcrumbsWrapper: styles.BreadcrumbsWrapper,
    Description: styles.Description,
    JournalisticAgbWrapper: styles.JournalisticAgbWrapper,
    ResultsWrapper: styles.ResultsWrapper,
    PagerWrapper: styles.PagerWrapper,
    PageHeading: styles.PageHeading,
    InnerWrapper: styles.InnerWrapper,
  },
});

export default compose<AuthorPageProps, any>(
  withAuthorContent,
  withHelmet({
    getNode: (mapProps: AuthorPagePropsInner) => mapProps.author || null,
    getFallbackTitle: (mapProps: AuthorPagePropsInner) => {
      const author = mapProps.author;

      return `${author?.name || 'Autor'} | ${SITE_TITLE}`;
    },
    getFallbackDescription: (mapProps: AuthorPagePropsInner) => {
      const author = mapProps.author;

      return author?.shortDescription || '';
    },
    /* @ts-ignore TODO: TS2322 ->  Type '(mapProps */
    getImage: (mapProps: AuthorPagePropsInner) => {
      const author = mapProps.author;
      return author?.imageParagraph?.image?.file;
    },
    pageSize: AUTHOR_PAGE_GRID_PAGE_SIZE,
    rootSchemaType: ROOT_SCHEMA_TYPE_PERSON,
    getNodesCount: (mapProps: AuthorPagePropsInner) =>
      mapProps?.contentByAuthor?.count || 0,
    getNodes: (mapProps: AuthorPagePropsInner) =>
      mapProps?.contentByAuthor?.edges || [],
  }),
)(AuthorPage);
