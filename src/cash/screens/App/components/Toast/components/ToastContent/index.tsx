import classNames from 'classnames';
import toastContentFactory from '../../../../../../../common/components/ToastContent/factory';
import Link from '../../../../../../../common/components/Link';
import Icon from '../../../Icon';
import {
  TOAST_TYPE_ERROR,
  TOAST_TYPE_SUCCESS,
  TOAST_TYPE_WARNING,
} from '../../../../../../../common/components/ToastContent/constants';
import styles from './styles.legacy.css';

export const getToastIconByProps = (type: string) => {
  switch (type) {
    case TOAST_TYPE_ERROR:
      return 'IconCircleExclamation';
    case TOAST_TYPE_SUCCESS:
      return 'IconCircleCheck';
    case TOAST_TYPE_WARNING:
      return 'IconTriangleExclamation';
    default:
      return 'IconCircleInfo';
  }
};

export const getStylesByProps = (type: string) => ({
  Wrapper: classNames(styles.Wrapper, {
    [styles.WrapperError]: type === TOAST_TYPE_ERROR,
    [styles.WrapperSuccess]: type === TOAST_TYPE_SUCCESS,
    [styles.WrapperWarning]: type === TOAST_TYPE_WARNING,
  }),
  ContentWrapper: styles.ContentWrapper,
  Content: styles.Content,
  Link: styles.Link,
  CloseIcon: styles.CloseIcon,
  CloseButton: styles.CloseButton,
  ToastIcon: styles.ToastIcon,
});

const ToastContent = toastContentFactory({
  Link,
  Icon,
  toastIcon: getToastIconByProps,
  styles: getStylesByProps,
});

export default ToastContent;
