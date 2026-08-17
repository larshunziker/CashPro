import React, { FC } from 'react';
import { noop } from '../../../../../../../shared/helpers/utils';
import { FileFieldFactoryOptions, FileFieldProps } from './typings';

const FileFieldFactory = ({
  styles,
  FileUploader,
}: FileFieldFactoryOptions) => {
  const FileField: FC<FileFieldProps> = ({
    id,
    title = 'Datei Hochladen',
    description,
    webformId,
    fieldName,
    register,
    uniqueTimestamp,
    required,
    fileLimit,
    maxFileSize,
    allowedExtensions,
    disabled,
    hasError = false,
    errorMessage = '',
    onFilesUpload = noop,
    onFileDelete = noop,
  }) => {
    return (
      <div className={styles.Wrapper}>
        <p className={styles.Title}>{title}</p>
        <p
          className={styles.Description}
          dangerouslySetInnerHTML={{ __html: description }}
        />

        <FileUploader
          register={register}
          id={id}
          hasError={hasError}
          errorMessage={errorMessage}
          webformId={webformId}
          fieldName={fieldName}
          uniqueTimestamp={uniqueTimestamp}
          required={required}
          fileLimit={fileLimit}
          maxFileSize={maxFileSize}
          allowedExtensions={allowedExtensions}
          /* @ts-ignore TODO: TS2322 ->  Type 'boolean | undefined' is not assignable to type 'boolean'. */
          disabled={disabled}
          onFilesUpload={onFilesUpload}
          onFileDelete={onFileDelete}
        />
      </div>
    );
  };
  return FileField;
};

export default FileFieldFactory;
