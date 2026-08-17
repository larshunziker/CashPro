import React, { useEffect, useState } from 'react';
import defaultStyles from './styles.legacy.css';
import { ScrollButtonFactoryOptions, ScrollButtonProps } from './typings';

const ScrollButtonFactory = ({
  styles,
  IconRight,
  IconLeft,
}: ScrollButtonFactoryOptions) => {
  const ScrollButton = (props: ScrollButtonProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [hasOverflow, setHasOverflow] = useState(false);

    if (!styles) {
      styles = defaultStyles;
    }

    useEffect(() => {
      checkHasOverflow();
      window.addEventListener('resize', checkHasOverflow);
      return () => window.removeEventListener('resize', checkHasOverflow);
    });

    const scrollEnd = () => {
      const current = props.container?.current;
      if (current) {
        const scrollWidth = current.scrollWidth;
        const clientWidth = current.clientWidth;
        if (scrollWidth > clientWidth) {
          current.style.left = `${clientWidth - scrollWidth}px`;
          setIsScrolled(true);
        }
      }
    };

    const scrollStart = () => {
      const current = props.container?.current;
      if (current) {
        current.style.left = '0px';
        setIsScrolled(false);
      }
    };

    const checkHasOverflow = () => {
      const current = props.container?.current;
      if (current && current.scrollWidth > current.clientWidth) {
        setHasOverflow(true);
      } else {
        setHasOverflow(false);
      }
    };

    return (
      (hasOverflow && (
        <div className={styles.ScrollButton}>
          {!isScrolled && (
            <>
              <div className={styles.GradiantLeftToRight}></div>
              <button onClick={() => scrollEnd()}>{IconRight}</button>
            </>
          )}
          {isScrolled && (
            <>
              <button onClick={() => scrollStart()}>{IconLeft}</button>
              <div className={styles.GradiantRightToLeft}></div>
            </>
          )}
        </div>
      )) || (
        <div className={styles.ScrollButton}>
          <div className={styles.GradiantLeftToRight}></div>
          <button>&nbsp;</button>
        </div>
      )
    );
  };
  return ScrollButton;
};

export default ScrollButtonFactory;
