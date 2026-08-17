import React, { useEffect, useRef, useState } from 'react';
import Icon from '../../../../../../../Icon';
import styles from './styles.legacy.css';
import { TooltipProps } from '../../typings';

const Tooltip = ({ text, active, toggle }: TooltipProps) => {
  const bubble = useRef(null);
  const card = useRef(null);
  const [topPosition, setTopPosition] = useState(0);
  const [leftPosition, setLeftPosition] = useState(0);

  // Shift bubble to the left if there is not enough space on mobile view
  const shiftLeft = () => {
    /* @ts-ignore TODO: TS2339 ->  Property 'parentElement' does not exist on type 'never'. */
    const card = bubble?.current?.parentElement?.parentElement?.parentElement;
    const cardRight = card?.getBoundingClientRect().right;
    /* @ts-ignore TODO: TS2339 ->  Property 'getBoundingClientRect' does not exist on type 'never'. */
    const bubbleRight = bubble?.current?.getBoundingClientRect().right;
    if (cardRight && bubbleRight && bubbleRight > cardRight) {
      setLeftPosition(bubbleRight - cardRight);
    }
  };

  useEffect(() => {
    /* @ts-ignore TODO: TS2339 ->  Property 'clientHeight' does not exist on type 'never'. */
    setTopPosition(bubble?.current?.clientHeight);
    shiftLeft();
  }, [active]);

  return (
    <span
      className={styles.Wrapper}
      onClick={() => toggle()}
      onKeyDown={() => toggle()}
      role="button"
      tabIndex={0}
      ref={card}
    >
      <span className={styles.Icon}>
        {(active && <Icon type="IconXMark" />) || (
          <Icon type="IconCircleInfo" />
        )}
      </span>
      {active && (
        <>
          <span
            ref={bubble}
            className={styles.Bubble}
            style={{
              top: `-${topPosition + 24}px`,
              left: `-${(leftPosition && leftPosition + 92) || 92}px`,
              visibility: (!topPosition && 'hidden') || 'visible',
            }}
          >
            {text}
          </span>
          <span className={styles.Arrow} />
        </>
      )}
    </span>
  );
};

export default Tooltip;
