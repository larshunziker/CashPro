import React, { FC } from 'react';
import { truncateByWord } from '../../../../../../../../shared/helpers/utils';
import { TeaserLeadProps } from './typings';

const appendix = ' Mehr';

const TeaserLead: FC<TeaserLeadProps> = ({
  leadText,
  leadLength,
  addClass,
}) => {
  if (!leadText) {
    return null;
  }

  return (
    <p className={addClass}>
      {truncateByWord(leadText, leadLength - appendix.length, ' …')}
      <span>{appendix}</span>
    </p>
  );
};

export default TeaserLead;
