type BreadcrumbData = {
  node?: Partial<ActiveMenuTrailItem>;
};

export const mapBreadcrumbsData = (
  root: Partial<Channel>,
  prefixUrl?: string,
): BreadcrumbData => {
  let link = root.preferredUri || '';
  if (prefixUrl && !link.startsWith('/' + prefixUrl)) {
    link = `/${prefixUrl}${link}`;
  }
  return {
    node: {
      label: root.title,
      link,
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
      id: root.tid || root.id,
    },
  };
};

type ExtractParents = {
  channel: Partial<Channel>;
  key: string;
  parentsArray?: BreadcrumbData[];
  prefixUrl?: string;
};

export const extractParents = ({
  channel,
  key,
  parentsArray = [],
  prefixUrl,
}: ExtractParents): BreadcrumbData[] => {
  if (channel && typeof channel === 'object' && key in channel) {
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Partial<Channel>' */
    if (channel[key]) {
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Partial<Channel>' */
      parentsArray.push(mapBreadcrumbsData(channel[key], prefixUrl));
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Partial<Channel>' */
      extractParents({ channel: channel[key], key, parentsArray, prefixUrl });
    }
  }
  return parentsArray;
};
