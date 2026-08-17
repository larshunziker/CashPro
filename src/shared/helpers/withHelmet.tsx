import { assembleAkamaiImgUrl } from '../../common/components/Picture/helpers';
import {
  ARTICLE_CONTENT_TYPE,
  EXPLAINING_ARTICLE_CONTENT_TYPE,
  IMAGE_GALLERY_CONTENT_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE,
  ORGANIZATION_CONTENT_TYPE,
  PERSON_CONTENT_TYPE,
  RECIPE_CONTENT_TYPE,
  RESTRICTION_STATUS_PAID,
  VIDEO_CONTENT_TYPE,
} from '../constants/content';
import {
  ENTITY_QUEUE_PARAGRAPH,
  NATIVE_ADVERTISING_CAROUSEL_PARAGRAPH,
  TEASER_STAGE_PARAGRAPH,
} from '../constants/paragraphs';
import {
  ROUTE_HOME_BEO,
  ROUTE_HOME_CASH,
  ROUTE_HOME_GM,
  ROUTE_HOME_GM_FR,
  ROUTE_HOME_HZ,
  ROUTE_HOME_SI,
} from '../constants/publications';
import {
  ROBOTS_NOINDEX_PARAMS,
  ROOT_SCHEMA_TYPE_IMAGE,
  ROOT_SCHEMA_TYPE_NEWS_ARTICLE,
  ROOT_SCHEMA_TYPE_ORGANIZATION,
  ROOT_SCHEMA_TYPE_PARENT_ORGANIZATION,
  ROOT_SCHEMA_TYPE_PERSON,
  ROOT_SCHEMA_TYPE_RECIPE,
  ROOT_SCHEMA_TYPE_WEBSITE,
  ROOT_SCHEMA_TYPE_WEB_PAGE,
} from '../constants/structuredData';
import { replaceAll } from './replaceAll';
import { sanitizedString, slugify } from './utils';
export const HAS_PART_ARTICLE_COUNT = 3;

export const checkDisallowParameters = ({ search }: RaschRouterLocation) => {
  if (!search) {
    return false;
  }

  const hasNoindexParamsInUrl = ROBOTS_NOINDEX_PARAMS.some(
    (param) => search.indexOf(param) !== -1,
  );

  return hasNoindexParamsInUrl;
};

export const getRestrictedClassName = (typename = '') =>
  `${typename}-restricted-content`;

/* @ts-ignore TODO: TS7006 ->  Parameter 'query' implicitly has an 'any' type. */
const getQueryData = (query) => {
  const queryString = Object.keys(query)
    .map(
      (key) => encodeURIComponent(key) + '=' + encodeURIComponent(query[key]),
    )
    .join('&');
  return queryString ? `?${queryString}` : '';
};

export const getCanonicalUrl = (
  location: Partial<RaschRouterLocation>,
  query = {},
) => {
  if (parseInt(location?.query?.page || 0, 10) === 1) {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    return `${global.locationOrigin}${location?.pathname || ''}`;
  }
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  return `${global.locationOrigin}${location?.pathname || ''}${getQueryData(
    query,
  )}`;
};

export const getParselyTags = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'node' implicitly has an 'any' type. */
  node,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'title' implicitly has an 'any' type. */
  title,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'imageUrl' implicitly has an 'any' type. */
  imageUrl,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'authors' implicitly has an 'any' type. */
  authors,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'keywords' implicitly has an 'any' type. */
  keywords,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'location' implicitly has an 'any' type. */
  location,
) => {
  const PARSELY_ACCEPTED_CONTENT_TYPES = [
    ARTICLE_CONTENT_TYPE,
    VIDEO_CONTENT_TYPE,
    RECIPE_CONTENT_TYPE,
    NATIVE_ADVERTISING_CONTENT_TYPE,
    EXPLAINING_ARTICLE_CONTENT_TYPE,
    IMAGE_GALLERY_CONTENT_TYPE,
    PERSON_CONTENT_TYPE,
    ORGANIZATION_CONTENT_TYPE,
  ];
  // If it's not one of the following types, it's a sectionpage
  if (!PARSELY_ACCEPTED_CONTENT_TYPES.includes(node?.__typename)) {
    return [
      {
        name: 'parsely-type',
        content: 'sectionpage',
      },
    ];
  }

  const parselyLink = getCanonicalUrl(location);

  const channels =
    (Array.isArray(node?.channels?.edges) &&
      node.channels.edges.map(({ node: { title = '' } }) => title)) ||
    [];

  const pageType = `page_type: ${node?.__typename || ''}`;
  const mainChannel =
    node?.channel?.settings?.mainChannel?.title ||
    node?.settings?.mainChannel?.title ||
    '';

  const parselyTags = node && {
    ...(keywords.length > 0 && {
      keywords: keywords.map(
        ({ node: { label = '', title = '' } }) => label || title,
      ),
    }),
    ...(mainChannel && { main_channel: [`main_channel: ${mainChannel}`] }),
    ...(node.subtypeValue && {
      article_type: [`article_type: ${node.subtypeValue}`],
    }),
    ...(node.publication && {
      publication: [`publication: ${node.publication}`],
    }),
    ...(node.restrictionStatus && {
      restriction_status: [`restriction_status: ${node.restrictionStatus}`],
    }),
    ...([ARTICLE_CONTENT_TYPE, NATIVE_ADVERTISING_CONTENT_TYPE].includes(
      node.__typename,
    ) && [`print_article: ${(node.issue?.nid && '1') || '0'}`]),
    pageType,
  };

  const parselyGlobalTags = [
    {
      name: 'parsely-post-id',
      content: node?.nid || node?.id || parselyLink,
    },
    {
      name: 'parsely-type',
      content: 'post',
    },
    {
      name: 'parsely-title',
      content: title,
    },
    {
      name: 'parsely-link',
      content: parselyLink,
    },
    {
      name: 'parsely-image-url',
      content: imageUrl,
    },
    {
      name: 'parsely-pub-date',
      content: node?.publicationDate || node?.createDate,
    },
    {
      name: 'parsely-section',
      content:
        node?.channel?.title ||
        (channels.length > 0 && channels) ||
        node?.__typename ||
        '',
    },
    {
      name: 'parsely-tags',
      content: replaceAll(Object.values(parselyTags).toString(), ': ', ':'),
    },
  ];

  if (authors?.edges?.length) {
    authors.edges.forEach(({ node: { name = '' } }) => {
      if (name) {
        parselyGlobalTags.push({
          name: 'parsely-author',
          content: name,
        });
      }
    });
  }

  return parselyGlobalTags;
};

export const getImageObjectSchema = ({
  node,
  rootSchemaType,
  clientUrl,
  width = 1200,
  height = 1200,
  caption = '',
  staticUrl,
}: {
  node?: any;
  rootSchemaType?: string;
  width?: number;
  clientUrl?: string;
  height?: number;
  caption?: string;
  staticUrl?: string;
}) => {
  const nodeCaption =
    caption ||
    node?.teaserImage?.caption ||
    node?.imageParagraph?.image?.file.alt ||
    '';
  const imageUrl = staticUrl || getImageUrl({ clientUrl, node, width, height });

  const imageConfigs = {
    [ROOT_SCHEMA_TYPE_NEWS_ARTICLE]: [
      { width: 1200, height: 1200 }, // 1:1 ratio
      { width: 1200, height: 900 }, // 4:3 ratio
      { width: 1770, height: 996 }, // 16:9 ratio
    ],
    [ROOT_SCHEMA_TYPE_RECIPE]: [
      { width: 1200, height: 1200 }, // 1:1 ratio
      { width: 1200, height: 900 }, // 4:3 ratio
      { width: 1770, height: 996 }, // 16:9 ratio
    ],
  };

  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  if (!imageUrl || [ROOT_SCHEMA_TYPE_WEBSITE].includes(rootSchemaType)) {
    return [];
  }

  // Generate images based on configurations for specific rootSchemaType
  /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
  if (imageConfigs[rootSchemaType]) {
    /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'width' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'height' implicitly has an 'any' type. */
    return imageConfigs[rootSchemaType].map(({ width, height }) => ({
      '@context': 'https://schema.org',
      '@type': ROOT_SCHEMA_TYPE_IMAGE,
      '@id': getImageUrl({ clientUrl, node, width, height }),
      url: getImageUrl({ clientUrl, node, width, height }),
      contentUrl: getImageUrl({ clientUrl, node, width, height }),
      width,
      height,
      caption: sanitizedString(nodeCaption),
    }));
  }

  return {
    '@context': 'https://schema.org',
    '@type': ROOT_SCHEMA_TYPE_IMAGE,
    '@id': imageUrl,
    url: imageUrl,
    contentUrl: imageUrl,
    caption: sanitizedString(nodeCaption),
    width: width.toString(),
    height: height.toString(),
  };
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'rootSchemaType' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'node' implicitly has an 'any' type. */
export const getPersonSchema = (rootSchemaType, node, clientUrl = '') => {
  if (!node) return;
  const { name, firstName, lastName, headline, aid, awards } = node;
  const imageObject = getImageObjectSchema({
    node,
    rootSchemaType,
    clientUrl,
  });

  return (
    [ROOT_SCHEMA_TYPE_PERSON, ROOT_SCHEMA_TYPE_NEWS_ARTICLE].includes(
      rootSchemaType,
    ) && {
      '@context': 'https://schema.org',
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      '@id': `${global.locationOrigin}/#/schema/Person/${slugify(node?.name)}`,
      '@type': ROOT_SCHEMA_TYPE_PERSON,
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      url: `${global.locationOrigin}${node?.preferredUri}`,
      name: name,
      alternateName: `${firstName} ${lastName}`,
      jobTitle: headline,
      identifier: aid,
      description: `${firstName} ${node?.lastName} is a ${headline} at Ringer AG`,
      image: {
        '@type': ROOT_SCHEMA_TYPE_IMAGE,
        '@id': imageObject['@id'],
      },
      worksFor: {
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        '@id': `${global.locationOrigin}/#/schema/Organization/1`,
      },
      memberOf: {
        '@type': 'Organization',
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        '@id': `${global.locationOrigin}/#/schema/Organization/1`,
      },
      award: awards,
      sameAs: getSameAsFromAuthor(node),
    }
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'author' implicitly has an 'any' type. */
const getSameAsFromAuthor = (author) => {
  const sameAs = [];

  if (author?.website?.path) {
    sameAs.push(author.website.path);
  }
  if (author?.instagram?.path) {
    sameAs.push(author.instagram.path);
  }
  if (author?.twitter?.path) {
    sameAs.push(author.twitter.path);
  }
  if (author?.facebook?.path) {
    sameAs.push(author.facebook.path);
  }
  if (author?.linkedin?.path) {
    sameAs.push(author.linkedin.path);
  }
  if (author?.xing?.path) {
    sameAs.push(author.xing.path);
  }

  return sameAs;
};

/**
 * generate meta links
 *
 * @desc    generate meta links for pagination or referring to external resource (canonical url)
 */
export const generateMetaLinks = (
  location: Partial<RaschRouterLocation>,
  givenCanonicalUrl?: string,
  currentPage?: number,
  totalPages?: number,
  whiteListedParams?: Record<string, boolean>,
): MetaLink[] => {
  const metaLinkHeaders = [];
  const query = (location && { ...location.query }) || {};

  // kill all params that are NOT whitelisted!
  if (whiteListedParams !== undefined) {
    Object.keys(query).forEach((param) => {
      if (!whiteListedParams[param]) {
        delete query[param];
      }
    });
  }

  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  const isOnFirstPage = totalPages >= 1 && currentPage === 1;

  const correctCanonicalUrl =
    ((!totalPages || isOnFirstPage) &&
      location.pathname !== '/' &&
      givenCanonicalUrl) ||
    getCanonicalUrl(location, query);

  metaLinkHeaders.push({
    rel: 'canonical',
    href: correctCanonicalUrl,
  });

  /* @ts-ignore TODO: TS2322 ->  Type '{ rel */
  return metaLinkHeaders;
};

export const getImageUrl = ({
  clientUrl,
  width,
  height,
  getImage,
  node,
  ...props
}: {
  clientUrl?: string;
  width: number;
  height: number;
  node: any;
  getImage?: (props: any) => ImageFile;
}) => {
  let image = getImage && getImage(props);
  if (!image) {
    image =
      node?.ogImage?.[0]?.image?.file ||
      node?.teaserImage?.image?.file ||
      node?.heroImageBody?.[0]?.image?.file ||
      node?.imageParagraph?.image?.file;
  }

  return assembleAkamaiImgUrl({
    clientUrl,
    width,
    height,
    enforceAbsoluteUrl: true,
    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
    focalPointX: image?.focalPointX,
    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
    focalPointY: image?.focalPointY,
    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
    relativeOriginPath: image?.relativeOriginPath,
  });
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'node' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'rootSchemaType' implicitly has an 'any' type. */
export const getRecipeSchema = ({ node, rootSchemaType }) => {
  return (
    rootSchemaType === ROOT_SCHEMA_TYPE_RECIPE && {
      '@type': ROOT_SCHEMA_TYPE_RECIPE,
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      url: `${global.locationOrigin}${node.preferredUri}`,
      name: node?.title,
      recipeIngredient:
        node?.ingredients && node.ingredients.replace(/<[^>]*>/g, ''),
      recipeInstructions: node.instructions
        .reduce(
          /* @ts-ignore TODO: TS7006 ->  Parameter 'acc' implicitly has an 'any' type. */
          /* @ts-ignore TODO: TS7006 ->  Parameter 'instruction' implicitly has an 'any' type. */
          (acc, instruction) =>
            (instruction?.text &&
              `${acc}${
                (instruction?.header && instruction.header + ': ') || ''
              }${instruction.text}| `) ||
            acc,
          '',
        )
        .replace(/<[^>]*>/g, '')
        .slice(0, -2),
      recipeCategory: node?.subtypeValue || '',
      recipeYield: node?.quantity || '',
      nutrition: {
        '@type': 'NutritionInformation',
        calories: node?.energy && `${node.energy} calories`,
        carbohydrateContent: node?.carb && `${node.carb} grams carbohydrates`,
        fatContent: node?.fat && `${node.fat} grams fat`,
        proteinContent: node?.protein && `${node.protein} grams of protein`,
      },
      cookTime: node?.cookingTime && `PT${node.cookingTime}M`,
      keywords:
        (node?.keywords?.edges &&
          Array.isArray(node.keywords.edges) &&
          node.keywords.edges.length > 0 &&
          /* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */
          node.keywords.edges.map(({ node: { label } }) => label).join(', ')) ||
        '',
      prepTime: (node?.preparationTime && `PT${node.preparationTime}M`) || '',
      description: node?.metaDescription || '',
    }
  );
};

export const getPreferredUri = (preferredUri = '') => {
  if (!preferredUri) {
    return '';
  }

  if (
    [
      `/${ROUTE_HOME_CASH}`,
      `/${ROUTE_HOME_BEO}`,
      `/${ROUTE_HOME_GM}`,
      `/${ROUTE_HOME_GM_FR}`,
      `/${ROUTE_HOME_HZ}`,
      `/${ROUTE_HOME_SI}`,
    ].includes(preferredUri)
  ) {
    preferredUri = '/';
  }

  return preferredUri;
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'collectionPageArticles' implicitly has an 'any' type. */
export const getListItems = ({ offset = 3, collectionPageArticles }) => {
  return (
    collectionPageArticles
      ?.slice(offset)
      /* @ts-ignore TODO: TS7006 ->  Parameter 'listItemPos' implicitly has an 'any' type. */
      .map(({ node = null }, listItemPos) => {
        return {
          '@type': 'ListItem',
          position: listItemPos + 1,
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          /* @ts-ignore TODO: TS2339 ->  Property 'preferredUri' does not exist on type 'never'. */
          url: `${global.locationOrigin}${node?.preferredUri || ''}`,
        };
      })
  );
};

export const isLandingPage = (rootSchemaType: string) =>
  [
    ROOT_SCHEMA_TYPE_ORGANIZATION,
    ROOT_SCHEMA_TYPE_WEB_PAGE,
    ROOT_SCHEMA_TYPE_PERSON,
  ].includes(rootSchemaType);

export const getPublisherLogoObject = ({
  getPublisherLogo,
  node,
  logoDimensions,
}: {
  getPublisherLogo: (node?: any) => string;
  node?: any;
  logoDimensions?: { width: number; height: number };
}) => {
  const logoUrl = getPublisherLogo(node) || '';

  return {
    '@type': ROOT_SCHEMA_TYPE_IMAGE,
    '@id': logoUrl,
    url: logoUrl,
    contentUrl: logoUrl,
    ...(logoDimensions && {
      width: logoDimensions.width,
      height: logoDimensions.height,
    }),
  };
};

export const getOrganizationSchema = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'preferredUri' implicitly has an 'any' type. */
  preferredUri,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'publisher' implicitly has an 'any' type. */
  publisher,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'node' implicitly has an 'any' type. */
  node,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'getPublisherLogo' implicitly has an 'any' type. */
  getPublisherLogo,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'structuredDefaultData' implicitly has an 'any' type. */
  structuredDefaultData,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'employee' implicitly has an 'any' type. */
  employee,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'clientUrl' implicitly has an 'any' type. */
  clientUrl,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'logoDimensions' implicitly has an 'any' type. */
  logoDimensions,
}) => {
  const publisherLogo = getPublisherLogoObject({
    getPublisherLogo,
    node,
    logoDimensions,
  });

  return {
    '@context': 'https://schema.org',
    '@type': ROOT_SCHEMA_TYPE_ORGANIZATION,
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    '@id': `${global.locationOrigin}/#/schema/Organization/1`,
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    url: `${global.locationOrigin}${preferredUri}`,
    name: publisher,
    legalName: 'Ringier AG | Ringier Medien Schweiz',
    description: node?.metaDescription,
    logo: publisherLogo,
    image: [
      {
        '@type': ROOT_SCHEMA_TYPE_IMAGE,
        '@id': publisherLogo['@id'],
      },
      {
        '@type': ROOT_SCHEMA_TYPE_IMAGE,
        '@id': getImageUrl({ clientUrl, node, width: 1200, height: 1200 }),
      },
    ],
    parentOrganization: {
      '@type': ROOT_SCHEMA_TYPE_PARENT_ORGANIZATION,
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      '@id': `${global.locationOrigin}/#/schema/Organization/2`,
    },
    ...structuredDefaultData,
    employee,
    // excluded keys
    potentialAction: null,
  };
};

export const getParentOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': ROOT_SCHEMA_TYPE_PARENT_ORGANIZATION,
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    '@id': `${global.locationOrigin}/#/schema/Organization/2`,
    url: 'https://www.ringier.com/',
    name: 'Ringier',
    legalName: 'Ringier AG',
    alternateName: 'ringier.com',
    description:
      'Ringier is a family-owned media group with brands in Europe and Africa that focus on media, e-commerce, marketplaces and entertainment.',
    email: 'info@ringier.ch',
    telephone: '+41442596111',
    address: {
      '@type': 'PostalAddress',
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      '@id': `${global.locationOrigin}/#/schema/Address/Organization/1`,
    },
    sameAs: [
      'https://www.linkedin.com/company/ringier/',
      'https://twitter.com/ringier_ag',
      'https://www.facebook.com/ringierag/',
      'https://www.youtube.com/user/RingierComm',
      'https://www.instagram.com/ringier_ag',
    ],
  };
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'collectionPageArticles' implicitly has an 'any' type. */
export const getItemListSchema = ({ title = '', collectionPageArticles }) => {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    itemListElement: [getListItems({ collectionPageArticles })],
  };

  const finalItemListSchema =
    (collectionPageArticles?.length > HAS_PART_ARTICLE_COUNT && {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(itemListSchema),
    }) ||
    {};

  return finalItemListSchema;
};

export const getRestrictedContentSchema = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'rootSchemaRestricted' implicitly has an 'any' type. */
  rootSchemaRestricted,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'restrictionStatus' implicitly has an 'any' type. */
  restrictionStatus,
  /* @ts-ignore TODO: TS7031 ->  Binding element '__typename' implicitly has an 'any' type. */
  __typename,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'id' implicitly has an 'any' type. */
  id,
}) => {
  return (
    (__RINGIER_CONNECT_ENABLED__ &&
      !rootSchemaRestricted &&
      [RESTRICTION_STATUS_PAID].includes(restrictionStatus) && {
        hasPart: {
          '@type': 'WebPageElement',
          isAccessibleForFree: false,
          cssSelector: __typename && `.${getRestrictedClassName(__typename)}`,
        },
      }) ||
    (rootSchemaRestricted && {
      ...rootSchemaRestricted,
    }) ||
    (id && {
      '@id': id,
      isAccessibleForFree: true,
    })
  );
};

export const getContentSchema = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'rootSchemaType' implicitly has an 'any' type. */
  rootSchemaType,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'getPublisherLogo' implicitly has an 'any' type. */
  getPublisherLogo,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'node' implicitly has an 'any' type. */
  node,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'authors' implicitly has an 'any' type. */
  authors,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'sameAs' implicitly has an 'any' type. */
  sameAs,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'hasImageUrl' implicitly has an 'any' type. */
  hasImageUrl,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'getImageUrl' implicitly has an 'any' type. */
  getImageUrl,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'publisher' implicitly has an 'any' type. */
  publisher,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'logoDimensions' implicitly has an 'any' type. */
  logoDimensions,
}) => {
  if (isLandingPage(rootSchemaType)) {
    return;
  }

  const publisherLogo = getPublisherLogoObject({
    getPublisherLogo,
    node,
    logoDimensions,
  });

  const images = hasImageUrl
    ? [
        {
          '@type': 'ImageObject',
          '@id': getImageUrl(1200, 1200),
        },
        {
          '@type': 'ImageObject',
          '@id': getImageUrl(1200, 900),
        },
        {
          '@type': 'ImageObject',
          '@id': getImageUrl(1770, 996),
        },
      ]
    : [];

  return {
    '@context': 'http://schema.org/',
    '@type': rootSchemaType,
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    mainEntityOfPage: `${global.locationOrigin}${getPreferredUri(
      node?.preferredUri,
    )}`,
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    '@id': `${global.locationOrigin}/#/schema/${rootSchemaType}/${node?.id}`,
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    url: `${global.locationOrigin}${node?.preferredUri || ''}`,
    publisher: {
      '@type': ROOT_SCHEMA_TYPE_ORGANIZATION,
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      '@id': `${global.locationOrigin}/#/schema/Organization/1`,
      name: publisher,
      logo: publisherLogo,
      sameAs,
    },
    articleSection: node?.channel?.title || '',
    /* @ts-ignore TODO: TS7031 ->  Binding element 'node' implicitly has an 'any' type. */
    author: authors?.edges?.map(({ node }) =>
      getPersonSchema(rootSchemaType, node),
    ),
    datePublished: node?.publicationDate || node?.createDate || '',
    dateModified: getMostCurrentChangeDate(node || {}),
    headline: node?.title || '',
    alternativeHeadline: node?.seoTitle || '',
    description: node?.lead || '',
    isPartOf: {
      '@type': 'URL',
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      '@id': `${global.locationOrigin}${getPreferredUri(node?.preferredUri)}`,
    },
    image: images,
  };
};

export const getAllArticles = (landingPage: LandingPage) => {
  const nodes = [];
  landingPage &&
    Array.isArray(landingPage.body) &&
    landingPage.body.forEach(
      (
        paragraph: ParagraphInterface & {
          __typename: string;
          entityQueue: EntityQueue;
          nativeAdvertising: NativeAdvertisingConnection;
          entities: SearchableUnionConnection;
        },
      ) => {
        switch (paragraph.__typename) {
          case ENTITY_QUEUE_PARAGRAPH:
            paragraph?.entityQueue?.items?.edges &&
              nodes.push(...paragraph.entityQueue.items.edges);
            break;
          case NATIVE_ADVERTISING_CAROUSEL_PARAGRAPH:
            paragraph?.nativeAdvertising?.edges &&
              nodes.push(...paragraph.nativeAdvertising.edges);
            break;
          case TEASER_STAGE_PARAGRAPH:
            paragraph?.entities?.edges &&
              nodes.push(...paragraph.entities.edges);
            break;
        }
      },
    );

  if (landingPage && Array.isArray(landingPage.grid?.edges)) {
    nodes.push(
      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
      /* @ts-ignore TODO: TS2339 ->  Property 'node' does not exist on type 'Maybe<SearchableUnionEdge>'. */
      ...landingPage.grid.edges.filter(({ node: { id = null } }) => id),
    );
  }

  return nodes;
};

export const getMostCurrentChangeDate = ({
  publicationDate = '',
  createDate = '',
  changeDate = '',
}) => {
  if (publicationDate > changeDate) {
    return publicationDate;
  } else if (createDate > changeDate) {
    return createDate;
  }
  return changeDate;
};
