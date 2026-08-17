import { getToastIconByProps } from '../index';
import {
  TOAST_TYPE_ERROR,
  TOAST_TYPE_SUCCESS,
  TOAST_TYPE_WARNING,
} from '../../../../../../../../common/components/ToastContent/constants';

describe('[Component] Toasts - ToastContent', () => {
  it('Should return default icon', () => {
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'string'. */
    const icon = getToastIconByProps(null);
    expect(icon).toMatchSnapshot();
  });

  it('Should return error icon', () => {
    const icon = getToastIconByProps(TOAST_TYPE_ERROR);
    expect(icon).toMatchSnapshot();
  });

  it('Should return succss icon', () => {
    const icon = getToastIconByProps(TOAST_TYPE_SUCCESS);
    expect(icon).toMatchSnapshot();
  });

  it('Should return warning icon', () => {
    const icon = getToastIconByProps(TOAST_TYPE_WARNING);
    expect(icon).toMatchSnapshot();
  });
});
