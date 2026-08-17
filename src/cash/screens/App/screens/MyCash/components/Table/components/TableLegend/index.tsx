import React, { useCallback, useState } from 'react';
import classnames from 'classnames';
import { tealiumTrackEvent } from '../../../../../../../../../shared/helpers/tealium';
import Icon from '../../../../../../components/Icon';
import { getTableFieldHeaders } from '../..';
import { headerMapping } from '../headerMapping';
import styles from './styles.legacy.css';
import { TableLegendProps } from '../../typings';

const TableLegend = (props: TableLegendProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const legendItems = getTableFieldHeaders(props)
    ?.map((header) => {
      // @ts-ignore
      const field = headerMapping[header];

      return {
        name: field?.name || '',
        description: field?.description || '',
      };
    })
    ?.sort((a, b) => a.name.localeCompare(b.name))
    // remove empty ones
    ?.filter((item) => !!item.name)
    // remove those that have the same name and description
    ?.filter((item) => item.name !== item.description)
    // remove duplicates
    ?.filter(
      (item, itemIdx, arr) =>
        itemIdx === arr.findIndex((i) => i.name === item.name),
    );

  const handleToggle = useCallback(() => {
    tealiumTrackEvent({
      type: 'link',
      payload: {
        event_name: `portfolio_legend_show_${isOpen ? 'less' : 'more'}`,
        event_category: 'portfolio',
        event_action: 'portfolio_legend',
        is_open: isOpen,
        from: 'portfolio',
      },
    });
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <>
      <button className={styles.ToggleButton}>
        <div role="presentation" onClick={handleToggle}>
          <span>Legende</span>
          <Icon type={isOpen ? 'IconXMark' : 'IconCircleInfo'} />
        </div>
      </button>
      <div className={classnames(styles.Wrapper, { [styles.IsOpen]: isOpen })}>
        {isOpen && (
          <table className={styles.Table}>
            <tr>
              <th>Spalte</th>
              <th>Erklärung</th>
            </tr>
            {legendItems?.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </table>
        )}
      </div>
    </>
  );
};

export default TableLegend;
