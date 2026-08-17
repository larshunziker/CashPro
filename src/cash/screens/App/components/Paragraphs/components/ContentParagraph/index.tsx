/* istanbul ignore file */

import React from 'react';
import ContentBox from '../../../ContentBox';
import { ContentParagraphProps } from './typings';

const ContentParagraph = ({ contentParagraph }: ContentParagraphProps) => {
  if (!contentParagraph?.contentReference?.contentSourceValue) {
    return null;
  }

  return (
    <ContentBox
      component={contentParagraph.contentReference.contentSourceValue}
      node={contentParagraph.contentReference}
    />
  );
};

export default ContentParagraph;
