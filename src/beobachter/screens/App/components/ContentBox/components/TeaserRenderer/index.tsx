import React, { ReactElement } from 'react';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import TeaserGrid from '../../../TeaserGrid';
import {
  CONTENT_SOURCE_MANUAL,
  CONTENT_SOURCE_MOST_READ,
} from '../../../../../../../shared/constants/content';
import {
  GRID_LAYOUT_ENTITY_QUEUE_COLUMN,
  GRID_LAYOUT_ENTITY_QUEUE_COLUMN_MIXED,
} from '../../../TeaserGrid/gridConfigs/constants';
import { ContentBoxData } from '../../../../../../../common/components/ContentBox/typings';

type TeaserRendererProps = {
  contentBoxData: ContentBoxData | Record<string, any>;
};

const TeaserRenderer = ({
  contentBoxData,
}: TeaserRendererProps): ReactElement => {
  if (!contentBoxData.items && !Array.isArray(contentBoxData.items)) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }
  const isNumbered = contentBoxData.contentBoxType !== CONTENT_SOURCE_MANUAL;

  return (
    <TestFragment data-testid="content-box-items-wrapper">
      <TeaserGrid
        layout={
          contentBoxData.contentBoxType === CONTENT_SOURCE_MOST_READ
            ? GRID_LAYOUT_ENTITY_QUEUE_COLUMN
            : GRID_LAYOUT_ENTITY_QUEUE_COLUMN_MIXED
        }
        items={contentBoxData.items}
        isNumbered={isNumbered}
      />
    </TestFragment>
  );
};

export default TeaserRenderer;
