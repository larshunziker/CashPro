import React, { ComponentType, ReactElement } from 'react';
import classNames from 'classnames';
import Link from '../../../../../../../../../common/components/Link';
import Picture from '../../../../../../../../../common/components/Picture';
import Icon from '../../../../../Icon';
import {
  STYLE_MINISTAGE_L,
  STYLE_MINISTAGE_M,
} from '../../../../../../../../../shared/constants/images';
import {
  TRACKING_CLASS_MINISTAGE_TEASER_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../../../shared/constants/tracking';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import type { MinistageTeaserProps } from './typings';

type MinistageTeaserPropsInner = MinistageTeaserProps;

const MinistageTeaser: ComponentType<MinistageTeaserProps> = (
  props: MinistageTeaserPropsInner,
): ReactElement => {
  return (
    <div
      className={classNames(
        TRACKING_CLASS_PARAGRAPH,
        TRACKING_CLASS_MINISTAGE_TEASER_PARAGRAPH,
        grid.Container,
        styles.OuterContainer,
      )}
      data-testid="ministage-teaser-outer-container"
    >
      <div className={styles.Wrapper}>
        <div className={styles.HeaderWrapper}>
          <div className={styles.HeaderText}>
            {props.ministageTeaser.headline || ''}
          </div>
          {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
          {props.ministageTeaser.image.relativeOriginPath && (
            <Picture
              /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
              relativeOrigin={props.ministageTeaser.image.relativeOriginPath}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
              focalPointX={props?.ministageTeaser?.image?.focalPointX}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
              focalPointY={props?.ministageTeaser?.image?.focalPointY}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
              /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
              alt={props.ministageTeaser.image.alt}
              style_320={STYLE_MINISTAGE_M}
              style_760={STYLE_MINISTAGE_L}
              className={styles.TeaserImage}
              disableWrapperClassName
            />
          )}
        </div>
        <div
          className={classNames(grid.Container, styles.InnerContainer)}
          data-testid="ministage-teaser-inner-container"
        >
          <div className={styles.BodyTextWrapper}>
            <div className={styles.BodyTextHeaderText}>
              {(props.ministageTeaser && props.ministageTeaser.subhead) || ''}
            </div>

            <div className={styles.BodyTextAndCta}>
              {/* eslint-disable react/no-danger */}
              <div
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | TrustedHTML'. */
                dangerouslySetInnerHTML={{ __html: props.ministageTeaser.lead }}
              />

              {props.ministageTeaser.link &&
                props.ministageTeaser.link.path && (
                  <div
                    className={styles.ButtonWrapper}
                    data-testid="ministage-teaser-button-wrapper"
                  >
                    {/* @ts-ignore TODO: TS2322 ->  Type '{ children */}
                    <Link
                      {...props.ministageTeaser.link}
                      className={styles.Button}
                    >
                      <>
                        <span className={styles.ButtonLabel}>
                          {props.ministageTeaser.link.label || ''}
                        </span>
                        <Icon
                          addClass={styles.ButtonArrow}
                          type="IconArrowRight"
                        />
                      </>
                    </Link>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinistageTeaser;
