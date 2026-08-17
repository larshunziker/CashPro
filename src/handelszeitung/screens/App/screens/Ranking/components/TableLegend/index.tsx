import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Icon from '../../../../components/Icon';
// @ts-ignore
import { ReactComponent as NewIcon } from '../../../../components/SVGIcon/assets/new-in-list.svg';
import styles from './styles.legacy.css';

const TableLegend = () => {
  const [isLegendVisible, setShowLegend] = useState(false);
  const legendRef = useRef<HTMLParagraphElement>();

  useEffect(() => {
    /* @ts-ignore TODO: TS7031 ->  Binding element 'target' implicitly has an 'any' type. */
    const handleOutsideClick = ({ target }) => {
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      if (!legendRef.current.contains(target)) {
        setShowLegend(false);
      }
    };

    if (isLegendVisible) {
      global.addEventListener('click', handleOutsideClick);
    }

    return () => {
      global.removeEventListener('click', handleOutsideClick);
    };
  }, [isLegendVisible]);

  return (
    <>
      <div className={styles.LegendWrapper}>
        <div
          /* @ts-ignore TODO: TS2322 ->  Type 'MutableRefObject<HTMLParagraphElement | undefined>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefi */
          ref={legendRef}
          onClick={() => setShowLegend(!isLegendVisible)}
          onKeyDown={() => setShowLegend(isLegendVisible)}
          role="button"
          tabIndex={0}
          className={classNames(styles.Legend, {
            [styles.IsOpen]: isLegendVisible,
          })}
        >
          <p className={styles.LegendLabel}>Legende anzeigen</p>
          <Icon addClass={styles.LegendIcon} type="IconCircleInfo" />
          <div
            className={classNames(styles.TooltipWrapper, {
              [styles.IsOpen]: isLegendVisible,
            })}
          >
            <table className={styles.TooltipTable}>
              <tbody>
                <tr className={styles.LegendItem}>
                  <td className={styles.LegendItemIcon}>
                    <Icon addClass={styles.Positive} type="IconArrowUpRight" />
                  </td>
                  <td>Aufsteiger</td>
                </tr>
                <tr className={styles.LegendItem}>
                  <td className={styles.LegendItemIcon}>
                    <Icon
                      addClass={styles.Negative}
                      type="IconArrowDownRight"
                    />
                  </td>
                  <td>Absteiger</td>
                </tr>
                <tr className={styles.LegendItem}>
                  <td className={styles.LegendItemIcon}>
                    <Icon type="IconArrowRight" />
                  </td>
                  <td>Unverändert</td>
                </tr>
                <tr className={styles.LegendItem}>
                  <td className={styles.LegendItemIcon}>
                    {/* @ts-ignore */}
                    <NewIcon />
                  </td>
                  <td>Neu in Liste</td>
                </tr>
                <tr className={styles.LegendItem}>
                  <td className={styles.LegendItemIcon}>
                    <Icon type="IconArrowRotateLeft" />
                  </td>
                  <td>Rückkehrer</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableLegend;
