import React, { FC } from 'react';
import { PreparedFilesFactoryOptions, PreparedFilesProps } from './typings';

const PreparedFilesFactory = ({
  LoadingSpinner,
  Icon,
  styles,
  fileText = 'Uploaded %s',
}: PreparedFilesFactoryOptions) => {
  const PreparedFiles: FC<PreparedFilesProps> = ({ files, handleDelete }) => (
    <>
      {files.map(({ name }) => (
        <li key={`uploaded-files-${name}`} className={styles.FilesListItem}>
          <LoadingSpinner width={16} height={16} />
          <span>{fileText.replace('%s', name)}</span>
          <div className={styles.SpaceFiller} />
          <button
            onClick={(event) => {
              event.preventDefault();
              handleDelete(name);
            }}
          >
            <Icon type="IconXMark" />
          </button>
        </li>
      ))}
    </>
  );
  return PreparedFiles;
};

export default PreparedFilesFactory;
