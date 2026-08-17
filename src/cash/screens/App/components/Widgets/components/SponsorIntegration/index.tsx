import React, { ReactElement, memo } from 'react';
import createComponentSwitch from '../../../../../../shared/decorators/componentSwitch';
import SponsorIntegrationVanguard from './Vanguard';
import { SPONSOR_INTEGRATION_VANGUARD } from './constants';
import { SponsorIntegrationProps } from './typings';

const Switch = createComponentSwitch({
  [SPONSOR_INTEGRATION_VANGUARD]: SponsorIntegrationVanguard,
});

const SponsorIntegration = ({
  widgetParagraph,
  sponsor,
}: SponsorIntegrationProps): ReactElement => {
  return <Switch component={sponsor} widgetParagraph={widgetParagraph} />;
};

export default memo<SponsorIntegrationProps>(SponsorIntegration);
