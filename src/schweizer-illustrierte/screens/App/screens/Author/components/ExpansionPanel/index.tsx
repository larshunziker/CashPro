//  INFO: ExpansionPanel used for Author detail page
import React from 'react';
import expansionPanelFactory, {
  ExpansionPanelState,
} from '../../../../../../../common/components/ExpansionPanel/factory';
import Icon from '../../../../components/Icon';
import styles from './styles.legacy.css';
import { ExpansionPanelFactoryOptionsStyles } from '../../../../../../../common/components/ExpansionPanel/typings';

const getStylesByProps = (): ExpansionPanelFactoryOptionsStyles => ({
  ExpansionPanel: styles.ExpansionPanel,
  IsOpen: styles.IsOpen,
  Header: '',
  BoldTitle: '',
  Spacer: styles.Spacer,
  Icon: '',
  ArrowIcon: '',
  Content: styles.Content,
  HeaderContentWrapper: '',
  Title: '',
  LinkWrapper: '',
  ToggleWrapper: '',
});

/* @ts-ignore TODO: TS7031 ->  Binding element 'title' implicitly has an 'any' type. */
const Header = ({ title }, { isClosed, toggleExpand }: ExpansionPanelState) => (
  <button className={styles.ShowMoreButton} onClick={toggleExpand}>
    {title}
    <Icon type={isClosed ? 'IconChevronDown' : 'IconChevronUp'} />
  </button>
);

const ExpansionPanel = expansionPanelFactory({
  header: Header,
  initialHeight: 0,
  styles: getStylesByProps,
});

export default ExpansionPanel;
