import React, { ReactElement, memo } from 'react';
import createComponentSwitch from '../../../../shared/decorators/componentSwitch';
import JobSearch from './components/JobSearch';
import { WIDGET_JOB_SEARCH } from './constants';
import { WidgetsProps } from './typings';

const Switch = createComponentSwitch({
  [WIDGET_JOB_SEARCH]: JobSearch,
});

const Widgets = (props: any): ReactElement => {
  return <Switch component={props.component} {...props} />;
};

export default memo<WidgetsProps>(Widgets);
