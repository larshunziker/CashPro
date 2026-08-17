import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { tealiumTrackEvent } from '../../../../../../../../../shared/helpers/tealium';
import autoUpdateStateSelector from '../../../../../../../../../shared/selectors/autoUpdateStateSelector';
import Icon from '../../../../../Icon';
import { headerMapping } from '../../../../../../screens/MyCash/components/Table/components/headerMapping';
import locationStateSelector from '../../../../../../../../shared/selectors/locationStateSelector';
import { getProductLink } from './helpers';
import styles from './styles.legacy.css';
import { TopFlopTableProps } from './typings';

const TopFlopTable = ({
  instruments,
  order,
  limit,
  addPutsCallsLinks,
  sponsorImage,
  sponsorImageUrl,
}: TopFlopTableProps) => {
  const updatedInstruments = useSelector(
    (state: ReduxState) => autoUpdateStateSelector(state).data,
  );

  const isHybridApp = useSelector(
    (state: ReduxState) => locationStateSelector(state).isHybridApp,
  );
  const sortedInstruments = (
    instruments: Instrument[],
    limit: number,
    order: 'asc' | 'desc',
  ): Instrument[] => {
    const newUpdatedInstruments = instruments.map(
      (instrument) =>
        updatedInstruments?.[instrument?.instrumentKey || ''] || instrument,
    ) as Instrument[];
    const filteredInstruments =
      newUpdatedInstruments?.filter(
        (instrument) => instrument.high && instrument.scGrouped !== 'IND',
      ) || [];

    const sorted = filteredInstruments.sort((a, b) => {
      const changeA = Number(a?.iNetVperprVPr || a?.perfPercentage);
      const changeB = Number(b?.iNetVperprVPr || b?.perfPercentage);
      return order === 'asc' ? changeB - changeA : changeA - changeB;
    });
    return sorted.slice(0, limit);
  };

  const trackClickEvent = (
    instrument: Instrument | null,
    type: 'calls' | 'puts' | 'logo',
  ) => {
    tealiumTrackEvent({
      type: 'link',
      payload: {
        event_name: 'integration_click',
        integration_action: 'Click ' + type,
        integration_name: 'top_flop',
        integration_sponsor: 'BNPP',
        event_trigger: 'custom',
        integration_element: order === 'asc' ? 'top' : 'flop',
        integration_valor: instrument?.instrumentKey,
        integration_label: instrument?.isin,
      },
    });
  };

  const filteredInstruments = sortedInstruments(instruments, limit, order);

  if (filteredInstruments.length === 0) {
    return <p>Derzeit keine Daten vorhanden.</p>;
  }

  return (
    <div className={styles.Wrapper}>
      <table>
        <thead>
          <tr className={styles.Heading}>
            <th className={styles.TextLeft}>Name</th>
            <th className={styles.TextRight}>Aktuell</th>
            <th className={styles.TextRight}>+/-%</th>
            {addPutsCallsLinks ? (
              <>
                <th></th>
                <th></th>
              </>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {filteredInstruments.map((instrument) => {
            return (
              <tr key={instrument?.instrumentKey}>
                <td>
                  <div className={styles.Cell}>
                    <Link
                      to={'/' + instrument.fullquoteUri}
                      className={classNames(styles.Link, styles.DefaultText)}
                    >
                      {instrument.mName}
                    </Link>
                    <div className={styles.Info}>
                      {headerMapping['trendArrow'].formatter({
                        value:
                          instrument.iNetVperprVPr || instrument.perfPercentage,
                        instrument: instrument,
                      })}{' '}
                      {' | '} <span>{instrument.mCur}</span>
                      {' | '} <span>{instrument.market}</span>
                    </div>
                  </div>
                </td>
                <td className={classNames(styles.TextRight)}>
                  <div className={styles.Cell}>
                    <div className={styles.DefaultText}>
                      {headerMapping['lval'].formatter({
                        value: instrument.lval,
                        instrument: instrument,
                      })}
                    </div>
                    <div className={styles.Info}>
                      {headerMapping['lvalDatetime'].formatter({
                        value: instrument.lvalDatetime,
                        instrument: instrument,
                      })}
                    </div>
                  </div>
                </td>
                <td className={classNames(styles.TextRight)}>
                  <div className={styles.Cell}>
                    <div className={styles.DefaultText}>
                      {headerMapping['iNetVperprVPr'].formatter({
                        value:
                          instrument.iNetVperprVPr || instrument.perfPercentage,
                        instrument: instrument,
                      })}
                    </div>
                    {headerMapping['iNetVperprV'].formatter({
                      value: instrument.iNetVperprV || instrument.nc2Norm,
                      instrument: instrument,
                    })}
                  </div>
                </td>
                {addPutsCallsLinks ? (
                  <>
                    <td className={styles.IconCell}>
                      <Link
                        className={classNames(styles.Icon, styles.Calls)}
                        to={getProductLink('calls', instrument, !!isHybridApp)}
                        target="_blank"
                      >
                        <div
                          onClick={() => trackClickEvent(instrument, 'calls')}
                          onKeyDown={() => trackClickEvent(instrument, 'calls')}
                          tabIndex={0}
                          role="button"
                        >
                          <span className={styles.TopIcon}>
                            <Icon type={'IconChevronUp'} />
                          </span>
                          <span className={styles.BottomIcon}>
                            <Icon type={'IconChevronUp'} />
                          </span>
                        </div>
                        <span>Calls</span>
                      </Link>
                    </td>
                    <td className={styles.IconCell}>
                      <Link
                        className={classNames(styles.Icon, styles.Puts)}
                        to={getProductLink('puts', instrument, !!isHybridApp)}
                        target="_blank"
                      >
                        <div
                          onClick={() => trackClickEvent(instrument, 'puts')}
                          onKeyDown={() => trackClickEvent(instrument, 'puts')}
                          tabIndex={0}
                          role="button"
                        >
                          <span className={styles.TopIcon}>
                            <Icon type={'IconChevronDown'} />
                          </span>
                          <span className={styles.BottomIcon}>
                            <Icon type={'IconChevronDown'} />
                          </span>
                        </div>
                        <span>Puts</span>
                      </Link>
                    </td>
                  </>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </table>
      {sponsorImage ? (
        <div
          onClick={() => trackClickEvent(null, 'logo')}
          onKeyDown={() => trackClickEvent(null, 'logo')}
          tabIndex={0}
          role="button"
        >
          {/* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'To'. */}
          <Link to={sponsorImageUrl} target="_blank">
            <div className={styles.Image}>
              <p>presented by</p>
              <div>
                <img src={sponsorImage} alt="" />
              </div>
            </div>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default TopFlopTable;
