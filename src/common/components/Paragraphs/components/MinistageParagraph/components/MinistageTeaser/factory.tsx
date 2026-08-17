import React, { ComponentType, ReactElement } from 'react';
import classNames from 'classnames';
import handleWysiwygLink from '../../../../../../../shared/helpers/handleWysiwygLink';
import Link from '../../../../../Link';
import Picture from '../../../../../Picture';
import { useStableNavigate } from '../../../../../../../shared/hooks/useStableNavigateContext';
import {
  TRACKING_CLASS_MINISTAGE_TEASER_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../shared/constants/tracking';

export type MinistageTeaserComponent<T = {}> = ComponentType<T>;

export type MinistageTeaserProps = {
  ministageTeaser: MinistageTeaser;
  useFullwidthBackground?: boolean;
  origin?: string;
  isSplittedPageLayout?: boolean;
};

export type GetStylesByProps<T> = (
  props: T,
) => MinistageTeaserFactoryOptionsStyles;

export type GetImageStylesByProps<T> = (props: T) => ImageStylesObject;

export type MinistageTeaserFactoryOptionsStyles = {
  Wrapper: string;
  Container: string;
  ShortTitle: string;
  Headline: string;
  Lead: string;
  LinkButton?: string;
  ContentWrapper: string;
  ImageWrapper: string;
  TeaserImage: string;
};

type MinistageTeaserFactoryOptions<T = {}> = {
  imageStyles: GetImageStylesByProps<T> | ImageStylesObject;
  styles: GetStylesByProps<T> | MinistageTeaserFactoryOptionsStyles;
  Button?: (props: ButtonProps) => ReactElement;
};

type ButtonProps = {
  clickHandler: () => void;
  text: string;
  isLoading: boolean;
};

const defaultStyles: MinistageTeaserFactoryOptionsStyles = {
  Wrapper: '',
  Container: '',
  ShortTitle: '',
  Headline: '',
  Lead: '',
  LinkButton: '',
  ContentWrapper: '',
  ImageWrapper: '',
  TeaserImage: '',
};

const ministageTeaserFactory = ({
  imageStyles: appImageStyles,
  styles: appStyles,
  Button: ButtonWithLoading,
}: MinistageTeaserFactoryOptions) => {
  const MinistageTeaser = (props: MinistageTeaserProps) => {
    const navigate = useStableNavigate();
    const { ministageTeaser } = props;
    if (
      !ministageTeaser ||
      (ministageTeaser &&
        !ministageTeaser.subhead &&
        !ministageTeaser.headline &&
        !ministageTeaser.lead &&
        !ministageTeaser.link &&
        !ministageTeaser.image)
    ) {
      return null;
    }

    const styles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    const imageStyles =
      (typeof appImageStyles === 'function' && appImageStyles(props)) ||
      (typeof appImageStyles === 'object' && appImageStyles) ||
      null;

    const relativeOriginPath = ministageTeaser?.image?.relativeOriginPath || '';
    const focalPointX = ministageTeaser?.image?.focalPointX;
    const focalPointY = ministageTeaser?.image?.focalPointY;

    const imageAlt = ministageTeaser?.image?.alt || '';

    const button = ButtonWithLoading && (
      <ButtonWithLoading
        clickHandler={() => {
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string | MouseEvent'. */
          handleWysiwygLink(ministageTeaser?.link?.path, navigate);
        }}
        text={ministageTeaser?.link?.label || ''}
        isLoading={false}
      />
    );

    const ButtonJsx = button || (
      /* @ts-ignore TODO: TS2322 ->  Type '{ className */
      <Link {...ministageTeaser.link} className={styles.LinkButton} />
    );

    return (
      <div
        className={classNames(
          TRACKING_CLASS_PARAGRAPH,
          TRACKING_CLASS_MINISTAGE_TEASER_PARAGRAPH,
          styles.Wrapper,
        )}
      >
        <div className={styles.Container}>
          <div className={styles.ContentWrapper}>
            <div>
              <div className={styles.ShortTitle}>
                {ministageTeaser?.subhead || ''}
              </div>
              {ministageTeaser.headline && (
                <div className={styles.Headline}>
                  {ministageTeaser.headline}
                </div>
              )}
              {ministageTeaser.lead && (
                <p className={styles.Lead}>{ministageTeaser.lead}</p>
              )}
            </div>
            {ButtonJsx}
          </div>
          {relativeOriginPath && (
            <div className={styles.ImageWrapper}>
              <Picture
                relativeOrigin={relativeOriginPath}
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                focalPointX={focalPointX}
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                focalPointY={focalPointY}
                alt={imageAlt}
                className={styles.TeaserImage}
                disableWrapperClassName
                {...imageStyles}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  return MinistageTeaser;
};

export default ministageTeaserFactory;
