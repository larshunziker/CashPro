/* istanbul ignore file */

import classNames from 'classnames';
import utilityLinkFactory from '../../../../../../../common/components/UtilityBar/components/UtilityLink/factory';
import SVGIcon from '../../../SVGIcon';
import { UTILITY_BAR_ORIGIN_OVERLAY } from '../../../../../../../shared/constants/utilitybar';
import { UTILITY_BAR_ORIGIN_HEADER } from '../../../../../../../common/components/UtilityBar/components/UtilityOverlay/constants';
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
      [styles.HeaderLink]: origin === UTILITY_BAR_ORIGIN_HEADER,
    }),
    Active: styles.Active,
    Label: styles.Label,
    Badge: styles.Badge,
    CommentCount: styles.CommentCount,
    Icon: styles.Icon,
    Restricted: styles.Restricted,
  };
};

export default utilityLinkFactory({
  SVGIcon,
  styles: getStyleByProps,
});
