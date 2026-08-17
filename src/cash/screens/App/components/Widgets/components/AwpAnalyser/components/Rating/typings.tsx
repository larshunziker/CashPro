import {
  RATING_CHUNK_PROGRESS_BAR,
  RATING_PROGRESS_BAR,
  RATING_RANGE,
} from './constants';
import { ChunkProgressBarProps } from './components/ChunkProgressBar/typings';
import { ProgressBarProps } from './components/ProgressBar/typings';

export type RatingProps = Partial<ProgressBarProps> &
  Partial<ChunkProgressBarProps> & {
    component:
      | typeof RATING_RANGE
      | typeof RATING_PROGRESS_BAR
      | typeof RATING_CHUNK_PROGRESS_BAR;
    max: number;
    rating?: number;
  };
