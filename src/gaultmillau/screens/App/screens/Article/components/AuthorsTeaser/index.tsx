import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import TeaserAuthor from '../../../../components/Teaser/components/TeaserAuthor';
import { DEFAULT_LANGUAGE } from '../../../../components/Navigation/components/LanguageSwitch';
import {
  PUBLICATION_GM,
  PUBLICATION_GM_FR,
} from '../../../../../../../shared/constants/publications';
import styles from './styles.legacy.css';
import { AuthorsTeaserProps } from './typings';

const AuthorsTeaser = ({ authors }: AuthorsTeaserProps) => {
  const language = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => settingsStateSelector(state).language,
  );

  if (!authors || authors.length <= 0) {
    return null;
  }

  const readMoreLable: any = (
    <FormattedMessage
      id="app.authorTeaser.readMore"
      description="The read more label on the author teaser"
      defaultMessage="Mehr erfahren"
    />
  );
  // En savoir plus

  const publication =
    language === DEFAULT_LANGUAGE ? PUBLICATION_GM : PUBLICATION_GM_FR;

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
            publications.includes(publication),
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
              readMoreLabel={readMoreLable}
            />
          </div>
        ))}
      <div className={styles.Divider} />
    </div>
  );
};

export default AuthorsTeaser;
