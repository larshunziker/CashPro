import React from 'react';
import classNames from 'classnames';
import { getTimeToReadLabel } from './shared/helpers';
import { TimeToReadFactoryOptions, TimeToReadProps } from './typings';

const TimeToReadFactory = ({
  styles,
  Icon,
  prefix = 'Lesezeit:',
  language = 'DE',
}: TimeToReadFactoryOptions) => {
  const TimeToRead = ({ seconds, addClass }: TimeToReadProps) => {
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'number | undefined' is not assignable to parameter of type 'number'. */
    const timeToReadLabel = getTimeToReadLabel(seconds, language);

    if (!timeToReadLabel) {
      return null;
    }

    return (
      <div className={classNames(styles.Wrapper, addClass)}>
        {Icon && <Icon type="IconClock" addClass={styles.IconClock} />}
        {`${prefix} ${timeToReadLabel}`}
      </div>
    );
  };

  return TimeToRead;
};

export default TimeToReadFactory;
