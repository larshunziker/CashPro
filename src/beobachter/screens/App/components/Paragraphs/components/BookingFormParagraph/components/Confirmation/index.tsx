import confirmationFactory from '../../factory/Confirmation/factory';
import styles from './styles.legacy.css';

const Confirmation = confirmationFactory({
  styles: {
    Title: styles.Title,
    Info: styles.Info,
    FieldWrapper: styles.FieldWrapper,
    Label: styles.Label,
    Value: styles.Value,
    Button: styles.Button,
  },
});

export default Confirmation;
