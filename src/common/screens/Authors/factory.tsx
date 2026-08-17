import React from 'react';
import classNames from 'classnames';
import TestFragment from '../../../shared/tests/components/TestFragment';
import { AUTHOR_PAGE } from '../Author/constants';
import grid from '../../assets/styles/grid.legacy.css';
import { AuthorsPageFactoryOptions, AuthorsPageProps } from './typings';

const AuthorsPageFactory = ({
  styles,
  Breadcrumbs,
  StatusPage,
  TeaserAuthor,
}: AuthorsPageFactoryOptions) => {
  const AuthorsPage = ({ data, loading }: AuthorsPageProps) => {
    if (loading) {
      return null;
    }

    const routeObject =
      (data?.environment?.routeByPath?.object as Page) || null;

    if (!routeObject) {
      return (
        <TestFragment data-testid="notfound-wrapper">
          <StatusPage statusCode={404} />
        </TestFragment>
      );
    }

    const authors =
      data?.environment?.authors?.edges?.filter(
        /* @ts-ignore TODO: TS2339 ->  Property 'node' does not exist on type 'Maybe<AuthorEdge>'. */
        ({ node: { hasProfilePage } }) => hasProfilePage,
      ) || null;

    return (
      <div data-testid="authorspage-wrapper" className={styles.AuthorsPage}>
        <div className={styles.HeaderWrapper}>
          <div className={grid.Container}>
            <Breadcrumbs
              pageUrl={data?.environment?.routeByPath?.preferred}
              items={{
                edges: [
                  {
                    node: {
                      label: routeObject.seoTitle || routeObject.title,
                    },
                  },
                ],
              }}
              origin={AUTHOR_PAGE}
            />
            {routeObject?.shortTitle && (
              <div
                className={styles.ShortTitle}
                data-testid="authors-page-short-title"
              >
                {routeObject?.shortTitle}
              </div>
            )}
            {routeObject?.title && (
              <h1 className={styles.Title} data-testid="authors-page-title">
                {routeObject.title}
              </h1>
            )}
            {routeObject?.lead && (
              <p className={styles.Lead}>{routeObject.lead || ''}</p>
            )}
          </div>
        </div>

        {authors && authors.length > 0 && (
          <div className={classNames(grid.Container, styles.AuthorsWrapper)}>
            <div className={grid.Row}>
              <div className={styles.AuthorWrapper || grid.Col24}>
                {/* @ts-ignore TODO: TS2339 ->  Property 'node' does not exist on type 'Maybe<AuthorEdge>'. */}
                {authors.map(({ node: author }) => (
                  <div key={author.id}>
                    <div className={styles.Divider} />
                    <TeaserAuthor author={author} />
                  </div>
                ))}
                <div className={styles.Divider} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return AuthorsPage;
};

export default AuthorsPageFactory;
