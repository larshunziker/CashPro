import {
  getGridLayoutByProps,
  getStyleByProps,
} from '../../TeaserStageParagraph';
import { PAGESCREEN_MARKETING_TYPE } from '../../../../../screens/PageScreen/constants';

jest.mock('../../../../TeaserGrid');

describe('[Component] TeaserStageParagraph', () => {
  test.each`
    origin
    ${'default'}
    ${null}
    ${PAGESCREEN_MARKETING_TYPE}
  `('Should generate styles correctly when origin is $origin', ({ origin }) => {
    //@ts-ignore
    const styles = getStyleByProps({ origin });
    expect(styles).toMatchSnapshot();
  });

  test.each`
    teaserCount
    ${1}
    ${2}
    ${3}
    ${4}
  `(
    'Should generate gridOptions for $teaserCount teaser(s) correctly',
    ({ teaserCount }) => {
      const teaserStage = { entities: { edges: Array(teaserCount).fill({}) } };
      const gridConfig = getGridLayoutByProps({ teaserStage });
      expect(gridConfig).toMatchSnapshot();
    },
  );
});
