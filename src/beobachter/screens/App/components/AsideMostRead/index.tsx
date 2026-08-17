import React, { ReactElement } from 'react';

import ContentBox from '../ContentBox';
import { CONTENT_SOURCE_MOST_READ } from '../../../../../shared/constants/content';

const AsideMostRead = (): ReactElement => {
  return (
    <ContentBox
      component={CONTENT_SOURCE_MOST_READ}
      node={{ title: 'Meistgelesen' }}
    />
  );
};

export default AsideMostRead;
