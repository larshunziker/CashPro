//@ts-nocheck

import { useSort } from '../../../hooks/useSort';
import mockData from '../../mockData.json';

const routeByPathObject = mockData.data.environment.routeByPath.object;

/**
 * SORT
 */
describe('Ranking helpers - [SORTING]', () => {
  const { sortRanking } = useSort();
  const list = routeByPathObject?.rankings?.edges.map(({ node }) => node);

  // sort for rank
  it('[1] Should sort list by rankingPosition - asc', () => {
    const sortedRanking = sortRanking(list, 'rang');
    expect(sortedRanking).toMatchSnapshot();
  });

  it('[2] Should sort list by rankingPosition - desc', () => {
    const sortedRanking = sortRanking(list, 'rang', 'desc');
    expect(sortedRanking).toMatchSnapshot();
  });

  // sort for name
  it('[3] Should sort by name - asc', () => {
    const sortedRanking = sortRanking(list, 'name');
    expect(sortedRanking).toMatchSnapshot();
  });

  it('[4] Should sort by name - desc', () => {
    const sortedRanking = sortRanking(list, 'name', 'desc');
    expect(sortedRanking).toMatchSnapshot();
  });

  // sort for networth
  it('[5] Should sort for networth - asc', () => {
    const sortedRanking = sortRanking(list, 'vermögen');
    expect(sortedRanking).toMatchSnapshot();
  });

  it('[6] Should sort for networth - desc', () => {
    const sortedRanking = sortRanking(list, 'vermögen', 'desc');
    expect(sortedRanking).toMatchSnapshot();
  });

  // sort for industry
  it('[7] Should sort for industry - asc', () => {
    const sortedRanking = sortRanking(list, 'branche');
    expect(sortedRanking).toMatchSnapshot();
  });

  it('[8] Should sort for industry - desc', () => {
    const sortedRanking = sortRanking(list, 'branche', 'desc');
    expect(sortedRanking).toMatchSnapshot();
  });

  //sort for state
  it('[9] Should sort for industry - asc', () => {
    const sortedRanking = sortRanking(list, 'kanton');
    expect(sortedRanking).toMatchSnapshot();
  });

  it('[10] Should sort for state - desc', () => {
    const sortedRanking = sortRanking(list, 'kanton', 'desc');
    expect(sortedRanking).toMatchSnapshot();
  });
});
