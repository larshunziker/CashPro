/* istanbul ignore file */

import { RaschApolloConfig } from '../../../../../shared/decorators/withRaschRouterFactory';
import { VIDEO_CONTENT_TYPE } from '../../../../../shared/constants/content';
import { GLOBAL_SEARCH_SORT_BY_MODIFICATION_DATE } from '../../../../../shared/constants/globalSearch';
import {
  CHANNEL_TYPE_VIDEOS,
  DEFAULT_PUBLICATION,
  HZ_CHANNELS_VOCABULARY,
  OVERVIEW_VISIBLE_TYPE_VIDEOS,
} from '../../../App/constants';
import { ITEMS_PER_PAGE, VIDEO_STAGE_ITEMS } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/handelszeitung/screens/ */
import { GET_VIDEO_PAGE } from './queries';

export const apolloConfig: RaschApolloConfig = {
  options: ({ location }) => {
    const page = location?.query?.page || 1;

    return {
      query: GET_VIDEO_PAGE,
      variables: {
        path: 'videos',
        query: '*',
        vid: HZ_CHANNELS_VOCABULARY,
        publication: DEFAULT_PUBLICATION,
        limit: ITEMS_PER_PAGE,
        offset: Math.abs(page - 1) * ITEMS_PER_PAGE + VIDEO_STAGE_ITEMS,
        videoStageLimit: VIDEO_STAGE_ITEMS,
        videoStageOffset: 0,
        sort: GLOBAL_SEARCH_SORT_BY_MODIFICATION_DATE,
        contentTypes: [VIDEO_CONTENT_TYPE],
        channelType: [CHANNEL_TYPE_VIDEOS],
        overviewPageVisibility: [OVERVIEW_VISIBLE_TYPE_VIDEOS],
      },
    };
  },
};
