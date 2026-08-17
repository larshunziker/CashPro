import { gql } from '@apollo/client';

export const authorFragment = gql`
  fragment AuthorFragment on Author {
    id
    aid
    canonicalUri
    preferredUri
    name
    firstName
    middleName
    lastName
    email
    phone
    imageParagraph {
      id
      image {
        id
        file {
          id
          alt
          relativeOriginPath
          focalPointX
          focalPointY
        }
      }
    }
    website {
      path
    }
    facebook {
      path
    }
    instagram {
      path
    }
    linkedin {
      path
    }
    twitter {
      path
    }
    xing {
      path
    }
    signal
    threema
    whatsapp
    headline
    description
    hasProfilePage
    code
    isKeyEmployee
    inJournalismSince
    atPublisherSince
    associations
    awards
    bookLinks {
      label
      path
    }
    newsletterLinks {
      label
      path
    }
    podcastLinks {
      label
      path
    }
  }
`;
