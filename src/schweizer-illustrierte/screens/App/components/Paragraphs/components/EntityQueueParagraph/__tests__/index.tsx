import { getGridLayoutByProps } from '../index';
import { GRID_LAYOUT_MIXED } from '../../../../../../../../common/components/TeaserGrid/gridConfigs/constants';
import {
  MAIN_CHANNEL_BODY_HEALTH,
  MAIN_CHANNEL_ENTERTAINMENT,
  MAIN_CHANNEL_FAMILY,
  MAIN_CHANNEL_HOME,
  MAIN_CHANNEL_PEOPLE,
  MAIN_CHANNEL_STYLE,
} from '../../../../../constants';
import { MENU_OVERLAY } from '../../../../Navigation/components/NavigationMenu/constants';
import {
  GRID_LAYOUT_BODY_AND_HEALTH_FAMILY_BOTTOM,
  GRID_LAYOUT_BODY_AND_HEALTH_TOP,
  GRID_LAYOUT_FAMILY_TOP,
  GRID_LAYOUT_HOME_BOTTOM,
  GRID_LAYOUT_HOME_TOP,
  GRID_LAYOUT_MENU_OVERLAY,
  GRID_LAYOUT_PEOPLE_TOP,
  GRID_LAYOUT_STYLE_BOTTOM,
  GRID_LAYOUT_STYLE_TOP,
} from '../../../../TeaserGrid/gridConfigs/constants';
import {
  ENTITY_QUEUE_STYLE_SPLIT_BOTTOM,
  ENTITY_QUEUE_STYLE_SPLIT_TOP,
} from '../constants';

describe('[Component] Paragraphs - EntityQueueParagraph', () => {
  test.each`
    origin          | entityQueue                                   | activeMainChannel             | grid
    ${''}           | ${{ style: null }}                            | ${''}                         | ${GRID_LAYOUT_MIXED}
    ${''}           | ${{ style: ENTITY_QUEUE_STYLE_SPLIT_TOP }}    | ${MAIN_CHANNEL_HOME}          | ${GRID_LAYOUT_HOME_TOP}
    ${''}           | ${{ style: ENTITY_QUEUE_STYLE_SPLIT_BOTTOM }} | ${MAIN_CHANNEL_HOME}          | ${GRID_LAYOUT_HOME_BOTTOM}
    ${''}           | ${{ style: ENTITY_QUEUE_STYLE_SPLIT_TOP }}    | ${MAIN_CHANNEL_PEOPLE}        | ${GRID_LAYOUT_PEOPLE_TOP}
    ${''}           | ${{ style: ENTITY_QUEUE_STYLE_SPLIT_BOTTOM }} | ${MAIN_CHANNEL_PEOPLE}        | ${GRID_LAYOUT_HOME_BOTTOM}
    ${''}           | ${{ style: ENTITY_QUEUE_STYLE_SPLIT_TOP }}    | ${MAIN_CHANNEL_STYLE}         | ${GRID_LAYOUT_STYLE_TOP}
    ${''}           | ${{ style: ENTITY_QUEUE_STYLE_SPLIT_BOTTOM }} | ${MAIN_CHANNEL_STYLE}         | ${GRID_LAYOUT_STYLE_BOTTOM}
    ${''}           | ${{ style: ENTITY_QUEUE_STYLE_SPLIT_TOP }}    | ${MAIN_CHANNEL_BODY_HEALTH}   | ${GRID_LAYOUT_BODY_AND_HEALTH_TOP}
    ${''}           | ${{ style: ENTITY_QUEUE_STYLE_SPLIT_BOTTOM }} | ${MAIN_CHANNEL_BODY_HEALTH}   | ${GRID_LAYOUT_BODY_AND_HEALTH_FAMILY_BOTTOM}
    ${''}           | ${{ style: ENTITY_QUEUE_STYLE_SPLIT_TOP }}    | ${MAIN_CHANNEL_FAMILY}        | ${GRID_LAYOUT_FAMILY_TOP}
    ${''}           | ${{ style: ENTITY_QUEUE_STYLE_SPLIT_BOTTOM }} | ${MAIN_CHANNEL_FAMILY}        | ${GRID_LAYOUT_BODY_AND_HEALTH_FAMILY_BOTTOM}
    ${MENU_OVERLAY} | ${{ style: ENTITY_QUEUE_STYLE_SPLIT_TOP }}    | ${MAIN_CHANNEL_HOME}          | ${GRID_LAYOUT_MENU_OVERLAY}
    ${MENU_OVERLAY} | ${{ style: ENTITY_QUEUE_STYLE_SPLIT_BOTTOM }} | ${MAIN_CHANNEL_HOME}          | ${GRID_LAYOUT_MENU_OVERLAY}
    ${MENU_OVERLAY} | ${{ style: ENTITY_QUEUE_STYLE_SPLIT_TOP }}    | ${MAIN_CHANNEL_PEOPLE}        | ${GRID_LAYOUT_MENU_OVERLAY}
    ${MENU_OVERLAY} | ${{ style: ENTITY_QUEUE_STYLE_SPLIT_BOTTOM }} | ${MAIN_CHANNEL_PEOPLE}        | ${GRID_LAYOUT_MENU_OVERLAY}
    ${MENU_OVERLAY} | ${{ style: ENTITY_QUEUE_STYLE_SPLIT_TOP }}    | ${MAIN_CHANNEL_ENTERTAINMENT} | ${GRID_LAYOUT_MENU_OVERLAY}
    ${MENU_OVERLAY} | ${{ style: ENTITY_QUEUE_STYLE_SPLIT_BOTTOM }} | ${MAIN_CHANNEL_ENTERTAINMENT} | ${GRID_LAYOUT_MENU_OVERLAY}
    ${MENU_OVERLAY} | ${{ style: ENTITY_QUEUE_STYLE_SPLIT_TOP }}    | ${MAIN_CHANNEL_STYLE}         | ${GRID_LAYOUT_MENU_OVERLAY}
    ${MENU_OVERLAY} | ${{ style: ENTITY_QUEUE_STYLE_SPLIT_BOTTOM }} | ${MAIN_CHANNEL_STYLE}         | ${GRID_LAYOUT_MENU_OVERLAY}
    ${MENU_OVERLAY} | ${{ style: ENTITY_QUEUE_STYLE_SPLIT_TOP }}    | ${MAIN_CHANNEL_BODY_HEALTH}   | ${GRID_LAYOUT_MENU_OVERLAY}
    ${MENU_OVERLAY} | ${{ style: ENTITY_QUEUE_STYLE_SPLIT_BOTTOM }} | ${MAIN_CHANNEL_BODY_HEALTH}   | ${GRID_LAYOUT_MENU_OVERLAY}
    ${MENU_OVERLAY} | ${{ style: ENTITY_QUEUE_STYLE_SPLIT_TOP }}    | ${MAIN_CHANNEL_FAMILY}        | ${GRID_LAYOUT_MENU_OVERLAY}
    ${MENU_OVERLAY} | ${{ style: ENTITY_QUEUE_STYLE_SPLIT_BOTTOM }} | ${MAIN_CHANNEL_FAMILY}        | ${GRID_LAYOUT_MENU_OVERLAY}
  `(
    'Should return correct gridLayout for entityQueue $entityQueue and ActiveMainChannel $activeMainChannel of origin $origin',
    ({ origin, entityQueue, activeMainChannel, grid }) => {
      const gridLayout = getGridLayoutByProps({
        origin,
        entityQueue,
        activeMainChannel,
      });
      expect(gridLayout).toBe(grid);
    },
  );
});
