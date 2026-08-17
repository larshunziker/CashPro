/* istanbul ignore file */

import classNames from 'classnames';
import utilityLinkFactory from '../../../../../../../common/components/UtilityBar/components/UtilityLink/factory';
import SVGIcon from '../../../SVGIcon';
import { UTILITY_BAR_ORIGIN_HEADER } from '../../../../../../../common/components/UtilityBar/components/UtilityOverlay/constants';
import { UTILITY_BAR_ORIGIN_OVERLAY } from '../../../../../../../shared/constants/utilitybar';
import styles from './styles.legacy.css';
import {
  UtilityLinkFactoryOptionsStyles,
  UtilityLinkProps,
} from '../../../../../../../common/components/UtilityBar/components/UtilityLink/typings';

const getStyleByProps = ({
  origin,
}: UtilityLinkProps): UtilityLinkFactoryOptionsStyles => {
  return {
    Link: classNames(styles.Link, {
      [styles.LinkOverlay]: origin === UTILITY_BAR_ORIGIN_OVERLAY,
      [styles.LinkHeader]: origin === UTILITY_BAR_ORIGIN_HEADER,
    }),
    Active: styles.Active,
    Label: styles.Label,
    CommentCount: styles.CommentCount,
    Badge: styles.Badge,
    Icon: styles.Icon,
    Restricted: styles.Restricted,
  };
};

export default utilityLinkFactory({
  SVGIcon,
  styles: getStyleByProps,
});
