import React, { ComponentType, ReactElement } from 'react';
import classnames from 'classnames';
import { getUserInitials } from '../../../../../shared/helpers/utils';
import Link from '../../../Link';
import AuthorPicture from './components/AuthorPicture';
import { getAlertItemTypeByTypename } from '../../../SubscribeButton/helper';
import {
  TeaserAuthorFactoryOptions,
  TeaserAuthorFactoryOptionsStyles,
  TeaserAuthorFactoryProps,
} from './typings';

export const defaultStyles: TeaserAuthorFactoryOptionsStyles = {
  Wrapper: '',
  Name: '',
  InsideArticleName: '',
  OutsideArticleName: '',
  AuthorAvatar: '',
  Headline: '',
  Grid: '',
  Box: '',
  ShortDescriptionWrapper: '',
  ShortDescription: '',
  Link: '',
  SubscribeButtonWrapper: '',
};

const teaserAuthorFactory = ({
  SubscribeButton,
  styles: appStyles,
}: TeaserAuthorFactoryOptions): ComponentType<TeaserAuthorFactoryProps> => {
  const TeaserAuthor = (props: TeaserAuthorFactoryProps): ReactElement => {
    const {
      author,
      insideArticle,
      withAuthorImage = false,
      readMoreLabel = '',
    } = props;
    const {
      name,
      shortDescription,
      headline,
      imageParagraph,
      hasProfilePage,
      preferredUri,
    } = author;

    const styles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    return (
      <Link
        /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */
        path={
          !insideArticle && hasProfilePage && preferredUri ? preferredUri : null
        }
        className={classnames(styles.Wrapper, {
          /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
          [styles.Grid]: !insideArticle || withAuthorImage,
          /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
          [styles.Box]: insideArticle && !withAuthorImage,
        })}
      >
        {(!insideArticle || withAuthorImage) &&
          (imageParagraph ? (
            <AuthorPicture
              imageParagraph={imageParagraph}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
              name={name}
              className={styles.AuthorAvatar}
            />
          ) : (
            /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
            <div className={styles.Initials}>{getUserInitials(name)}</div>
          ))}

        <div>
          <strong
            className={classnames(styles.Name, {
              /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
              [styles.OutsideArticleName]: !insideArticle,
              /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
              [styles.InsideArticleName]: insideArticle,
            })}
          >
            {name}
          </strong>

          {insideArticle && (
            <span className={styles.ShortDescriptionWrapper}>
              <span className={styles.ShortDescription}>
                {shortDescription}
              </span>
              {hasProfilePage && preferredUri && (
                <Link path={preferredUri} className={styles.Link}>
                  {readMoreLabel || 'Mehr erfahren'}
                </Link>
              )}
            </span>
          )}

          {!insideArticle && headline && (
            <p className={styles.Headline}>{headline}</p>
          )}
        </div>
        {SubscribeButton && (
          <div className={styles.SubscribeButtonWrapper}>
            <SubscribeButton
              id={Number(author.aid)}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
              label={author.name}
              type={getAlertItemTypeByTypename(author.__typename)}
            />
          </div>
        )}
      </Link>
    );
  };
  return TeaserAuthor;
};

export default teaserAuthorFactory;
