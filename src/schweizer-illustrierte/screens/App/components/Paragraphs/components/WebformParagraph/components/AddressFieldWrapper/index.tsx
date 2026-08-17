import AddressFieldsWrapperFactory from '../../../../../../../../../common/components/Paragraphs/components/WebformParagraph/components/AddressFieldsWrapper/factory';
import InputField from '../InputField';
import SelectField from '../SelectField';
import styles from './styles.legacy.css';

export default AddressFieldsWrapperFactory({
  InputField,
  SelectField,
  styles: {
    Link: styles.Link,
  },
});
