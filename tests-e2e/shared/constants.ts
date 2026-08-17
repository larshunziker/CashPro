export const PR_NUMBER = process?.env?.PR_NUMBER;
export const TEST_USER = 'dtc+e2e@ringier.ch';
export const TEST_USER_PASSWORD = 'fyr3pvj@cev_ghx0DMY';

const MAP_PUBLICATION_TO_DOMAIN = {
  beobachter: 'beobachter',
  cash: 'cash',
  gault_millau: 'gaultmillau',
};

const basicAuth = (publication: string): [string, string] => {
  const credentials = {
    beobachter: ['beo', process?.env?.BEO_BASIC_AUTH_PASSWORD],
    cash: ['preview', 'takemymoney'],
    gault_millau: ['preview', process?.env?.GM_BASIC_AUTH_PASSWORD],
  };
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ beobachter */
  return credentials[publication];
};

export const baseUrl = (publication: string) => {
  if (process?.env?.DOT_ENV === 'master' || PR_NUMBER === '0') {
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ beobachter */
    return `https://www.${MAP_PUBLICATION_TO_DOMAIN[publication]}.ch/`;
  }
  const credentials = basicAuth(publication);
  if (!process?.env?.CI) {
    if (process?.env?.DOT_ENV === 'stage') {
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ beobachter */
      return `https://${credentials[0]}:${credentials[1]}@${process?.env?.DOT_ENV}.${MAP_PUBLICATION_TO_DOMAIN[publication]}.ch/`;
    }
    if (process?.env?.DOT_ENV === 'localhost') {
      return 'https://localhost:3333/';
    }
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ beobachter */
    return `https://${credentials[0]}:${credentials[1]}@stage.${MAP_PUBLICATION_TO_DOMAIN[publication]}.ch/`;
  } else {
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ beobachter */
    return `https://${credentials[0]}:${credentials[1]}@nginx.pr-${PR_NUMBER}.${MAP_PUBLICATION_TO_DOMAIN[publication]}-k8s.develop.ras.dev/`;
  }
};

export const getHost = (publication: string) => {
  const base = baseUrl(publication);
  return new URL(base).host;
};
