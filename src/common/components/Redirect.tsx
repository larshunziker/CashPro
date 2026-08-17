import { useEffect } from 'react';
import { useStableNavigate } from '../../shared/hooks/useStableNavigateContext';

type RedirectProps = {
  to: string;
};

const Redirect = ({ to }: RedirectProps) => {
  const navigate = useStableNavigate();
  useEffect(() => {
    navigate(to, { replace: true });
  }, [navigate, to]);
  return null;
};

export default Redirect;
