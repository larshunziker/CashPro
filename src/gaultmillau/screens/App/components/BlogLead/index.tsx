import React, { ComponentType } from 'react';
import classNames from 'classnames';
import {
  getImageAltTag,
  truncateByWord,
} from '../../../../../shared/helpers/utils';
import Link from '../../../../../common/components/Link';
import Picture from '../../../../../common/components/Picture';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import Icon from '../../components/Icon';
import {
  STYLE_HEADER_16_9,
  STYLE_HEADER_16_9_LARGE,
  STYLE_HEADER_16_9_SMALL,
} from '../../../../../shared/constants/images';
import {
  TEASER_LEAD_LENGTH,
  TEASER_TITLE_LENGTH,
} from '../../components/Teaser/constants';
import { getStyleByType } from '../Teaser/shared/constants';
import gaultMillauIcons from '../../assets/styles/gaultMillau.legacy.css';
import typography from '../../assets/styles/typography_old.legacy.css';
import teaserDefaultStyles from '../Teaser/shared/defaultStyles.legacy.css';
import styles from './styles.legacy.css';
import { LeadProps } from './typings';

type BlogLeadsPropsInner = LeadProps & {};

const BlogLead: ComponentType<BlogLeadsPropsInner> = ({ node }) => {
  if (!node?.teaserImage?.image?.file?.relativeOriginPath) {
    return null;
  }

  return (
    <TestFragment data-testid="blog-lead-wrapper">
      <Link
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        path={node.preferredUri}
        className={classNames('hero-image', styles.Wrapper)}
      >
        <>
          <Picture
            relativeOrigin={node.teaserImage?.image?.file?.relativeOriginPath}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
            focalPointX={node?.teaserImage?.image?.file?.focalPointX}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
            focalPointY={node?.teaserImage?.image?.file?.focalPointY}
            className={styles.Img}
            alt={getImageAltTag(node)}
            style_320={STYLE_HEADER_16_9_SMALL}
            style_760={STYLE_HEADER_16_9}
            style_960={STYLE_HEADER_16_9_LARGE}
            downloadPriority="high"
          />
          <div
            className={classNames(
              teaserDefaultStyles.Border,
              /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly Border */
              teaserDefaultStyles[getStyleByType(node as any) + 'Border'],
            )}
          />
          <div className={styles.Caption}>
            <Icon
              type="IconPlay"
              iconsOverride={gaultMillauIcons}
              addClass={classNames(styles.PlayIcon, {
                [styles.Visible]: node?.hasVideo || false,
              })}
            />
            <h1 className={classNames(typography.H2White, styles.Title)}>
              {truncateByWord(node.title || '', TEASER_TITLE_LENGTH)}
            </h1>
            {(node.lead || (node as Organization).description) && (
              <p className={styles.Lead}>
                {truncateByWord(
                  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
                  node.lead || (node as Organization).description,
                  TEASER_LEAD_LENGTH,
                )}
              </p>
            )}
          </div>
        </>
      </Link>
    </TestFragment>
  );
};

export default BlogLead;
