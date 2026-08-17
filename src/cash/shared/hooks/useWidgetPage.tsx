import { useLocation } from 'react-router';

export const useWidgetPage = () => {
  const location = useLocation();

  return {
    isWidgetPage: location?.pathname?.includes('/widget/'),
  };
};
