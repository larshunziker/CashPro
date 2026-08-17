import React, { ReactElement } from 'react';
import classNames from 'classnames';
import Link from '../../../Link';
import Picture from '../../../Picture';
import SmoothScroll from '../../../SmoothScroll';
import {
  STYLE_TEASER_3_2,
  STYLE_TEASER_3_2_LARGE,
} from '../../../../../shared/constants/images';
import {
  TRACKING_CLASS_LISTICLE_ITEM_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../shared/constants/tracking';
import {
  ListicleItemParagraphFactoryOptions,
  ListicleItemParagraphFactoryOptionsStyles,
  ListicleItemParagraphProps,
} from './typings';

type ListicleItemParagraphPropsInner = ListicleItemParagraphProps & {
  scrollOffset: number;
};

const defaultStyles: ListicleItemParagraphFactoryOptionsStyles = {
  ContentBox: '',
  ImageBox: '',
  InnerWrapper: '',
  Wrapper: '',
  Title: '',
  Content: '',
  ImageBoxFirst: '',
  Footer: '',
  Even: '',
  Odd: '',
  Image: '',
  ListicleItemInnerWrapper: '',
  IsNested: '',
  ContentWrapper: '',
};

const ListicleItemParagraphFactory = ({
  styles: appStyles,
  pictureStyle,
}: ListicleItemParagraphFactoryOptions) => {
  const ListicleItemParagraph = (props: ListicleItemParagraphPropsInner) => {
    const { listicleItem, listicleIndex, isNested, scrollOffset } = props;

    const isEven = listicleIndex % 2 === 0;

    const styles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    const contentColJsx: ReactElement = (
      /* @ts-ignore TODO: TS2322 ->  Type '{ children */
      <Link
        {...listicleItem.link}
        className={classNames(styles.ContentBox, styles.ImageBoxFirst)}
      >
        <>
          {listicleItem.title && (
            <div
              className={styles.Title}
              data-testid="listicleitemparagraph-title"
            >
              {listicleItem.title}
            </div>
          )}
          {/* the content comes with <p> tags so we must use "dangerouslySetInnerHTML" */}
          {listicleItem.text && (
            <div
              data-testid="listicleitemparagraph-text"
              className={styles.Content}
              dangerouslySetInnerHTML={{
                __html: listicleItem.text,
              }}
            />
          )}
          {/* the footer comes with <p>'s and optional <u> tags so we must use "dangerouslySetInnerHTML" */}
          {listicleItem.footer && (
            <div
              data-testid="listicleitemparagraph-footer"
              className={styles.Footer}
              dangerouslySetInnerHTML={{
                __html: listicleItem.footer,
              }}
            />
          )}
        </>
      </Link>
    );

    const imageFile = listicleItem.image?.image?.file;

    /* @ts-ignore TODO: TS2322 ->  Type '"" | Element | null | undefined' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any> */
    const imageColJsx: ReactElement = imageFile?.relativeOriginPath && (
      <div
        className={styles.ImageBox}
        data-testid="listicleitemparagraph-imagebox"
      >
        {/* @ts-ignore TODO: TS2322 ->  Type '{ children */}
        <Link {...listicleItem.link}>
          <Picture
            relativeOrigin={imageFile.relativeOriginPath}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
            focalPointX={imageFile.focalPointX}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
            focalPointY={imageFile.focalPointY}
            style_320={pictureStyle ? pictureStyle[0] : STYLE_TEASER_3_2}
            style_760={pictureStyle ? pictureStyle[1] : STYLE_TEASER_3_2_LARGE}
            alt={imageFile?.alt || ''}
            className={styles.Image}
          />
        </Link>
      </div>
    );

    return (
      <SmoothScroll
        key={`listicle-item-paragraph-${listicleItem.id}`}
        offset={scrollOffset}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        anchorId={listicleItem.anchorId}
      >
        <div
          data-testid="listicleitemparagraph-content-wrapper"
          className={classNames(styles.ContentWrapper, {
            /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
            [styles.Even]: isEven,
            /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
            [styles.Odd]: !isEven,
            /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
            [styles.IsNested]: isNested,
          })}
        >
          <div
            className={classNames(
              TRACKING_CLASS_PARAGRAPH,
              TRACKING_CLASS_LISTICLE_ITEM_PARAGRAPH,
              styles.Wrapper,
            )}
          >
            <div className={styles.ListicleItemWrapper}>
              <div className={styles.InnerWrapper}>
                <div
                  className={styles.ListicleItemInnerWrapper}
                  data-testid="listicleitemparagraph-inner-wrapper"
                >
                  {!isEven && contentColJsx}
                  {imageColJsx}
                  {isEven && contentColJsx}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SmoothScroll>
    );
  };

  return ListicleItemParagraph;
};

export default ListicleItemParagraphFactory;
