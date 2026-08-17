/**
 * @file   person graphql fragments
 * @author Pascal Tan<pascal.tan@ringieraxelspringer.ch>
 * @date   2019-09-23 09:06:54
 *
 */

import { gql } from '@apollo/client';
import { heroFragment } from 'Hero/fragments';
import { infoBoxParagraphFragment } from 'Paragraphs/components/InfoBoxParagraph/fragments';
import { ministageParagraphFragment } from 'Paragraphs/components/MinistageParagraph/fragments';
import { personListingFragment } from 'Person/components/Listing/fragments';

export const personFragment = gql`
  fragment PersonFragment on Person {
    nid
    gcid
    id
    heroImageBody {
      ...HeroFragment
    }
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
    changeDate: changedDate
    editContentUri
    editRelationUri
    cloneContentUri
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
        }
      }
    }
    content {
      ...MinistageParagraphFragment
      ...InfoBoxParagraphFragment
    }
    rankings(publication: "BIL") {
      ...PersonListingFragment
    }
    teaserImage {
      id
      image {
        id
        credit
        file {
          id
          alt
          relativeOriginPath
          focalPointX
          focalPointY
        }
      }
    }
    personArticles {
      count
    }
    personPositions {
      edges {
        node {
          ... on Position {
            person {
              name
            }
            organization {
              id
              title
              preferredUri
              organizationPositions {
                edges {
                  node {
                    organization {
                      title
                      preferredUri
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
                          id
                          file(
                            style: "1x1_160_person"
                            calculateDimensions: true
                          ) {
                            id
                            alt
                            relativeOriginPath
                            focalPointX
                            focalPointY
                            width
                            height
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            validFrom
            validTo
            position
          }
        }
      }
    }
  }
  ${personListingFragment}
  ${infoBoxParagraphFragment}
  ${ministageParagraphFragment}
  ${heroFragment}
`;
