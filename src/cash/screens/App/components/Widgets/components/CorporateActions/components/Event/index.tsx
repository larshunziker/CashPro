import React from 'react';
import sackDollar from '../../../../../../assets/icons/sack-dollar.svg';
import screenUsers from '../../../../../../assets/icons/screen-users.svg';
import question from '../../../../../../assets/icons/question.svg';
import coins from '../../../../../../assets/icons/coins.svg';
import { cleanDate } from '../../helpers';
import RestrictedContent from '../../../../../RestrictedContent';
import styles from './styles.legacy.css';
import { EventData } from '../../typings';
import { EventConfig, EventProps } from './typings';

const Event = ({ event, hasSubscription }: EventProps) => {
  const eventConfig = (event: EventData): EventConfig => {
    return {
      DIV: {
        icon: sackDollar,
        title: 'Barausschüttung (Dividende)',
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
        date: cleanDate(event.exdt),
        text: [
          `Bruttobetrag: ${event.ratecurencd} ${event.grossdividend || 0}`,
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
          `Ex-Datum: ${cleanDate(event.exdt)}`,
          event.declarationdt
            ? `Ankündigungsdatum: ${cleanDate(event.declarationdt)}`
            : '',
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
          `Zahlungsdatum: ${cleanDate(event.paydt)}`,
        ].filter((text) => text),
      },
      RCAP: {
        icon: coins,
        title: 'Barausschüttung (Kapitalrückzahlung)',
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
        date: cleanDate(event.effectivedt),
        text: [
          `Bruttobetrag: ${event.ratecurencd} ${event.cashback || 0}`,
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
          `Ex-Datum: ${cleanDate(event.effectivedt)}`,
          event.ntschangedt
            ? `Ankündigungsdatum: ${cleanDate(event.ntschangedt)}`
            : '',
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
          `Zahlungsdatum: ${cleanDate(event.paydt)}`,
        ].filter((text) => text),
      },
      AGM: {
        icon: screenUsers,
        title: 'Generalversammlung',
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
        date: cleanDate(event.meetingdt),
        text: [
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
          `Versammlungsdatum: ${cleanDate(event.meetingdt)}`,
          `${
            event.eventsubtypecd === 'EGM'
              ? 'Ausserordentliche Generalversammlung'
              : ''
          }`,
        ].filter((text) => text),
      },
    };
  };

  /* @ts-ignore TODO: TS2538 ->  Type 'null' cannot be used as an index type. */
  /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
  const config = eventConfig(event)[event.eventcd];
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Row}>
        <RestrictedContent isActive={!hasSubscription}>
          <img
            className={styles.Icon}
            src={!hasSubscription ? question : config.icon}
            alt="icon"
          />
        </RestrictedContent>
        <RestrictedContent isActive={!hasSubscription}>
          <span className={styles.Date}>{config.date}</span>
        </RestrictedContent>
        <div className={styles.Text}>
          <RestrictedContent isActive={!hasSubscription}>
            <span className={styles.Title}>{config.title}</span>
          </RestrictedContent>
          {/* @ts-ignore TODO: TS7006 ->  Parameter 'text' implicitly has an 'any' type. */}
          {config.text.map((text) => (
            <RestrictedContent key={text} isActive={!hasSubscription}>
              <span className={styles.Text}>{text}</span>
            </RestrictedContent>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Event;
