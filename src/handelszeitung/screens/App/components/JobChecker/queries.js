import { gql } from '@apollo/client';

const GET_JOB_FEED = gql`
  query OrganizationJobs($nodeId: Int) {
    environment(publication: HZ) {
      jobFeed(branchId: $nodeId, limit: 3) {
        title
        url
        count
        jobs {
          edges {
            node {
              id
              title
              company
              location
              url
            }
          }
        }
      }
    }
  }
`;

export default GET_JOB_FEED;
