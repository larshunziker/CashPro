/* istanbul ignore file */

import { connect } from 'react-redux';
import classNames from 'classnames';
import utilityLinkFactory from '../../../../../../../common/components/UtilityBar/components/UtilityLink/factory';
import cssClassByChannel from '../../../../../../shared/helpers/cssClassByChannel';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import SVGIcon from '../../../SVGIcon';
import {
  UTILITY_BAR_ORIGIN_INLINE_OVERLAY,
  UTILITY_BAR_ORIGIN_OVERLAY,
  UTILITY_BAR_THEME_LIGHT,
} from '../../../../../../../shared/constants/utilitybar';
import styles from './styles.legacy.css';
import {
  UtilityLinkFactoryOptionsStyles,
  UtilityLinkProps,
} from '../../../../../../../common/components/UtilityBar/components/UtilityLink/typings';
import { ActiveMainChannel } from '../../../../../../shared/types';

type UtilityLinkPropsInner = UtilityLinkProps & {
  activeMainChannel: ActiveMainChannel;
};

const getStyleByProps = ({
  origin,
  theme,
  activeMainChannel,
}: UtilityLinkPropsInner): UtilityLinkFactoryOptionsStyles => {
  const getThemedClass = cssClassByChannel(styles, activeMainChannel || '');

  return {
    Link: classNames(styles.Link, getThemedClass('LinkHover'), {
      [styles.LinkOverlay]: origin === UTILITY_BAR_ORIGIN_OVERLAY,
      [styles.LinkOverlayInlined]: origin === UTILITY_BAR_ORIGIN_INLINE_OVERLAY,
      [styles.LinkLight]: theme === UTILITY_BAR_THEME_LIGHT,
    }),
    Active: styles.Active,
    Label: styles.Label,
    CommentCount: styles.CommentCount,
    Badge: styles.Badge,
    Icon: styles.Icon,
  };
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

export default connect(mapStateToProps)(
  utilityLinkFactory({
    SVGIcon,
    styles: getStyleByProps,
  }),
);
