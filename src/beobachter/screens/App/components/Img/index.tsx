import React, { PropsWithChildren, memo } from 'react';
import classNames from 'classnames';
import { noop } from '../../../../../shared/helpers/utils';
import styles from './styles.legacy.css';
import { ImgProps } from './typings';

type ImgPropsInner = ImgProps;

const Img = ({
  url,
  originalUrl,
  alt,
  title,
  addClass,
  addWrapperClass,
  children,
  itemProp,
  width,
  height,
  cropped,
  cover,
  noWrap,
  onLoadHandler = noop,
  ignoreLandscapeClass = false,
}: PropsWithChildren<ImgPropsInner>) => {
  if (cropped) {
    return (
      <div
        className={classNames(styles.ImageBox, addClass)}
        style={{
          width,
          height,
          backgroundImage: `url('${url}')`,
        }}
      >
        {children}
      </div>
    );
  }

  const imgTag = (
    <img
      className={classNames(styles.Image, addClass, {
        [styles.Landscape]:
          !ignoreLandscapeClass && width && height && width > height,
        [styles.Cover]: cover,
      })}
      src={url}
      data-image-src={originalUrl || undefined}
      alt={alt}
      /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */
      title={title || null}
      width={width}
      height={height}
      itemProp={itemProp}
      onLoad={onLoadHandler}
    />
  );

  const image =
    cover && noWrap ? (
      imgTag
    ) : (
      <div
        className={styles.Wrapper}
        style={{
          width: width,
          height: height,
        }}
      >
        {imgTag}
      </div>
    );

  if (children || cover) {
    return (
      /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */
      <div className={addWrapperClass || null}>
        {image}
        {children}
      </div>
    );
  }

  return imgTag;
};

export default memo<ImgPropsInner>(Img);
