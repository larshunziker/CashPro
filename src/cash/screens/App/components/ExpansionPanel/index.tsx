/* istanbul ignore file */

import expansionPanelFactory from '../../../../../common/components/ExpansionPanel/factory';
import styles from './styles.legacy.css';

const ExpansionPanel = expansionPanelFactory({
  styles: {
    ExpansionPanel: styles.ExpansionPanel,
    IsOpen: styles.IsOpen,
    Header: styles.Header,
    HeaderContentWrapper: styles.HeaderContentWrapper,
    Title: styles.Title,
    BoldTitle: '',
    Spacer: styles.Spacer,
    Icon: styles.Icon,
    ArrowIcon: styles.ArrowIcon,
    Content: styles.Content,
    LinkWrapper: styles.LinkWrapper,
    ToggleWrapper: styles.ToggleWrapper,
  },
});

export default ExpansionPanel;
