// istanbul ignore file

import classNames from 'classnames';
import tooltipFactory from '../../../../../common/components/Tooltip/factory';
import Link from '../../../../../common/components/Link';
import { isAdvertising } from '../../../../shared/helpers/isAdvertising';
import { INFOBOX_COMPONENT_GUIDER } from '../../../../../shared/constants/content';
import { MINISTAGE_COMPONENT_GUIDER } from '../../../../../shared/constants/paragraphs';
import styles from './styles.legacy.css';
import type {
  TooltipFactoryOptionsStyles,
  TooltipFactoryProps,
} from '../../../../../common/components/Tooltip/typings';

type TooltipPropsInner = TooltipFactoryProps;

const getStylesByProps = ({
  origin = '',
}: TooltipPropsInner): TooltipFactoryOptionsStyles => {
  const isAdvertisingType = isAdvertising(origin);

  const isInfobox = origin === INFOBOX_COMPONENT_GUIDER;
  const isGuiderMiniStage = origin === MINISTAGE_COMPONENT_GUIDER;

  return {
    Wrapper: classNames(styles.Wrapper, {
      [styles.WrapperNativeAdvertising]: isAdvertisingType,
      [styles.WrapperGuiderBox]: isInfobox,
    }),
    Button: classNames(styles.Button, styles.ButtonAdvertorial, {
      [styles.ButtonNativeAdvertising]: isAdvertisingType,
      [styles.ButtonMinistage]: isGuiderMiniStage,
      [styles.ButtonGuiderBox]: isInfobox,
    }),
    TooltipWrapper: classNames(styles.TooltipWrapper, {
      [styles.TooltipWrapperNativeAdvertising]: isAdvertisingType,
      [styles.TooltipWrapperMinistage]: isGuiderMiniStage,
      [styles.TooltipWrapperGuiderBox]: isInfobox,
    }),
    Tooltip: styles.Tooltip,
    ButtonOpen: classNames(styles.ButtonOpen, {
      [styles.ButtonOpenGuiderBox]: isInfobox,
    }),
    ButtonText: classNames(styles.ButtonText, {
      [styles.ButtonTextGuiderBox]: isInfobox,
    }),
    Content: styles.Content,
    Link: styles.Link,
  };
};

export default tooltipFactory({
  Link,
  styles: getStylesByProps,
});
