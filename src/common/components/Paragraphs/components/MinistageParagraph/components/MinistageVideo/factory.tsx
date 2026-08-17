import React, { ReactElement } from 'react';
import classNames from 'classnames';
import {
  TRACKING_CLASS_MINISTAGE_VIDEO_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../shared/constants/tracking';
import { VideoStageType } from '../../../../../VideoStage/typings';
import {
  MinistageVideoFactoryOptions,
  MinistageVideoFactoryOptionsStyles,
  MinistageVideoProps,
} from './typings';

type MinistageVideoPropsInner = MinistageVideoProps;

export default ({
  VideoStage,
  styles: appStyles,
}: MinistageVideoFactoryOptions) => {
  class MinistageVideoClass extends React.Component<MinistageVideoPropsInner> {
    render(): ReactElement | null {
      const {
        id,
        ministageParagraph,
        scrollOffset,
        origin,
        isSplittedPageLayout = false,
      } = this.props;

      const defaultStyles = {
        Wrapper: 'string',
        InnerWrapper: 'string',
      };

      const getStyles = () => {
        const styles: MinistageVideoFactoryOptionsStyles =
          (typeof appStyles === 'function' && appStyles(this.props)) ||
          (typeof appStyles === 'object' && appStyles) ||
          defaultStyles;
        return styles;
      };

      const styles = getStyles();

      const ministage = ministageParagraph?.ministage as MinistageVideo;
      if (
        !ministage?.items?.edges ||
        !Array.isArray(ministage?.items.edges) ||
        ministage?.items.edges.length === 0
      ) {
        return null;
      }

      const ensuredVideoStage: VideoStageType = {
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        id: id || ministageParagraph.id,
        items: ministage?.items,
        link: ministage?.link || null,
        title: ministage?.name || 'Videos', // set static title for video stage
      };

      return (
        <div
          className={classNames(
            TRACKING_CLASS_PARAGRAPH,
            TRACKING_CLASS_MINISTAGE_VIDEO_PARAGRAPH,
            styles.Wrapper,
          )}
        >
          <div className={styles.InnerWrapper}>
            <VideoStage
              scrollOffset={scrollOffset}
              videoStage={ensuredVideoStage}
              origin={origin}
              isSplittedPageLayout={isSplittedPageLayout}
            />
          </div>
        </div>
      );
    }
  }

  return MinistageVideoClass;
};
