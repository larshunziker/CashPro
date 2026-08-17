import React, { ComponentType } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-body-classname'. '/Users/bhs/code/work/rasch-stack/node_modules/rea */
import BodyClassName from 'react-body-classname';
import classNames from 'classnames';
import pageTemplateFactory from '../PageTemplate/factory';
import Link from '../../components/Link';
import { TEASER_LAYOUT_XS } from '../../../shared/constants/teaser';
import { AUTHOR_PAGE } from './constants';
import grid from '../../assets/styles/grid.legacy.css';
import {
  AuthorFactoryOptions,
  AuthorPageProps,
  PluralizationProps,
} from './typings';

const PageTemplate = pageTemplateFactory({
  styles: {
    Wrapper: '',
    MainContent: classNames(grid.ColXs24, grid.ColMd15, grid.ColXl16),
    AsideContent: classNames(
      grid.ColXs24,
      grid.ColMd8,
      grid.ColXl7,
      grid.ColOffsetMd1,
      grid.ColOffsetXl1,
    ),
  },
});

const AuthorFactory = ({
  PAGE_SIZE,
  ensureTeaserInterface,
  Teaser,
  teaserType = TEASER_LAYOUT_XS,
  StatusPage,
  Breadcrumbs,
  ROUTE_AUTHORS,
  Pager,
  pagerType,
  ExpansionPanel,
  AuthorDetails,
  overviewPageTitle = 'Unsere Redaktion',
  additionalBreadcrumbText = '',
  styles,
  latestNewsTitle = 'Neueste Inhalte',
  inJournalismSinceTitle = 'Im Journalismus seit:',
  atPublisherSinceTitle = 'Arbeitet für Magazin seit:',
  descriptionTitle = 'Bio',
  associationsTitle = 'Verbände',
  awardsTitle = 'Auszeichnungen',
  bookLinksTitle = 'Bücher',
  podcastLinksTitle = 'Podcasts',
  newsletterLinksTitle = 'Newsletter',
  yearsLabel = {
    singular: 'Jahre',
    plural: 'Jahren',
  },
  journalisticAgb,
}: AuthorFactoryOptions) => {
  const AuthorPage: ComponentType<AuthorPageProps> = ({
    ...props
  }: AuthorPageProps) => {
    const { author, page, contentByAuthor, loading } = props;

    if (!author.hasProfilePage) {
      return <StatusPage statusCode={404} />;
    }

    // Show 404 only if past page 1 with no results AND not currently loading
    if (page !== 1 && !contentByAuthor?.edges?.length && !loading) {
      return <StatusPage statusCode={404} />;
    }
    let authorName: JSX.Element | string =
      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
      author.name + additionalBreadcrumbText;

    if (ROUTE_AUTHORS && typeof ROUTE_AUTHORS === 'function') {
      ROUTE_AUTHORS = ROUTE_AUTHORS(props);
    }
    if (overviewPageTitle && typeof overviewPageTitle === 'function') {
      overviewPageTitle = overviewPageTitle(props);
    }

    if (
      inJournalismSinceTitle &&
      typeof inJournalismSinceTitle === 'function'
    ) {
      inJournalismSinceTitle = inJournalismSinceTitle(props);
    }

    if (atPublisherSinceTitle && typeof atPublisherSinceTitle === 'function') {
      atPublisherSinceTitle = atPublisherSinceTitle(props);
    }

    if (descriptionTitle && typeof descriptionTitle === 'function') {
      descriptionTitle = descriptionTitle(props);
    }

    if (associationsTitle && typeof associationsTitle === 'function') {
      associationsTitle = associationsTitle(props);
    }

    if (awardsTitle && typeof awardsTitle === 'function') {
      awardsTitle = awardsTitle(props);
    }

    if (bookLinksTitle && typeof bookLinksTitle === 'function') {
      bookLinksTitle = bookLinksTitle(props);
    }

    if (podcastLinksTitle && typeof podcastLinksTitle === 'function') {
      podcastLinksTitle = podcastLinksTitle(props);
    }

    if (newsletterLinksTitle && typeof newsletterLinksTitle === 'function') {
      newsletterLinksTitle = newsletterLinksTitle(props);
    }

    if (yearsLabel && typeof yearsLabel === 'function') {
      yearsLabel = yearsLabel(props) as PluralizationProps;
    }

    // reassigning because of type error 💩
    yearsLabel = yearsLabel as PluralizationProps;

    if (
      additionalBreadcrumbText &&
      typeof additionalBreadcrumbText === 'function'
    ) {
      authorName = additionalBreadcrumbText(props);
    }

    const inJournalismSinceYears =
      new Date().getFullYear() - Number(author.inJournalismSince);

    const atPublisherSinceYears =
      new Date().getFullYear() - Number(author.atPublisherSince);

    const contentByAuthorItems =
      (contentByAuthor?.edges &&
        Array.isArray(contentByAuthor.edges) &&
        ensureTeaserInterface(contentByAuthor?.edges)) ||
      null;

    return (
      <BodyClassName className="author-detail">
        <div data-testid="authorpage-wrapper" className={styles.AuthorPage}>
          <div className={styles.HeaderWrapper}>
            <div className={grid.Container}>
              <div className={styles.BreadcrumbsWrapper}>
                <Breadcrumbs
                  pageUrl={author.preferredUri}
                  items={{
                    edges: [
                      {
                        node: {
                          label: overviewPageTitle,
                          link: `/${ROUTE_AUTHORS}`,
                        },
                      },
                      {
                        node: {
                          label: authorName,
                        },
                      },
                    ],
                  }}
                  origin={AUTHOR_PAGE}
                />
              </div>
              <AuthorDetails author={author} />
            </div>
          </div>
          <div className={grid.Container}>
            <div className={grid.Row}>
              <div className={classNames(grid.ColXs24, styles.InnerWrapper)}>
                <PageTemplate
                  {...props}
                  /* @ts-ignore TODO: TS2322 ->  Type 'Element' is not assignable to type 'null | undefined'. */
                  asideContent={
                    <>
                      {!!author.description && (
                        <ExpansionPanel
                          isHeaderLinkClickable
                          title={descriptionTitle as string}
                          isOpen
                        >
                          <>
                            <div
                              className={styles.Description}
                              dangerouslySetInnerHTML={{
                                __html: `${author.description}`,
                              }}
                            />
                            {author.inJournalismSince && (
                              <p className={styles.Description}>
                                <strong>
                                  {inJournalismSinceTitle as string}
                                </strong>
                                <br />
                                {inJournalismSinceYears}{' '}
                                {inJournalismSinceYears > 1
                                  ? yearsLabel.plural
                                  : yearsLabel.singular}
                              </p>
                            )}
                            {author.atPublisherSince && (
                              <p className={styles.Description}>
                                <strong>
                                  {atPublisherSinceTitle as string}
                                </strong>
                                <br />
                                {atPublisherSinceYears}{' '}
                                {atPublisherSinceYears > 1
                                  ? (yearsLabel.plural as string)
                                  : (yearsLabel.singular as string)}
                              </p>
                            )}
                          </>
                        </ExpansionPanel>
                      )}
                      {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
                      {author.associations?.length > 0 && (
                        <ExpansionPanel
                          isHeaderLinkClickable
                          title={associationsTitle as string}
                        >
                          <div className={styles.Description}>
                            <ul>
                              {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
                              {author.associations.map((item, index) => (
                                <li key={`association-${index}`}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </ExpansionPanel>
                      )}
                      {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
                      {author.awards?.length > 0 && (
                        <ExpansionPanel
                          isHeaderLinkClickable
                          title={awardsTitle as string}
                        >
                          <div className={styles.Description}>
                            <ul>
                              {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
                              {author.awards.map((item, index) => (
                                <li key={`award-${index}`}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </ExpansionPanel>
                      )}
                      {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
                      {author.bookLinks?.length > 0 && (
                        <ExpansionPanel
                          isHeaderLinkClickable
                          title={bookLinksTitle as string}
                        >
                          <div className={styles.Description}>
                            <ul>
                              {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
                              {author.bookLinks.map((item, index) => (
                                <li key={`book-${index}`}>
                                  <Link
                                    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                                    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
                                    path={item.path}
                                    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                                    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
                                    label={item.label}
                                  ></Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </ExpansionPanel>
                      )}
                      {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
                      {author.podcastLinks?.length > 0 && (
                        <ExpansionPanel
                          isHeaderLinkClickable
                          title={podcastLinksTitle as string}
                        >
                          <div className={styles.Description}>
                            <ul>
                              {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
                              {author.podcastLinks.map((item, index) => (
                                <li key={`podcast-${index}`}>
                                  <Link
                                    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                                    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
                                    path={item.path}
                                    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                                    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
                                    label={item.label}
                                  ></Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </ExpansionPanel>
                      )}
                      {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
                      {author.newsletterLinks?.length > 0 && (
                        <ExpansionPanel
                          isHeaderLinkClickable
                          title={newsletterLinksTitle as string}
                        >
                          <div className={styles.Description}>
                            <ul>
                              {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
                              {author.newsletterLinks.map((item, index) => (
                                <li key={`podcast-${index}`}>
                                  <Link
                                    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                                    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
                                    path={item.path}
                                    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                                    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
                                    label={item.label}
                                  ></Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </ExpansionPanel>
                      )}

                      {journalisticAgb && (
                        <div className={styles.JournalisticAgbWrapper}>
                          <Link
                            path={journalisticAgb.path}
                            label={journalisticAgb.label}
                          ></Link>
                        </div>
                      )}
                    </>
                  }
                >
                  <>
                    {contentByAuthor && (
                      <>
                        <div
                          data-testid="author-result-wrapper"
                          className={styles.ResultsWrapper}
                        >
                          <h2 id="page" className={styles.PageHeading}>
                            {latestNewsTitle as string}
                          </h2>
                          {contentByAuthorItems &&
                            /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
                            contentByAuthorItems.map((item) => (
                              <Teaser
                                key={`author-list-item-${item.id}`}
                                component={teaserType}
                                {...item}
                              />
                            ))}
                        </div>
                        <div className={styles.PagerWrapper}>
                          <Pager
                            component={pagerType}
                            currentPage={page}
                            itemsCount={contentByAuthor?.count}
                            itemsPerPage={PAGE_SIZE}
                            anchorScrollId="page"
                          />
                        </div>
                      </>
                    )}
                  </>
                </PageTemplate>
              </div>
            </div>
          </div>
        </div>
      </BodyClassName>
    );
  };

  return AuthorPage;
};

export default AuthorFactory;
