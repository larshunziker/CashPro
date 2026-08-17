import React from 'react';
import Card from '../../../Card';
import styles from './styles.legacy.css';

export type JobCardPropsInner = Job;

const JOB_URL_LABEL = 'Zum Jobangebot';

const JobCard = ({ title, url, company, location }: JobCardPropsInner) => {
  if (!title || !url) {
    return null;
  }

  return (
    <Card title={title} urlLabel={JOB_URL_LABEL} url={url}>
      <div className={styles.CardContent} data-testid="job-card-content">
        <div className={styles.Company}>{company || ''}</div>
        <div className={styles.Grey}>{location || ''}</div>
      </div>
    </Card>
  );
};

export default JobCard;
