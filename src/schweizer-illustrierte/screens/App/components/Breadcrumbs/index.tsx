import classNames from 'classnames';
import breadcrumbsFactory from '../../../../../common/components/Breadcrumbs/factory';
import Link from '../../../../../common/components/LinkLegacy';
import { AUTHOR_PAGE } from '../../../../../common/screens/Author/constants';
import { IMAGE_GALLERY_DETAIL_SCREEN } from '../../screens/ImageGalleryArticle/constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import helpers from '../../assets/styles/helpers.legacy.css';
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
  if (origin === IMAGE_GALLERY_DETAIL_SCREEN) {
    return {
      OuterWrapper: classNames(grid.Container, styles.WhiteFont),
      Wrapper: classNames(helpers.PullOutSm, styles.BreadcrumbWrapper),
      List: styles.BreadcrumbList,
      Link: styles.BreadcrumbLink,
    };
  }

  if (origin === AUTHOR_PAGE) {
    return {
      OuterWrapper: '',
      Wrapper: '',
      List: styles.BreadcrumbList,
      Link: styles.BreadcrumbLink,
    };
  }

  return {
    OuterWrapper: grid.Container,
    Wrapper: classNames(helpers.PullOutSm, styles.BreadcrumbWrapper),
    List: styles.BreadcrumbList,
    Link: styles.BreadcrumbLink,
  };
};

export default breadcrumbsFactory({
  Link,
  styles: getStylesByProps,
});
