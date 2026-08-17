import breadcrumbsFactory from '../../../../../common/components/Breadcrumbs/factory';
import Link from '../../../../../common/components/LinkLegacy';
import { AUTHOR_PAGE } from '../../../../../common/screens/Author/constants';
import styles from './styles.legacy.css';
import {
  BreadcrumbsProps,
  GetBreadcrumbsFactoryStylesByProps,
} from '../../../../../common/components/Breadcrumbs/typings';

type BreadcrumbsPropsInner = BreadcrumbsProps;

const getStylesByProps: GetBreadcrumbsFactoryStylesByProps<
  BreadcrumbsPropsInner
> = (props) => {
  const { origin } = props;
  if (origin === AUTHOR_PAGE) {
    return {
      OuterWrapper: '',
      Wrapper: '',
      List: styles.BreadcrumbList,
      Link: styles.BreadcrumbLink,
    };
  }

  return {
    OuterWrapper: '',
    Wrapper: '',
    List: styles.BreadcrumbList,
    Link: styles.BreadcrumbLink,
  };
};

export default breadcrumbsFactory({
  Link,
  styles: getStylesByProps,
});
