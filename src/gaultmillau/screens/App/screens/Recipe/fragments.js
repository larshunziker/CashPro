import { gql } from '@apollo/client';
import { heroFragment } from 'Hero/fragments';
import { paragraphsFragment } from 'Paragraphs/fragments';
import { relatedContentFragment } from 'RelatedContent/fragments';

export const recipeFragment = gql`
  fragment RecipeFragment on Recipe {
    gcid
    id
    nid
    canonicalUri
    alternativeTitle
    editRelationUri
    cloneContentUri
    editContentUri
    heroImageBody {
      ...HeroFragment
    }
    chiefCook(limit: 1) {
      edges {
        node {
          title
          description
          body
          teaserImage {
            id
            title
            image {
              id
              file(style: "large") {
                id
                alt
                relativeOriginPath
                focalPointX
                focalPointY
              }
            }
          }
        }
      }
    }
    organization {
      address
      city
      zipCode
      phone
      website
      organizationData {
        id
        restaurantName
        secondaryName
      }
    }
    cookingTime
    energy
    carb
    protein
    fat
    ingredients
    instructions {
      ...ParagraphsFragment
    }
    preparationTime
    quantity
    subtypeValue: recipeType
    title
    shortTitle
    authorPrefix
    metaTitle
    seoTitle
    socialMediaTitle
    metaDescription
    metaKeywords
    createDate
    changeDate: changedDate
    revisionDate
    preferredUri
    metaCanonicalUrl
    keywords(limit: 100) {
      edges {
        node {
          label
          preferredUri
        }
      }
    }
    teaserImage {
      id
      title
      image {
        id
        file(style: "16x9_560") {
          id
          alt
          relativeOriginPath
          focalPointX
          focalPointY
        }
      }
    }
    recommendations(limit: 3) {
      ...RelatedContentFragment
    }
  }

  ${heroFragment}
  ${paragraphsFragment}
  ${relatedContentFragment}
`;
