import React from 'react';
import { NoItemsFactoryOptions } from './typings';

const NoItemsFactory = ({
  styles,
  Icon,
  button,
  iconType = 'IconBell',
  text = 'Folgen Sie interessanten Themen. Wir halten Sie per E-Mail auf dem Laufenden, sobald ein neuer Artikel zu Ihrem Thema erscheint.',
}: NoItemsFactoryOptions) => {
  const NoItems = () => (
    <div className={styles.NoItemsWrapper}>
      <div className={styles.InnerWrapper}>
        <Icon type={iconType} addClass={styles.Icon} />
        <div className={styles.Text}>{text}</div>
      </div>
      {button && <div className={styles.Wrapper}>{button}</div>}
    </div>
  );

  return NoItems;
};

export default NoItemsFactory;
