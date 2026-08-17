import React from 'react';
import TeaserAuthor from '../../../../components/Teaser/components/TeaserAuthor';
import { PUBLICATION_CASH } from '../../../../../../../shared/constants/publications';
import styles from './styles.legacy.css';
import { AuthorsTeaserProps } from './typings';

const AuthorsTeaser = ({ authors }: AuthorsTeaserProps) => {
  if (!authors || authors.length <= 0) {
    return null;
  }
  return (
    <div className={styles.AuthorsWrapper}>
      {authors
        .filter(
          /* @ts-ignore TODO: TS2339 ->  Property 'hasProfilePage' does not exist on type 'Maybe<Author> | undefined'. */
          /* @ts-ignore TODO: TS2339 ->  Property 'preferredUri' does not exist on type 'Maybe<Author> | undefined'. */
          /* @ts-ignore TODO: TS2339 ->  Property 'publications' does not exist on type 'Maybe<Author> | undefined'. */
          ({ node: { hasProfilePage, preferredUri, publications } }) =>
            hasProfilePage &&
            preferredUri &&
            publications.includes(PUBLICATION_CASH),
        )
        .map(({ node: author }) => (
          /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
          <div key={author.id}>
            <div className={styles.Divider} />
            <TeaserAuthor
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<Author> | undefined' is not assignable to type 'TemporaryAuthor'. */
              author={author}
              insideArticle
              withAuthorImage
              readMoreLabel={'Mehr erfahren'}
            />
          </div>
        ))}
      <div className={styles.Divider} />
    </div>
  );
};

export default AuthorsTeaser;
