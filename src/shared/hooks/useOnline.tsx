import { useEffect, useState } from 'react';

const defaultOnlineState: boolean = __CLIENT__
  ? !!window.navigator.onLine
  : true;

const useOnline = (): boolean => {
  const [online, setOnline] = useState<boolean>(defaultOnlineState);

  const onlineSetter = (): void => setOnline(true);
  const offlineSetter = (): void => setOnline(false);

  useEffect(() => {
    window.addEventListener('offline', offlineSetter);
    window.addEventListener('online', onlineSetter);

    return () => {
      window.removeEventListener('online', onlineSetter);
      window.removeEventListener('offline', offlineSetter);
    };
  }, []);

  return online;
};

export default useOnline;
