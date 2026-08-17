/* istanbul ignore file */

import classNames from 'classnames';
import utilityLinkFactory from '../../../../../../../common/components/UtilityBar/components/UtilityLink/factory';
import SVGIcon from '../../../SVGIcon';
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
    }),
    Active: styles.Active,
    Label: styles.Label,
    CommentCount: '',
    Badge: '',
    Icon: styles.Icon,
    Restricted: '',
  };
};

export default utilityLinkFactory({
  /* @ts-ignore TODO: TS2322 ->  Type 'MemoExoticComponent<({ ...props } */
  SVGIcon,
  styles: getStyleByProps,
});
