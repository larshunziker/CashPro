import React, { ReactElement } from 'react';
import pure from 'recompose/pure';
import classNames from 'classnames';
import {
  IMAGE_FORMAT_PORTRAIT,
  IMAGE_FORMAT_SQUARE,
} from '../../../../../shared/constants/images';
import { SlideLabelFactoryOptions, SlideLabelProps } from './typings';

const SlideLabelFactory = ({
  styles,
  ImageCaption,
}: SlideLabelFactoryOptions) => {
  const SlideLabel = ({
    activeIndex,
    labels,
    slideDimensions,
  }: SlideLabelProps): ReactElement => {
    return (
      <div data-testid="slidelabel-factory-wrapper" className={styles.Wrapper}>
        <ImageCaption
          // @ts-ignore TODO: remove adddClass on SI
          addClass={classNames({
            /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
            [styles.Centered]:
              slideDimensions[activeIndex].format === IMAGE_FORMAT_PORTRAIT ||
              slideDimensions[activeIndex].format === IMAGE_FORMAT_SQUARE,
          })}
          caption={labels[activeIndex]?.caption}
          credit={labels[activeIndex]?.credit}
        />
      </div>
    );
  };
  return pure<SlideLabelProps>(SlideLabel);
};

export default SlideLabelFactory;
