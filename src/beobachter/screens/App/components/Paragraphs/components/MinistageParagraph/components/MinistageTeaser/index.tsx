import React, { ReactElement } from 'react';
import classNames from 'classnames';
import Link from '../../../../../../../../../common/components/Link';
import Picture from '../../../../../../../../../common/components/Picture';
import { isInsideColumn } from '../../../../../../../../shared/helpers/isInsideColumn';
import ButtonWithLoading from '../../../../../ButtonWithLoading';
import { STYLE_SCALEW_280 } from '../../../../../../../../../shared/constants/images';
import styles from './styles.legacy.css';
import { MinistageTeaserProps } from './typings';

type MinistageTeaserPropsInner = MinistageTeaserProps;

const MinistageTeaser = (props: MinistageTeaserPropsInner): ReactElement => {
  const relativeOriginPath = props?.ministageTeaser?.image?.relativeOriginPath;
  const imageAlt =
    props?.ministageTeaser?.image?.alt ||
    props?.ministageTeaser?.headline ||
    '';

  return (
    <div
      className={classNames(styles.Wrapper, {
        [styles.WrapperInGuideArticle]: isInsideColumn(props.origin),
      })}
    >
      {relativeOriginPath && (
        <div className={styles.ImageWrapper}>
          <Picture
            relativeOrigin={relativeOriginPath}
            alt={imageAlt}
            className={styles.TeaserImage}
            style_320={STYLE_SCALEW_280}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
            focalPointX={props?.ministageTeaser?.image?.focalPointX}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
            focalPointY={props?.ministageTeaser?.image?.focalPointY}
          />
        </div>
      )}
      <div className={styles.ContentWrapper}>
        <div className={styles.Tagline}>
          {props?.ministageTeaser?.subhead || ''}
        </div>
        <div className={styles.HeadlineWrapper}>
          {props.ministageTeaser.headline || ''}
        </div>
        <div className={styles.BodyTextWrapper}>
          <div
            className={styles.LeadWrapper}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | TrustedHTML'. */
            dangerouslySetInnerHTML={{ __html: props.ministageTeaser.lead }}
          />
          {/* eslint-enable react/no-danger */}

          {props.ministageTeaser.link && props.ministageTeaser.link.path && (
            /* @ts-ignore TODO: TS2322 ->  Type '{ children */
            <Link {...props.ministageTeaser.link}>
              <ButtonWithLoading
                variant="primary"
                size="big"
                addClass={styles.ButtonWrapper}
              >
                {props.ministageTeaser.link.label || ''}
              </ButtonWithLoading>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinistageTeaser;
