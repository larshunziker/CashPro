import json

"""
Slowest avg. duration
[x] 2.63	  "KeywordListing"          "{\"searchString\":\"K\",\"publication\":\"HZ\"}"
[x] 2.49	  "getLandingPage"          "{\"additionalPublications\":[\"BIL\",\"SV\"],\"landingPageGridOffset\":0,\"landingPageGridPageSize\":13,\"path\":\"home-hz\",\"publication\":\"HZ\"}"
[ ] 1.77	  "PersonByChar"            "{\"char\":\"S\",\"publication\":\"GM\"}"
[x] 1.71	  "SponsorsRouteByPath"     "{\"path\":\"brandreport\",\"publication\":\"HZ\",\"additionalPublications\":[\"BIL\",\"SV\"]}"
[ ] 1.63	  "PopStageRestaurants"     "{\"query\":\"\",\"pageSize\":12,\"offset\":0,\"sort\":\"Random\",\"sortOrder\":\"Descending\",\"path\":\"pop\",\"publication\":\"GM\",\"language\":\"de\",\"popCity\":\"All\",\"organizationType\":\"Pop\",\"filter\":\"Organization\"}"
[x] 1.25	  "VideosPage"              "{\"path\":\"videos\",\"query\":\"*\",\"vid\":\"channel\",\"publication\":\"BEO\",\"limit\":8,\"offset\":4,\"videoStageLimit\":4,\"videoStageOffset\":0,\"sort\":\"PublicationDate\",\"contentTypes\":[\"Video\"],\"channelType\":[\"VideoBlog\"],\"overviewPag
[ ] 0.94	  "OrganizationJobs"        "{\"nodeId\":106456}"
[ ] 0.93	  "Dossiers"                "{\"query\":\"\",\"offset\":24,\"limit\":24,\"filter\":\"Dossier\",\"sort\":\"ModificationDate\",\"sortOrder\":\"Descending\"}"
[x] 0.92	  "Onmeda"                  "{\"char\":\"M\",\"category\":\"Krankheit\",\"publication\":\"BEO\"}"
[x] 0.86	  "LatestSearch"            "{\"contentTypes\":[\"Article\",\"ImageGallery\",\"Video\"],\"limit\":180,\"pageSize\":180,\"path\":\"latest\",\"publication\":\"SI\",\"query\":\"*\",\"sort\":\"PublicationDate\"}"
[x] 0.81	  "RouteByPath"             "{\"path\":\"unternehmen\/klaus-dieter-koch-ueber-markenfuehrung-kleines-land-grosse-marken\",\"publication\":\"HZ\",\"additionalPublications\":[\"BIL\",\"SV\"],\"landingPageGridPageSize\":14,\"landingPageGridOffset\":0,\"branchPageSize\":13,\"branchOffse

[x] routebypath home

Thoughput:
[x] 144k  "RouteByPath"
[x] 23.6k "RouterRouteByPath"         "{\"path\":\"family\/alltag\/eltern-kampfen-gegen-das-puff-im-kinderzimmer\",\"publication\":\"SI\",\"overviewPageSize\":19,\"overviewPageOffset\":0,\"landingPageGridSize\":12,\"landingPageGridOffset\":0,\"entityQueueLimit\":-1}"
[x] 3.47k "Comment"                   "{\"limit\":4,\"id\":\"bm9kZToxNjM1MQ==\",\"offset\":0,\"sort\":\"Descending\"}"
[x] 2.58k "RelatedToContent"          "{\"query\":\"Familie Safra*\",\"pageSize\":9,\"filter\":\"Article\",\"offset\":0,\"sort\":\"Date\"}"
[x] 1.92k "Autocomplete"              "{\"char\":\"gr*\",\"filter\":\"Article\",\"pageSize\":5}"
[x] 998   "Search"                    "{\"query\":\"salmane*\",\"pageSize\":6,\"sort\":\"Relevance\",\"contentTypes\":[\"Article\",\"LandingPage\",\"NativeAdvertising\"],\"publication\":\"HZ\",\"additionalPublications\":[\"BIL\",\"SV\"]}"


"""

def sponsors_route_by_path():
  return """query SponsorsRouteByPath($path: String!, $publication: PublicationEnum, $additionalPublications: [PublicationEnum]) {
  environment(publication: $publication, additionalPublications: $additionalPublications) {
    routeByPath(path: $path) {
      preferred
      canonical
      object {
        ... on LandingPage {
          id
          title
          lead
          shortTitle
          preferredUri
          metaCanonicalUrl
          metaTitle
          metaOgTitle
          metaDescription
          metaOgDescription
          activeMenuTrail {
            edges {
              node {
                label
                link
                __typename
              }
              __typename
            }
            __typename
          }
          teaserImage {
            id
            caption
            image {
              credit
              file(style: "16x9_700") {
                alt
                relativeOriginPath
                width
                height
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    sponsors(additionalPublications: []) {
      edges {
        node {
          ... on Sponsor {
            id
            title
            description
            preferredUri
            teaserImage {
              id
              title
              image {
                file(style: "large") {
                  alt
                  relativeOriginPath
                  width
                  height
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}
  """

def related_to_content():
  return """query RelatedToContent($query: String!, $sort: SearchOrderByField, $filter: SearchFilterEnum, $offset: Int, $pageSize: Int) {
  environment(publication: HZ, additionalPublications: [SV]) {
    globalSearch(search: $query, filter: $filter, offset: $offset, limit: $pageSize, sort: $sort) {
      count
      edges {
        node {
          ... on Article {
            id
            title
            lead
            shortTitle
            createDate
            changeDate
            publicationDate
            preferredUri
            articleType
            teaserImage {
              id
              title
              image {
                file(style: "large") {
                  alt
                  relativeOriginPath
                  width
                  height
                  __typename
                }
                __typename
              }
              __typename
            }
            authors(limit: 10) {
              edges {
                node {
                  id
                  name
                  imageParagraph {
                    image {
                      xs: file(style: "teaser_1_1") {
                        alt
                        source
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            relatedPersons {
              edges {
                node {
                  teaserImage {
                    id
                    image {
                      file(style: "large") {
                        alt
                        relativeOriginPath
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}
  """


def get_landing_page():
  return """query getLandingPage($path: String!, $publication: PublicationEnum, $additionalPublications: [PublicationEnum], $landingPageGridPageSize: Int!, $landingPageGridOffset: Int!) {
    environment(publication: $publication) {
      routeByPath(path: $path) {
        object {
          ...LandingPageFragment
        __typename
      }
      __typename
    }
    __typename
  }
}
fragment LandingPageFragment on LandingPage {
    id
  nid
  title
  shortTitle
  lead
  metaTitle
  metaDescription
  metaOgTitle
  metaOgDescription
  metaCanonicalUrl
  canonicalUri
  publication
  editContentUri
  editRelationUri
  preferredUri
  restrictionStatus
  activeMenuTrail {
      edges {
        node {
          label
        link
        __typename
      }
      __typename
    }
    __typename
  }
  teaserImage {
      id
    caption
    image {
        credit
      file(style: "large") {
          alt
        relativeOriginPath
        width
        height
        __typename
      }
      __typename
    }
    __typename
  }
  channel {
      id
    channelType
    title
    sponsors(limit: 5) {
        edges {
          node {
            title
          preferredUri
          teaserImage {
              id
            title
            link {
                path
              __typename
            }
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  channels {
      edges {
        node {
          title
        __typename
      }
      __typename
    }
    __typename
  }
  sponsorLabel
  sponsor {
      id
    title
    colorCode
    preferredUri
    teaserImage {
        id
      title
      image {
          file(style: "large") {
            alt
          width
          height
          relativeOriginPath
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  body {
      ...ParagraphsFragment
    __typename
  }
  SvGrid: grid(publication: "SV", filter: ["Article"], additionalPublications: ["SV"], limit: $landingPageGridPageSize, offset: $landingPageGridOffset) {
      count
    edges {
        node {
          ... on Article {
            id
          title
          lead
          restrictionStatus
          articleType
          shortTitle
          createDate
          changeDate
          preferredUri
          publication
          channel {
              id
            title
            __typename
          }
          authors(limit: 5) {
              edges {
                node {
                  id
                name
                imageParagraph {
                    image {
                      file(style: "large") {
                        alt
                      relativeOriginPath
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          relatedPersons(limit: 2) {
              edges {
                node {
                  teaserImage {
                    id
                  image {
                      file(style: "large") {
                        alt
                      relativeOriginPath
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          teaserImage {
              id
            title
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  grid(publication: $publication, additionalPublications: [SV], limit: $landingPageGridPageSize, offset: $landingPageGridOffset) {
      count
    edges {
        node {
          ... on Article {
            id
          title
          lead
          restrictionStatus
          articleType
          shortTitle
          createDate
          changeDate
          publicationDate
          preferredUri
          publication
          hasVideo
          channel {
              id
            title
            __typename
          }
          authors(limit: 5) {
              edges {
                node {
                  id
                name
                imageParagraph {
                    image {
                      file(style: "large") {
                        alt
                      relativeOriginPath
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          relatedPersons(limit: 2) {
              edges {
                node {
                  teaserImage {
                    id
                  image {
                      file(style: "large") {
                        alt
                      relativeOriginPath
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          teaserImage {
              id
            title
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        ... on LandingPage {
            id
          title
          lead
          shortTitle
          preferredUri
          channel {
              id
            channelType
            sponsors {
                edges {
                  node {
                    id
                  title
                  teaserImage {
                      id
                    title
                    image {
                        file(style: "large") {
                          alt
                        relativeOriginPath
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          teaserImage {
              id
            title
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        ... on NativeAdvertising {
            id
          gcid
          title
          lead
          advertisingType
          shortTitle
          trackingTeaserImpression
          trackingTeaserClick
          createDate
          changeDate
          preferredUri
          publication
          channel {
              id
            title
            __typename
          }
          sponsor {
              id
            title
            teaserImage {
                id
              title
              image {
                  file(style: "scaleh_120") {
                    alt
                  width
                  height
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          teaserImage {
              id
            title
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment ParagraphsFragment on ParagraphInterface {
    ...ImageParagraphFragment
  ...ImageGalleryParagraphFragment
  ...TextParagraphFragment
  ...EmbedParagraphFragment
  ...EntityQueueParagraphFragment
  ...ContentStageParagraphFragment
  ...LinkBoxParagraphFragment
  ...TeaserParagraphFragment
  ...MinistageParagraphFragment
  ...InfoBoxParagraphFragment
  ...InputFormParagraphFragment
  ...VideoParagraphFragment
  ...NativeAdvertisingCarouselParagraphFragment
  ...ParallaxImageParagraphFragment
  ...SectionParagraphFragment
  ...BlockquoteParagraphFragment
  ...RankingListParagraphFragment
  __typename
}
fragment ImageParagraphFragment on ImageParagraph {
    anchorId
  title
  caption
  image {
      credit
    showOriginal
    xxl: file(style: "inline_image_1200") {
        alt
      source
      width
      height
      origin
      relativeOriginPath
      __typename
    }
    xl: file(style: "inline_image_1200") {
        alt
      source
      width
      height
      origin
      __typename
    }
    lg: file(style: "inline_image_1200") {
        alt
      source
      width
      height
      origin
      __typename
    }
    md: file(style: "inline_image_1200") {
        alt
      source
      width
      height
      origin
      __typename
    }
    sm: file(style: "inline_image_1200") {
        alt
      source
      width
      height
      origin
      __typename
    }
    xs: file(style: "inline_image_1200") {
        alt
      source
      width
      height
      origin
      __typename
    }
    __typename
  }
  __typename
}
fragment ImageGalleryParagraphFragment on ImageGalleryParagraph {
    anchorId
  hasTitleOverride
  title
  gallery {
      id
    title
    shortTitle
    preferredUri
    lead
    items: body {
        ... on ImageParagraph {
          id
        title
        caption
        image {
            credit
          file(style: "inline_image_1200") {
              alt
            relativeOriginPath
            height
            width
            source
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment TextParagraphFragment on TextParagraph {
    id
  anchorId
  header
  text
  characterCount
  isLastOfGroup
  styleValue
  __typename
}
fragment EmbedParagraphFragment on EmbedParagraph {
    anchorId
  embedCode
  __typename
}
fragment ContentStageParagraphFragment on ContentStageParagraph {
    anchorId
  contentReference {
      ... on Dossier {
        id
      preferredUri
      title
      lead
      __typename
    }
    __typename
  }
  entityQueue {
      items {
        edges {
          node {
            ... on Dossier {
              id
            preferredUri
            title
            teaserImage {
                id
              image {
                  file(style: "large") {
                    alt
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          ... on NativeAdvertising {
              id
            gcid
            title
            lead
            shortTitle
            createDate
            changeDate
            trackingTeaserImpression
            trackingTeaserClick
            preferredUri
            advertisingType
            authors(limit: 10) {
                edges {
                  node {
                    id
                  name
                  imageParagraph {
                      image {
                        file(style: "large") {
                          alt
                        relativeOriginPath
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            channel {
                id
              title
              __typename
            }
            sponsor {
                id
              title
              preferredUri
              teaserImage {
                  id
                title
                image {
                    file(style: "scaleh_120") {
                      alt
                    relativeOriginPath
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            hasVideo
            teaserImage {
                id
              caption
              image {
                  file(style: "large") {
                    alt
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          ... on Article {
              id
            title
            lead
            restrictionStatus
            shortTitle
            createDate
            changeDate
            preferredUri
            publication
            articleType
            authors(limit: 10) {
                edges {
                  node {
                    id
                  name
                  imageParagraph {
                      image {
                        file(style: "large") {
                          alt
                        relativeOriginPath
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            relatedPersons {
                edges {
                  node {
                    teaserImage {
                      id
                    image {
                        file(style: "large") {
                          alt
                        relativeOriginPath
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            channel {
                id
              title
              __typename
            }
            hasVideo
            teaserImage {
                id
              caption
              image {
                  file(style: "large") {
                    alt
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment EntityQueueParagraphFragment on EntityQueueParagraph {
    anchorId
  title
  style
  landingPage {
      title
    preferredUri(additionalPublications: $additionalPublications)
    __typename
  }
  entityQueue {
      items {
        edges {
          node {
            ... on ContentBox {
              id
            title
            contentSourceValue
            items {
                edges {
                  node {
                    id
                  ... on Article {
                      restrictionStatus
                    id
                    title
                    preferredUri(additionalPublications: [SI, BEO, GM])
                    publication
                    articleType
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          ... on LandingPage {
              id
            title
            lead
            shortTitle
            preferredUri
            channel {
                id
              title
              channelType
              __typename
            }
            teaserImage {
                id
              image {
                  file(style: "large") {
                    alt
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          ... on Dossier {
              id
            preferredUri(additionalPublications: $additionalPublications)
            title
            teaserImage {
                id
              image {
                  file(style: "large") {
                    alt
                  relativeOriginPath
                  width
                  height
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          ... on ImageGallery {
              id
            title
            lead
            shortTitle
            preferredUri(additionalPublications: $additionalPublications)
            authors(limit: 10) {
                edges {
                  node {
                    id
                  name
                  imageParagraph {
                      image {
                        file(style: "large") {
                          alt
                        relativeOriginPath
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            teaserImage {
                id
              caption
              image {
                  file(style: "large") {
                    alt
                  relativeOriginPath
                  width
                  height
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          ... on NativeAdvertising {
              id
            gcid
            title
            lead
            shortTitle
            createDate
            changeDate
            trackingTeaserImpression
            trackingTeaserClick
            publication
            publicationDate
            preferredUri(additionalPublications: $additionalPublications)
            advertisingType
            authors(limit: 10) {
                edges {
                  node {
                    id
                  name
                  imageParagraph {
                      image {
                        file(style: "large") {
                          alt
                        relativeOriginPath
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            channel {
                id
              title
              __typename
            }
            sponsor {
                id
              title
              preferredUri
              teaserImage {
                  id
                title
                image {
                    file(style: "large") {
                      alt
                    relativeOriginPath
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            hasVideo
            teaserImage {
                id
              caption
              image {
                  file(style: "large") {
                    alt
                  relativeOriginPath
                  width
                  height
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          ... on Teaser {
              link {
                path
              __typename
            }
            title
            shortTitle
            lead
            teaserImage {
                caption
              image {
                  file(style: "large") {
                    source
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          ... on Article {
              id
            title
            lead
            restrictionStatus
            shortTitle
            createDate
            changeDate
            preferredUri(additionalPublications: $additionalPublications)
            publication
            publicationDate
            articleType
            authors(limit: 10) {
                edges {
                  node {
                    id
                  name
                  imageParagraph {
                      image {
                        file(style: "large") {
                          alt
                        relativeOriginPath
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            relatedPersons {
                edges {
                  node {
                    teaserImage {
                      id
                    image {
                        file(style: "large") {
                          alt
                        relativeOriginPath
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            channel {
                id
              title
              __typename
            }
            hasVideo
            teaserImage {
                id
              caption
              image {
                  file(style: "large") {
                    alt
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment LinkBoxParagraphFragment on LinkBoxParagraph {
    anchorId
  title
  links(limit: 100) {
      edges {
        node {
          label
        path
        routed
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment MinistageParagraphFragment on MinistageParagraph {
    id
  anchorId
  ministage {
      ...MinistageTeaserFragment
    ...MinistageNewsletterFragment
    ...MinistageSocialMediaFragment
    ...MinistageVideoFragment
    __typename
  }
  __typename
}
fragment MinistageTeaserFragment on MinistageTeaser {
    headline
  subhead
  lead
  image(style: "large") {
      width
    height
    relativeOriginPath
    __typename
  }
  link {
      label
    path
    routed
    __typename
  }
  __typename
}
fragment MinistageNewsletterFragment on MinistageNewsletter {
    headline
  subhead
  lead
  type
  mailchimpList
  image(style: "teaser_1_1") {
      width
    height
    relativeOriginPath
    __typename
  }
  __typename
}
fragment MinistageSocialMediaFragment on MinistageSocialMedia {
    headline
  subhead
  __typename
}
fragment MinistageVideoFragment on MinistageVideo {
    link {
      path
    __typename
  }
  items(limit: 4) {
      edges {
        node {
          ...VideoItem
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment VideoItem on Video {
    id
  brightcoveId
  publicationDate
  changeDate
  caption
  shortTitle
  title
  credit
  image {
      file(style: "large") {
        alt
      relativeOriginPath
      __typename
    }
    __typename
  }
  __typename
}
fragment InfoBoxParagraphFragment on InfoBoxParagraph {
    anchorId
  infoBox {
      style
    body {
        ...ImageParagraphFragment
      ...TextParagraphFragment
      ...EmbedParagraphFragment
      ...LinkBoxParagraphFragment
      ...TeaserParagraphFragment
      ...MinistageParagraphFragment
      __typename
    }
    __typename
  }
  __typename
}
fragment TeaserParagraphFragment on TeaserParagraph {
    anchorId
  teasers(limit: 1) {
      edges {
        node {
          title
        shortTitle
        teaserImage {
            id
          image {
              file(style: "large") {
                alt
              relativeOriginPath
              __typename
            }
            __typename
          }
          __typename
        }
        ... on RouteObjectInterface {
            preferredUri
          __typename
        }
        ... on Product {
            id
          link: link {
              path
            __typename
          }
          __typename
        }
        ... on Article {
            id
          articleType
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment InputFormParagraphFragment on InputFormParagraph {
    id
  anchorId
  webform
  __typename
}
fragment VideoParagraphFragment on VideoParagraph {
    anchorId
  id
  title
  shortTitle
  brightcoveId
  caption
  credit
  image {
      file(style: "large") {
        alt
      relativeOriginPath
      __typename
    }
    credit
    __typename
  }
  video {
      id
    brightcoveId
    publicationDate
    changeDate
    caption
    shortTitle
    title
    credit
    image {
        file(style: "large") {
          alt
        relativeOriginPath
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment NativeAdvertisingCarouselParagraphFragment on NativeAdvertisingCarouselParagraph {
    anchorId
  id
  nativeAdvertising(additionalPublications: ["HZ"]) {
      edges {
        node {
          ... on NativeAdvertising {
            id
          gcid
          title
          lead
          advertisingType
          shortTitle
          createDate
          changeDate
          trackingTeaserImpression
          trackingTeaserClick
          preferredUri(additionalPublications: $additionalPublications)
          authors(limit: 10) {
              edges {
                node {
                  id
                name
                imageParagraph {
                    image {
                      file(style: "large") {
                        alt
                      relativeOriginPath
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          sponsor {
              id
            title
            teaserImage {
                id
              title
              image {
                  file(style: "large") {
                    alt
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          teaserImage {
              id
            title
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                width
                height
                __typename
              }
              xxl_hero_br: file(style: "8x3_1130") {
                  alt
                source
                width
                height
                __typename
              }
              xl_hero_br: file(style: "8x3_1130") {
                  alt
                source
                width
                height
                __typename
              }
              lg_hero_br: file(style: "16x9_700") {
                  alt
                source
                width
                height
                __typename
              }
              md_hero_br: file(style: "16x9_560") {
                  alt
                source
                width
                height
                __typename
              }
              sm_hero_br: file(style: "1x1_280") {
                  alt
                source
                width
                height
                __typename
              }
              xs_hero_br: file(style: "1x1_280") {
                  alt
                source
                width
                height
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment ParallaxImageParagraphFragment on ParallaxImageParagraph {
    id
  image {
      credit
    file(style: "large") {
        alt
      relativeOriginPath
      __typename
    }
    __typename
  }
  __typename
}
fragment SectionParagraphFragment on SectionParagraph {
    anchorId
  id
  title
  body(processors: [TextSplit]) {
      ...ImageParagraphFragment
    ...ImageGalleryParagraphFragment
    ...TextParagraphFragment
    ...EmbedParagraphFragment
    ...EntityQueueParagraphFragment
    ...LinkBoxParagraphFragment
    ...TeaserParagraphFragment
    ...MinistageParagraphFragment
    ...InfoBoxParagraphFragment
    ...InputFormParagraphFragment
    ...VideoParagraphFragment
    ...NativeAdvertisingCarouselParagraphFragment
    ...ParallaxImageParagraphFragment
    __typename
  }
  __typename
}
fragment BlockquoteParagraphFragment on BlockquoteParagraph {
    anchorId
  id
  text
  source
  __typename
}
fragment RankingListParagraphFragment on RankingListParagraph {
    anchorId
  rankings {
      edges {
        node {
          id
        title
        rankingType
        preferredUri
        teaserImage {
            id
          image {
              file(style: "large") {
                alt
              relativeOriginPath
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
  """

def router_route_by_path():
  """query RouterRouteByPath($path: String!, $publication: PublicationEnum, $overviewPageSize: Int!, $overviewPageOffset: Int!, $landingPageGridSize: Int!, $landingPageGridOffset: Int!, $entityQueueLimit: Int!) {
    environment(publication: $publication) {
      routeByPath(path: $path) {
        canonical
      preferred
      statusCode
      object {
          ...VideoFragment
        ...ArticleFragment
        ...NativeAdvertisingFragment
        ...ImageGalleryDetailFragment
        ...KeywordFragment
        ...ChannelFragment
        ...LandingPageFragment
        ...PageFragment
        __typename
      }
      __typename
    }
    __typename
  }
}
fragment ArticleFragment on Article {
    id
  nid
  gcid
  title
  lead
  shortTitle
  seoTitle
  editContentUri
  editRelationUri
  metaTitle
  socialMediaTitle
  metaDescription
  metaOgTitle
  keywords(limit: 20) {
      ...KeywordsFragment
    __typename
  }
  metaOgDescription
  metaCanonicalUrl
  changeDate
  showUpdated
  publicationDate
  preferredUri
  createDate
  metaKeywords
  sponsor {
      id
    title
    __typename
  }
  channel {
      id
    title
    channelType
    settings {
        mainChannel {
          id
        title
        __typename
      }
      __typename
    }
    sponsors {
        edges {
          node {
            ... on Sponsor {
              id
            title
            teaserImage {
                id
              caption
              link {
                  path
                __typename
              }
              image {
                  file(style: "large") {
                    alt
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            backgroundImage {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    sponsor {
        id
      title
      colorCode
      teaserImage {
          id
        link {
            path
          __typename
        }
        image {
            file(style: "large") {
              alt
            relativeOriginPath
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    special {
        id
      title
      colorCode
      logo {
          source
        __typename
      }
      __typename
    }
    partners(limit: 3) {
        edges {
          node {
            ... on Sponsor {
              id
            title
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    landingPage {
        id
      shortTitle
      title
      preferredUri
      teaserImage {
          id
        caption
        link {
            path
          __typename
        }
        image {
            file(style: "large") {
              alt
            relativeOriginPath
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    authors(limit: 1) {
        edges {
          node {
            id
          name
          description
          imageParagraph {
              image {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  activeMenuTrail {
      edges {
        node {
          id
        label
        link
        __typename
      }
      __typename
    }
    __typename
  }
  teaserImage {
      id
    image {
        file(style: "large") {
          relativeOriginPath
        __typename
      }
      __typename
    }
    __typename
  }
  articleType
  authorPrefix
  body(processors: [TextSplit]) {
      ...ParagraphsFragment
    __typename
  }
  showAuthorBox
  authors(limit: 5) {
      edges {
        node {
          id
        name
        description
        imageParagraph {
            image {
              file(style: "large") {
                alt
              relativeOriginPath
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  heroImageBody {
      ...VideoParagraphFragment
    ...ImageParagraphFragment
    ...ImageGalleryParagraphFragment
    __typename
  }
  __typename
}
fragment ParagraphsFragment on ParagraphInterface {
    ...BlockquoteParagraphFragment
  ...EmbedParagraphFragment
  ...EntityQueueParagraphFragment
  ...ImageParagraphFragment
  ...MultiColumnParagraphFragment
  ...TextParagraphFragment
  ...InfoBoxParagraphFragment
  ...VideoParagraphFragment
  ...ImageGalleryParagraphFragment
  ...TeaserStageParagraphFragment
  ...TeaserParagraphFragment
  ...InputFormParagraphFragment
  ...MinistageParagraphFragment
  __typename
}
fragment EmbedParagraphFragment on EmbedParagraph {
    anchorId
  header
  embedCode
  __typename
}
fragment EntityQueueParagraphFragment on EntityQueueParagraph {
    anchorId
  id
  title
  style
  landingPage {
      id
    title
    preferredUri
    __typename
  }
  entityQueue {
      items(limit: $entityQueueLimit) {
        edges {
          node {
            ... on LandingPage {
              id
            gcid
            title
            lead
            shortTitle
            preferredUri
            teaserImage {
                id
              caption
              image {
                  file(style: "large") {
                    alt
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            channel {
                id
              sponsor {
                  id
                title
                colorCode
                teaserImage {
                    id
                  caption
                  link {
                      path
                    __typename
                  }
                  image {
                      file(style: "large") {
                        alt
                      relativeOriginPath
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              channelType
              special {
                  id
                title
                colorCode
                logo {
                    source
                  __typename
                }
                __typename
              }
              partners(limit: 3) {
                  edges {
                    node {
                      ... on Sponsor {
                        id
                      title
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          ...ImageGalleryTeaserFragment
          ... on Teaser {
              id
            shortTitle
            title
            style
            teaserImage {
                id
              image {
                  file(style: "large") {
                    alt
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            link {
                path
              label
              __typename
            }
            __typename
          }
          ... on Article {
              gcid
            id
            title
            lead
            shortTitle
            badgeLabel
            badgeColor
            hasVideo
            preferredUri
            channel {
                id
              title
              channelType
              authors(limit: 1) {
                  edges {
                    node {
                      id
                    name
                    imageParagraph {
                        image {
                          file(style: "large") {
                            alt
                          relativeOriginPath
                          __typename
                        }
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            authors(limit: 1) {
                edges {
                  node {
                    id
                  name
                  imageParagraph {
                      image {
                        file(style: "large") {
                          alt
                        relativeOriginPath
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            sponsor {
                id
              title
              __typename
            }
            teaserImage {
                id
              caption
              image {
                  file(style: "large") {
                    alt
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          ... on NativeAdvertising {
              gcid
            id
            title
            lead
            shortTitle
            hasVideo
            preferredUri
            trackingTeaserClick
            trackingTeaserImpression
            advertisingType
            sponsor {
                id
              title
              __typename
            }
            teaserImage {
                id
              caption
              image {
                  file(style: "large") {
                    alt
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          ... on Video {
              id
            title
            shortTitle
            preferredUri
            teaserImage {
                id
              image {
                  file(style: "large") {
                    alt
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment ImageGalleryTeaserFragment on ImageGallery {
    id
  title
  shortTitle
  badgeLabel
  badgeColor
  preferredUri
  openInFullscreen
  teaserImage {
      id
    image {
        file(style: "large") {
          alt
        relativeOriginPath
        __typename
      }
      __typename
    }
    __typename
  }
  body(limit: 1) {
      ... on ImageParagraph {
        id
      __typename
    }
    __typename
  }
  __typename
}
fragment ImageParagraphFragment on ImageParagraph {
    anchorId
  id
  format
  caption
  title
  image {
      credit
    file(style: "large") {
        alt
      relativeOriginPath
      width
      height
      __typename
    }
    __typename
  }
  __typename
}
fragment MultiColumnParagraphFragment on MultiColumnParagraph {
    anchorId
  id
  style
  body {
      ...ImageParagraphFragment
    ...TextParagraphFragment
    __typename
  }
  __typename
}
fragment TextParagraphFragment on TextParagraph {
    anchorId
  id
  characterCount
  isLastOfGroup
  header
  text
  styleValue
  __typename
}
fragment InfoBoxParagraphFragment on InfoBoxParagraph {
    anchorId
  infoBox {
      body {
        ...ImageParagraphFragment
      ...TextParagraphFragment
      __typename
    }
    __typename
  }
  __typename
}
fragment VideoParagraphFragment on VideoParagraph {
    anchorId
  id
  brightcoveId
  caption
  alt
  shortTitle
  title
  credit
  image {
      file(style: "large") {
        alt
      relativeOriginPath
      __typename
    }
    __typename
  }
  video {
      id
    brightcoveId
    caption
    shortTitle
    title
    credit
    image {
        file(style: "large") {
          alt
        relativeOriginPath
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment ImageGalleryParagraphFragment on ImageGalleryParagraph {
    id
  anchorId
  hasTitleOverride
  title
  gallery {
      id
    title
    shortTitle
    preferredUri
    items: body {
        ...ImageParagraphFragment
      __typename
    }
    __typename
  }
  __typename
}
fragment TeaserParagraphFragment on TeaserParagraph {
    anchorId
  id
  teasers {
      edges {
        node {
          ... on Product {
            title
          shortTitle
          teaserImage {
              id
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          price
          pricePrefix
          link {
              label
            path
            __typename
          }
          __typename
        }
        ... on Teaser {
            id
          shortTitle
          title
          lead
          style
          teaserImage {
              id
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          link {
              path
            label
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment InputFormParagraphFragment on InputFormParagraph {
    id
  webform
  __typename
}
fragment MinistageParagraphFragment on MinistageParagraph {
    id
  anchorId
  ministage {
      ...HoroscopeStageParagraphFragment
    ...MinistageVideoFragment
    __typename
  }
  __typename
}
fragment HoroscopeStageParagraphFragment on MinistageHoroscopes {
    name
  shortTitle
  __typename
}
fragment MinistageVideoFragment on MinistageVideo {
    link {
      path
    __typename
  }
  name
  items(limit: 4) {
      edges {
        node {
          ...VideoItem
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment VideoItem on Video {
    id
  brightcoveId
  publicationDate
  changeDate
  caption
  shortTitle
  title
  credit
  preferredUri
  image {
      file(style: "large") {
        alt
      relativeOriginPath
      __typename
    }
    __typename
  }
  __typename
}
fragment BlockquoteParagraphFragment on BlockquoteParagraph {
    anchorId
  id
  text
  source
  __typename
}
fragment TeaserStageParagraphFragment on TeaserStageParagraph {
    anchorId
  id
  termReference {
      ... on Channel {
        id
      landingPage {
          id
        preferredUri
        title
        shortTitle
        teaserImage {
            id
          caption
          image {
              file(style: "large") {
                alt
              relativeOriginPath
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      title
      preferredUri
      channelType
      logoChoice
      sponsor {
          id
        title
        colorCode
        teaserImage {
            id
          link {
              path
            __typename
          }
          image {
              file(style: "large") {
                alt
              relativeOriginPath
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      partners(limit: 3) {
          edges {
            node {
              ... on Sponsor {
                id
              title
              canonicalUri
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      special {
          id
        title
        logo {
            source
          __typename
        }
        colorCode
        format
        __typename
      }
      entities(limit: 3, filter: [Article, ImageGallery]) {
          edges {
            node {
              ... on Article {
                gcid
              id
              title
              shortTitle
              preferredUri
              sponsor {
                  id
                title
                __typename
              }
              channel {
                  id
                title
                __typename
              }
              __typename
            }
            ... on ImageGallery {
                id
              title
              shortTitle
              preferredUri
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    ... on Keyword {
        id
      label
      preferredUri
      settings {
          channel {
            id
          channelType
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  title
  imageFormat
  image {
      source
    __typename
  }
  entities(filter: [Article, ImageGallery, NativeAdvertising, Video, LandingPage, Teaser], additionalPublications: [GM, HZ, BEO]) {
      edges {
        node {
          ... on Video {
            id
          title
          preferredUri(additionalPublications: [GM, HZ, BEO])
          publication(additionalPublications: [GM, HZ, BEO])
          shortTitle
          hasVideo
          teaserImage {
              id
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        ... on ImageGallery {
            id
          title
          preferredUri(additionalPublications: [GM, HZ, BEO])
          publication(additionalPublications: [GM, HZ, BEO])
          shortTitle
          badgeLabel
          badgeColor
          teaserImage {
              id
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        ... on Article {
            gcid
          id
          title
          preferredUri(additionalPublications: [GM, HZ, BEO])
          publication(additionalPublications: [GM, HZ, BEO])
          shortTitle
          badgeLabel
          badgeColor
          hasVideo
          channel {
              id
            title
            channelType
            authors(limit: 1) {
                edges {
                  node {
                    id
                  name
                  imageParagraph {
                      image {
                        file(style: "large") {
                          alt
                        relativeOriginPath
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          sponsor {
              id
            title
            __typename
          }
          authors(limit: 1) {
              edges {
                node {
                  id
                name
                imageParagraph {
                    image {
                      file(style: "large") {
                        alt
                      relativeOriginPath
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          teaserImage {
              id
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        ... on NativeAdvertising {
            gcid
          id
          title
          preferredUri(additionalPublications: [GM, HZ, BEO])
          publication(additionalPublications: [GM, HZ, BEO])
          shortTitle
          trackingTeaserClick
          trackingTeaserImpression
          advertisingType
          sponsor {
              id
            title
            __typename
          }
          teaserImage {
              id
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        ... on Teaser {
            id
          title
          link {
              path
            label
            __typename
          }
          shortTitle
          hasVideo
          teaserImage {
              id
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        ... on LandingPage {
            gcid
          id
          title
          preferredUri(additionalPublications: [GM, HZ, BEO])
          publication(additionalPublications: [GM, HZ, BEO])
          shortTitle
          hasVideo
          teaserImage {
              id
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          channel {
              id
            sponsor {
                id
              title
              colorCode
              teaserImage {
                  id
                caption
                image {
                    file(style: "large") {
                      alt
                    relativeOriginPath
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            channelType
            special {
                id
              title
              colorCode
              logo {
                  source
                __typename
              }
              __typename
            }
            partners(limit: 3) {
                edges {
                  node {
                    ... on Sponsor {
                      id
                    title
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment KeywordsFragment on KeywordConnection {
    edges {
      node {
        label
      preferredUri
      __typename
    }
    __typename
  }
  __typename
}
fragment NativeAdvertisingFragment on NativeAdvertising {
    id
  gcid
  title
  lead
  advertisingType
  advertisingTypeValue
  shortTitle
  seoTitle
  metaTitle
  socialMediaTitle
  metaDescription
  metaOgTitle
  keywords(limit: 20) {
      edges {
        node {
          label
        preferredUri
        __typename
      }
      __typename
    }
    __typename
  }
  metaOgDescription
  metaCanonicalUrl
  showUpdated
  changeDate
  publicationDate
  preferredUri
  trackingDetailImpression
  createDate
  metaKeywords
  sponsor {
      id
    title
    teaserImage {
        id
      link {
          path
        __typename
      }
      image {
          file(style: "large") {
            alt
          relativeOriginPath
          __typename
        }
        __typename
      }
      __typename
    }
    backgroundImage {
        file(style: "large") {
          alt
        relativeOriginPath
        __typename
      }
      __typename
    }
    __typename
  }
  channel {
      id
    title
    channelType
    settings {
        mainChannel {
          id
        title
        __typename
      }
      __typename
    }
    sponsor {
        id
      title
      colorCode
      teaserImage {
          id
        link {
            path
          __typename
        }
        image {
            file(style: "large") {
              alt
            relativeOriginPath
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    special {
        id
      title
      colorCode
      logo {
          source
        __typename
      }
      __typename
    }
    partners(limit: 3) {
        edges {
          node {
            ... on Sponsor {
              id
            title
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    landingPage {
        id
      shortTitle
      title
      preferredUri
      teaserImage {
          id
        caption
        link {
            path
          __typename
        }
        image {
            file(style: "large") {
              alt
            relativeOriginPath
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    authors(limit: 1) {
        edges {
          node {
            id
          name
          description
          imageParagraph {
              image {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  activeMenuTrail {
      edges {
        node {
          id
        label
        link
        __typename
      }
      __typename
    }
    __typename
  }
  teaserImage {
      id
    image {
        file(style: "large") {
          relativeOriginPath
        __typename
      }
      __typename
    }
    __typename
  }
  body {
      ...ParagraphsFragment
    __typename
  }
  authors(limit: 5) {
      edges {
        node {
          id
        name
        description
        imageParagraph {
            image {
              file(style: "large") {
                alt
              relativeOriginPath
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  heroImageBody {
      ...VideoParagraphFragment
    ...ImageParagraphFragment
    ...ImageGalleryParagraphFragment
    __typename
  }
  __typename
}
fragment ImageGalleryDetailFragment on ImageGallery {
    id
  nid
  title
  shortTitle
  metaTitle
  metaDescription
  metaOgTitle
  metaOgDescription
  metaCanonicalUrl
  changeDate
  publicationDate
  lead
  preferredUri
  editContentUri
  editRelationUri
  channel {
      id
    title
    settings {
        mainChannel {
          id
        title
        __typename
      }
      __typename
    }
    __typename
  }
  createDate
  metaKeywords
  keywords(limit: 100) {
      ...KeywordsFragment
    __typename
  }
  teaserImage {
      id
    caption
    format
    image {
        credit
      file(style: "large") {
          alt
        relativeOriginPath
        __typename
      }
      __typename
    }
    __typename
  }
  body {
      ...ImageParagraphFragment
    __typename
  }
  activeMenuTrail {
      edges {
        node {
          id
        label
        link
        __typename
      }
      __typename
    }
    __typename
  }
  authors(limit: 1) {
      edges {
        node {
          id
        name
        __typename
      }
      __typename
    }
    __typename
  }
  recommendations(limit: 4) {
      edges {
        node {
          ...ImageGalleryTeaserFragment
        ... on Article {
            id
          title
          preferredUri
          badgeLabel
          badgeColor
          hasVideo
          shortTitle
          channel {
              id
            title
            __typename
          }
          teaserImage {
              id
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        ... on Video {
            id
          title
          shortTitle
          preferredUri
          teaserImage {
              id
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment KeywordFragment on Keyword {
    id
  label
  preferredUri
  settings {
      channel {
        id
      title
      __typename
    }
    mainChannel {
        id
      title
      __typename
    }
    title
    lead
    headerLayout
    headerImage {
        file(style: "large") {
          alt
        relativeOriginPath
        __typename
      }
      __typename
    }
    teaserGridLayout
    hasHeroTeaser
    __typename
  }
  entities(limit: $overviewPageSize, offset: $overviewPageOffset, filter: [Article, ImageGallery, KeywordSettings, NativeAdvertising, Video]) {
      count
    edges {
        node {
          ... on Article {
            id
          title
          preferredUri
          shortTitle
          badgeLabel
          badgeColor
          hasVideo
          channel {
              id
            title
            channelType
            authors(limit: 1) {
                edges {
                  node {
                    id
                  name
                  imageParagraph {
                      image {
                        file(style: "large") {
                          alt
                        relativeOriginPath
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          authors(limit: 1) {
              edges {
                node {
                  id
                name
                imageParagraph {
                    image {
                      file(style: "large") {
                        alt
                      relativeOriginPath
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          teaserImage {
              id
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        ...ImageGalleryTeaserFragment
        ... on NativeAdvertising {
            id
          gcid
          title
          preferredUri
          shortTitle
          trackingTeaserClick
          trackingTeaserImpression
          advertisingType
          sponsor {
              id
            title
            __typename
          }
          teaserImage {
              id
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  activeMenuTrail {
      edges {
        node {
          id
        label
        link
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment ChannelFragment on Channel {
    id
  tid
  canonicalUri
  preferredUri
  editContentUri
  settings {
      channel {
        id
      title
      sponsors {
          edges {
            node {
              ... on Sponsor {
                id
              title
              teaserImage {
                  id
                caption
                link {
                    path
                  __typename
                }
                image {
                    file(style: "large") {
                      alt
                    relativeOriginPath
                    __typename
                  }
                  __typename
                }
                __typename
              }
              backgroundImage {
                  file(style: "large") {
                    alt
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    mainChannel {
        id
      title
      __typename
    }
    title
    lead
    headerLayout
    headerImage {
        file(style: "large") {
          alt
        relativeOriginPath
        __typename
      }
      __typename
    }
    teaserGridLayout
    hasHeroTeaser
    __typename
  }
  landingPage {
      id
    title
    metaTitle
    metaDescription
    metaOgTitle
    metaOgDescription
    metaCanonicalUrl
    lead
    teaserImage {
        id
      image {
          file(style: "16x9_1130") {
            relativeOriginPath
          __typename
        }
        __typename
      }
      __typename
    }
    preferredUri
    activeMenuTrail {
        edges {
          node {
            id
          link
          label
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  authors(limit: 1) {
      edges {
        node {
          id
        name
        __typename
      }
      __typename
    }
    __typename
  }
  entities(filter: [Article, ImageGallery, NativeAdvertising], limit: $overviewPageSize, offset: $overviewPageOffset) {
      count
    edges {
        node {
          ... on Article {
            id
          title
          preferredUri
          shortTitle
          badgeLabel
          badgeColor
          hasVideo
          channel {
              id
            title
            channelType
            authors(limit: 1) {
                edges {
                  node {
                    id
                  name
                  imageParagraph {
                      image {
                        file(style: "large") {
                          alt
                        relativeOriginPath
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          authors(limit: 1) {
              edges {
                node {
                  id
                name
                imageParagraph {
                    image {
                      file(style: "large") {
                        alt
                      relativeOriginPath
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          teaserImage {
              id
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        ... on NativeAdvertising {
            id
          gcid
          title
          lead
          shortTitle
          hasVideo
          preferredUri
          trackingTeaserClick
          trackingTeaserImpression
          advertisingType
          sponsor {
              id
            title
            __typename
          }
          authors(limit: 1) {
              edges {
                node {
                  id
                name
                imageParagraph {
                    image {
                      file(style: "large") {
                        alt
                      relativeOriginPath
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          teaserImage {
              id
            caption
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        ...ImageGalleryTeaserFragment
        __typename
      }
      __typename
    }
    __typename
  }
  activeMenuTrail {
      edges {
        node {
          id
        label
        link
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment LandingPageFragment on LandingPage {
    id
  paragraphsSubsetSize
  title
  metaTitle
  metaDescription
  metaOgTitle
  metaOgDescription
  metaCanonicalUrl
  editContentUri
  editRelationUri
  lead
  preferredUri
  activeMenuTrail {
      edges {
        node {
          id
        label
        link
        __typename
      }
      __typename
    }
    __typename
  }
  channel {
      id
    channelType
    settings {
        mainChannel {
          id
        title
        __typename
      }
      __typename
    }
    sponsors {
        edges {
          node {
            ... on Sponsor {
              id
            title
            teaserImage {
                id
              caption
              link {
                  path
                __typename
              }
              image {
                  file(style: "large") {
                    alt
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            backgroundImage {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  teaserImage {
      id
    image {
        file(style: "16x9_1130") {
          relativeOriginPath
        __typename
      }
      __typename
    }
    __typename
  }
  grid(limit: $landingPageGridSize, offset: $landingPageGridOffset) {
      count
    edges {
        node {
          ... on LandingPage {
            id
          title
          lead
          shortTitle
          preferredUri
          teaserImage {
              id
            caption
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          channel {
              id
            sponsor {
                id
              title
              colorCode
              teaserImage {
                  id
                caption
                image {
                    file(style: "large") {
                      alt
                    relativeOriginPath
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            channelType
            special {
                id
              title
              colorCode
              logo {
                  source
                __typename
              }
              __typename
            }
            partners(limit: 3) {
                edges {
                  node {
                    ... on Sponsor {
                      id
                    title
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  body {
      ...ParagraphsFragment
    __typename
  }
  __typename
}
fragment PageFragment on Page {
    id
  nid
  title
  lead
  shortTitle
  preferredUri
  metaTitle
  metaOgTitle
  metaDescription
  metaOgDescription
  metaCanonicalUrl
  channel {
      id
    title
    settings {
        mainChannel {
          id
        title
        __typename
      }
      __typename
    }
    __typename
  }
  createDate
  metaKeywords
  heroImageBody {
      ...ImageParagraphFragment
    __typename
  }
  activeMenuTrail {
      count
    edges {
        node {
          id
        label
        link
        __typename
      }
      __typename
    }
    __typename
  }
  body {
      ...ParagraphsFragment
    __typename
  }
  __typename
}
fragment VideoFragment on Video {
    activeMenuTrail {
      edges {
        node {
          id
        label
        link
        __typename
      }
      __typename
    }
    __typename
  }
  brightcoveId
  caption
  changeDate
  channel {
      id
    tid
    channelType
    landingPage {
        id
      preferredUri
      __typename
    }
    title
    settings {
        title
      lead
      mainChannel {
          id
        title
        __typename
      }
      headerImage {
          file(style: "large") {
            alt
          relativeOriginPath
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  createDate
  credit
  id
  metaDescription
  metaKeywords
  metaTitle
  publicationDate
  preferredUri
  shortTitle
  teaserImage {
      id
    image {
        file(style: "large") {
          relativeOriginPath
        __typename
      }
      __typename
    }
    __typename
  }
  title
  __typename
}
  """

def latest_search():
  return """query LatestSearch($query: String!, $sort: SearchOrderByField, $contentTypes: [ContentTypeEnum], $pageSize: Int, $path: String, $publication: PublicationEnum) {
  environment(publication: $publication) {
    routeByPath(path: $path) {
      canonical
      preferred
      object {
        ... on LandingPage {
          id
          title
          metaTitle
          metaDescription
          metaOgTitle
          metaOgDescription
          metaCanonicalUrl
          lead
          preferredUri
          channel {
            id
            title
            __typename
          }
          createDate
          metaKeywords
          __typename
        }
        __typename
      }
      __typename
    }
    globalSearch(search: $query, limit: $pageSize, sort: $sort, content_types: $contentTypes) {
      count
      edges {
        node {
          ... on Article {
            id
            preferredUri
            title
            shortTitle
            hasVideo
            publicationDate
            channel {
              id
              title
              preferredUri
              __typename
            }
            teaserImage {
              id
              image {
                file(style: "large") {
                  alt
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          ... on ImageGallery {
            preferredUri
            id
            title
            shortTitle
            openInFullscreen
            teaserImage {
              id
              image {
                file(style: "large") {
                  alt
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            body(limit: 1) {
              ... on ImageParagraph {
                id
                __typename
              }
              __typename
            }
            publicationDate
            channel {
              id
              title
              preferredUri
              __typename
            }
            __typename
          }
          ... on Video {
            preferredUri
            id
            title
            shortTitle
            teaserImage {
              id
              image {
                file(style: "large") {
                  alt
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            publicationDate
            channel {
              id
              title
              preferredUri
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}
  """

def videos_page():
  return """query VideosPage($publication: PublicationEnum, $path: String!, $vid: String, $query: String!, $limit: Int, $offset: Int, $videoStageLimit: Int, $videoStageOffset: Int, $sort: SearchOrderByField, $contentTypes: [ContentTypeEnum], $channelType: [ChannelTypeEnum], $overviewPageVisibility: [OverviewPageVisibilityEnum]) {
  environment(publication: $publication) {
    routeByPath(path: $path) {
      canonical
      preferred
      object {
        ... on LandingPage {
          id
          title
          metaTitle
          metaDescription
          metaOgTitle
          metaOgDescription
          metaCanonicalUrl
          lead
          preferredUri
          activeMenuTrail {
            edges {
              node {
                id
                label
                link
                __typename
              }
              __typename
            }
            __typename
          }
          teaserImage {
            id
            image {
              file(style: "16x9_1130") {
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          channel {
            id
            title
            __typename
          }
          createDate
          metaKeywords
          __typename
        }
        __typename
      }
      __typename
    }
    termsByVocabulary(vid: $vid, channelType: $channelType, overviewPageVisibility: $overviewPageVisibility) {
      count
      edges {
        node {
          id
          title
          preferredUri
          showOnVideoOverview
          landingPage {
            id
            title
            lead
            preferredUri
            __typename
          }
          settings {
            lead
            __typename
          }
          authors(limit: 1) {
            edges {
              node {
                id
                name
                imageParagraph {
                  image {
                    file(style: "large") {
                      alt
                      relativeOriginPath
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          entities(limit: 3, filter: $contentTypes) {
            items {
              ...VideosOverviewTeaserFragment
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    videoStageSearch: globalSearch(search: $query, limit: $videoStageLimit, offset: $videoStageOffset, sort: $sort, content_types: $contentTypes) {
      count
      edges {
        node {
          ...VideosOverviewTeaserFragment
          __typename
        }
        __typename
      }
      __typename
    }
    globalSearch(search: $query, limit: $limit, offset: $offset, sort: $sort, content_types: $contentTypes) {
      count
      edges {
        node {
          ...VideosOverviewTeaserFragment
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}

fragment VideosOverviewTeaserFragment on Video {
  id
  title
  preferredUri
  shortTitle
  changeDate
  metaDescription
  metaKeywords
  metaTitle
  caption
  publicationDate
  brightcoveId
  credit
  teaserImage {
    id
    image {
      file(style: "large") {
        alt
        relativeOriginPath
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
  """

def keyword_listing():
  return """query KeywordListing($searchString: String!, $publication: PublicationEnum) {
  environment(publication: $publication) {
    keywordsByChar(searchString: $searchString, limit: 700) {
      ...KeywordListFragment
      __typename
    }
    __typename
  }
}

fragment KeywordListFragment on KeywordConnection {
  edges {
    node {
      id
      label
      preferredUri
      __typename
    }
    __typename
  }
  __typename
}
  """

def comment():
  return """query Comment($limit: Int, $id: String!, $offset: Int, $sort: SortOrderEnum) {
  commentsById(limit: $limit, id: $id, offset: $offset, sort: $sort) {
    count
    totalCount
    edges {
      node {
        id
        name
        createDate
        body
        commentReplies(limit: 999) {
          edges {
            node {
              id
              name
              createDate
              body
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}
  """

def onmeda():
  return """query Onmeda($char: CharEnum!, $publication: PublicationEnum, $category: ExplainingArticleCategoryEnum!) {
  environment(publication: $publication) {
    onmedaByChar(limit: 1000, char: $char, category: $category) {
      ...OnmedaArticleListFragment
      __typename
    }
    __typename
  }
}

fragment OnmedaArticleListFragment on TitleAliasConnection {
  edges {
    node {
      id
      title
      target {
        preferredUri
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
  """

def search():
  return """query Search($query: String!, $pageSize: Int, $sort: SearchOrderByField, $contentTypes: [ContentTypeEnum], $publication: PublicationEnum, $additionalPublications: [PublicationEnum]) {
  environment(publication: $publication, additionalPublications: $additionalPublications) {
    globalSearch(search: $query, limit: $pageSize, sort: $sort, content_types: $contentTypes) {
      count
      ...SearchResultFragment
      __typename
    }
    __typename
  }
}

fragment SearchResultFragment on SearchableUnionConnection {
  edges {
    node {
      ... on LandingPage {
        id
        title
        lead
        shortTitle
        preferredUri
        sponsor {
          id
          __typename
        }
        channel {
          id
          channelType
          __typename
        }
        teaserImage {
          id
          image {
            file(style: "large") {
              alt
              relativeOriginPath
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      ... on NativeAdvertising {
        id
        gcid
        title
        lead
        shortTitle
        createDate
        changeDate
        trackingTeaserImpression
        trackingTeaserClick
        preferredUri(publication: $publication, additionalPublications: $additionalPublications)
        advertisingType
        authors(limit: 10) {
          edges {
            node {
              id
              name
              imageParagraph {
                image {
                  file(style: "large") {
                    alt
                    relativeOriginPath
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        channel {
          id
          title
          __typename
        }
        sponsor {
          id
          title
          teaserImage {
            id
            title
            image {
              file(style: "large") {
                alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        hasVideo
        teaserImage {
          id
          caption
          image {
            file(style: "large") {
              alt
              relativeOriginPath
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      ... on Article {
        preferredUri(publication: $publication, additionalPublications: $additionalPublications)
        articleType
        id
        title
        restrictionStatus
        lead
        shortTitle
        createDate
        changeDate
        publicationDate
        channel {
          id
          title
          __typename
        }
        hasVideo
        authors(limit: 10) {
          edges {
            node {
              id
              name
              imageParagraph {
                image {
                  file(style: "large") {
                    alt
                    relativeOriginPath
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        teaserImage {
          id
          image {
            file(style: "large") {
              alt
              relativeOriginPath
              width
              height
              __typename
            }
            __typename
          }
          __typename
        }
        relatedPersons {
          edges {
            node {
              teaserImage {
                id
                image {
                  file(style: "large") {
                    alt
                    relativeOriginPath
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
  """

def autocomplete():
  return """query Autocomplete($char: String!, $pageSize: Int!, $contentTypes: [ContentTypeEnum], $publication: PublicationEnum, $additionalPublications: [PublicationEnum]) {
  environment(publication: $publication, additionalPublications: $additionalPublications) {
    globalSearch(search: $char, limit: $pageSize, content_types: $contentTypes) {
      edges {
        node {
          ... on Article {
            id
            title
            preferredUri
            __typename
          }
          ... on LandingPage {
            id
            title
            preferredUri
            __typename
          }
          ... on NativeAdvertising {
            id
            title
            preferredUri
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}
  """

def routeByPath():
  return """query RouteByPath($path: String!, $publication: PublicationEnum, $additionalPublications: [PublicationEnum], $landingPageGridPageSize: Int!, $landingPageGridOffset: Int!, $branchPageSize: Int!, $branchOffset: Int!, $keywordsPageSize: Int!, $keywordsOffset: Int!, $dossierPageSize: Int!, $dossierOffset: Int!, $sponsorLimit: Int, $sponsorSortBy: SortTypeEnum, $sponsorSortOrder: SortOrderEnum, $sponsorOffset: Int!, $organizationOffset: Int, $organizationLimit: Int, $organizationSortBy: ArticleSortEnum, $organizationSortOrder: SortOrderEnum, $personOffset: Int, $personLimit: Int, $personSortBy: ArticleSortEnum, $personSortOrder: SortOrderEnum, $rankingPageSize: Int!, $rankingOffset: Int!) {
    environment(publication: $publication, additionalPublications: $additionalPublications) {
      routeByPath(path: $path) {
        canonical
      preferred
      object {
          ...ArticleFragment
        ...ExplainingArticleFragment
        ...ImageGalleryArticleFragment
        ...LandingPageFragment
        ...KeywordArticlesListFragment
        ...SponsorFragment
        ...NativeAdvertisingFragment
        ...DossierFragment
        ...OrganizationFragment
        ...BranchFragment
        ...PageScreenFragment
        ...VideoFragment
        ...RankingFragment
        ...PersonFragment
        __typename
      }
      __typename
    }
    __typename
  }
}
fragment ArticleFragment on Article {
    id
  nid
  title
  publication
  lead
  shortTitle
  metaTitle
  seoTitle
  editContentUri
  editRelationUri
  socialMediaTitle
  canonicalUri
  metaDescription
  metaKeywords
  keywords(limit: 100) {
      edges {
        node {
          label
        tid
        __typename
      }
      __typename
    }
    __typename
  }
  metaOgTitle
  metaOgDescription
  createDate
  changeDate
  publicationDate
  showUpdated
  preferredUri
  articleType
  publication
  restrictionStatus
  activeMenuTrail {
      edges {
        node {
          label
        link
        __typename
      }
      __typename
    }
    __typename
  }
  relatedPersons {
      edges {
        node {
          title
        preferredUri
        teaserImage {
            id
          image {
              file(style: "large") {
                alt
              relativeOriginPath
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  relatedOrganizations {
      edges {
        node {
          ... on Organization {
            title
          preferredUri
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  authorPrefix
  metaCanonicalUrl
  authors(limit: 5) {
      edges {
        node {
          id
        name
        imageParagraph {
            image {
              file(style: "large") {
                alt
              relativeOriginPath
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  sponsor {
      preferredUri
    prefix
    colorCode
    id
    title
    teaserImage {
        id
      title
      image {
          file(style: "scaleh_120") {
            alt
          relativeOriginPath
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  commentStatus
  channel {
      id
    title
    channelType
    articles(limit: 2) {
        edges {
          node {
            ... on Article {
              id
            title
            lead
            hasVideo
            articleType
            shortTitle
            createDate
            changeDate
            publicationDate
            showUpdated
            restrictionStatus
            preferredUri
            authorPrefix
            channel {
                id
              title
              __typename
            }
            authors(limit: 2) {
                edges {
                  node {
                    id
                  name
                  imageParagraph {
                      image {
                        file(style: "large") {
                          alt
                        relativeOriginPath
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            teaserImage {
                id
              image {
                  file(style: "large") {
                    alt
                  width
                  height
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            relatedPersons(limit: 2) {
                edges {
                  node {
                    teaserImage {
                      id
                    image {
                        file(style: "large") {
                          alt
                        relativeOriginPath
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          ... on NativeAdvertising {
              id
            title
            lead
            hasVideo
            advertisingType
            shortTitle
            createDate
            changeDate
            publicationDate
            showUpdated
            restrictionStatus
            preferredUri
            authorPrefix
            channel {
                id
              title
              __typename
            }
            authors(limit: 2) {
                edges {
                  node {
                    id
                  name
                  imageParagraph {
                      image {
                        file(style: "large") {
                          alt
                        relativeOriginPath
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            teaserImage {
                id
              image {
                  file(style: "large") {
                    alt
                  width
                  height
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            relatedPersons(limit: 2) {
                edges {
                  node {
                    teaserImage {
                      id
                    image {
                        file(style: "large") {
                          alt
                        relativeOriginPath
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  topics {
      ...ArticleFooterFragment
    __typename
  }
  heroImageBody {
      ...HeroFragment
    ...VideoLoopParagraphFragment
    __typename
  }
  teaserImage {
      id
    caption
    image {
        credit
      file(style: "large") {
          alt
        relativeOriginPath
        width
        height
        __typename
      }
      __typename
    }
    __typename
  }
  body(processors: [TextSplit]) {
      ...ParagraphsFragment
    __typename
  }
  __typename
}
fragment ArticleFooterFragment on ProfileKeywordUnionConnection {
    edges {
      node {
        ... on Person {
          preferredUri
        label: title
        nid
        __typename
      }
      ... on Organization {
          preferredUri
        label: title
        nid
        __typename
      }
      ... on Keyword {
          preferredUri
        label
        tid
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment ParagraphsFragment on ParagraphInterface {
    ...ImageParagraphFragment
  ...ImageGalleryParagraphFragment
  ...TextParagraphFragment
  ...EmbedParagraphFragment
  ...EntityQueueParagraphFragment
  ...ContentStageParagraphFragment
  ...LinkBoxParagraphFragment
  ...TeaserParagraphFragment
  ...MinistageParagraphFragment
  ...InfoBoxParagraphFragment
  ...InputFormParagraphFragment
  ...VideoParagraphFragment
  ...NativeAdvertisingCarouselParagraphFragment
  ...ParallaxImageParagraphFragment
  ...SectionParagraphFragment
  ...BlockquoteParagraphFragment
  ...RankingListParagraphFragment
  __typename
}
fragment ImageParagraphFragment on ImageParagraph {
    anchorId
  title
  caption
  image {
      credit
    showOriginal
    xxl: file(style: "inline_image_1200") {
        alt
      source
      width
      height
      origin
      relativeOriginPath
      __typename
    }
    xl: file(style: "inline_image_1200") {
        alt
      source
      width
      height
      origin
      __typename
    }
    lg: file(style: "inline_image_1200") {
        alt
      source
      width
      height
      origin
      __typename
    }
    md: file(style: "inline_image_1200") {
        alt
      source
      width
      height
      origin
      __typename
    }
    sm: file(style: "inline_image_1200") {
        alt
      source
      width
      height
      origin
      __typename
    }
    xs: file(style: "inline_image_1200") {
        alt
      source
      width
      height
      origin
      __typename
    }
    __typename
  }
  __typename
}
fragment ImageGalleryParagraphFragment on ImageGalleryParagraph {
    anchorId
  hasTitleOverride
  title
  gallery {
      id
    title
    shortTitle
    preferredUri
    lead
    items: body {
        ... on ImageParagraph {
          id
        title
        caption
        image {
            credit
          file(style: "inline_image_1200") {
              alt
            relativeOriginPath
            height
            width
            source
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment TextParagraphFragment on TextParagraph {
    id
  anchorId
  header
  text
  characterCount
  isLastOfGroup
  styleValue
  __typename
}
fragment EmbedParagraphFragment on EmbedParagraph {
    anchorId
  embedCode
  __typename
}
fragment ContentStageParagraphFragment on ContentStageParagraph {
    anchorId
  contentReference {
      ... on Dossier {
        id
      preferredUri
      title
      lead
      __typename
    }
    __typename
  }
  entityQueue {
      items {
        edges {
          node {
            ... on Dossier {
              id
            preferredUri
            title
            teaserImage {
                id
              image {
                  file(style: "large") {
                    alt
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          ... on NativeAdvertising {
              id
            gcid
            title
            lead
            shortTitle
            createDate
            changeDate
            trackingTeaserImpression
            trackingTeaserClick
            preferredUri
            advertisingType
            authors(limit: 10) {
                edges {
                  node {
                    id
                  name
                  imageParagraph {
                      image {
                        file(style: "large") {
                          alt
                        relativeOriginPath
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            channel {
                id
              title
              __typename
            }
            sponsor {
                id
              title
              preferredUri
              teaserImage {
                  id
                title
                image {
                    file(style: "scaleh_120") {
                      alt
                    relativeOriginPath
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            hasVideo
            teaserImage {
                id
              caption
              image {
                  file(style: "large") {
                    alt
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          ... on Article {
              id
            title
            lead
            restrictionStatus
            shortTitle
            createDate
            changeDate
            preferredUri
            publication
            articleType
            authors(limit: 10) {
                edges {
                  node {
                    id
                  name
                  imageParagraph {
                      image {
                        file(style: "large") {
                          alt
                        relativeOriginPath
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            relatedPersons {
                edges {
                  node {
                    teaserImage {
                      id
                    image {
                        file(style: "large") {
                          alt
                        relativeOriginPath
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            channel {
                id
              title
              __typename
            }
            hasVideo
            teaserImage {
                id
              caption
              image {
                  file(style: "large") {
                    alt
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment EntityQueueParagraphFragment on EntityQueueParagraph {
    anchorId
  title
  style
  landingPage {
      title
    preferredUri(additionalPublications: $additionalPublications)
    __typename
  }
  entityQueue {
      items {
        edges {
          node {
            ... on ContentBox {
              id
            title
            contentSourceValue
            items {
                edges {
                  node {
                    id
                  ... on Article {
                      restrictionStatus
                    id
                    title
                    preferredUri(additionalPublications: [SI, BEO, GM])
                    publication
                    articleType
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          ... on LandingPage {
              id
            title
            lead
            shortTitle
            preferredUri
            channel {
                id
              title
              channelType
              __typename
            }
            teaserImage {
                id
              image {
                  file(style: "large") {
                    alt
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          ... on Dossier {
              id
            preferredUri(additionalPublications: $additionalPublications)
            title
            teaserImage {
                id
              image {
                  file(style: "large") {
                    alt
                  relativeOriginPath
                  width
                  height
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          ... on ImageGallery {
              id
            title
            lead
            shortTitle
            preferredUri(additionalPublications: $additionalPublications)
            authors(limit: 10) {
                edges {
                  node {
                    id
                  name
                  imageParagraph {
                      image {
                        file(style: "large") {
                          alt
                        relativeOriginPath
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            teaserImage {
                id
              caption
              image {
                  file(style: "large") {
                    alt
                  relativeOriginPath
                  width
                  height
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          ... on NativeAdvertising {
              id
            gcid
            title
            lead
            shortTitle
            createDate
            changeDate
            trackingTeaserImpression
            trackingTeaserClick
            publication
            publicationDate
            preferredUri(additionalPublications: $additionalPublications)
            advertisingType
            authors(limit: 10) {
                edges {
                  node {
                    id
                  name
                  imageParagraph {
                      image {
                        file(style: "large") {
                          alt
                        relativeOriginPath
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            channel {
                id
              title
              __typename
            }
            sponsor {
                id
              title
              preferredUri
              teaserImage {
                  id
                title
                image {
                    file(style: "large") {
                      alt
                    relativeOriginPath
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            hasVideo
            teaserImage {
                id
              caption
              image {
                  file(style: "large") {
                    alt
                  relativeOriginPath
                  width
                  height
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          ... on Teaser {
              link {
                path
              __typename
            }
            title
            shortTitle
            lead
            teaserImage {
                caption
              image {
                  file(style: "large") {
                    source
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          ... on Article {
              id
            title
            lead
            restrictionStatus
            shortTitle
            createDate
            changeDate
            preferredUri(additionalPublications: $additionalPublications)
            publication
            publicationDate
            articleType
            authors(limit: 10) {
                edges {
                  node {
                    id
                  name
                  imageParagraph {
                      image {
                        file(style: "large") {
                          alt
                        relativeOriginPath
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            relatedPersons {
                edges {
                  node {
                    teaserImage {
                      id
                    image {
                        file(style: "large") {
                          alt
                        relativeOriginPath
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            channel {
                id
              title
              __typename
            }
            hasVideo
            teaserImage {
                id
              caption
              image {
                  file(style: "large") {
                    alt
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment LinkBoxParagraphFragment on LinkBoxParagraph {
    anchorId
  title
  links(limit: 100) {
      edges {
        node {
          label
        path
        routed
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment MinistageParagraphFragment on MinistageParagraph {
    id
  anchorId
  ministage {
      ...MinistageTeaserFragment
    ...MinistageNewsletterFragment
    ...MinistageSocialMediaFragment
    ...MinistageVideoFragment
    __typename
  }
  __typename
}
fragment MinistageTeaserFragment on MinistageTeaser {
    headline
  subhead
  lead
  image(style: "large") {
      width
    height
    relativeOriginPath
    __typename
  }
  link {
      label
    path
    routed
    __typename
  }
  __typename
}
fragment MinistageNewsletterFragment on MinistageNewsletter {
    headline
  subhead
  lead
  type
  mailchimpList
  image(style: "teaser_1_1") {
      width
    height
    relativeOriginPath
    __typename
  }
  __typename
}
fragment MinistageSocialMediaFragment on MinistageSocialMedia {
    headline
  subhead
  __typename
}
fragment MinistageVideoFragment on MinistageVideo {
    link {
      path
    __typename
  }
  items(limit: 4) {
      edges {
        node {
          ...VideoItem
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment VideoItem on Video {
    id
  brightcoveId
  publicationDate
  changeDate
  caption
  shortTitle
  title
  credit
  image {
      file(style: "large") {
        alt
      relativeOriginPath
      __typename
    }
    __typename
  }
  __typename
}
fragment InfoBoxParagraphFragment on InfoBoxParagraph {
    anchorId
  infoBox {
      style
    body {
        ...ImageParagraphFragment
      ...TextParagraphFragment
      ...EmbedParagraphFragment
      ...LinkBoxParagraphFragment
      ...TeaserParagraphFragment
      ...MinistageParagraphFragment
      __typename
    }
    __typename
  }
  __typename
}
fragment TeaserParagraphFragment on TeaserParagraph {
    anchorId
  teasers(limit: 1) {
      edges {
        node {
          title
        shortTitle
        teaserImage {
            id
          image {
              file(style: "large") {
                alt
              relativeOriginPath
              __typename
            }
            __typename
          }
          __typename
        }
        ... on RouteObjectInterface {
            preferredUri
          __typename
        }
        ... on Product {
            id
          link: link {
              path
            __typename
          }
          __typename
        }
        ... on Article {
            id
          articleType
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment InputFormParagraphFragment on InputFormParagraph {
    id
  anchorId
  webform
  __typename
}
fragment VideoParagraphFragment on VideoParagraph {
    anchorId
  id
  title
  shortTitle
  brightcoveId
  caption
  credit
  image {
      file(style: "large") {
        alt
      relativeOriginPath
      __typename
    }
    credit
    __typename
  }
  video {
      id
    brightcoveId
    publicationDate
    changeDate
    caption
    shortTitle
    title
    credit
    image {
        file(style: "large") {
          alt
        relativeOriginPath
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment NativeAdvertisingCarouselParagraphFragment on NativeAdvertisingCarouselParagraph {
    anchorId
  id
  nativeAdvertising(additionalPublications: ["HZ"]) {
      edges {
        node {
          ... on NativeAdvertising {
            id
          gcid
          title
          lead
          advertisingType
          shortTitle
          createDate
          changeDate
          trackingTeaserImpression
          trackingTeaserClick
          preferredUri(additionalPublications: $additionalPublications)
          authors(limit: 10) {
              edges {
                node {
                  id
                name
                imageParagraph {
                    image {
                      file(style: "large") {
                        alt
                      relativeOriginPath
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          sponsor {
              id
            title
            teaserImage {
                id
              title
              image {
                  file(style: "large") {
                    alt
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          teaserImage {
              id
            title
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                width
                height
                __typename
              }
              xxl_hero_br: file(style: "8x3_1130") {
                  alt
                source
                width
                height
                __typename
              }
              xl_hero_br: file(style: "8x3_1130") {
                  alt
                source
                width
                height
                __typename
              }
              lg_hero_br: file(style: "16x9_700") {
                  alt
                source
                width
                height
                __typename
              }
              md_hero_br: file(style: "16x9_560") {
                  alt
                source
                width
                height
                __typename
              }
              sm_hero_br: file(style: "1x1_280") {
                  alt
                source
                width
                height
                __typename
              }
              xs_hero_br: file(style: "1x1_280") {
                  alt
                source
                width
                height
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment ParallaxImageParagraphFragment on ParallaxImageParagraph {
    id
  image {
      credit
    file(style: "large") {
        alt
      relativeOriginPath
      __typename
    }
    __typename
  }
  __typename
}
fragment SectionParagraphFragment on SectionParagraph {
    anchorId
  id
  title
  body(processors: [TextSplit]) {
      ...ImageParagraphFragment
    ...ImageGalleryParagraphFragment
    ...TextParagraphFragment
    ...EmbedParagraphFragment
    ...EntityQueueParagraphFragment
    ...LinkBoxParagraphFragment
    ...TeaserParagraphFragment
    ...MinistageParagraphFragment
    ...InfoBoxParagraphFragment
    ...InputFormParagraphFragment
    ...VideoParagraphFragment
    ...NativeAdvertisingCarouselParagraphFragment
    ...ParallaxImageParagraphFragment
    __typename
  }
  __typename
}
fragment BlockquoteParagraphFragment on BlockquoteParagraph {
    anchorId
  id
  text
  source
  __typename
}
fragment RankingListParagraphFragment on RankingListParagraph {
    anchorId
  rankings {
      edges {
        node {
          id
        title
        rankingType
        preferredUri
        teaserImage {
            id
          image {
              file(style: "large") {
                alt
              relativeOriginPath
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment HeroFragment on ParagraphInterface {
    ...HeroImageFragment
  ...HeroImageGalleryFragment
  ...VideoParagraphFragment
  __typename
}
fragment HeroImageFragment on ImageParagraph {
    ...ImageParagraphFragment
  __typename
}
fragment HeroImageGalleryFragment on ImageGalleryParagraph {
    anchorId
  gallery {
      items: body {
        ... on ImageParagraph {
          id
        title
        caption
        image {
            credit
          file(style: "3x2_770") {
              alt
            height
            width
            source
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment VideoLoopParagraphFragment on VideoLoopParagraph {
    anchorId
  id
  title
  caption
  image {
      credit
    showOriginal
    xxl: file(style: "header_teaser_1200") {
        alt
      source
      width
      height
      __typename
    }
    xl: file(style: "header_teaser_960") {
        alt
      source
      width
      height
      __typename
    }
    lg: file(style: "header_teaser_760") {
        alt
      source
      width
      height
      __typename
    }
    md: file(style: "header_teaser_480") {
        alt
      source
      width
      height
      __typename
    }
    xs: file(style: "header_teaser_480") {
        alt
      source
      width
      height
      __typename
    }
    __typename
  }
  videoLoop {
      videoOgg {
        source
      mimeType
      filename
      size
      extension
      __typename
    }
    videoMp4 {
        source
      mimeType
      filename
      size
      extension
      __typename
    }
    videoWebM {
        source
      mimeType
      filename
      size
      extension
      __typename
    }
    __typename
  }
  __typename
}
fragment ExplainingArticleFragment on ExplainingArticle {
    id
  title
  publication
  editContentUri
  editRelationUri
  restrictionStatus
  publicationDate
  createDate
  channel {
      id
    title
    channelType
    __typename
  }
  relatedArticles(limit: 3) {
      edges {
        node {
          ... on Article {
            id
          articleType
          lead
          title
          shortTitle
          restrictionStatus
          preferredUri
          hasVideo
          authors {
              edges {
                node {
                  id
                name
                imageParagraph {
                    image {
                      file(style: "large") {
                        alt
                      relativeOriginPath
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          channel {
              id
            title
            __typename
          }
          teaserImage {
              id
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        ... on NativeAdvertising {
            id
          gcid
          title
          shortTitle
          preferredUri
          createDate
          changeDate
          trackingTeaserImpression
          trackingTeaserClick
          sponsor {
              id
            title
            __typename
          }
          teaserImage {
              id
            title
            image {
                file(style: "large") {
                  alt
                width
                height
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        ... on ExplainingArticle {
            id
          title
          shortTitle
          preferredUri
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  metaTitle
  socialMediaTitle
  canonicalUri
  metaDescription
  metaKeywords
  metaOgTitle
  metaOgDescription
  preferredUri
  activeMenuTrail {
      edges {
        node {
          label
        link
        __typename
      }
      __typename
    }
    __typename
  }
  keywords(limit: 100) {
      edges {
        node {
          label
        __typename
      }
      __typename
    }
    __typename
  }
  category
  sections {
      id
    body(processors: [TextSplit]) {
        ...ParagraphsFragment
      __typename
    }
    __typename
  }
  __typename
}
fragment ImageGalleryArticleFragment on ImageGallery {
    nid
  id
  nid
  title
  lead
  shortTitle
  metaTitle
  metaDescription
  canonicalUri
  changeDate
  publication
  publicationDate
  editContentUri
  editRelationUri
  preferredUri
  restrictionStatus
  channel {
      id
    title
    channelType
    __typename
  }
  activeMenuTrail {
      edges {
        node {
          label
        link
        __typename
      }
      __typename
    }
    __typename
  }
  metaCanonicalUrl
  authors(limit: 10) {
      edges {
        node {
          id
        name
        imageParagraph {
            image {
              file(style: "large") {
                alt
              relativeOriginPath
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  keywords(limit: 100) {
      ...ArticleFooterKeywordsFragment
    __typename
  }
  teaserImage {
      id
    caption
    image {
        credit
      file(style: "large") {
          alt
        width
        height
        relativeOriginPath
        __typename
      }
      __typename
    }
    __typename
  }
  body {
      ... on ImageParagraph {
        anchorId
      id
      title
      alt
      caption
      image {
          credit
        file(style: "inline_image_1200") {
            alt
          height
          width
          source
          relativeOriginPath
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  relatedGalleries(limit: 6) {
      edges {
        node {
          title
        shortTitle
        preferredUri(additionalPublications: $additionalPublications)
        lead
        authors(limit: 10) {
            edges {
              node {
                id
              name
              imageParagraph {
                  image {
                    file(style: "large") {
                      alt
                    relativeOriginPath
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        teaserImage {
            id
          title
          image {
              file(style: "large") {
                alt
              width
              height
              relativeOriginPath
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment ArticleFooterKeywordsFragment on KeywordConnection {
    edges {
      node {
        preferredUri
      label
      tid
      __typename
    }
    __typename
  }
  __typename
}
fragment KeywordArticlesListFragment on Keyword {
    label
  tid
  entities(offset: $keywordsOffset, limit: $keywordsPageSize) {
      count
    ...KeywordSearchResultFragment
    __typename
  }
  __typename
}
fragment KeywordSearchResultFragment on SearchableUnionConnection {
    edges {
      node {
        ... on NativeAdvertising {
          id
        gcid
        title
        lead
        trackingTeaserImpression
        trackingTeaserClick
        advertisingType
        shortTitle
        preferredUri
        sponsor {
            id
          title
          __typename
        }
        authors(first: 10) {
            edges {
              node {
                id
              name
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      ... on Article {
          id
        title
        articleType
        createDate
        restrictionStatus
        shortTitle
        lead
        preferredUri
        hasVideo
        channel {
            id
          title
          __typename
        }
        authors(limit: 5) {
            edges {
              node {
                id
              name
              imageParagraph {
                  image {
                    file(style: "large") {
                      alt
                    relativeOriginPath
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        relatedPersons(limit: 2) {
            edges {
              node {
                teaserImage {
                  id
                image {
                    file(style: "large") {
                      alt
                    relativeOriginPath
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      teaserImage {
          id
        image {
            file(style: "large") {
              alt
            relativeOriginPath
            width
            height
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment SponsorFragment on Sponsor {
    id
  title
  metaTitle
  metaDescription
  metaCanonicalUrl
  metaOgTitle
  metaOgDescription
  description
  publication
  preferredUri
  activeMenuTrail {
      edges {
        node {
          label
        link
        __typename
      }
      __typename
    }
    __typename
  }
  teaserImage {
      id
    title
    image {
        file(style: "large") {
          alt
        relativeOriginPath
        width
        height
        __typename
      }
      __typename
    }
    __typename
  }
  nativeAdvertising(offset: $sponsorOffset, limit: $sponsorLimit, sort: $sponsorSortBy, sortOrder: $sponsorSortOrder, additionalPublications: []) {
      count
    edges {
        node {
          ... on NativeAdvertising {
            id
          gcid
          title
          advertisingType
          trackingTeaserClick
          trackingTeaserImpression
          trackingDetailImpression
          shortTitle
          preferredUri(additionalPublications: $additionalPublications)
          createDate
          changeDate
          publicationDate(additionalPublications: $additionalPublications)
          channel {
              id
            title
            __typename
          }
          sponsor {
              id
            title
            teaserImage {
                id
              title
              image {
                  file(style: "scaleh_120") {
                    alt
                  width
                  height
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          authors(limit: 10) {
              edges {
                node {
                  id
                name
                imageParagraph {
                    image {
                      file(style: "large") {
                        alt
                      relativeOriginPath
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          teaserImage {
              id
            title
            caption
            image {
                credit
              file(style: "large") {
                  alt
                relativeOriginPath
                width
                height
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment NativeAdvertisingFragment on NativeAdvertising {
    id
  nid
  title
  lead
  metaTitle
  seoTitle
  publication
  socialMediaTitle
  metaCanonicalUrl
  metaDescription
  metaOgTitle
  metaOgDescription
  advertisingType
  editContentUri
  editRelationUri
  restrictionStatus
  body {
      ...ParagraphsFragment
    __typename
  }
  heroImageBody {
      ...HeroFragment
    ...VideoLoopParagraphFragment
    __typename
  }
  relatedArticles(limit: 3) {
      edges {
        node {
          ... on Article {
            id
          gcid
          title
          shortTitle
          preferredUri
          restrictionStatus
          lead
          createDate
          changeDate
          publicationDate
          articleType
          sponsor {
              id
            title
            __typename
          }
          authors(limit: 2) {
              edges {
                node {
                  id
                name
                imageParagraph {
                    image {
                      file(style: "large") {
                        alt
                      relativeOriginPath
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          teaserImage {
              id
            title
            image {
                file(style: "large") {
                  alt
                width
                height
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          relatedPersons(limit: 2) {
              edges {
                node {
                  title
                preferredUri
                teaserImage {
                    id
                  image {
                      file(style: "large") {
                        alt
                      relativeOriginPath
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        ... on NativeAdvertising {
            id
          gcid
          title
          shortTitle
          preferredUri
          createDate
          changeDate
          trackingTeaserClick
          trackingTeaserImpression
          sponsor {
              id
            title
            __typename
          }
          teaserImage {
              id
            title
            image {
                file(style: "large") {
                  alt
                width
                height
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        ... on ExplainingArticle {
            id
          title
          shortTitle
          preferredUri
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  trackingDetailImpression
  shortTitle
  canonicalUri
  preferredUri
  createDate
  changeDate
  publicationDate
  channel {
      id
    title
    channelType
    articles(limit: 6) {
        edges {
          node {
            id
          gcid
          title
          lead
          articleType
          shortTitle
          createDate
          changeDate
          publicationDate
          restrictionStatus
          showUpdated
          preferredUri
          authorPrefix
          authors(limit: 2) {
              edges {
                node {
                  id
                name
                imageParagraph {
                    image {
                      file(style: "large") {
                        alt
                      relativeOriginPath
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          teaserImage {
              id
            image {
                file(style: "large") {
                  alt
                width
                height
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          relatedPersons(limit: 2) {
              edges {
                node {
                  teaserImage {
                    id
                  image {
                      file(style: "large") {
                        alt
                      relativeOriginPath
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  sponsor {
      colorCode
    preferredUri
    prefix
    id
    title
    teaserImage {
        id
      title
      image {
          file(style: "scaleh_120") {
            alt
          width
          height
          relativeOriginPath
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  linkout {
      title
    lead
    teaserImage {
        id
      title
      link {
          label
        path
        __typename
      }
      image {
          file(style: "3x2_280") {
            alt
          source
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  authors(limit: 10) {
      edges {
        node {
          id
        name
        imageParagraph {
            image {
              file(style: "large") {
                alt
              relativeOriginPath
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  activeMenuTrail {
      edges {
        node {
          label
        link
        __typename
      }
      __typename
    }
    __typename
  }
  teaserImage {
      id
    title
    caption
    image {
        credit
      file(style: "large") {
          alt
        relativeOriginPath
        width
        height
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment DossierFragment on Dossier {
    nid
  id
  canonicalUri
  title
  lead
  metaTitle
  metaDescription
  metaCanonicalUrl
  metaOgTitle
  metaOgDescription
  editContentUri
  editRelationUri
  restrictionStatus
  publication
  publicationDate
  createDate
  channel {
      id
    title
    channelType
    __typename
  }
  activeMenuTrail {
      edges {
        node {
          label
        link
        __typename
      }
      __typename
    }
    __typename
  }
  preferredUri
  teaserImage {
      id
    image {
        file(style: "large") {
          alt
        relativeOriginPath
        __typename
      }
      __typename
    }
    __typename
  }
  keywords(limit: 100) {
      edges {
        node {
          label
        __typename
      }
      __typename
    }
    __typename
  }
  articles(limit: $dossierPageSize, offset: $dossierOffset) {
      count
    edges {
        node {
          ... on Article {
            id
          channel {
              id
            title
            __typename
          }
          title
          lead
          restrictionStatus
          shortTitle
          createDate
          changeDate
          preferredUri
          articleType
          hasVideo
          teaserImage {
              id
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                width
                height
                __typename
              }
              __typename
            }
            __typename
          }
          authors {
              edges {
                node {
                  id
                name
                imageParagraph {
                    image {
                      file(style: "large") {
                        alt
                      relativeOriginPath
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment OrganizationFragment on Organization {
    nid
  id
  title
  publication
  commercialSector {
      title
    branch(limit: 1) {
        edges {
          node {
            nid
          title
          preferredUri
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  foundationDate
  city
  legalForm
  description
  metaTitle
  metaDescription
  preferredUri
  metaCanonicalUrl
  editContentUri
  editRelationUri
  canonicalUri
  metaOgTitle
  metaOgDescription
  moneyhousePreferredUri
  activeMenuTrail {
      edges {
        node {
          label
        link
        __typename
      }
      __typename
    }
    __typename
  }
  organizationPositions(limit: 10) {
      edges {
        node {
          organization {
            title
          preferredUri
          __typename
        }
        position
        person {
            id
          title
          createDate
          hasArticles
          preferredUri
          teaserImage {
              id
            image {
                file(style: "1x1_160_person") {
                  source
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  organizationArticles(offset: $organizationOffset, limit: $organizationLimit, sort: $organizationSortBy, sortOrder: $organizationSortOrder) {
      count
    edges {
        node {
          id
        title
        publication
        lead
        shortTitle
        createDate
        changeDate
        preferredUri
        articleType
        hasVideo
        restrictionStatus
        teaserImage {
            id
          image {
              file(style: "large") {
                alt
              relativeOriginPath
              width
              height
              __typename
            }
            __typename
          }
          __typename
        }
        channel {
            id
          title
          __typename
        }
        authors(limit: 10) {
            edges {
              node {
                id
              name
              imageParagraph {
                  image {
                    file(style: "large") {
                      alt
                    relativeOriginPath
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        relatedPersons {
            edges {
              node {
                teaserImage {
                  id
                image {
                    file(style: "large") {
                      alt
                    relativeOriginPath
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment BranchFragment on Branch {
    nid
  id
  nid
  title
  description
  editContentUri
  editRelationUri
  metaTitle
  metaOgTitle
  metaDescription
  metaOgDescription
  metaCanonicalUrl
  canonicalUri
  publication
  preferredUri(additionalPublications: $additionalPublications)
  activeMenuTrail {
      edges {
        node {
          label
        link
        __typename
      }
      __typename
    }
    __typename
  }
  relatedOrganizations(offset: 0, limit: 6, dateRangeStart: "-30 days", dateRangeEnd: "now") {
      count
    edges {
        node {
          title
        preferredUri(additionalPublications: $additionalPublications)
        __typename
      }
      __typename
    }
    __typename
  }
  relatedPersons(offset: 0, limit: 6, dateRangeStart: "-30 days", dateRangeEnd: "now") {
      count
    edges {
        node {
          title
        createDate
        changedDate
        preferredUri(additionalPublications: $additionalPublications)
        teaserImage {
            id
          image {
              file(style: "large") {
                alt
              relativeOriginPath
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  nativeAdvertisings {
      count
    edges {
        node {
          preferredUri(additionalPublications: $additionalPublications)
        advertisingType
        id
        title
        publication
        lead
        shortTitle
        createDate
        changeDate
        showUpdated
        teaserImage {
            id
          caption
          image {
              credit
            file(style: "large") {
                alt
              relativeOriginPath
              width
              height
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  relatedArticles(limit: $branchPageSize, offset: $branchOffset) {
      count
    edges {
        node {
          ... on Article {
            id
          title
          publication
          restrictionStatus
          lead
          shortTitle
          createDate
          changeDate
          showUpdated
          preferredUri
          articleType
          hasVideo
          teaserImage {
              id
            caption
            image {
                credit
              file(style: "large") {
                  alt
                relativeOriginPath
                width
                height
                __typename
              }
              __typename
            }
            __typename
          }
          channel {
              id
            title
            __typename
          }
          authorPrefix
          authors(limit: 10) {
              edges {
                node {
                  id
                name
                imageParagraph {
                    image {
                      file(style: "large") {
                        alt
                      relativeOriginPath
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          relatedPersons {
              edges {
                node {
                  teaserImage {
                    id
                  image {
                      file(style: "large") {
                        alt
                      relativeOriginPath
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        ... on NativeAdvertising {
            id
          gcid
          title
          shortTitle
          preferredUri
          createDate
          changeDate
          trackingTeaserImpression
          trackingTeaserClick
          sponsor {
              id
            title
            __typename
          }
          teaserImage {
              id
            title
            image {
                file(style: "large") {
                  alt
                width
                height
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        ... on ExplainingArticle {
            id
          title
          shortTitle
          preferredUri
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment PageScreenFragment on Page {
    nid
  id
  title
  lead
  shortTitle
  metaTitle
  metaOgTitle
  metaDescription
  metaOgDescription
  metaCanonicalUrl
  canonicalUri
  editContentUri
  editRelationUri
  publication
  preferredUri
  restrictionStatus
  activeMenuTrail {
      edges {
        node {
          label
        link
        __typename
      }
      __typename
    }
    __typename
  }
  teaserImage {
      id
    caption
    image {
        credit
      file(style: "large") {
          alt
        relativeOriginPath
        width
        height
        __typename
      }
      __typename
    }
    __typename
  }
  body {
      ...ParagraphsFragment
    __typename
  }
  __typename
}
fragment LandingPageFragment on LandingPage {
    id
  nid
  title
  shortTitle
  lead
  metaTitle
  metaDescription
  metaOgTitle
  metaOgDescription
  metaCanonicalUrl
  canonicalUri
  publication
  editContentUri
  editRelationUri
  preferredUri
  restrictionStatus
  activeMenuTrail {
      edges {
        node {
          label
        link
        __typename
      }
      __typename
    }
    __typename
  }
  teaserImage {
      id
    caption
    image {
        credit
      file(style: "large") {
          alt
        relativeOriginPath
        width
        height
        __typename
      }
      __typename
    }
    __typename
  }
  channel {
      id
    channelType
    title
    sponsors(limit: 5) {
        edges {
          node {
            title
          preferredUri
          teaserImage {
              id
            title
            link {
                path
              __typename
            }
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  channels {
      edges {
        node {
          title
        __typename
      }
      __typename
    }
    __typename
  }
  sponsorLabel
  sponsor {
      id
    title
    colorCode
    preferredUri
    teaserImage {
        id
      title
      image {
          file(style: "large") {
            alt
          width
          height
          relativeOriginPath
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  body {
      ...ParagraphsFragment
    __typename
  }
  SvGrid: grid(publication: "SV", filter: ["Article"], additionalPublications: ["SV"], limit: $landingPageGridPageSize, offset: $landingPageGridOffset) {
      count
    edges {
        node {
          ... on Article {
            id
          title
          lead
          restrictionStatus
          articleType
          shortTitle
          createDate
          changeDate
          preferredUri
          publication
          channel {
              id
            title
            __typename
          }
          authors(limit: 5) {
              edges {
                node {
                  id
                name
                imageParagraph {
                    image {
                      file(style: "large") {
                        alt
                      relativeOriginPath
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          relatedPersons(limit: 2) {
              edges {
                node {
                  teaserImage {
                    id
                  image {
                      file(style: "large") {
                        alt
                      relativeOriginPath
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          teaserImage {
              id
            title
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  grid(publication: $publication, additionalPublications: [SV], limit: $landingPageGridPageSize, offset: $landingPageGridOffset) {
      count
    edges {
        node {
          ... on Article {
            id
          title
          lead
          restrictionStatus
          articleType
          shortTitle
          createDate
          changeDate
          publicationDate
          preferredUri
          publication
          hasVideo
          channel {
              id
            title
            __typename
          }
          authors(limit: 5) {
              edges {
                node {
                  id
                name
                imageParagraph {
                    image {
                      file(style: "large") {
                        alt
                      relativeOriginPath
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          relatedPersons(limit: 2) {
              edges {
                node {
                  teaserImage {
                    id
                  image {
                      file(style: "large") {
                        alt
                      relativeOriginPath
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          teaserImage {
              id
            title
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        ... on LandingPage {
            id
          title
          lead
          shortTitle
          preferredUri
          channel {
              id
            channelType
            sponsors {
                edges {
                  node {
                    id
                  title
                  teaserImage {
                      id
                    title
                    image {
                        file(style: "large") {
                          alt
                        relativeOriginPath
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          teaserImage {
              id
            title
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        ... on NativeAdvertising {
            id
          gcid
          title
          lead
          advertisingType
          shortTitle
          trackingTeaserImpression
          trackingTeaserClick
          createDate
          changeDate
          preferredUri
          publication
          channel {
              id
            title
            __typename
          }
          sponsor {
              id
            title
            teaserImage {
                id
              title
              image {
                  file(style: "scaleh_120") {
                    alt
                  width
                  height
                  relativeOriginPath
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          teaserImage {
              id
            title
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment VideoFragment on Video {
    activeMenuTrail {
      edges {
        node {
          id
        label
        link
        __typename
      }
      __typename
    }
    __typename
  }
  publication
  brightcoveId
  caption
  changeDate
  channel {
      id
    tid
    title
    channelType
    landingPage {
        id
      preferredUri
      __typename
    }
    title
    settings {
        title
      lead
      mainChannel {
          id
        title
        __typename
      }
      headerImage {
          file(style: "large") {
            alt
          relativeOriginPath
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  createDate
  credit
  id
  metaDescription
  metaKeywords
  metaTitle
  publicationDate
  preferredUri
  shortTitle
  restrictionStatus
  teaserImage {
      id
    image {
        file(style: "large") {
          relativeOriginPath
        __typename
      }
      __typename
    }
    __typename
  }
  title
  __typename
}
fragment RankingFragment on Ranking {
    id
  createDate
  changedDate
  title
  lead
  publication
  rankingType
  shortTitle
  preferredUri
  metaTitle
  metaDescription
  metaCanonicalUrl
  restrictionStatus
  activeMenuTrail {
      count
    edges {
        node {
          label
        link
        __typename
      }
      __typename
    }
    __typename
  }
  body {
      ...MinistageParagraphFragment
    ...InfoBoxParagraphFragment
    __typename
  }
  rankings(limit: $rankingPageSize, offset: $rankingOffset) {
      count
    edges {
        node {
          rankingPosition
        rankingValue
        person {
            id
          createDate
          changedDate
          description
          name
          personType
          preferredUri
          teaserImage {
              id
            caption
            image {
                file(style: "large") {
                  alt
                relativeOriginPath
                width
                height
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  teaserImage {
      id
    image {
        file(style: "1x1_250") {
          relativeOriginPath
        alt
        source
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment PersonFragment on Person {
    nid
  id
  hasProfilePage
  instagramAccount
  name
  firstName
  lastName
  personType
  title
  metaTitle
  metaDescription
  metaCanonicalUrl
  metaKeywords
  createDate
  changedDate
  editContentUri
  editRelationUri
  canonicalUri
  moneyhousePreferredUri
  publication
  text: body
  preferredUri(additionalPublications: [BIL])
  restrictionStatus
  activeMenuTrail {
      edges {
        node {
          label
        link
        __typename
      }
      __typename
    }
    __typename
  }
  content {
      ...MinistageParagraphFragment
    ...InfoBoxParagraphFragment
    __typename
  }
  rankings {
      ...PersonListingFragment
    __typename
  }
  teaserImage {
      id
    image {
        credit
      file(style: "1x1_160_person") {
          alt
        relativeOriginPath
        source
        width
        height
        __typename
      }
      __typename
    }
    __typename
  }
  personArticles(offset: $personOffset, limit: $personLimit, sort: $personSortBy, sortOrder: $personSortOrder) {
      count
    edges {
        node {
          id
        title
        publication
        lead
        shortTitle
        createDate
        changeDate
        showUpdated
        restrictionStatus
        preferredUri
        articleType
        teaserImage {
            id
          caption
          image {
              credit
            file(style: "large") {
                alt
              relativeOriginPath
              width
              height
              __typename
            }
            __typename
          }
          __typename
        }
        channel {
            id
          title
          __typename
        }
        authorPrefix
        authors(limit: 10) {
            edges {
              node {
                id
              name
              imageParagraph {
                  image {
                    xs: file(style: "teaser_1_1") {
                      alt
                    source
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        relatedPersons {
            edges {
              node {
                teaserImage {
                  id
                image {
                    file(style: "large") {
                      alt
                    relativeOriginPath
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  personPositions {
      edges {
        node {
          ... on Position {
            person {
              name
            __typename
          }
          organization {
              title
            preferredUri(publication: HZ)
            organizationPositions {
                edges {
                  node {
                    organization {
                      title
                    preferredUri(publication: HZ)
                    __typename
                  }
                  position
                  person {
                      id
                    title
                    name
                    hasArticles
                    preferredUri(publication: HZ)
                    teaserImage {
                        id
                      image {
                          file(style: "1x1_160_person") {
                            alt
                          relativeOriginPath
                          source
                          width
                          height
                          __typename
                        }
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            organizationArticles {
                edges {
                  node {
                    title
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          validFrom
          validTo
          position
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment PersonListingFragment on RankingsConnection {
    edges {
      node {
        rankingPosition
      rankingValue
      ranking {
          title
        year
        rankingType
        preferredUri
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
"""

def keywords(): 
  return """query KeywordListing($searchString: String\u0021, $publication: PublicationEnum) {
      environment(publication: $publication) {
        keywordsByChar(searchString: $searchString, limit: 700) {
          ...KeywordListFragment
        __typename
      }
      __typename
    }
  }
  fragment KeywordListFragment on KeywordConnection {
      edges {
        node {
          id
        label
        preferredUri
        __typename
      }
      __typename
    }
    __typename
  }"""
