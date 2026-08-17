import classNames from 'classnames';
import modalOverlayFactory from '../../../../../../../common/components/ModalOverlay/factory';
import { MODAL_ROOT_ID } from '../../../../constants';
import grid from './../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const NavigationModalOverlay = modalOverlayFactory({
  styles: {
    Wrapper: classNames(styles.Wrapper, grid.ContainerFluid),
    FadeIn: styles.FadeIn,
    BodyClass: styles.BodyClass,
  },
  modalRootId: MODAL_ROOT_ID,
});

export default NavigationModalOverlay;
