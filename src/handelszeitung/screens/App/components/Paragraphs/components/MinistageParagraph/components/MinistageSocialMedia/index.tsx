import React from 'react';
import classNames from 'classnames';
import MinistageSocialMediaIcon from './components/MinistageSocialMediaIcon';
import {
  TRACKING_CLASS_MINISTAGE_SOCIAL_MEDIA_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../../../shared/constants/tracking';
import { socialIconItems } from './constants';
import sections from '../../../../../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';

// Wrap the original component so we don't need to alter it.
/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const MinistageSocialMediaWrapper = (props) => (
  <MinistageSocialMediaParagraph {...props} />
);

/* @ts-ignore TODO: TS7006 ->  Parameter 'icon' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'key' implicitly has an 'any' type. */
const renderIcons = (icon, key) => (
  <li key={`ministage-social-media-icon-${key}`}>
    <MinistageSocialMediaIcon type={icon?.type} link={icon?.link} />
  </li>
);

const MinistageSocialMediaParagraph = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'ministageSocialMedia' implicitly has an 'any' type. */
  ministageSocialMedia,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'isSplittedPageLayout' implicitly has an 'any' type. */
  isSplittedPageLayout,
}) => {
  if (!ministageSocialMedia) {
    return null;
  }

  return (
    <div
      className={classNames(
        TRACKING_CLASS_PARAGRAPH,
        TRACKING_CLASS_MINISTAGE_SOCIAL_MEDIA_PARAGRAPH,
        sections.Section,
        styles.Wrapper,
        { [styles.IsSplittedPageLayout]: isSplittedPageLayout },
      )}
    >
      <div
        className={classNames(
          {
            [sections.Container]: !isSplittedPageLayout,
            [styles.IsSplittedPageLayout]: isSplittedPageLayout,
          },
          styles.Container,
        )}
      >
        <div
          className={classNames(styles.Content, {
            [styles.IsSplittedPageLayout]: isSplittedPageLayout,
          })}
        >
          {ministageSocialMedia.headline && (
            <div className={styles.Headline}>
              {ministageSocialMedia.headline}
            </div>
          )}
          {ministageSocialMedia.subhead && (
            <p className={styles.Subhead}>{ministageSocialMedia.subhead}</p>
          )}
        </div>
        <ul
          className={classNames(styles.IconWrapper, {
            [styles.IsSplittedPageLayout]: isSplittedPageLayout,
          })}
        >
          {socialIconItems.map(renderIcons)}
        </ul>
      </div>
    </div>
  );
};

export default MinistageSocialMediaWrapper;
