import React from 'react';
import classNames from 'classnames';
import CSSPicture from '../../../../../../../common/components/CSSPicture';
import Link from '../../../../../../../common/components/Link';
import {
  STYLE_TEASER_S_480,
  STYLE_TEASER_S_760,
  STYLE_TEASER_S_960,
} from '../../../../../../../shared/constants/images';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'node' implicitly has an 'any' type. */
const TeaserVideo = ({ node, isActive = false }) => (
  <Link
    path={node.preferredUri}
    className={classNames(styles.LinkWrapper, {
      [styles.IsActive]: isActive,
    })}
  >
    <div className={styles.PlayerWrapper}>
      <CSSPicture
        relativeOriginPath={node?.teaserImage?.image?.file?.relativeOriginPath}
        style_320={STYLE_TEASER_S_480}
        style_760={STYLE_TEASER_S_760}
        style_960={STYLE_TEASER_S_960}
      >
        {({ className }) => {
          return <div className={classNames(styles.Image, className)} />;
        }}
      </CSSPicture>
      <span
        className={classNames(styles.Button, {
          [styles.ActiveButton]: isActive,
        })}
      />
    </div>
    <div className={styles.TeaserText}>
      <span
        className={classNames(styles.TeaserShortTitle, {
          [styles.IsActive]: isActive,
        })}
      >
        {node.shortTitle}
      </span>
      <div
        className={classNames(styles.TeaserTitle, {
          [styles.IsActive]: isActive,
        })}
      >
        {node.title}
      </div>
    </div>
  </Link>
);

export default TeaserVideo;
