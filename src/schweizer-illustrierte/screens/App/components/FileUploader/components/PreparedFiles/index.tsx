import preparedFilesFactory from '../../../../../../../common/components/FileUploader/components/PreparedFiles/factory';
import Icon from '../../../Icon';
import LoadingSpinner from '../../../LoadingSpinner';
import styles from './styles.legacy.css';

const PreparedFiles = preparedFilesFactory({
  LoadingSpinner,
  Icon,
  styles,
});

export default PreparedFiles;
