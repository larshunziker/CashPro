import React, { ReactElement } from 'react';
import Header from '../Header';
import HeaderInner from '../Header/components/HeaderInner';
import { TRACKING_CLASS_SITE_HEADER } from '../../../../../shared/constants/tracking';

/* @ts-ignore TODO: TS7031 ->  Binding element 'contentType' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'channel' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'subtypeValue' implicitly has an 'any' type. */
const HeaderArea = ({ contentType, channel, subtypeValue }): ReactElement => {
  return (
    <div className={TRACKING_CLASS_SITE_HEADER}>
      <Header
        hasStickiness={true}
        contentType={contentType}
        channel={channel}
        subtypeValue={subtypeValue}
      >
        <HeaderInner />
      </Header>
    </div>
  );
};

export default HeaderArea;
