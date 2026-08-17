import React from 'react';
import classNames from 'classnames';
import styles from './styles.legacy.css';
import { ImgProps } from './typings';

type ImgPropsInner = ImgProps;

const Img = ({
  url,
  alt,
  addClass = '',
  children,
  cropped,
  width,
  height,
}: ImgPropsInner) => {
  if (cropped) {
    return (
      <div
        className={classNames(styles.ImageBox, { [addClass]: !!addClass })}
        style={{
          width: width,
          height: height,
          backgroundImage: `url('${url}')`,
        }}
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
      })}
      src={url}
      alt={alt}
      width={width}
      height={height}
    />
  );

  if (children) {
    return (
      <div>
        {imgTag}
        {children}
      </div>
    );
  }

  return imgTag;
};

export default Img;
