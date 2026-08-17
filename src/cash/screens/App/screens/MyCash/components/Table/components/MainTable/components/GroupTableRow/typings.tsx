import { ExtendedInstrument } from '../../../TableRow/typings';

export type GroupTableRowProps = {
  group: string;
  groupType: string;
  tableFieldHeaders: string[];
  groupedInstruments: ExtendedInstrument[];
};
