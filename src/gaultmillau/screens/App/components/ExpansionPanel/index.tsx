import expansionPanelFactory from '../../../../../common/components/ExpansionPanel/factory';
import { ORIGIN_POPSTAGE } from '../PopStage/constants';
import styles from './styles.legacy.css';
import type {
  ExpansionPanelFactoryOptionsStyles,
  ExpansionPanelProps,
} from '../../../../../common/components/ExpansionPanel/typings';

export const getStylesByProps = ({
  origin,
}: ExpansionPanelProps): ExpansionPanelFactoryOptionsStyles => ({
  ExpansionPanel: styles.ExpansionPanel,
  IsOpen: styles.IsOpen,
  Header: origin === ORIGIN_POPSTAGE ? styles.HeaderCentered : styles.Header,
  HeaderContentWrapper: styles.HeaderContentWrapper,
  Title: styles.Title,
  BoldTitle: origin === ORIGIN_POPSTAGE ? styles.BoldTitle : '',
  Spacer: '',
  Icon: styles.Icon,
  ArrowIcon: styles.ArrowIcon,
  Content: styles.Content,
});

const ExpansionPanel = expansionPanelFactory({
  styles: getStylesByProps,
});

export default ExpansionPanel;
