# ToastContent Factory

The ToastContent Factory renders what should be rendered within a Toast (created using the React toastify factory).

## Usage

ToastContent factory call inside of the **APP**:

```tsx
import toastContentFactory from 'ToastContent/factory';
import classNames from 'classnames';
import Link from 'Link';
import Icon from 'Icon';
import {
  TOAST_TYPE_ERROR,
  TOAST_TYPE_WARNING,
  TOAST_TYPE_SUCCESS,
} from 'ToastContent/constants';
import styles from './styles.legacy.css';
import type { ToastContentFactoryOptionsStyles } from 'ToastContent/typings';

const getToastIconByProps: Function = (type: string): string => {
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

const getStylesByProps: Function = (
  type: string,
): ToastContentFactoryOptionsStyles => ({
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
```

ToastContent Component usage:

```html
<ToastContent content="{message}" type="{TOAST_TYPE_ERROR}" link="{link}" />
```

In order to actually display the toast, make sure that the ToastContainer is added on the application.
(Preferably on the App/index.js to be available across the publication).

To actually display the toast, you need to call the toast function and add the ToastContent as the
first parameter. For more information how the toast library works, see their documentation on Github:
https://github.com/fkhadra/react-toastify

```tsx
import { toast } from 'react-toastify';

toast(<ToastContent content={message} type={TOAST_TYPE_ERROR} link={link} />);
```
