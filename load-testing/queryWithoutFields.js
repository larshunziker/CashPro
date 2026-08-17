const queryString = `query RouteByPath($path: String!, $publication: PublicationEnum, $additionalPublications: [PublicationEnum], $landingPageGridPageSize: Int!, $landingPageGridOffset: Int!, $branchPageSize: Int!, $branchOffset: Int!, $keywordsPageSize: Int!, $keywordsOffset: Int!, $dossierPageSize: Int!, $dossierOffset: Int!, $sponsorLimit: Int, $sponsorSortBy: SortTypeEnum, $sponsorSortOrder: SortOrderEnum, $sponsorOffset: Int!, $organizationOffset: Int, $organizationLimit: Int, $organizationSortBy: ArticleSortEnum, $organizationSortOrder: SortOrderEnum, $personOffset: Int, $personLimit: Int, $personSortBy: ArticleSortEnum, $personSortOrder: SortOrderEnum, $rankingPageSize: Int!, $rankingOffset: Int!) {
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
  time2read
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
  subtypeValue: articleType
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
            subtypeValue: articleType
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
            subtypeValue: advertisingTypeValue
            advertisingTypeLabel
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
      file(style: "16x9_560") {
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
  ...InputFormParagraphFragment
  ...MinistageParagraphFragment
  ...InfoBoxParagraphFragment
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
            subtypeValue: advertisingTypeValue
            advertisingTypeLabel
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
            publicationDate
            preferredUri
            publication
            subtypeValue: articleType
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
  landingPage {
    title
    preferredUri
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
                    preferredUri
                    publication
                    subtypeValue: articleType
                    __typename
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
            preferredUri
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
            preferredUri
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
            preferredUri
            subtypeValue: advertisingTypeValue
            advertisingTypeLabel
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
            preferredUri
            publication
            publicationDate
            subtypeValue: articleType
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

fragment InputFormParagraphFragment on InputFormParagraph {
  id
  anchorId
  webform
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
    ...MinistageAccordionFragment
    ...MinistageTrendingTopicsFragment
    ...MinistageSingleAlertTopicFragment
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
  mailchimpInterest
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
  duration
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

fragment MinistageSingleAlertTopicFragment on MinistageSingleAlertTopic {
  headline
  keyword {
    id: tid
    label
    preferredUri
    __typename
  }
  person {
    id: nid
    label: title
    preferredUri
    __typename
  }
  organization {
    id: nid
    label: title
    preferredUri
    __typename
  }
  media {
    file(style: "default") {
      relativeOriginPath
      __typename
    }
    __typename
  }
  __typename
}

fragment MinistageAccordionFragment on MinistageAccordion {
  title
  sections {
    title
    body {
      ... on TextParagraph {
        id
        anchorId
        header
        text
        characterCount
        isLastOfGroup
        styleValue
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}

fragment MinistageTrendingTopicsFragment on MinistageTrendingTopics {
  headline
  keywords(limit: 12) {
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
      ...MinistageParagraphFragment
      __typename
    }
    __typename
  }
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
  duration
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
    duration
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
          subtypeValue: advertisingTypeValue
          advertisingTypeLabel
          shortTitle
          createDate
          changeDate
          trackingTeaserImpression
          trackingTeaserClick
          preferredUri
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
    ...MinistageParagraphFragment
    ...InfoBoxParagraphFragment
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
  nid
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
          subtypeValue: articleType
          lead
          title
          shortTitle
          restrictionStatus
          preferredUri
          hasVideo
          publicationDate
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
          subtypeValue: advertisingTypeValue
          advertisingTypeLabel
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
    ...SectionParagraphFragment
    __typename
  }
  __typename
}

fragment ImageGalleryArticleFragment on ImageGallery {
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
      file(style: "16x9_560") {
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
        preferredUri
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
        subtypeValue: advertisingTypeValue
        advertisingTypeLabel
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
      ... on Video {
        id
        title
        lead
        shortTitle
        preferredUri
        restrictionStatus
        channel {
          id
          title
          __typename
        }
        __typename
      }
      ... on Article {
        id
        title
        subtypeValue: articleType
        createDate
        restrictionStatus
        shortTitle
        lead
        preferredUri
        hasVideo
        publicationDate
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
          subtypeValue: advertisingTypeValue
          advertisingTypeLabel
          trackingTeaserClick
          trackingTeaserImpression
          trackingDetailImpression
          shortTitle
          preferredUri
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
  subtypeValue: advertisingTypeValue
  advertisingTypeLabel
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
          subtypeValue: articleType
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
          subtypeValue: advertisingTypeValue
          advertisingTypeLabel
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
          subtypeValue: articleType
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
          publicationDate
          preferredUri
          subtypeValue: articleType
          publicationDate
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
        publicationDate
        preferredUri
        subtypeValue: articleType
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
  relatedOrganizations(offset: 0, limit: 6, dateRangeStart: "-30 days", dateRangeEnd: "now") {
    count
    edges {
      node {
        id
        title
        preferredUri
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
        id
        title
        createDate
        changedDate
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
  nativeAdvertisings {
    count
    edges {
      node {
        id
        preferredUri
        subtypeValue: advertisingTypeValue
        advertisingTypeLabel
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
          publicationDate
          showUpdated
          preferredUri
          subtypeValue: articleType
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
          subtypeValue: advertisingTypeValue
          advertisingTypeLabel
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
      file(style: "16x9_560") {
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
      file(style: "16x9_560") {
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
          subtypeValue: articleType
          shortTitle
          createDate
          changeDate
          publicationDate
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
        __typename
      }
      __typename
    }
    __typename
  }
  grid(publication: $publication, additionalPublications: [SV, HZB], limit: $landingPageGridPageSize, offset: $landingPageGridOffset) {
    count
    edges {
      node {
        ... on Article {
          id
          title
          lead
          restrictionStatus
          subtypeValue: articleType
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
          subtypeValue: advertisingTypeValue
          advertisingTypeLabel
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
  duration
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
  keywords(limit: 100) {
    edges {
      node {
        preferredUri
        label
        tid
        id
        __typename
      }
      __typename
    }
    __typename
  }
  teaserImage {
    id
    image {
      file(style: "16x9_560") {
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
        subtypeValue: articleType
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
            preferredUri
            organizationPositions {
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
                    name
                    hasArticles
                    preferredUri
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
`;

module.exports = queryString;
