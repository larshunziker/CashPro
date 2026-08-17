import progressBarFactory from '../../../../../common/components/ProgressBar/factory';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const ProgressBar = progressBarFactory({
  styles: {
    Container: grid.Container,
    ProgressBar: styles.ProgressBar,
  },
});

export default ProgressBar;
