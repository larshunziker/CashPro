import uploadedFilesFactory from '../../../../../../../common/components/FileUploader/components/UploadedFiles/factory';
import Icon from '../../../Icon';
import styles from './styles.legacy.css';
// import { FileListItemsProps } from '../common/typings';

const UploadedFiles = uploadedFilesFactory({
  Icon,
  styles: {
    FileName: styles.FileName,
    FilesListItem: styles.FilesListItem,
    SpaceFiller: styles.SpaceFiller,
  },
});

export default UploadedFiles;
