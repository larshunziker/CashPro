/* istanbul ignore file */
import React from 'react';
import { compose } from 'redux';
import { useQuery } from '@apollo/client';
import authorFactory from '../../../../../common/screens/Author/factory';
import { ensureTeaserInterface } from '../../components/Teaser/shared/helpers';
import withPagePager from '../../../../../shared/decorators/withPagePager';
import withHelmet from '../../../../shared/decorators/withHelmet';
import Breadcrumbs from '../../components/Breadcrumbs';
import Teaser from '../../components/Teaser';
import StatusPage from '../StatusPage';
import AuthorDetails from './components/AuthorDetails';
import ExpansionPanel from './components/ExpansionPanel';
import Pager, {
  PAGER_TYPE_PAGE_LOADER as pagerType,
} from '../../components/Pager';
import {
  ARTICLE_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE,
} from '../../../../../shared/constants/content';
import { ROOT_SCHEMA_TYPE_PERSON } from '../../../../../shared/constants/structuredData';
import { TEASER_LAYOUT_HERO_A } from '../../../../../shared/constants/teaser';
import {
  PUBLICATION_ID_DE,
  PUBLICATION_ID_FR,
  ROUTE_AUTHORS,
  ROUTE_AUTHORS_FR,
} from '../../constants';
import {
  AUTHOR_PAGE_GRID_PAGE_SIZE,
  AUTHOR_PAGE_SORT_ORDER,
  AUTHOR_PAGE_SORT_TYPE,
} from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/screens/App */
import { GET_CONTENT_BY_AUTHOR } from './queries';
import styles from './styles.legacy.css';

const withAuthorContent =
  /* @ts-ignore TODO: TS7006 ->  Parameter 'Component' implicitly has an 'any' type. */


    (Component) =>
    /* @ts-ignore TODO: TS7031 ->  Binding element 'author' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'page' implicitly has an 'any' type. */
    ({ author, page, ...props }) => {
      const { language } = props;
      const { data } = useQuery(GET_CONTENT_BY_AUTHOR, {
        variables: {
          limit: AUTHOR_PAGE_GRID_PAGE_SIZE,
          offset: (page - 1) * AUTHOR_PAGE_GRID_PAGE_SIZE,
          contentTypes: [ARTICLE_CONTENT_TYPE, NATIVE_ADVERTISING_CONTENT_TYPE],
          authorId: author?.aid ? parseInt(author.aid, 10) : null,
          publication:
            language === 'fr' ? PUBLICATION_ID_FR : PUBLICATION_ID_DE,
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
  ensureTeaserInterface,
  Teaser,
  teaserType: TEASER_LAYOUT_HERO_A,
  StatusPage,
  Breadcrumbs,
  ROUTE_AUTHORS: ({ language }: any) => {
    if (language === 'fr') {
      return ROUTE_AUTHORS_FR;
    }
    return ROUTE_AUTHORS;
  },
  Pager,
  pagerType,
  AuthorDetails,
  ExpansionPanel,
  latestNewsTitle: 'Derniers contenus',
  overviewPageTitle: ({ language }: any) => {
    if (language === 'fr') {
      return 'Nos Redacteurs';
    }
    return 'Unsere Redaktion';
  },
  additionalBreadcrumbText: ({ language, author }: any) => {
    if (language === 'fr') {
      return `${author.name} - Membre de l'équipe éditoriale Gault&Millau`;
    }
    return `${author.name}${' - Mitglied der Gault&Millau-Redaktion'}`;
  },
  inJournalismSinceTitle: ({ language }: any) => {
    if (language === 'fr') {
      return `Journaliste depuis:`;
    }
    return `Im Journalismus seit:`;
  },
  atPublisherSinceTitle: ({ language }: any) => {
    if (language === 'fr') {
      return `Travaille pour Gault&Millau depuis:`;
    }
    return `Bei Gault&Millau seit:`;
  },
  descriptionTitle: ({ language }: any) => {
    if (language === 'fr') {
      return `Biographie`;
    }
    return `Bio`;
  },
  associationsTitle: ({ language }: any) => {
    if (language === 'fr') {
      return `Associations`;
    }
    return `Verbände`;
  },
  awardsTitle: ({ language }: any) => {
    if (language === 'fr') {
      return `Récompenses`;
    }
    return `Auszeichnungen`;
  },
  bookLinksTitle: ({ language }: any) => {
    if (language === 'fr') {
      return `Livres`;
    }
    return `Bücher`;
  },
  podcastLinksTitle: ({ language }: any) => {
    if (language === 'fr') {
      return `Podcasts`;
    }
    return `Podcasts`;
  },
  newsletterLinksTitle: ({ language }: any) => {
    if (language === 'fr') {
      return `Newsletters`;
    }
    return `Newsletter`;
  },
  yearsLabel: ({ language }: any) => {
    if (language === 'fr') {
      return {
        singular: 'an',
        plural: 'ans',
      };
    }
    return {
      singular: 'Jahre',
      plural: 'Jahren',
    };
  },
  styles: {
    HeaderWrapper: styles.HeaderWrapper,
    BreadcrumbsWrapper: styles.BreadcrumbsWrapper,
    Description: styles.Description,
    ResultsWrapper: styles.ResultsWrapper,
    PagerWrapper: styles.PagerWrapper,
    PageHeading: styles.PageHeading,
    InnerWrapper: styles.InnerWrapper,
  },
});

export default compose<any>(
  withAuthorContent,
  withPagePager,
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNode: (mapProps) => mapProps.author || null,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'author' implicitly has an 'any' type. */
    getFallbackTitle: ({ author }) => `${author.name} | Gault&Millau – Channel`,
    pageSize: AUTHOR_PAGE_GRID_PAGE_SIZE,
    rootSchemaType: ROOT_SCHEMA_TYPE_PERSON,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodesCount: (mapProps) => mapProps?.contentByAuthor?.count || 0,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodes: (mapProps) => mapProps?.contentByAuthor?.edges || [],
  }),
)(AuthorPage);
