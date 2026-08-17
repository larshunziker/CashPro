import React, { FC, Suspense, lazy } from 'react';
import { noop } from '../../../shared/helpers/utils';
import SuspenseFallback from '../SuspenseFallback';
import { FileUploaderFactoryOptions, FileUploaderProps } from './typings';

const FileUploaderFinal = lazy(
  () => import(/* webpackChunkName: "FileUploader" */ './components'),
);

const FileUploaderFactory = ({
  titleText = 'Zum Hochladen Dateien hier ablegen',
  subtitleText = 'oder',
  buttonText = 'Dateien auswählen',
  Button = noop,
  ...rest
}: FileUploaderFactoryOptions) => {
  const FileUploader: FC<FileUploaderProps> = ({ ...props }) => {
    return (
      <Suspense fallback={<SuspenseFallback size="small" />}>
        <FileUploaderFinal
          titleText={titleText}
          subtitleText={subtitleText}
          buttonText={buttonText}
          Button={Button}
          {...rest}
          {...props}
        />
      </Suspense>
    );
  };

  return FileUploader;
};

export default FileUploaderFactory;
