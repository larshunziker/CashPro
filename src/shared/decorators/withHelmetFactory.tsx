import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import mapProps from 'recompose/mapProps';
import { assembleAkamaiImgUrl } from '../../common/components/Picture/helpers';
import {
  SPONSORED_CONTENT_PREFIX,
  isNativeAdvertising,
} from '../helpers/sharePanel';
import { slugify, warn } from '../helpers/utils';
import {
  generateMetaLinks,
  getContentSchema,
  getImageObjectSchema,
  getImageUrl,
  getItemListSchema,
  getMostCurrentChangeDate,
  getOrganizationSchema,
  getParentOrganizationSchema,
  getParselyTags,
  getPersonSchema,
  getPreferredUri,
  getRecipeSchema,
  getRestrictedContentSchema,
  isLandingPage,
} from '../helpers/withHelmet';
import namedComponent from '../../shared/decorators/namedComponent';
import {
  AUTHOR_CONTENT_TYPE,
  RESTRICTION_STATUS_PAID,
} from '../constants/content';
import {
  ROBOTS_META_INDEX_FOLLOW_NOODP_NOARCHIVE,
  ROOT_SCHEMA_TYPE_IMAGE,
  ROOT_SCHEMA_TYPE_ORGANIZATION,
  ROOT_SCHEMA_TYPE_PERSON,
  ROOT_SCHEMA_TYPE_WEBSITE,
  ROOT_SCHEMA_TYPE_WEB_PAGE,
} from '../constants/structuredData';
import {
  SchemaNodeProps,
  StructuredData,
  WithHelmet,
  WithHelmetFactoryOptions,
} from './@types/withHelmetFactory';

const getIsCollectionPage = (rootSchemaType: string) =>
  [ROOT_SCHEMA_TYPE_PERSON].includes(rootSchemaType);

const getSchema = ({
  clientUrl,
  node,
  authors,
  publisher,
  getImageUrl,
  hasImageUrl,
  getPublisherLogo,
  rootSchemaType,
  rootSchemaRestricted,
  structuredDefaultData,
  collectionPageArticles,
  androidAppSchema,
  iOSAppSchema,
  hasBreadcrumbs = true,
  logoDimensions,
}: {
  clientUrl: string;
  hasImageUrl: boolean;
  rootSchemaType: string;
  rootSchemaRestricted?: object;
  node?: SchemaNodeProps;
  authors?: AuthorConnection;
  publisher?: string;
  structuredDefaultData?: StructuredData;
  collectionPageArticles?: Record<'node', SchemaNodeProps>[];
  getImageUrl: (width: number, height: number) => string;
  getPublisherLogo: (node: any) => string;
  androidAppSchema: Record<string, any>;
  iOSAppSchema: Record<string, any>;
  hasBreadcrumbs: boolean;
  logoDimensions?: { width: number; height: number };
}) => {
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string | undefined'. */
  const preferredUri = getPreferredUri(node?.preferredUri);

  const restrictedContentSchema =
    ![ROOT_SCHEMA_TYPE_ORGANIZATION].includes(rootSchemaType) &&
    getRestrictedContentSchema({
      rootSchemaRestricted,
      restrictionStatus: node?.restrictionStatus,
      __typename: node?.__typename,
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      id: global.locationOrigin + preferredUri,
    });

  let employee = null;
  if (
    rootSchemaType === ROOT_SCHEMA_TYPE_PERSON &&
    node &&
    node.__typename === AUTHOR_CONTENT_TYPE
  ) {
    const author = node as Author;
    if (
      'isKeyEmployee' in author &&
      'name' in author &&
      author?.isKeyEmployee &&
      author.name
    ) {
      employee = [
        {
          '@type': 'Person',
          '@id': `${
            /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
            global.locationOrigin
          }${preferredUri}#/schema/Person/${slugify(author.name)}`,
        },
      ];
    }
  }

  const personSchema = getPersonSchema(rootSchemaType, node, clientUrl);

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': ROOT_SCHEMA_TYPE_WEBSITE,
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    '@id': `${global.locationOrigin}/#/schema/WebSite/1`,
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    url: `${global.locationOrigin}${preferredUri}`,
    name: publisher,
    alternateName: 'Ringier AG | Ringier Medien Schweiz',
    publisher: {
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      '@id': `${global.locationOrigin}/#/schema/Organization/1`,
    },
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': ROOT_SCHEMA_TYPE_WEB_PAGE,
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    '@id': `${global.locationOrigin}${preferredUri}`,
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    url: `${global.locationOrigin}${preferredUri}`,
    name: publisher,
    description: node?.metaDescription,
    datePublished: node?.publicationDate,
    dateModified: node?.changeDate,
    isPartOf: {
      '@type': 'WebSite',
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      '@id': `${global.locationOrigin}/#/schema/WebSite/1`,
    },
    publisher: {
      '@type': ROOT_SCHEMA_TYPE_ORGANIZATION,
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      '@id': `${global.locationOrigin}/#/schema/Organization/1`,
    },
    ...(node?.teaserImage?.image
      ? {
          primaryImageOfPage: {
            '@type': ROOT_SCHEMA_TYPE_IMAGE,
            '@id': assembleAkamaiImgUrl({
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
              relativeOriginPath:
                node?.teaserImage?.image?.file?.relativeOriginPath,
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
              focalPointX: node?.teaserImage?.image?.file?.focalPointX,
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
              focalPointY: node?.teaserImage?.image?.file?.focalPointY,
              clientUrl,
              height: 1200,
              width: 1200,
            }),
          },
        }
      : {}),
  };

  if (hasBreadcrumbs) {
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '"breadcrumb"' can't be used to index type '{ primaryIm */
    webPageSchema['breadcrumb'] = {
      '@type': 'BreadcrumbList',
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      '@id': `${global.locationOrigin}/#/schema/BreadcrumbList${preferredUri}`,
    };
  }

  const parentOrganizationSchema = getParentOrganizationSchema();

  const search = 'suche';

  const isNewsMediaOrganization = () => {
    if (rootSchemaType === ROOT_SCHEMA_TYPE_ORGANIZATION) {
      return {
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
            urltemplate: `${global.locationOrigin}/${search}/{search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
        ...websiteSchema,
      };
    } else {
      return webPageSchema;
    }
  };

  const organizationSchema = getOrganizationSchema({
    preferredUri,
    publisher,
    node,
    getPublisherLogo,
    structuredDefaultData,
    employee,
    clientUrl,
    logoDimensions,
  });

  const imageSchema = getImageObjectSchema({
    node,
    rootSchemaType,
    clientUrl,
  });

  /* @ts-ignore TODO: TS7006 ->  Parameter 'images' implicitly has an 'any' type. */
  const generateImageScripts = (images) => {
    if (!Array.isArray(images)) {
      images = [images];
    }
    // Include software application images if they exist
    if (androidAppSchema && androidAppSchema.imageScript) {
      images.push(androidAppSchema.imageScript);
    }
    if (iOSAppSchema && iOSAppSchema.imageScript) {
      images.push(iOSAppSchema.imageScript);
    }
    // Generate script tags for all images
    /* @ts-ignore TODO: TS7006 ->  Parameter 'image' implicitly has an 'any' type. */
    return images.map((image) => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(image),
    }));
  };

  const imagesSchemaScripts = generateImageScripts(imageSchema);

  if (isLandingPage(rootSchemaType)) {
    const isCollectionPage = getIsCollectionPage(rootSchemaType);

    const itemListSchema =
      (isCollectionPage && getItemListSchema({ collectionPageArticles })) || {};

    const landingPageSchema = {
      '@graph': [
        parentOrganizationSchema,
        organizationSchema,
        websiteSchema,
        isNewsMediaOrganization(),
      ],
    };
    if (personSchema) {
      landingPageSchema['@graph'].push({
        ...personSchema,
      });
    }
    if (restrictedContentSchema) {
      landingPageSchema['@graph'].push({
        ...restrictedContentSchema,
      });
    }
    if (androidAppSchema) {
      landingPageSchema['@graph'].push({
        ...androidAppSchema?.applicationScript,
        name: publisher,
        publisher: {
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          '@id': `${global.locationOrigin}/#/schema/Organization/1`,
        },
      });
    }
    if (iOSAppSchema) {
      landingPageSchema['@graph'].push({
        ...iOSAppSchema?.applicationScript,
        name: publisher,
        publisher: {
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          '@id': `${global.locationOrigin}/#/schema/Organization/1`,
        },
      });
    }

    return [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(landingPageSchema),
      },
      ...imagesSchemaScripts,
      itemListSchema,
    ];
  } else {
    const recipeSchema = getRecipeSchema({ node, rootSchemaType });
    const schemaData = {
      '@graph': [
        organizationSchema,
        parentOrganizationSchema,
        {
          ...getContentSchema({
            rootSchemaType,
            getPublisherLogo,
            node,
            authors,
            /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
            sameAs: structuredDefaultData.sameAs,
            hasImageUrl,
            getImageUrl,
            publisher,
            logoDimensions,
          }),
          ...restrictedContentSchema,
        },
      ],
    };

    const schema =
      rootSchemaType === ROOT_SCHEMA_TYPE_WEBSITE
        ? [
            {
              type: 'application/ld+json',
              innerHTML: JSON.stringify({
                ...websiteSchema,
              }),
            },
          ]
        : [
            {
              type: 'application/ld+json',
              innerHTML: JSON.stringify({
                ...webPageSchema,
              }),
            },
            ...imagesSchemaScripts,
            {
              type: 'application/ld+json',
              innerHTML: JSON.stringify({
                ...websiteSchema,
              }),
            },
            {
              type: 'application/ld+json',
              innerHTML: JSON.stringify({
                ...schemaData,
                ...recipeSchema,
              }),
            },
            {
              type: 'application/ld+json',
              innerHTML: JSON.stringify({
                ...androidAppSchema?.applicationScript,
                name: androidAppSchema ? publisher : null,
                publisher: {
                  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
                  '@id': `${global.locationOrigin}/#/schema/Organization/1`,
                },
              }),
            },
            {
              type: 'application/ld+json',
              innerHTML: JSON.stringify({
                ...iOSAppSchema?.applicationScript,
                name: iOSAppSchema ? publisher : null,
                publisher: {
                  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
                  '@id': `${global.locationOrigin}/#/schema/Organization/1`,
                },
              }),
            },
          ];
    return schema;
  }
};

const withMapProps = ({
  getNode,
  getNodesCount,
  getImage,
  pageSize,
  getFallbackTitle,
  getFallbackDescription,
  rootSchemaType,
  getRootSchemaType,
  getRootSchemaRestricted,
  structuredDefaultData,
  androidAppSchema,
  iOSAppSchema,
  getNodes,
  hasBreadcrumbs,
}: WithHelmet): WithHelmetFactoryOptions =>
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  mapProps((props: any) => {
    const finalRootSchemaType =
      (getRootSchemaType &&
        typeof getRootSchemaType === 'function' &&
        getRootSchemaType(props)) ||
      rootSchemaType;

    const finalRootSchemaRestricted =
      (getRootSchemaRestricted &&
        typeof getRootSchemaRestricted === 'function' &&
        getRootSchemaRestricted(props)) ||
      null;

    const isCollectionPage = getIsCollectionPage(finalRootSchemaType);

    const node =
      (getNode && typeof getNode === 'function' && getNode(props)) || null;
    // Make sure we also have a pageSize if getNodesCount is given.
    // Otherwise the metalink generation (generateMetaLinks) will return nonsense.
    if (getNodesCount && typeof getNodesCount === 'function' && !pageSize) {
      warn(
        'withHelmetFactory',
        'Node count given without a page size. This hints to an implementation error.',
      );
    }

    const nodesCount =
      (getNodesCount &&
        typeof getNodesCount === 'function' &&
        getNodesCount(props)) ||
      0;

    const collectionPageArticles: Record<'node', SchemaNodeProps>[] =
      (getNodes &&
        typeof getNodes === 'function' &&
        isCollectionPage &&
        getNodes(props)) ||
      [];

    const intPageSize =
      (pageSize && typeof pageSize === 'function' && pageSize(props)) ||
      pageSize;

    const links: MetaLink[] =
      node?.metaLinks ||
      (props.location &&
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        global.locationOrigin &&
        generateMetaLinks(
          props.location,
          node?.metaCanonicalUrl || null,
          pageSize ? props.page : null,
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'number | null' is not assignable to parameter of type 'number | undefined'. */
          pageSize ? Math.ceil(nodesCount / intPageSize) : null,
          props.whiteListedParams,
        )) ||
      [];
    const publisher = props.getPublisher(node) || '';
    const imageUrl = getImageUrl({
      ...props,
      node,
      getImage,
      width: 1200,
      height: 675,
    });
    let authors = {
      edges: [
        {
          node: {
            name: publisher,
          },
        },
      ],
    };

    if (node?.__typename === AUTHOR_CONTENT_TYPE) {
      authors = {
        edges: [
          {
            node,
          },
        ],
      };
    }

    if (node?.authors) {
      authors = node?.authors;
    }

    const title =
      node?.metaTitle ||
      (getFallbackTitle &&
        typeof getFallbackTitle === 'function' &&
        getFallbackTitle(props)) ||
      node?.title ||
      '';
    const description =
      node?.metaDescription ||
      (getFallbackDescription &&
        typeof getFallbackDescription === 'function' &&
        getFallbackDescription(props)) ||
      node?.lead ||
      '';

    const schema = finalRootSchemaType
      ? getSchema({
          node,
          authors,
          publisher,
          ...props,
          structuredDefaultData,
          androidAppSchema,
          iOSAppSchema,
          collectionPageArticles,
          hasImageUrl: !!imageUrl,
          rootSchemaType: finalRootSchemaType,
          rootSchemaRestricted: finalRootSchemaRestricted,
          getImageUrl: (width, height) =>
            getImageUrl({
              ...props,
              node,
              getImage,
              width,
              height,
            }),
          /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
          hasBreadcrumbs: hasBreadcrumbs(props),
          logoDimensions: props.logoDimensions,
        })
      : [];
    const keywords = [
      ...(node?.keywords?.edges || []),
      ...(node?.relatedPersons?.edges || []),
      ...(node?.relatedOrganizations?.edges || []),
    ];
    const parselyTags = getParselyTags(
      node,
      title,
      imageUrl,
      authors,
      keywords,
      props.location,
    );
    const sponsoredContentPrefix =
      (node && isNativeAdvertising(node) && `${SPONSORED_CONTENT_PREFIX} `) ||
      '';
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    global.socialMetaValues = {
      field_short_title:
        sponsoredContentPrefix +
        (node?.socialMediaTitle ||
          node?.seoTitle ||
          node?.metaOgTitle ||
          title),
      field_short_description: node?.metaOgDescription || description,
      field_heroimage: imageUrl || '',
      field_lead: node?.metaDescription || node?.lead || '',
    };

    return {
      ...props,
      withHelmetNode: {
        title: title,
        meta: [
          {
            name: 'description',
            content: description,
          },
          (keywords.length > 0 && {
            name: 'news_keywords',
            content:
              keywords.map((item) => item.node.label || item.node.title) || '',
          }) ||
            {},
          (node?.publicationDate && {
            name: 'published_at',
            content: node?.publicationDate,
          }) ||
            (!node?.publicationDate &&
              node?.createDate && {
                name: 'published_at',
                content: node?.createDate,
              }) ||
            {},
          (node?.changeDate && {
            name: 'updated_at',
            content: getMostCurrentChangeDate(node || {}),
          }) ||
            {},
          (node?.restrictionStatus &&
            node?.restrictionStatus === RESTRICTION_STATUS_PAID &&
            ROBOTS_META_INDEX_FOLLOW_NOODP_NOARCHIVE) ||
            {},
          ...parselyTags,
        ],
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        socialMetaValues: global.socialMetaValues,
        link: links,
        script: schema,
      },
    };
  });

export const mapStateToProps =
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  (options: WithHelmetFactoryOptions) => (props) => {
    return {
      clientUrl: props.route.clientUrl,
      getPublisher: options.getPublisher,
      getPublisherLogo: options.getPublisherLogo,
      logoDimensions: options.getPublisherLogoDimensions?.(),
      whiteListedParams: options.whiteListedParams,
      Helmet: options.Helmet,
    };
  };

/* @ts-ignore TODO: TS7006 ->  Parameter 'WrappedComponent' implicitly has an 'any' type. */
const withWrappedHelmet = (WrappedComponent) => {
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  const withHelmet = (props) => {
    return (
      <>
        <props.Helmet node={props.withHelmetNode} />
        <WrappedComponent {...props} />
      </>
    );
  };
  return withHelmet;
};

const withHelmetFactory =
  (options: WithHelmetFactoryOptions) =>
  ({
    getNode,
    getNodesCount,
    getImage,
    pageSize,
    getFallbackTitle,
    getFallbackDescription,
    rootSchemaType,
    getRootSchemaType,
    getRootSchemaRestricted,
    structuredDefaultData,
    androidAppSchema,
    iOSAppSchema,
    getNodes,
    hasBreadcrumbs = () => true,
  }: WithHelmet) =>
  /* @ts-ignore TODO: TS7006 ->  Parameter 'Component' implicitly has an 'any' type. */
  (Component) =>
    compose<any, any>(
      connect(mapStateToProps(options)),
      namedComponent('withHelmet'),
      // @ts-ignore
      withMapProps({
        getNode,
        getNodesCount,
        getImage,
        pageSize,
        getFallbackTitle,
        getFallbackDescription,
        rootSchemaType,
        getRootSchemaType,
        getRootSchemaRestricted,
        structuredDefaultData,
        androidAppSchema,
        iOSAppSchema,
        getNodes,
        hasBreadcrumbs,
      }),
      withWrappedHelmet,
    )(Component);

export default withHelmetFactory;
