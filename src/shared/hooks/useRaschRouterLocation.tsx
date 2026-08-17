import { useLocation, useNavigationType, useParams } from 'react-router-dom';
import { parseSearchQuery } from '../../shared/helpers/parseSearchQuery';
import mockUseRaschRouterLocation from './__mocks__/mockUseRaschRouterLocation';

const useRaschRouterLocation = (): RaschRouterLocation => {
  const location = useLocation();
  const params = useParams();
  const navigationType = useNavigationType();

  return {
    ...location,
    href: `${location.pathname}${location.search}${location.hash}`,
    query: parseSearchQuery(location.search),
    action: navigationType,
    /* @ts-ignore TODO: TS2322 ->  Type 'Readonly<Params<string>>' is not assignable to type 'Record<string, string>'. */
    params: params,
  };
};

export default !__TESTING__
  ? useRaschRouterLocation
  : mockUseRaschRouterLocation;
