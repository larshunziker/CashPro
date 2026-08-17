import React from 'react';
import styles from './styles.legacy.css';
import { TechnicalProblemsBoxProps } from './typings';

const TechnicalProblemsBox = ({
  title = 'Technische Störung',
  description = 'Aufgrund einer technischen Störung zeigen wir derzeit unvollständige Kursdaten an. Wir bedauern diese Umstände und bedanken uns für Ihr Verständnis.',
  details = 'Das E-Banking ist davon nicht betroffen.',
}: TechnicalProblemsBoxProps) => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Description}>
        <p className={styles.Title}>{title}</p>
        <p className={styles.DescriptionText}>{description}</p>
      </div>
      {details && (
        <div className={styles.Details}>
          <p className={styles.DetailsText}>{details}</p>
        </div>
      )}
    </div>
  );
};

export default TechnicalProblemsBox;
