/* istanbul ignore file */

import classNames from 'classnames';
import alertItemFactory from '../../../../../common/components/AlertItem/factory';
import styles from './styles.legacy.css';
import {
  AlertItemFactoryOptionStyles,
  AlertItemProps,
} from '../../../../../common/components/AlertItem/typings';

const getStylesByProps = ({
  theme = 'default',
}: AlertItemProps): AlertItemFactoryOptionStyles => {
  return {
    AlertItemImageWrapper: styles.AlertItemImageWrapper,
    AlertItemImage: styles.AlertItemImage,
    AlertItemWrapper: classNames(styles.AlertItemWrapper, {
      [styles.AlertItemWrapperLightTheme]: theme === 'light',
    }),
    Text: classNames(styles.Text, {
      [styles.TextLightTheme]: theme === 'light',
    }),
    ChildWrapper: styles.ChildWrapper,
  };
};

export default alertItemFactory({
  styles: getStylesByProps,
});
