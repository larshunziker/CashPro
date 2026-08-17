/**
 * @file   teaser sponsor
 * @author Thomas Rubattel <thomas.rubattel@ringieraxelspringer.ch>
 * @date   2017-06-14
 *
 */

import React from 'react';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import classNames from 'classnames';
import { truncateByWord } from '../../../../../../../shared/helpers/utils';
import Link from '../../../../../../../common/components/Link';
import Picture from '../../../../../../../common/components/Picture';
import { STYLE_SCALEH_120 } from '../../../../../../../shared/constants/images';
import { SPONSORED_BY_TYPE } from '../../../SponsoredBy/constants';
import {
  TEASER_CTA_CHANNEL,
  TEASER_IMAGE_IDENTIFIER,
  TEASER_SPONSOR_IDENTIFIER,
  TEASER_TITLE_LENGTH,
} from '../../constants';
import styles from './styles.legacy.css';

const TeaserSponsor = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'preferredUri' implicitly has an 'any' type. */
  preferredUri,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'teaserImage' implicitly has an 'any' type. */
  teaserImage,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'addClass' implicitly has an 'any' type. */
  addClass,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'origin' implicitly has an 'any' type. */
  origin,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'title' implicitly has an 'any' type. */
  title,
}) => (
  <div
    className={classNames(TEASER_SPONSOR_IDENTIFIER, styles.Wrapper, {
      addClass: !!addClass,
    })}
  >
    <Link path={teaserImage?.link || preferredUri} rel="sponsored">
      <div className={styles.ImageWrapper}>
        <Picture
          relativeOrigin={teaserImage?.image?.file?.relativeOriginPath}
          focalPointX={teaserImage?.image?.file?.focalPointX}
          focalPointY={teaserImage?.image?.file?.focalPointY}
          style_320={STYLE_SCALEH_120}
          className={classNames(TEASER_IMAGE_IDENTIFIER, styles.Image, {
            [styles.SponsorImage]: origin === SPONSORED_BY_TYPE,
          })}
          alt={teaserImage?.image?.file?.alt || ''}
          title={title || ''}
        />
      </div>
    </Link>
    {origin !== SPONSORED_BY_TYPE && (
      <div className={styles.TeaserBody}>
        <h2 className={styles.TeaserTitleWrapper}>
          <span className={styles.TeaserTitle}>
            {truncateByWord(title || '', TEASER_TITLE_LENGTH)}
          </span>
        </h2>
        <Link path={preferredUri}>
          <div className={styles.Label}>{TEASER_CTA_CHANNEL}</div>
        </Link>
      </div>
    )}
  </div>
);

const withUpdatePolicy = shouldUpdate<any>(
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'nextProps' implicitly has an 'any' type. */
  (props, nextProps) => props.title !== nextProps.title,
);

export default compose<any, any>(withUpdatePolicy)(TeaserSponsor);
