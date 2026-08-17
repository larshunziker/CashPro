import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import ScrollButton from './components/ScrollButton';
import Icon from '../../../../../Icon';
import styles from './styles.legacy.css';
import { TabsProps } from './typings';

const Tabs = ({ activeTab, setActiveTab, buttons }: TabsProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const buttonRowRef = useRef<HTMLDivElement>(null);

  const checkHasOverflow = useCallback(() => {
    const current = buttonRowRef?.current;
    if (!current) {
      return false;
    }
    setIsScrolled(current?.scrollLeft > 0);
    setIsOverflow(
      current.scrollLeft + current.clientWidth < current.scrollWidth,
    );
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const current = buttonRowRef?.current;
    if (current) {
      current.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth',
      });
    }
    setTimeout(() => checkHasOverflow(), 500);
  };

  useEffect(() => {
    checkHasOverflow();
    window.addEventListener('resize', checkHasOverflow);
    return () => window.removeEventListener('resize', checkHasOverflow);
  }, [checkHasOverflow]);

  return (
    <div className={styles.Wrapper}>
      <div className={styles.ScrollButtonLeft}>
        <ScrollButton
          icon={<Icon type="IconChevronLeft" />}
          onClick={() => scroll('left')}
          show={isScrolled}
          position={'left'}
        />
      </div>
      <div ref={buttonRowRef} className={styles.Buttons}>
        {buttons.map(({ key, label }) => (
          <button
            key={`tab-${label}`}
            className={classNames(
              {
                [styles.Active]: activeTab === key,
              },
              styles.Button,
            )}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className={styles.ScrollButtonRight}>
        <ScrollButton
          icon={<Icon type="IconChevronRight" />}
          onClick={() => scroll('right')}
          show={isOverflow}
          position={'right'}
        />
      </div>
    </div>
  );
};

export default Tabs;
