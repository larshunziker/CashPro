import multiSelectDropdownFactory from '../../../../../common/components/MultiSelectDropdown/factory';
import Icon from '../Icon';
import SVGIcon from '../SVGIcon';
import styles from './styles.legacy.css';

const MultiSelectDropdown = multiSelectDropdownFactory({
  Icon,
  SVGIcon,
  customIcon: true,
  styles: {
    Wrapper: styles.Wrapper,
    SelectButtonWrapper: styles.SelectButtonWrapper,
    SelectButton: styles.SelectButton,
    OptionsWrapper: styles.OptionsWrapper,
    OverlayWrapper: styles.OverlayWrapper,
    Open: styles.Open,
    BodyClass: styles.BodyClass,
    CloseWrapper: styles.CloseWrapper,
    ClearButton: styles.ClearButton,
    Checkbox: styles.Checkbox,
    Selected: styles.Selected,
    DropdownListItem: styles.DropdownListItem,
  },
});

export default MultiSelectDropdown;
