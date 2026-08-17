import React, { ReactElement } from 'react';
import expansionPanelFactory, {
  ExpansionPanelState,
} from '../../../../../../../common/components/ExpansionPanel/factory';
import SVGIcon from '../../../../components/SVGIcon';
import { SVG_ICONS_TYPE_LIST } from '../../../../../../../shared/constants/svgIcons';
import styles from './styles.legacy.css';

const Header = (
  { title }: { title: string | ReactElement },
  { isClosed, toggleExpand }: ExpansionPanelState,
) => (
  <button
    className={styles.ShowMoreButton}
    onClick={toggleExpand}
    aria-expanded={!isClosed}
    aria-label={isClosed ? 'Erweitern' : 'Einklappen'}
  >
    <SVGIcon
      type={SVG_ICONS_TYPE_LIST}
      className={isClosed ? '' : styles.RotateButton}
    />
    {title}
  </button>
);

const Footer = (
  { title }: { title: string | ReactElement },
  { isClosed, toggleExpand }: ExpansionPanelState,
) =>
  !isClosed && (
    <button
      className={styles.ShowMoreButton}
      onClick={toggleExpand}
      aria-expanded={!isClosed}
      aria-label={isClosed ? 'Erweitern' : 'Einklappen'}
    >
      <SVGIcon type={SVG_ICONS_TYPE_LIST} className={styles.RotateButton} />
      {title}
    </button>
  );

const FilterExpansionPanel = expansionPanelFactory({
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
  footer: Footer,
  initialHeight: 0,
});

export default FilterExpansionPanel;
