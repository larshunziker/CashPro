import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { log } from '../helpers/utils';
import authStateSelector from '../selectors/authStateSelector';
import { getServiceUrl } from '../helpers/serviceUrl';

type useAuthenticatedDownloadUrlConfig = {
  id: string;
};

type useAuthenticatedDownloadUrlResponse = {
  isAuthenticated: boolean;
  hasAccess: boolean;
  downloadUrl: string;
};

const useAuthenticatedDownloadUrl = ({
  id,
}: useAuthenticatedDownloadUrlConfig): useAuthenticatedDownloadUrlResponse => {
  const isAuthenticated = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => authStateSelector(state).isAuthenticated,
  );
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const response = await fetch(
          `${getServiceUrl(__COMMERCE_SERVICE_ENDPOINT__)}/access/bg/${id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          },
        );

        const access = await response.json();

        setHasAccess(access.granted);

        if (access.granted) {
          setDownloadUrl(access.url);
        }
      } catch (e) {
        log(e);
      }
    };

    if (isAuthenticated) {
      checkAccess();
    }
  }, [isAuthenticated, id]);

  return {
    isAuthenticated,
    hasAccess,
    /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string'. */
    downloadUrl,
  };
};

export default useAuthenticatedDownloadUrl;
