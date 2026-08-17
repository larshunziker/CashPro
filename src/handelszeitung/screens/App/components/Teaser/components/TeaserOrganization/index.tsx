import React from 'react';
import classNames from 'classnames';
import Link from '../../../../../../../common/components/Link';
import Icon from '../../../Icon/index';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'preferredUri' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'addClass' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'itemIndex' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'title' implicitly has an 'any' type. */
const TeaserOrganization = ({ preferredUri, addClass, itemIndex, title }) => (
  <Link
    path={preferredUri}
    className={classNames('teaser-organization', { addClass: !!addClass })}
  >
    <>
      <span className={styles.Bubble}>{itemIndex + 1}</span>
      <div className={styles.TextWrapper}>
        <p className={styles.Title}>{title || ''}</p>
        <p className={styles.Link}>
          Zu den{' '}
          <span className={styles.Inner}>
            Nachrichten&nbsp;
            <Icon type="IconArrowRight" addClass={styles.Icon} />
          </span>
        </p>
      </div>
    </>
  </Link>
);

export default TeaserOrganization;
