import React, { ReactElement, memo } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../shared/decorators/componentSwitch'. '/Users/bhs/code/work/ */
import createComponentSwitch from '../../../../../shared/decorators/componentSwitch';
import PersonDetail from './components/PersonDetail';
import PersonDetailLegacy from './components/PersonDetailLegacy';
import { PERSON_DETAIL, PERSON_DETAIL_LEGACY } from './constants';
import { PersonProps } from './typings';

const Switch = createComponentSwitch({
  [PERSON_DETAIL_LEGACY]: PersonDetailLegacy,
  [PERSON_DETAIL]: PersonDetail,
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const Person = (props): ReactElement => {
  return <Switch component={props.component} {...props} />;
};

export default memo<PersonProps>(Person);
