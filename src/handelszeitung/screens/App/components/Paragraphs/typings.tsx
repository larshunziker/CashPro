import { AppNexusFactoryProps } from '../../../../../common/components/AppNexus/typings';

export type ParagraphsProps = Pick<AppNexusFactoryProps, 'isAdSuppressed'> & {
  pageBody: any;
  contentGcid?: string;
  showCap?: boolean;
  applyDataFilter?: (pageBody: Array<any>) => Array<any>;
  colStyle?: string;
  params?: Object;
  hasContainer?: boolean;
  addClass?: string;
  origin?: string;
  addSectionClass?: string;
};
