import classNames from 'classnames';
import breadcrumbsFactory from '../../../../../common/components/Breadcrumbs/factory';
import Link from '../../../../../common/components/LinkLegacy';
import { LANDING_PAGE_TYPE_HOME } from '../../../../../shared/constants/content';
import styles from './styles.legacy.css';
import {
  BreadcrumbsProps,
  GetBreadcrumbsFactoryStylesByProps,
} from '../../../../../common/components/Breadcrumbs/typings';

type BreadcrumbsPropsInner = BreadcrumbsProps;

const getStylesByProps: GetBreadcrumbsFactoryStylesByProps<
  BreadcrumbsPropsInner
> = (props) => {
  const { addClass, origin } = props;
  return {
    OuterWrapper: '',
    Wrapper: classNames(styles.Wrapper, {
      /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
      [addClass]: !!addClass,
    }),
    Placeholder:
      (origin === LANDING_PAGE_TYPE_HOME && styles.Placeholder) || '',
    List: styles.BreadcrumbList,
    Link: styles.BreadcrumbLink,
    Title: styles.Title,
  };
};

const hasPlaceholder = ({ origin }: BreadcrumbsPropsInner): boolean =>
  origin === LANDING_PAGE_TYPE_HOME;

const Breadcrumbs = breadcrumbsFactory({
  Link,
  styles: getStylesByProps,
  hasPlaceholder: hasPlaceholder,
});

export default Breadcrumbs;
