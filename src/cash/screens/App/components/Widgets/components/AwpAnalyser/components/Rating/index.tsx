import React, { ReactElement, memo } from 'react';
import createComponentSwitch from '../../../../../../../../shared/decorators/componentSwitch';
import ChunkProgressBar from './components/ChunkProgressBar';
import ProgressBar from './components/ProgressBar';
import RatingRange from './components/Range';
import {
  RATING_CHUNK_PROGRESS_BAR,
  RATING_PROGRESS_BAR,
  RATING_RANGE,
} from './constants';
import { RatingProps } from './typings';

const Switch = createComponentSwitch({
  [RATING_RANGE]: RatingRange,
  [RATING_PROGRESS_BAR]: ProgressBar,
  [RATING_CHUNK_PROGRESS_BAR]: ChunkProgressBar,
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const Widgets = (props): ReactElement => {
  return <Switch component={props.component} {...props} />;
};

export default memo<RatingProps>(Widgets);
