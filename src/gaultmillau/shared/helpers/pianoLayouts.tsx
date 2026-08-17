import {
  GRID_LAYOUT_MIXED_WITH_PIANO,
  GRID_LAYOUT_MIXED_WITH_PIANO_1,
  GRID_LAYOUT_MIXED_WITH_PIANO_2,
  GRID_LAYOUT_MIXED_WITH_PIANO_3,
  GRID_LAYOUT_MIXED_WITH_PIANO_4,
} from '../../screens/App/components/TeaserGrid/gridConfigs/constants';

export const getPianoLayout = (edges: number) => {
  if (!edges) {
    return GRID_LAYOUT_MIXED_WITH_PIANO;
  }

  switch (edges) {
    case 1:
      return GRID_LAYOUT_MIXED_WITH_PIANO_1;
    case 2:
      return GRID_LAYOUT_MIXED_WITH_PIANO_2;
    case 3:
      return GRID_LAYOUT_MIXED_WITH_PIANO_3;
    case 4:
      return GRID_LAYOUT_MIXED_WITH_PIANO_4;
    default:
      return GRID_LAYOUT_MIXED_WITH_PIANO;
  }
};
