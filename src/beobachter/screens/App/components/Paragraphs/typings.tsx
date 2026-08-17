export type ParagraphsProps = {
  pageBody: any;
  applyDataFilter?: (pageBody: Array<any>) => Array<any>;
  colStyle?: string;
  params?: Record<string, any>;
  hasContainer?: boolean;
  addClass?: string;
  origin: string;
  addSectionClass?: string;
  contentGcid?: string;
  hasExtendedTitles?: boolean;
};
