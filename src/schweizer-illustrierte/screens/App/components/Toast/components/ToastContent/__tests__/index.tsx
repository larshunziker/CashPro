import { getToastIconByProps } from '../index';
import {
  TOAST_TYPE_ERROR,
  TOAST_TYPE_SUCCESS,
  TOAST_TYPE_WARNING,
} from '../../../../../../../../common/components/ToastContent/constants';

describe('[Component] Toast - ToastContent', () => {
  test.each`
    toastType             | toastIcon
    ${TOAST_TYPE_ERROR}   | ${'IconCircleExclamation'}
    ${TOAST_TYPE_SUCCESS} | ${'IconCircleCheck'}
    ${TOAST_TYPE_WARNING} | ${'IconTriangleExclamation'}
    ${''}                 | ${'IconCircleInfo'}
    ${null}               | ${'IconCircleInfo'}
  `(
    'Should show icon $toastIcon for toastType $toastType',
    ({ toastType, toastIcon }) => {
      const icon = getToastIconByProps(toastType);
      expect(icon).toBe(toastIcon);
    },
  );
});
