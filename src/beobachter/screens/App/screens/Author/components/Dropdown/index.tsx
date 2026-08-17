import React from 'react';
import dropdownFactory from '../../../../../../../common/components/Dropdown/factory';
import Icon from '../../../../components/Icon';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'onClick' implicitly has an 'any' type. */
const Button = ({ onClick }) => (
  <button onClick={onClick} className={styles.ShowMoreButton}>
    <Icon type="IconChevronDown" />
    Weitere Kanäle
  </button>
);

const Dropdown = dropdownFactory({
  Icon,
  ButtonWithLoading: Button,
  styles: {
    BodyClass: styles.BodyClass,
    OverlayWrapper: styles.OverlayWrapper,
    Open: styles.Open,
    Wrapper: styles.Wrapper,
    CloseWrapper: styles.CloseWrapper,
    OptionsWrapper: styles.OptionsWrapper,
    Right: styles.Right,
  },
});

export default Dropdown;
