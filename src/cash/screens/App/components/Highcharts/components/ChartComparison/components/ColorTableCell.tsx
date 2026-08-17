import React, { useCallback, useEffect, useRef, useState } from 'react';
import { stockChartOptions } from '../../../defaultConfig';
import styles from './styles.legacy.css';

const colors = stockChartOptions.colors;

/* @ts-ignore TODO: TS7031 ->  Binding element 'listingId' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'rowIndex' implicitly has an 'any' type. */
export const ColorTableCell = ({ listingId, rowIndex }) => {
  const ref = useRef<HTMLElement>();
  const [isOpen, setIsOpen] = useState(false);
  const [colorIndex, setColorIndex] = useState(rowIndex);
  // @ts-ignore
  const currentColorSet = window.currenColorSet;

  const updateColors = useCallback(
    /* @ts-ignore TODO: TS7006 ->  Parameter 'colorIndex' implicitly has an 'any' type. */
    (colorIndex) => {
      setColorIndex(colorIndex);
      setIsOpen(false);
      currentColorSet[listingId] = colorIndex;
      // @ts-ignore
      window.chartUpdateColors(currentColorSet);
    },
    [currentColorSet, listingId],
  );

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const isClickOutside =
      event.target !== ref.current &&
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      !ref.current.contains(event.target as Node);

    setIsOpen(!isClickOutside);
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [handleClickOutside]);

  return (
    <span
      role="button"
      /* @ts-ignore TODO: TS2322 ->  Type 'MutableRefObject<HTMLElement | undefined>' is not assignable to type 'LegacyRef<HTMLSpanElement> | undefined'. */
      ref={ref}
      className={styles.ColorTableCell}
      tabIndex={0}
      style={{
        color: colors[colorIndex],
      }}
    >
      ▬
      {isOpen && (
        <div className={styles.ColorsTooltip}>
          {colors.map((color, index) => {
            if (index === 0) {
              return null;
            }
            return (
              <div
                role={'button'}
                tabIndex={index}
                className={styles.ColorItem}
                style={{ backgroundColor: color }}
                key={`${colors[index]}`}
                onClick={(event) => {
                  event.preventDefault();
                  updateColors(index);
                }}
                onKeyUp={(event) => {
                  event.preventDefault();
                  updateColors(index);
                }}
              />
            );
          })}
        </div>
      )}
    </span>
  );
};
