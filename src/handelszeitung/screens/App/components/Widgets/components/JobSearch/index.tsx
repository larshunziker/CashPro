import React, { useRef, useState } from 'react';
import ButtonWithLoading from '../../../ButtonWithLoading';
import jobsCH from './logos/jobsch.svg';
import hzInsurance from './logos/hzInsurance.svg';
import useInView from '../../../../../../../shared/hooks/useInView';
import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import AutocompleteInput from './components/AutocompleteInput';
import styles from './styles.legacy.css';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import { FormValues, JobSearchProps } from './typings';

const JobSearch = ({ widgetParagraph }: JobSearchProps) => {
  const [values, setValues] = useState<FormValues>({
    term: '',
    location: '',
  });
  const [title, subtitle] = (widgetParagraph?.title || '')
    ?.split('|')
    .map((text) => text.trim());
  [];
  const { setRef, isInView } = useInView({
    rootMargin: '200px',
    triggerOnce: true,
  });
  const wasTriggered = useRef(false);

  const submit = () => {
    const url = new URL('https://www.jobs.ch/de/stellenangebote');
    url.searchParams.append('category', '147');
    url.searchParams.append('category', '148');
    url.searchParams.append('category', '149');
    url.searchParams.append('category', '150');
    url.searchParams.append('category', '151');
    if (values.location) {
      url.searchParams.append('location', values.location);
    }
    if (values.term) {
      url.searchParams.append('term', values.term);
    }
    window.open(url.href, '_blank');
    tealiumTrackEvent({
      type: 'link',
      payload: {
        event_name: 'integration_click',
        integration_action: 'Click submit',
        integration_name: 'job_search',
        integration_sponsor: 'jobs_ch',
        event_trigger: 'custom',
        integration_element: 'submit',
        integration_label: `location: ${values.location}, term: ${values.term}`,
      },
    });
  };

  if (isInView && wasTriggered?.current === false) {
    wasTriggered.current = true;
    tealiumTrackEvent({
      type: 'link',
      payload: {
        event_name: 'integration_impression',
        integration_action: 'Impression widget',
        integration_name: 'job_search',
        integration_sponsor: 'jobs_ch',
        event_trigger: 'custom',
        integration_element: 'widget',
      },
    });
  }

  return (
    <div className={styles.Wrapper} ref={setRef}>
      <div className={grid.Container}>
        {title && <p className={styles.Title}>{title}</p>}
        {subtitle && <p className={styles.Subtitle}>{subtitle}</p>}
        <div className={styles.FormLogosWrapper}>
          <div className={styles.Form}>
            <AutocompleteInput
              values={values}
              setValues={(values) => setValues(values)}
              placeholder="Beruf, Stichwort, Unternehmen"
              type="term"
            />
            <AutocompleteInput
              values={values}
              setValues={(values) => setValues(values)}
              placeholder="Arbeitsort oder Region"
              type="location"
            />
            <div className={styles.Button}>
              <ButtonWithLoading onClick={submit}>Suchen</ButtonWithLoading>
            </div>
          </div>
          <div className={styles.Logos}>
            <p className={styles.Presented}>Presented by</p>
            <a
              href="https://www.jobs.ch/"
              onClick={(event) => {
                event.preventDefault();
                tealiumTrackEvent({
                  type: 'link',
                  payload: {
                    event_name: 'integration_click',
                    integration_action: 'Click jobs_ch_logo',
                    integration_name: 'job_search',
                    integration_sponsor: 'jobs_ch',
                    event_trigger: 'custom',
                    integration_element: 'jobs_ch_logo',
                  },
                });
                window.open('https://www.jobs.ch/', '_blank');
              }}
            >
              <img className={styles.JobsCH} src={jobsCH} alt="jobs.ch logo" />
            </a>
            <img
              className={styles.HZinsurance}
              src={hzInsurance}
              alt="hz insurance logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
