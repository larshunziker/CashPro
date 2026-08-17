import React from 'react';
import EsiRenderer from '../../../../../EsiRenderer';
import {
  PIANO_CORPORATE_ACTIONS_WIDGET,
  PIANO_ORDERBOOK_WIDGET,
} from '../../../../../../../../../shared/constants/piano';
import {
  SUBSCRIPTION_TYPE_ANLEGER,
  SUBSCRIPTION_TYPE_BANKING,
  SUBSCRIPTION_TYPE_PROFI,
} from '../../../../../../constants';
import {
  ESI_WIDGETS_CORPORATE_ACTION_PATH,
  ESI_WIDGETS_ORDERBOOK_PATH,
} from './constants';
import { EsiRendererProps } from '../../../../../../../../../common/components/EsiRenderer/typings';

const EsiComponent = ({
  link,
  subscriptions,
  clientOnly = false,
}: WidgetParagraph &
  Pick<EsiRendererProps, 'clientOnly'> & {
    subscriptions: string[];
  }) => {
  if (!link?.path) {
    return null;
  }
  if (link.path.indexOf(ESI_WIDGETS_ORDERBOOK_PATH) > -1) {
    return (
      <>
        <EsiRenderer
          esiSrc={link.path}
          publication="cash"
          clientOnly={clientOnly}
        />
        {((!subscriptions ||
          (subscriptions &&
            subscriptions.indexOf(SUBSCRIPTION_TYPE_BANKING) === -1 &&
            subscriptions.indexOf(SUBSCRIPTION_TYPE_PROFI) === -1)) && (
          <section className={PIANO_ORDERBOOK_WIDGET} />
        )) ||
          null}
      </>
    );
  } else if (link.path.indexOf(ESI_WIDGETS_CORPORATE_ACTION_PATH) > -1) {
    return (
      (subscriptions &&
        (subscriptions.indexOf(SUBSCRIPTION_TYPE_BANKING) > -1 ||
          subscriptions.indexOf(SUBSCRIPTION_TYPE_ANLEGER) > -1 ||
          subscriptions.indexOf(SUBSCRIPTION_TYPE_PROFI) > -1) && (
          <>
            <EsiRenderer
              esiSrc={link.path}
              publication="cash"
              clientOnly={true}
            />
          </>
        )) || <section className={PIANO_CORPORATE_ACTIONS_WIDGET} />
    );
  } else {
    return (
      <EsiRenderer
        esiSrc={link.path}
        publication="cash"
        clientOnly={clientOnly}
      />
    );
  }
};

export default EsiComponent;
