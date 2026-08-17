import React, { ReactElement } from 'react';
import classNames from 'classnames';
import Link from '../../../../../common/components/Link';
import Picture from '../../../../../common/components/Picture';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import { getFormatClasses } from '../../screens/Article/components/ArticleHero/components/ImageHero';
import { STYLE_TEASER_1_1 } from '../../../../../shared/constants/images';
import styles from './styles.legacy.css';
import { BloggerProfileBoxComponent, BloggerProfileBoxProps } from './typings';

export type BloggerProfileBoxPropsInner = BloggerProfileBoxProps;

const BloggerProfileBox: BloggerProfileBoxComponent = ({
  bloggerProfile,
  blogUri,
  format,
}: BloggerProfileBoxPropsInner): ReactElement | null => {
  if (!bloggerProfile || !bloggerProfile.name) {
    return null;
  }

  const imagePath =
    bloggerProfile.imageParagraph?.image?.file?.relativeOriginPath || '';
  const focalPointX =
    bloggerProfile?.imageParagraph?.image?.file?.focalPointX || null;
  const focalPointY =
    bloggerProfile?.imageParagraph?.image?.file?.focalPointY || null;
  const imageAlt = bloggerProfile.imageParagraph?.image?.file?.alt || '';

  return (
    <div
      data-testid="blogger-profile-box-wrapper"
      className={classNames(styles.Wrapper, getFormatClasses(format))}
    >
      <Link
        className={classNames(styles.LinkWrapper, {
          [styles.NoImage]: !imagePath,
        })}
        path={blogUri}
      >
        <>
          {imagePath && (
            <TestFragment data-testid="blogger-profile-box-image">
              <Picture
                relativeOrigin={imagePath}
                /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
                focalPointX={focalPointX}
                /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
                focalPointY={focalPointY}
                alt={imageAlt}
                className={styles.Image}
                disableWrapperClassName
                style_320={STYLE_TEASER_1_1}
              />
            </TestFragment>
          )}

          <div className={styles.NameWrapper}>
            <div data-testid="blogger-profile-box-name" className={styles.Name}>
              {bloggerProfile.name}
            </div>{' '}
            {bloggerProfile.description && (
              <div
                data-testid="blogger-profile-box-description"
                className={styles.Description}
                dangerouslySetInnerHTML={{ __html: bloggerProfile.description }}
              />
            )}
          </div>
        </>
      </Link>
    </div>
  );
};

export default BloggerProfileBox;
