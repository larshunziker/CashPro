/* istanbul ignore file */

import expansionPanelFactory from '../../../../../../../../../../../common/components/ExpansionPanel/factory';
import styles from './styles.legacy.css';

const ExpansionPanel = expansionPanelFactory({
  styles: {
    ExpansionPanel: styles.ExpansionPanel,
    IsOpen: styles.IsOpen,
    Header: styles.Header,
    HeaderContentWrapper: styles.HeaderContentWrapper,
    Title: styles.Title,
    BoldTitle: '',
    Spacer: '',
    Icon: styles.Icon,
    ArrowIcon: styles.ArrowIcon,
    Content: styles.Content,
  },
});

export default ExpansionPanel;
