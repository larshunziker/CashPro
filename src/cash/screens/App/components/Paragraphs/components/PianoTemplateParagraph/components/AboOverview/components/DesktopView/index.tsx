import React, { useState } from 'react';
import { useSubscriptions } from '../../../../../../../../../../shared/hooks/useSubscriptions';
import Link from '../../../../../../../../../../../common/components/Link';
import Row from '../Row';
import TitleRow from '../TitleRow';
import styles from './styles.legacy.css';
import { DesktopDataProps } from '../../typings';

const DesktopView = ({ rows, titleRows, footerRows }: DesktopDataProps) => {
  const [tooltips, setTooltips] = useState(new Array(rows.length).fill(false));
  const subscriptions = useSubscriptions();

  /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
  const toggleTooltip = (index) =>
    setTooltips(tooltips.map((active, i) => (index === i && !active) || false));

  return (
    <div className={styles.Wrapper}>
      <div></div>
      {titleRows.map((row, key) => {
        row.hideButton = subscriptions?.isAuthenticated && key === 0;
        row.hasBadge = key === 1;

        return (
          <TitleRow
            key={key}
            {...row}
            /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string'. */
            className={(key < 3 && styles.BorderRight) || null}
          />
        );
      })}
      {rows.map((row, key) => (
        <Row
          key={key}
          {...row}
          tooltipState={tooltips[key]}
          toggleTooltip={() => toggleTooltip(key)}
        />
      ))}
      <div></div>
      {footerRows.map((link, key) => (
        <Link key={key} path={link.path} className={styles.Link}>
          {link.text}
        </Link>
      ))}
    </div>
  );
};

export default DesktopView;
