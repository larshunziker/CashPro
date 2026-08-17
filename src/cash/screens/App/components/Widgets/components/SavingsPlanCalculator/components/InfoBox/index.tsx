import React, { useState } from 'react';
import classNames from 'classnames';
import { tealiumTrackEvent } from '../../../../../../../../../shared/helpers/tealium';
import Icon from '../../../../../Icon';
import styles from './styles.legacy.css';
import { InfoBoxProps } from './typings';

const InfoBox = (props: InfoBoxProps) => {
  const { title, children } = props;
  const [isChildrenOpen, setIsChildrenOpen] = useState(false);

  return (
    <>
      <button
        className={classNames(styles.Toggle, {
          [styles.IsOpen]: isChildrenOpen,
        })}
        onClick={() => {
          setIsChildrenOpen(!isChildrenOpen);
          tealiumTrackEvent({
            type: 'link',
            payload: {
              event_name: `infobox_toggle`,
              event_category: 'infobox',
              event_action: `toggle_set_${isChildrenOpen ? 'close' : 'open'}`,
            },
          });
        }}
      >
        <span>
          <Icon addClass={styles.IconInfo} type="IconCircleInfo" />
          <span>{title}</span>
        </span>
        <Icon
          addClass={classNames(styles.IconToggle, {
            [styles.IsOpen]: isChildrenOpen,
          })}
          type="IconChevronDown"
        />
      </button>
      <div
        className={classNames(styles.Content, {
          [styles.IsOpen]: isChildrenOpen,
        })}
      >
        {children}
      </div>
    </>
  );
};

export const DefaultInfoBoxContent = () => {
  return (
    <>
      <p>
        So haben sich in den letzten 40 Jahren (1.1.1984 – 31.12.2023) die
        Renditen der wichtigsten Indizes durchschnittlich entwickelt:
      </p>
      <b>1. MSCI World Index USD (ca. Ø 7.4 % pro Jahr in CHF)</b>
      <p>
        Der MSCI World Index ist einer der wichtigsten Börsenbarometer weltweit.
        Er enthält Aktien von über 1600 grosser und mittelgrosser Unternehmen
        aus 23 Industrieländern in USA, Kanada, Europa und Asien.
      </p>
      <b>2. SMI Swiss Market Index CHF (ca. Ø 8.5 % pro Jahr in CHF)</b>
      <p>
        Der SMI ist der bedeutendste Börsenindex der Schweiz und bildet die 20
        liquidesten und grössten Schweizer Unternehmen ab.
      </p>
      <b>3. S&P 500 USD (ca. Ø 8.7 % pro Jahr in CHF)</b>
      <p>
        Der S&P 500 ist einer der weltweit am meisten beachteten Börsenindizes,
        der Aktien von 500 der grössten börsennotierten US-amerikanischen
        Unternehmen umfasst und nach Marktkapitalisierung gewichtet ist.
      </p>
      <b>4. Gold 1 Unze USD (ca. Ø 1.9 % pro Jahr in CHF)</b>
      <p>
        Das Handelsobjekt Gold wird häufig in Feinunzen pro US-Dollar gehandelt.
        Eine Unze sind 31,1034768 Gramm. Die wichtigsten Handelsplätze für Gold
        sind Zürich, London, New York und Hong Kong.
      </p>
      <p>
        Die künftigen Indexrenditen unter Verwendung der durchschnittlichen
        Indexrendite der letzten 40 Jahre dient lediglich der Veranschaulichung;
        die tatsächliche Wertentwicklung kann davon abweichen.{' '}
      </p>
      <p>
        <i>Quelle: Eigene Erhebung</i>
      </p>
    </>
  );
};

export default InfoBox;
