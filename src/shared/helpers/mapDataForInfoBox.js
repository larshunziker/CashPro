/**
 * @file    Maps data of text-paragraph to infobox-paragraph
 * @author  Pascal Tan <pascal.tan@ringieraxelspringer.ch>
 *
 */

import {
  TEXT_PARAGRAPH,
  TEXT_PARAGRAPH_INFOBOX_STYLE_VALUE,
} from 'constants/paragraphs';

export const mapDataForInfobox = (entry) => {
  return {
    infoBox: {
      anchorId: entry.anchorId,
      body: [
        {
          ...entry,
          styleValue: null,
          __typename: TEXT_PARAGRAPH,
        },
      ],
      style: TEXT_PARAGRAPH_INFOBOX_STYLE_VALUE,
    },
  };
};
