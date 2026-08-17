import React, { ReactElement } from 'react';
import { useQuery } from '@apollo/client';
import useInView, { UseInViewResponse } from '../../../shared/hooks/useInView';
import {
  MagazineIssueSectionComponent,
  MagazineIssueSectionFactoryOptions,
  MagazineIssueSectionProps,
} from './typings';

type GetIssueQuery = {
  environment: {
    contentById: Issue;
  };
};

const MagazineIssueSectionFactory = ({
  TeaserMagazineIssue,
  GET_ISSUE,
  publication,
  styles,
}: MagazineIssueSectionFactoryOptions<MagazineIssueSectionProps>): MagazineIssueSectionComponent => {
  const MagazineIssueSection: MagazineIssueSectionComponent = ({
    issueId,
  }: MagazineIssueSectionProps): ReactElement | null => {
    const { setRef, isInView }: UseInViewResponse = useInView({
      rootMargin: '100px',
      triggerOnce: true,
    });

    const variables = {
      id: issueId,
      publication: publication,
    };

    const { data, loading } = useQuery<GetIssueQuery>(GET_ISSUE, {
      variables,
      skip: !isInView || !issueId,
    });

    if (!issueId) {
      return null;
    }

    const issue = data?.environment?.contentById;

    return (
      /* @ts-ignore TODO: TS2322 ->  Type 'Dispatch<HTMLElement>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */
      <div ref={setRef}>
        {isInView && (
          <div className={styles.Wrapper}>
            <div className={styles.Row}>
              <div className={styles.Content}>
                {/* @ts-ignore TODO: TS2322 ->  Type 'Issue | undefined' is not assignable to type 'Issue'. */}
                <TeaserMagazineIssue issue={issue} isLoading={loading} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return MagazineIssueSection;
};

export default MagazineIssueSectionFactory;
