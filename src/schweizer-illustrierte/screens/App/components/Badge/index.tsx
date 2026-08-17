import { connect } from 'react-redux';
import classNames from 'classnames';
import badgeFactory from '../../../../../common/components/Badge/factory';
import cssClassByChannel from '../../../../shared/helpers/cssClassByChannel';
import settingsStateSelector from '../../../../shared/selectors/settingsStateSelector';
import { BADGE_COLOR_DEFAULT } from '../../../../../common/components/Badge/constants';
import styles from './styles.legacy.css';
import type { BadgeProps } from './typings';
import type { BadgeFactoryOptionsStyles } from '../../../../../common/components/Badge/typings';
import { ActiveMainChannel } from '../../../../shared/types';

type BadgePropsInner = BadgeProps & {
  activeMainChannel: ActiveMainChannel;
};

export const getStylesByProps = ({
  activeMainChannel,
  isSmall,
  color,
}: BadgePropsInner): BadgeFactoryOptionsStyles => {
  const getThemedClass = cssClassByChannel(styles, activeMainChannel || '');

  const themedStyles: BadgeFactoryOptionsStyles = {
    Wrapper: styles.Wrapper,
    Content: classNames(getThemedClass('Content'), {
      [styles.ContentSmaller]: isSmall,
    }),
  };

  const firstUpper = (value: string): string => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  if (
    color &&
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '`Content${string}`' can't be used to index type '{ rea */
    styles[`Content${firstUpper(color)}`] &&
    color !== BADGE_COLOR_DEFAULT
  ) {
    themedStyles['Content'] = classNames(
      styles.Content,
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '`Content${string}`' can't be used to index type '{ rea */
      styles[`Content${firstUpper(color)}`],
      {
        [styles.ContentSmaller]: isSmall || false,
      },
    );
  }

  return themedStyles;
};

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

const Badge = connect(mapStateToProps)(
  badgeFactory({
    styles: getStylesByProps,
  }),
);

export default Badge;
