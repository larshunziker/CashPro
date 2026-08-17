export const webSiteSchemaForOrganisation = {
  '@context': 'https://schema.org',
  '@id': 'https://www.cash.ch/#/schema/WebSite/1',
  '@type': 'WebSite',
  alternateName: 'Ringier AG | Ringier Medien Schweiz',
  name: 'Cash',
  potentialAction: {
    '@type': 'SearchAction',
    'query-input': 'required name=search_term_string',
    target: {
      '@type': 'EntryPoint',
      urltemplate: 'https://www.cash.ch/suche/{search_term_string}',
    },
  },
  publisher: {
    '@id': 'https://www.cash.ch/#/schema/Organization/1',
  },
  url: 'https://www.cash.ch',
};

export const webSiteSchema = {
  '@context': 'https://schema.org',
  '@id': 'https://www.cash.ch/#/schema/WebSite/1',
  '@type': 'WebSite',
  alternateName: 'Ringier AG | Ringier Medien Schweiz',
  name: 'Cash',
  publisher: {
    '@id': 'https://www.cash.ch/#/schema/Organization/1',
  },
  url: 'https://www.cash.ch',
};

export const webPageSchema = {
  '@context': 'https://schema.org',
  '@id': 'https://www.cash.ch',
  '@type': 'WebPage',
  breadcrumb: {
    '@id': 'https://www.cash.ch/#/schema/BreadcrumbList',
    '@type': 'BreadcrumbList',
  },
  isPartOf: {
    '@id': 'https://www.cash.ch/#/schema/WebSite/1',
    '@type': 'WebSite',
  },
  name: 'Cash',
  url: 'https://www.cash.ch',
};
