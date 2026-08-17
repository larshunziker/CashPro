import React, { FC } from 'react';
import { UploadedFilesFactoryOptions, UploadedFilesProps } from './typings';

const UploadedFilesFactory = ({
  Icon,
  styles,
  fileText = 'Uploaded %s',
}: UploadedFilesFactoryOptions) => {
  const UploadedFiles: FC<UploadedFilesProps> = ({ files, handleDelete }) => (
    <>
      {files.map(({ name }) => (
        <li key={`uploaded-files-${name}`} className={styles.FilesListItem}>
          <Icon type="IconDocument" />
          <span className={styles.FileName}>
            {fileText.replace('%s', name)}
          </span>
          <div className={styles.SpaceFiller} />
          <button
            onClick={(event) => {
              event.preventDefault();
              handleDelete(name);
            }}
          >
            <Icon type="IconTrash" />
          </button>
        </li>
      ))}
    </>
  );
  return UploadedFiles;
};

export default UploadedFilesFactory;
