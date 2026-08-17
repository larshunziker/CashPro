import { mapRanking } from '../../../helpers';
import mockData from '../../mockData.json';

const ranking = mockData.data.environment.routeByPath.object as Ranking;

/**
 *  FILTER
 */
describe('Ranking helpers - [FILTER]', () => {
  // filter for woman
  it('[1] Should return a list filtered by women', () => {
    const { rankingItems } = mapRanking(ranking, {
      filterByGender: 'frauen',
    });
    expect(rankingItems.length).toBe(2);
    expect(rankingItems).toMatchSnapshot();
  });

  // filter for newcomer
  it('[2] Should return a list filtered by newcomer', () => {
    const { rankingItems } = mapRanking(ranking, {
      filterByStatus: 'neu',
    });
    expect(rankingItems.length).toBe(3);
    expect(rankingItems).toMatchSnapshot();
  });

  // filter for returnee
  it('[3] Should return a list filtered by returnees', () => {
    const { rankingItems } = mapRanking(ranking, {
      filterByStatus: 'returnee',
    });
    expect(rankingItems.length).toBe(1);
    expect(rankingItems).toMatchSnapshot();
  });

  // filter for industry
  test.each([
    { filterBy: 'Technologie' },
    { filterBy: 'Finanzen & Investment' },
    { filterBy: 'Food' },
    { filterBy: 'Möbel' },
    { filterBy: 'Immobilien' },
  ])(`[4] Should return a list filtered by industry: $filterBy`, (config) => {
    const { rankingItems } = mapRanking(ranking, {
      filterByIndustry: config.filterBy,
    });
    expect(rankingItems).toMatchSnapshot();
  });
});
