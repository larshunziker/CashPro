export type ParagraphProps = {
  pageBody: any;
  showCap?: boolean;
  applyDataFilter?: (pageBody: ParagraphInterface[]) => ParagraphInterface[];
  hasContainer?: boolean;
  colStyle?: string;
  origin?: string;
  page?: number;
  props?: {};
};
