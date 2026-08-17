import React from 'react';
import { QueryHookOptions, useQuery } from '@apollo/client';
import classNames from 'classnames';
import Link from '../../../../../common/components/Link';
import Img from '../Img';
import JobCard from './components/JobCard';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries.js'. '/Users/bhs/code/work/rasch-stack/src/handelszeitung/scree */
import GET_JOB_FEED from './queries.js';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import JobsCHLogo from 'graphics/jobs_ch.svg';
import { JobCheckerProps } from './typings';

type JobCheckerPropsInner = JobCheckerProps & {
  data?: ApolloData & {
    jobFeed?: JobFeed;
  };
};

const renderCard = (job: JobEdge, index: number) => {
  if (!job.node) {
    return null;
  }

  const { id, title, company, location, url } = job.node;

  return (
    <div
      key={`job-item-${id || index}`}
      className={classNames(grid.ColSm12, grid.ColMd8)}
    >
      <JobCard title={title} company={company} location={location} url={url} />
    </div>
  );
};

const JobChecker = ({ nid, addClass = '' }: JobCheckerPropsInner) => {
  const apolloConfig: QueryHookOptions = {
    skip: !nid,
    variables: {
      nodeId: nid,
    },
    fetchPolicy: 'cache-and-network',
  };

  const { data } = useQuery(GET_JOB_FEED, apolloConfig);

  const jobFeed = data?.environment?.jobFeed;

  if (!jobFeed || jobFeed?.count === 0) {
    return null;
  }

  return (
    <div
      className={classNames({
        [styles.Wrapper]: !addClass,
        [addClass]: !!addClass,
      })}
    >
      <h2 className={styles.Title}>Jobs</h2>
      <div className={styles.ReferenceWrapper}>
        <div className={styles.Reference}>
          <span className={styles.ReferenceLabel}>präsentiert von</span>
          <Link path="https://www.jobs.ch" rel="sponsored">
            <Img
              addClass={styles.ReferenceLogo}
              url={JobsCHLogo}
              alt="jobs.ch logo"
            />
          </Link>
        </div>
      </div>
      <table className={styles.PositionsWrapper}>
        <tbody>
          <tr>
            <td className={styles.PositionsCount}>{jobFeed.count}</td>
            <td className={styles.PositionsLabel}>
              Offene Stellen {jobFeed.title}
            </td>
          </tr>
        </tbody>
      </table>
      <div className={classNames(grid.Row, styles.CardWrapper)}>
        {Array.isArray(jobFeed?.jobs?.edges) &&
          jobFeed.jobs.edges.map(renderCard)}
      </div>
      {jobFeed.url && (
        <div className={grid.Row}>
          <div className={grid.ColXs24}>
            <Link className={styles.Button} path={jobFeed.url}>
              <span>Alle {jobFeed.count} Stellenangebote</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobChecker;
