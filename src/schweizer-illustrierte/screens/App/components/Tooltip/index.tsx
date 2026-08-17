/* istanbul ignore file */

import { ComponentType } from 'react';
import tooltipFactory from '../../../../../common/components/Tooltip/factory';
import cssClassByChannel from '../../../../shared/helpers/cssClassByChannel';
import Link from '../../../../../common/components/Link';
import styles from './styles.legacy.css';
import {
  TooltipFactoryOptionsStylesByProps,
  TooltipFactoryProps,
} from '../../../../../common/components/Tooltip/typings';
import { ActiveMainChannel } from '../../../../shared/types';

type TooltipPropsInner = TooltipFactoryProps & {
  activeMainChannel?: ActiveMainChannel;
};

/* @ts-ignore TODO: TS2322 ->  Type '({ activeMainChannel } */
const getStylesByProps: TooltipFactoryOptionsStylesByProps<
  TooltipPropsInner
> = ({ activeMainChannel }) => {
  const getThemedClass = cssClassByChannel(styles, activeMainChannel || '');

  return {
    Wrapper: styles.Wrapper,
    Button: getThemedClass('Button'),
    TooltipWrapper: getThemedClass('TooltipWrapper'),
    Tooltip: styles.Tooltip,
    ButtonOpen: styles.ButtonOpen,
    ButtonText: getThemedClass('ButtonText'),
    ButtonTextOpen: styles.ButtonTextOpen,
    ButtonTextClosed: styles.ButtonTextClosed,
    Content: styles.Content,
    Link: styles.Link,
  };
};

const Tooltip: ComponentType<TooltipPropsInner> = tooltipFactory({
  Link,
  styles: getStylesByProps,
});

export default Tooltip;
