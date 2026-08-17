import React, { ReactElement } from 'react';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import { ImgProps } from './typings';

const Img = ({
  title,
  alt = '',
  children,
  height,
  url,
  width,
  addClass = '',
}: ImgProps): ReactElement => {
  //  Key is needed to wait until image is loaded SI-224
  const imgTag: ReactElement = (
    <img
      key={`image-key-${url || ''}`}
      /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */
      className={!!addClass ? addClass : null}
      src={url}
      /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */
      title={title || null}
      alt={alt}
      width={width || null}
      height={height || null}
      data-testid="image-wrapper"
    />
  );

  if (children) {
    return (
      <TestFragment data-testid="image-children-wrapper">
        {imgTag}
        {children}
      </TestFragment>
    );
  }

  return imgTag;
};

export default Img;
