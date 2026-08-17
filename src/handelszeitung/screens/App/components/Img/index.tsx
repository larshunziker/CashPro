import React from 'react';
import classNames from 'classnames';
import styles from './styles.legacy.css';
import { ImgProps } from './typings';

const Img = ({
  url,
  alt,
  addClass = '',
  children,
  cropped,
  width,
  height,
  title,
  allowUpscaling,
  role = 'img',
}: ImgProps) => {
  if (cropped) {
    return (
      <div
        className={classNames(styles.ImageBox, { [addClass]: !!addClass })}
        style={{
          width: width,
          height: height,
          backgroundImage: `url('${url}')`,
        }}
        role={role}
      >
        {children}
      </div>
    );
  }

  const imgTag = (
    <img
      className={classNames(styles.Image, {
        [styles.Landscape]: width && height && width > height,
        [addClass]: !!addClass,
        [styles.Upscale]: !!allowUpscaling,
      })}
      src={url}
      alt={alt}
      /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */
      title={title || null}
      width={width}
      height={height}
    />
  );

  if (children) {
    return (
      <div role={role}>
        {imgTag}
        {children}
      </div>
    );
  }

  return imgTag;
};

export default Img;
