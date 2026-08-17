import { useCallback } from 'react';
import { createHybridAppProvider } from '../../../../../common/components/HybridAppProvider';
import { useStableNavigate } from '../../../../../shared/hooks/useStableNavigateContext';
import { hybridAppRedirectToEpaper } from '../../../../shared/helpers/hybridAppRedirectToEpaper';
import { URL_EPAPER_DESKTOP } from '../../constants';

const useBeoHybridNavigate = () => {
  const navigate = useStableNavigate();

  return useCallback(
    (href: string): void => {
      if (href === URL_EPAPER_DESKTOP) {
        hybridAppRedirectToEpaper();
        return;
      }
      navigate(href);
    },
    [navigate],
  );
};

const HybridAppProvider = createHybridAppProvider({
  useNavigate: useBeoHybridNavigate,
});

export default HybridAppProvider;
