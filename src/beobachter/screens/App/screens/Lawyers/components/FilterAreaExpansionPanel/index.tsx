import React from 'react';
import expansionPanelFactory, {
  ExpansionPanelState,
} from '../../../../../../../common/components/ExpansionPanel/factory';
import Icon from '../../../../components/Icon';
import styles from './styles.legacy.css';
const Header = (
  { title }: { title: string },
  { isClosed, toggleExpand }: ExpansionPanelState,
) => (
  <button className={styles.ShowMoreButton} onClick={toggleExpand}>
    {title}
    <Icon type={isClosed ? 'IconChevronDown' : 'IconChevronUp'} />
  </button>
);
const FilterAreaExpansionPanel = expansionPanelFactory({
  styles: {
    ExpansionPanel: styles.ExpansionPanel,
    IsOpen: '',
    Header: '',
    BoldTitle: '',
    Spacer: styles.Spacer,
    Icon: '',
    ArrowIcon: '',
    Content: styles.Content,
  },
  header: Header,
  initialHeight: 0,
});

export default FilterAreaExpansionPanel;
