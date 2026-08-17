import React, { ReactElement } from 'react';
import classNames from 'classnames';
import {
  ImageCaptionFactoryOptions,
  ImageCaptionFactoryOptionsStyles,
  ImageCaptionProps,
  ImageCaptionsComponent,
} from './typings';

const ImageCaptionFactory = ({
  prefix = '',
  styles: appStyles,
}: ImageCaptionFactoryOptions<any>): ImageCaptionsComponent => {
  const ImageCaption = (props: ImageCaptionProps): ReactElement => {
    const { caption, credit } = props;
    const defaultStyles: ImageCaptionFactoryOptionsStyles = {
      Wrapper: '',
      CreditWrapper: '',
      Credit: '',
    };

    const getStyles = (): ImageCaptionFactoryOptionsStyles => {
      const styles: ImageCaptionFactoryOptionsStyles =
        (typeof appStyles === 'function' && appStyles(props)) ||
        (typeof appStyles === 'object' && appStyles) ||
        defaultStyles;

      return styles;
    };
    const styles = getStyles();

    return (
      <div className={classNames('image-caption', styles.Wrapper)}>
        {caption && <span dangerouslySetInnerHTML={{ __html: caption }} />}
        {credit && (
          <div
            data-testid="image-caption-credit"
            className={styles.CreditWrapper}
          >
            <span className={styles.Credit}>
              {prefix && `${prefix} `}
              {credit}
            </span>
          </div>
        )}
      </div>
    );
  };

  return ImageCaption;
};

export default ImageCaptionFactory;
