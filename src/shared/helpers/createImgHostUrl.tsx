export const matchesLocalOrPRUrl = (clientUrl: string) => {
  const regexLocalUrls = /(?:[0-9]+)$/gm;
  const regexPRUrls =
    /nginx.pr-(?:[0-9]+).(?:[a-z-]+)-k8s.(?:[a-z]+).ras.dev/gm;
  const url = new URL(clientUrl);
  if (!!regexLocalUrls.exec(url.host)) {
    return true;
  } else if (!!regexPRUrls.exec(url.host)) {
    return true;
  }
  return false;
};

const LocalOrPrHostUrlsByEnvironment = {
  local: 'https://cdn.dev.ras.dev',
  develop: 'https://cdn.dev.ras.dev',
  gql: 'https://cdn.gql.ras.dev',
  migration: 'https://cdn.migration.ras.dev',
  update: 'https://cdn.update.ras.dev',
  master: 'https://cdn.prod.ras.dev',
  stage: 'https://cdn.stage.ras.dev',
  performance: 'https://cdn.performance.ras.dev',
  'dcx-integration': 'https://cdn.dcx-integration.ras.dev',
};

export const createImgHostUrl = (clientUrl: string, env: string) => {
  try {
    if (matchesLocalOrPRUrl(clientUrl)) {
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ local */
      return LocalOrPrHostUrlsByEnvironment[env];
    }
    return '';
  } catch (e) {
    return '';
  }
};
