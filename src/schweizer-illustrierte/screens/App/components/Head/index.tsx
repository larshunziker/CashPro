import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import cssClassByChannel from '../../../../shared/helpers/cssClassByChannel';
import settingsStateSelector from '../../../../shared/selectors/settingsStateSelector';
import Badge from '../Badge';
import { NATIVE_ADVERTISING_CONTENT_TYPE } from '../../../../../shared/constants/content';
import { ADVERTORIAL } from '../../constants';
import styles from './styles.legacy.css';
import { ActiveMainChannel } from '../../../../shared/types';
import { HeadComponent, HeadProps } from './typings';

type HeadPropsInner = HeadProps & {
  activeMainChannel: ActiveMainChannel;
  activeContentType: string;
};

const Head: HeadComponent = ({
  title,
  shortTitle,
  lead,
  activeContentType,
  activeMainChannel,
}: HeadPropsInner): ReactElement => {
  if (!title && !shortTitle && !lead) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  const isNativeAdvertising =
    activeContentType === NATIVE_ADVERTISING_CONTENT_TYPE;

  const getThemedClass = cssClassByChannel(styles, activeMainChannel);

  return (
    <div data-testid="head-wrapper" className={getThemedClass('Wrapper')}>
      {shortTitle && (
        <div
          className={classNames({
            /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
            [getThemedClass('ShortTitleWrapper')]: isNativeAdvertising,
          })}
        >
          {isNativeAdvertising && (
            <div className={styles.BadgeWrapper}>
              <Badge label={ADVERTORIAL} color="grayD" />
            </div>
          )}
          {!isNativeAdvertising && (
            <span
              data-testid="head-shorttitle-wrapper"
              className={getThemedClass('HeadingCatch3')}
            >
              {shortTitle}
            </span>
          )}
        </div>
      )}
      {title && (
        <h1
          data-testid="head-title-wrapper"
          className={getThemedClass('Heading1A')}
        >
          <span>{title}</span>
        </h1>
      )}
      {lead && (
        <p data-testid="head-lead-wrapper" className={getThemedClass('Lead1')}>
          {lead}
        </p>
      )}
    </div>
  );
};

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  activeContentType: settingsStateSelector(state).activeContentType,
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

export default connect(mapStateToProps)(Head);
