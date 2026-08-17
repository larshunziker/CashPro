import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import authStateSelector from '../../../../../../shared/selectors/authStateSelector';
import { checkKMUAccess } from '../helpers/checkKMUAccess';

/* @ts-ignore TODO: TS7006 ->  Parameter 'location' implicitly has an 'any' type. */
export const useKmu = (location) => {
  const { q: searchQuery = '', types: types = '', kmu = '' } = location.query;
  const legalAdviceSubscriptions = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => authStateSelector(state).legalAdviceSubscriptions,
  );
  const initialAuthRequest = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => authStateSelector(state).initialAuthRequest,
  );
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string[] | undefined' is not assignable to parameter of type 'string[]'. */
  const hasKMUAccess = checkKMUAccess(legalAdviceSubscriptions);
  const waitForAuth = (!initialAuthRequest || !hasKMUAccess) && !!kmu;

  const navigate = useNavigate();
  let newKmu = kmu;
  if (
    initialAuthRequest &&
    ((!hasKMUAccess && !!kmu) || (hasKMUAccess && !kmu))
  ) {
    newKmu = hasKMUAccess ? '1' : '';
  }

  const queryParams = new URLSearchParams({
    ...(searchQuery && { q: searchQuery }),
    ...(types && { types: types }),
    ...(newKmu && { kmu: newKmu }),
  }).toString();

  useEffect(() => {
    if (newKmu !== kmu) {
      navigate(global.location.pathname + '?' + queryParams, {
        replace: true,
      });
    }
  }, [newKmu, kmu, navigate, queryParams]);

  return {
    waitForAuth,
    hasKMUAccess: !!newKmu,
    queryParams,
  };
};
