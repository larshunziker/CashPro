import userProfileDataFactory from '../../../../../../../../../common/components/Paragraphs/components/WebformParagraph/components/UserProfileData/factory';
import authStateSelector from '../../../../../../../../../shared/selectors/authStateSelector';
import styles from './styles.legacy.css';

const UserProfileData = userProfileDataFactory({
  authStateSelector,
  styles: {
    Title: styles.Title,
    Text: styles.Text,
    Paragraph: styles.Paragraph,
    Button: styles.Button,
    Row: styles.Row,
  },
});

export default UserProfileData;
