import classNames from 'classnames';
import breadcrumbsFactory from '../../../../../common/components/Breadcrumbs/factory';
import Link from '../../../../../common/components/LinkLegacy';
import ScrollButton from './components/ScrollButton';
import { AUTHOR_PAGE } from '../../../../../common/screens/Author/constants';
import { LANDING_PAGE_TYPE_HOME } from '../../../../../shared/constants/content';
import styles from './styles.legacy.css';
import {
  BreadcrumbsProps,
  GetBreadcrumbsFactoryStylesByProps,
} from '../../../../../common/components/Breadcrumbs/typings';

type BreadcrumbsPropsInner = BreadcrumbsProps;

const isAuthorPage = (origin: string) => origin === AUTHOR_PAGE;

const getStylesByProps: GetBreadcrumbsFactoryStylesByProps<
  BreadcrumbsPropsInner
> = (props) => {
  const { addClass, origin } = props;

  return {
    OuterWrapper: '',
    Wrapper: classNames(styles.Wrapper, {
      [addClass || '']: !!addClass,
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
  ScrollButton: ScrollButton,
  isAuthorPage: isAuthorPage,
});

export default Breadcrumbs;
