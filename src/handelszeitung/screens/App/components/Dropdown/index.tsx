import dropdownFactory from '../../../../../common/components/Dropdown/factory';
import ButtonWithLoading from '../ButtonWithLoading';
import Icon from '../Icon';
import styles from './styles.legacy.css';

const Dropdown = dropdownFactory({
  Icon,
  /* @ts-ignore TODO: TS2322 ->  Type 'NamedExoticComponent<ButtonProps>' is not assignable to type 'ButtonWithLoadingComponent'. */
  ButtonWithLoading,
  styles: {
    BodyClass: styles.BodyClass,
    OverlayWrapper: styles.OverlayWrapper,
    Open: styles.Open,
    Wrapper: styles.Wrapper,
    FullWidthOnMobile: styles.FullWidthOnMobile,
    CloseWrapper: styles.CloseWrapper,
    OptionsWrapper: styles.OptionsWrapper,
    Right: styles.Right,
    Disabled: styles.Disabled,
  },
});

export default Dropdown;
