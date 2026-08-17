import React from 'react';
import Link from '../../../../../../../common/components/Link';
import styles from './styles.legacy.css';

const AuthorBox = ({ author }: { author: Author }) => {
  const { name, hasProfilePage, preferredUri, shortDescription } = author;

  return (
    <div className={styles.Box}>
      <strong className={styles.Name}>{name}</strong>

      <span className={styles.ShortDescriptionWrapper}>
        <span className={styles.ShortDescription}>{shortDescription}</span>
        {hasProfilePage && preferredUri && (
          <Link path={preferredUri} className={styles.Link}>
            Mehr erfahren
          </Link>
        )}
      </span>
    </div>
  );
};

export default AuthorBox;
