/* istanbul ignore file */
import React from 'react';
import { compose } from 'redux';
import { useQuery } from '@apollo/client';
import authorFactory from '../../../../../common/screens/Author/factory';
import { ensureTeaserInterfaces } from '../../components/Teaser/shared/helpers';
import withPagePager from '../../../../../shared/decorators/withPagePager';
import withHelmet from '../../../../shared/decorators/withHelmet';
import Breadcrumbs from '../../components/Breadcrumbs';
import StatusPage from '../StatusPage';
import AuthorDetails from './components/AuthorDetails';
import ExpansionPanel from './components/ExpansionPanel';
import Pager, {
  PAGER_TYPE_PAGE_LOADER as pagerType,
} from '../../components/Pager';
import { TeaserLatest } from '../../components/Teaser/components/TeaserLatest';
import {
  ARTICLE_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE,
} from '../../../../../shared/constants/content';
import { ROOT_SCHEMA_TYPE_PERSON } from '../../../../../shared/constants/structuredData';
import { DEFAULT_PUBLICATION, ROUTE_AUTHORS } from '../../constants';
import {
  AUTHOR_PAGE_GRID_PAGE_SIZE,
  AUTHOR_PAGE_SORT_ORDER,
  AUTHOR_PAGE_SORT_TYPE,
} from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/schweizer-illustrierte/ */
import { GET_CONTENT_BY_AUTHOR } from './queries';
import styles from './styles.legacy.css';

const withAuthorContent =
  /* @ts-ignore TODO: TS7006 ->  Parameter 'Component' implicitly has an 'any' type. */


    (Component) =>
    /* @ts-ignore TODO: TS7031 ->  Binding element 'author' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'page' implicitly has an 'any' type. */
    ({ author, page, ...props }) => {
      const { data } = useQuery(GET_CONTENT_BY_AUTHOR, {
        variables: {
          limit: AUTHOR_PAGE_GRID_PAGE_SIZE,
          offset: (page - 1) * AUTHOR_PAGE_GRID_PAGE_SIZE,
          contentTypes: [ARTICLE_CONTENT_TYPE, NATIVE_ADVERTISING_CONTENT_TYPE],
          authorId: author?.aid ? parseInt(author.aid, 10) : null,
          publication: DEFAULT_PUBLICATION,
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
          {...props}
        />
      );
    };

const AuthorPage = authorFactory({
  PAGE_SIZE: AUTHOR_PAGE_GRID_PAGE_SIZE,
  ensureTeaserInterface: ensureTeaserInterfaces,
  Teaser: TeaserLatest,
  StatusPage,
  Breadcrumbs,
  ROUTE_AUTHORS,
  Pager: (props) => <Pager {...props} />,
  pagerType,
  AuthorDetails,
  ExpansionPanel,
  additionalBreadcrumbText: ' - Mitglied der Schweizer-Illustrierte-Redaktion',
  atPublisherSinceTitle: 'Arbeitet für Schweizer-Illustrierte seit:',
  journalisticAgb: {
    path: 'https://www.schweizer-illustrierte.ch/content/in-eigener-sache/so-machen-wir-bei-der-schweizer-illustrierten-journalismus-716808',
    label: 'Journalistische Richtlinien',
  },
  styles: {
    HeaderWrapper: styles.HeaderWrapper,
    BreadcrumbsWrapper: styles.BreadcrumbsWrapper,
    Description: styles.Description,
    ResultsWrapper: styles.ResultsWrapper,
    PagerWrapper: styles.PagerWrapper,
    PageHeading: styles.PageHeading,
    InnerWrapper: styles.InnerWrapper,
    JournalisticAgbWrapper: styles.JournalisticAgbWrapper,
  },
});

export default compose<any>(
  withAuthorContent,
  withPagePager,
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNode: (mapProps) => mapProps.author || null,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'author' implicitly has an 'any' type. */
    getFallbackTitle: ({ author }) => `${author.name} | Schweizer Illustrierte`,
    pageSize: AUTHOR_PAGE_GRID_PAGE_SIZE,
    rootSchemaType: ROOT_SCHEMA_TYPE_PERSON,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodesCount: (mapProps) => mapProps?.contentByAuthor?.count || 0,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodes: (mapProps) => mapProps?.contentByAuthor?.edges || [],
  }),
)(AuthorPage);
