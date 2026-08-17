import { useBreadcrumbsData } from '../../../shared/hooks/useBreadcrumbsData';
import { BreadcrumbsProps } from '../Breadcrumbs/typings';

const BreadcrumbsProvider = (props: BreadcrumbsProps) => {
  useBreadcrumbsData({ activeMenuTrail: props.items });
  return null;
};
export default BreadcrumbsProvider;
