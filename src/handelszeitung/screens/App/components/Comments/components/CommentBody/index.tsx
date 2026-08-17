/* istanbul ignore file */

import commentBodyFactory from '../../../../../../../common/components/Comments/components/CommentBody/factory';
import {
  TIME_ELAPSED_FORMAT_LONG,
  getFormattedElapsedDate,
} from '../../../../../../../shared/helpers/dateTimeElapsed';
import styles from './styles.legacy.css';
import logo from '../../../../../App/assets/graphics/hz-logo-blue.svg';

export default commentBodyFactory({
  publicationAccountName: 'handelszeitung',
  logo: logo,
  logoAlt: 'Handelszeitung logo',
  getFormattedElapsedDate,
  elapsedDateFormat: TIME_ELAPSED_FORMAT_LONG,
  styles: {
    Body: styles.Body,
    Date: styles.Date,
    Logo: styles.Logo,
    Name: styles.Name,
    Text: styles.Text,
  },
});
