import fileFieldFactory from '../../../../../../../../../common/components/Paragraphs/components/WebformParagraph/components/FileField/factory';
import FileUploader from '../../../../../FileUploader';
import styles from './styles.legacy.css';

const FileField = fileFieldFactory({
  FileUploader,
  styles: {
    Wrapper: styles.Wrapper,
    Title: styles.Title,
    Description: styles.Description,
  },
});

export default FileField;
