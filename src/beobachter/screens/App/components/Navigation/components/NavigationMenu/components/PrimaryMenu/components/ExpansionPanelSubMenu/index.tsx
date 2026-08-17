/* istanbul ignore file */
import classNames from 'classnames';
import expansionPanelFactory from '../../../../../../../../../../../common/components/ExpansionPanel/factory';
import styles from './styles.legacy.css';
import {
  ExpansionPanelFactoryOptionsStyles,
  ExpansionPanelProps,
} from './typings';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const markStyleAsUsed = [styles.ThemeDark];

const getStylesByProps = ({
  theme = '',
  title,
}: ExpansionPanelProps): ExpansionPanelFactoryOptionsStyles => ({
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly Expans */
  ExpansionPanel: classNames(styles.ExpansionPanel, styles[theme]),
  IsOpen: styles.IsOpen,
  Header: styles.Header,
  HeaderContentWrapper: styles.HeaderContentWrapper,
  Title: classNames(styles.Title, {
    [styles.MagazinTitle]: title === 'Magazin',
    [styles.BeratungTitle]: title === 'Beratung' || title === 'Rechtsberatung',
    [styles.CommunityTitle]: title === 'Engagement',
    [styles.EditionTitle]: title === 'Buchverlag',
  }),
  BoldTitle: '',
  Spacer: '',
  Icon: styles.Icon,
  ArrowIcon: styles.ArrowIcon,
  Content: styles.Content,
  LinkWrapper: styles.LinkWrapper,
  ToggleWrapper: styles.ToggleWrapper,
});

const ExpansionPanelSubMenu = expansionPanelFactory({
  styles: getStylesByProps,
});

export default ExpansionPanelSubMenu;
