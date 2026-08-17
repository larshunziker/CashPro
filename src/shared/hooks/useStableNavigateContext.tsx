import React, {
  createContext,
  useContext,
  useRef,
  MutableRefObject,
} from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';

const StableNavigateContext =
  createContext<MutableRefObject<NavigateFunction> | null>(null);

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const StableNavigateContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);

  return (
    <StableNavigateContext.Provider value={navigateRef}>
      {children}
    </StableNavigateContext.Provider>
  );
};

const useStableNavigate = (): NavigateFunction => {
  const navigateRef = useContext(StableNavigateContext);
  if (navigateRef?.current === null) {
    throw new Error('StableNavigate context is not initialized');
  }

  /* @ts-ignore TODO: TS2322 ->  Type 'NavigateFunction | undefined' is not assignable to type 'NavigateFunction'. */
  return navigateRef?.current;
};

export {
  StableNavigateContext,
  StableNavigateContextProvider,
  useStableNavigate,
};
