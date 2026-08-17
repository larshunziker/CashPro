import preparedFilesFactory from '../../../../../../../common/components/FileUploader/components/PreparedFiles/factory';
import Icon from '../../../Icon';
import LoadingSpinner from '../../../LoadingSpinner';
import styles from './styles.legacy.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const markStyleAsUsed = [
  styles.FilesListItem,
  styles.SpaceFiller,
  styles.FileName,
];

const PreparedFiles = preparedFilesFactory({
  LoadingSpinner,
  Icon,
  styles: {
    FileName: styles.FileName,
    FilesListItem: styles.FilesListItem,
    SpaceFiller: styles.SpaceFiller,
  },
});

export default PreparedFiles;
