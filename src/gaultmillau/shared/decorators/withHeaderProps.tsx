import withHeaderPropsFactory from '../../../shared/decorators/withHeaderPropsFactory';
import { setHeaderProps } from '../actions/header';

export type WithHeaderProps = {
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  setHeaderProps: (props) => void;
};

export default withHeaderPropsFactory({ setHeaderProps });
