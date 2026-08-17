import classNames from 'classnames';
import tooltipFactory from '../../../../../common/components/Tooltip/factory';
import Link from '../../../../../common/components/Link';
import { ADVERTISING_TYPE_BRANDREPORT } from '../../../../../shared/constants/content';
import { WIDGET_SAVINGS_PLAN_CALCULATOR } from '../Widgets/constants';
import styles from './styles.legacy.css';
import {
  TooltipFactoryOptionsStyles,
  TooltipFactoryProps,
} from '../../../../../common/components/Tooltip/typings';

type TooltipPropsInner = TooltipFactoryProps;

const getStylesByProps = ({
  origin = '',
}: TooltipPropsInner): TooltipFactoryOptionsStyles => ({
  Wrapper: classNames(styles.Wrapper, {
    [styles.BrandreportWrapper]: origin === ADVERTISING_TYPE_BRANDREPORT,
    [styles.Rotated]: origin === WIDGET_SAVINGS_PLAN_CALCULATOR,
    [styles.RotatedFromLeft]: origin === 'mini-portfolio',
    [styles.LinkContent]: origin === 'mini-portfolio',
  }),
  Button: styles.Button,
  TooltipWrapper: styles.TooltipWrapper,
  Tooltip: styles.Tooltip,
  ButtonOpen: styles.ButtonOpen,
  ButtonText: styles.ButtonText,
  Content: styles.Content,
  Link: styles.Link,
  CloseIconWithin: origin === 'mini-portfolio' ? styles.CloseIconWithin : '',
});

export default tooltipFactory({
  Link,
  styles: getStylesByProps,
});
