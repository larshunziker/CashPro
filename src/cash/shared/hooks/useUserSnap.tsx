import { loadSpace, SpaceApi } from '@usersnap/browser';
import { useEffect, useState } from 'react';
export const useUserSnap = () => {
  const [userSnapAPI, setUserSnapAPI] = useState<SpaceApi | null>(null);
  const spaceApiKey = '5a995f9d-f20d-438b-acde-4e143b14acac';

  useEffect(() => {
    const init = async () => {
      if (userSnapAPI === null) {
        const api = await loadSpace(spaceApiKey);
        await api.init();
        setUserSnapAPI(api);
      }
    };
    init();
  }, [userSnapAPI]);

  return userSnapAPI;
};
