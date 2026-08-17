import preparedFilesFactory from '../../../../../../../common/components/FileUploader/components/PreparedFiles/factory';
import Icon from '../../../Icon';
import LoadingSpinner from '../../../LoadingSpinner';
import styles from './styles.legacy.css';

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
