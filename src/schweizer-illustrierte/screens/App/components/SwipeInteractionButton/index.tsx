import classNames from 'classnames';
import SwipeInteractionButtonFactory from '../../../../../common/components/SwipeInteractionButton/factory';
import styles from './styles.legacy.css';
import {
  SwipeInteractionButtonFactoryOptionsStylesByProps,
  SwipeInteractionButtonProps,
} from '../../../../../common/components/SwipeInteractionButton/typings';

const getStyleByProps: SwipeInteractionButtonFactoryOptionsStylesByProps<
  SwipeInteractionButtonProps
> = ({ direction }) => {
  return {
    Button: classNames(styles.Button, {
      [styles.Right]: direction === 'next',
      [styles.Left]: direction === 'prev',
    }),
    HideButton: styles.HideButton,
    InViewAnimation: classNames({
      [styles.InViewAnimationRight]: direction === 'next',
      [styles.InViewAnimationLeft]: direction === 'prev',
    }),
  };
};

const SwipeInteractionButton = SwipeInteractionButtonFactory({
  styles: getStyleByProps,
});

export default SwipeInteractionButton;
