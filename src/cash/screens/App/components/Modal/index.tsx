import modalFactory from '../../../../../common/components/Modal/factory';
import ButtonWithLoading from '../ButtonWithLoading';
import Icon from '../Icon';
import RaschProviders from '../RaschProviders';
import styles from './styles.legacy.css';

const modal = modalFactory({
  styles: {
    Title: styles.Title,
    Body: styles.Body,
    Content: styles.Content,
    FullPage: styles.FullPage,
    CloseIconWrapper: styles.CloseIconWrapper,
  },
  /* @ts-ignore TODO: TS2322 ->  Type 'NamedExoticComponent<ButtonProps>' is not assignable to type 'ButtonWithLoadingComponent'. */
  ButtonWithLoading,
  Icon,
  RaschProviders,
});

export default modal;
