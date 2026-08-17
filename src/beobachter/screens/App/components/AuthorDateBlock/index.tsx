import React, { ReactElement } from 'react';
import classNames from 'classnames';
import {
  DATE_FORMAT_MONTHNAME_FULL,
  getFormattedElapsedDate,
} from '../../../../../shared/helpers/dateTimeElapsed';
import Link from '../../../../../common/components/Link';
import Picture from '../../../../../common/components/Picture';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import { ARTICLE_TYPE_RATGEBER } from '../../../../../shared/constants/content';
import { STYLE_1X1_140 } from '../../../../../shared/constants/images';
import {
  CONTENT_TYPE_LABEL_NONE,
  CONTENT_TYPE_LABEL_NOT_UPDATABLE,
  CONTENT_TYPE_LABEL_OPEN,
} from '../../screens/Article/constants';
import styles from './styles.legacy.css';
import type {
  AuthorDateBlockProps,
  AuthorProps,
  AuthorsImagesProps,
  AuthorsProps,
  CreateDateProps,
  ModifingyAuthorProps,
  ModifingyAuthorsProps,
} from './typings';

type SourceProps = {
  source: string | null;
  addClass?: string;
};

export const Source = ({
  source,
  addClass,
}: SourceProps): ReactElement | null =>
  (source && (
    <div
      /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
      className={classNames({ [addClass]: !!addClass })}
    >{`Quelle: ${source}`}</div>
  )) ||
  null;

const CreateDate = ({
  publicationDate,
  changeDate,
  createDate,
  isAuthorVisible = false,
  isModificationDateVisible,
}: CreateDateProps): ReactElement | null => {
  return (
    <span data-testid="dates-wrapper" className={styles.Dates}>
      {(isAuthorVisible && <br />) || null}
      <span
        className={styles.PublicationDate}
        data-testid="publication-date-wrapper"
      >
        <span data-testid="publication-date-label">Veröffentlicht&nbsp;</span>
        {getFormattedElapsedDate({
          createDate: publicationDate || createDate,
          dateFormat: DATE_FORMAT_MONTHNAME_FULL,
        })}
      </span>
      {isModificationDateVisible ? ', ' : null}
      {isModificationDateVisible ? (
        <>
          {(isAuthorVisible && <br />) || null}

          <span data-testid="modification-date-wrapper">
            <span data-testid="modification-date-label">
              aktualisiert&nbsp;
            </span>
            {getFormattedElapsedDate({
              changeDate: changeDate,
              dateFormat: DATE_FORMAT_MONTHNAME_FULL,
            })}
          </span>
        </>
      ) : null}
    </span>
  );
};

// exported because whole component shouldn't be used in NativeAdvertising
export const Authors = ({
  authors,
  addClass = '',
  addClassItem = '',
}: AuthorsProps): ReactElement => (
  <TestFragment data-testid="author-container">
    {authors &&
      authors.map(
        (item: AuthorEdge, index: number): ReactElement => (
          <Author
            item={item}
            index={index}
            isFirst={index === 0}
            isLast={index === authors.length - 1}
            addClass={addClass}
            addClassItem={addClassItem}
            key={`authors-${index}`}
          />
        ),
      )}
  </TestFragment>
);

const Author = ({
  item,
  index,
  isFirst,
  isLast,
  addClass,
  addClassItem,
}: AuthorProps) => {
  if (!item.node || !item.node.name) {
    return null;
  }

  const hasProfilePage = item.node?.hasProfilePage && item.node?.preferredUri;

  return (
    <span key={`author-${item.node.id}-${index}`} className={addClass}>
      {!isFirst && !isLast && <>,&nbsp;</>}
      {isLast && !isFirst && <>&nbsp;und&nbsp;</>}
      <Link
        className={classNames(addClassItem, {
          [styles.ActiveLink]: hasProfilePage,
          [styles.InActiveLink]: !hasProfilePage,
        })}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        path={hasProfilePage ? item.node.preferredUri : null}
      >
        <span itemProp="author">{item.node?.name}</span>
      </Link>
    </span>
  );
};

const ModifyingAuthors = ({
  authors,
  addClass = '',
  addClassItem = '',
}: ModifingyAuthorsProps): ReactElement => (
  <TestFragment data-testid="modifying-author-container">
    {authors &&
      authors.map(
        (item: AuthorEdge, index: number): ReactElement => (
          <ModifyingAuthor
            item={item}
            index={index}
            isFirst={index === 0}
            isLast={index === authors.length - 1}
            addClass={addClass}
            addClassItem={addClassItem}
            key={`modifying-authors-${index}`}
          />
        ),
      )}
  </TestFragment>
);

const ModifyingAuthor = ({
  item,
  index,
  isFirst,
  isLast,
  addClass,
  addClassItem,
}: ModifingyAuthorProps): ReactElement => {
  const hasProfilePage = item.node?.hasProfilePage && item.node?.preferredUri;

  return (
    <span key={`modifying-author-${index}`} className={addClass}>
      {isFirst && ' durch '}
      {!isFirst && !isLast && ', '}
      {isLast && !isFirst && ' und '}

      <Link
        className={classNames(addClassItem, {
          [styles.ActiveLink]: hasProfilePage,
          [styles.InActiveLink]: !hasProfilePage,
        })}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
        path={hasProfilePage ? item.node.preferredUri : null}
      >
        <span itemProp="author">{item.node?.name}</span>
      </Link>
    </span>
  );
};

const AuthorsImages = ({ authors }: AuthorsImagesProps) => (
  <>
    {authors.map((author, index) => {
      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
      const imageFile = author.node.imageParagraph.image.file || null;
      /* @ts-ignore TODO: TS2339 ->  Property 'alt' does not exist on type 'ImageFile | null'. */
      /* @ts-ignore TODO: TS2339 ->  Property 'relativeOriginPath' does not exist on type 'ImageFile | null'. */
      const { alt = '', relativeOriginPath = '' } = imageFile;
      const focalPointX =
        /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
        author.node.imageParagraph.image.file.focalPointX || null;
      const focalPointY =
        /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
        author.node.imageParagraph.image.file.focalPointY || null;
      const isLast = index === authors.length - 1;

      if (!relativeOriginPath) {
        return null;
      }

      const hasProfilePage =
        /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
        author.node.hasProfilePage && author.node.preferredUri;

      return (
        <Link
          /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
          key={author.node.id}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
          /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
          path={hasProfilePage ? author.node.preferredUri : null}
        >
          <Picture
            /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
            key={`author-image-${author.node.id || index}`}
            relativeOrigin={relativeOriginPath}
            alt={alt}
            className={classNames(styles.AuthorAvatar, {
              [styles.AuthorAvatarLast]: isLast,
            })}
            style_320={STYLE_1X1_140}
            /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
            focalPointX={focalPointX}
            /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
            focalPointY={focalPointY}
          />
        </Link>
      );
    })}
  </>
);

export const AuthorDateBlock = ({
  article,
  hasContainer,
  isAlwaysLeftAligned,
  addClass,
}: AuthorDateBlockProps): ReactElement | null => {
  if (!article) {
    return null;
  }

  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  const hasAuthors = article.authors?.edges?.length > 0;
  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  const hasMoreThanTwoAuthors = article.authors?.edges?.length > 2;

  const authorsWithImages =
    hasAuthors && !hasMoreThanTwoAuthors
      ? /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
        /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
        article.authors.edges
          .filter(
            (author) =>
              /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
              !!author.node?.imageParagraph?.image?.file?.relativeOriginPath,
          )
          .slice(0, 2)
      : [];
  const showAuthorsImages = authorsWithImages.length > 0;
  const isModificationDateVisible: boolean =
    !!article.showUpdated &&
    !!article.changeDate &&
    [
      CONTENT_TYPE_LABEL_OPEN,
      CONTENT_TYPE_LABEL_NOT_UPDATABLE,
      CONTENT_TYPE_LABEL_NONE,
      // @ts-ignore
    ].includes(article.contentTypeLabel) &&
    article.changeDate > (article.publicationDate || article.createDate || 0);

  return (
    <div
      data-testid="main-container"
      className={classNames(styles.AuthorWrapper, {
        [styles.AuthorWrapperMargin]:
          !hasContainer && article.subtypeValue !== ARTICLE_TYPE_RATGEBER,
        [styles.LeftAligned]: isAlwaysLeftAligned || showAuthorsImages,
        /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
        [addClass]: !!addClass,
      })}
    >
      {/* @ts-ignore TODO: TS2322 ->  Type 'Maybe<AuthorEdge>[]' is not assignable to type 'AuthorEdge[]'. */}
      {showAuthorsImages && <AuthorsImages authors={authorsWithImages} />}

      <div>
        {hasAuthors && (
          <Authors
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<Maybe<AuthorEdge>[]> | undefined' is not assignable to type 'AuthorEdge[]'. */
            /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
            authors={article.authors.edges}
            addClass={styles.Author}
            addClassItem={styles.AuthorLink}
          />
        )}

        <CreateDate
          /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
          publicationDate={article.publicationDate}
          /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
          createDate={article.createDate}
          /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
          changeDate={article.changeDate}
          isAuthorVisible={hasAuthors}
          isModificationDateVisible={isModificationDateVisible}
        />

        {isModificationDateVisible &&
          !!article.modifyingAuthors?.edges?.length &&
          article.modifyingAuthors?.edges?.length > 0 && (
            <ModifyingAuthors
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<Maybe<AuthorEdge>[]> | undefined' is not assignable to type 'AuthorEdge[]'. */
              /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
              authors={article.modifyingAuthors.edges}
              addClass={styles.ModifyingAuthor}
              addClassItem={styles.ModifyingAuthorLink}
            />
          )}

        {article.source && (
          <Source
            source={article.source}
            addClass={classNames(styles.Source, {
              [styles.LeftAligned]: isAlwaysLeftAligned || showAuthorsImages,
            })}
          />
        )}
      </div>
    </div>
  );
};

export default AuthorDateBlock;
