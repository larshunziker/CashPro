import { useSSRContext } from '../SSRContext';

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const ClientSideOnly = ({ children }) => {
  const { isSSR } = useSSRContext();

  return !isSSR && children;
};

export default ClientSideOnly;
