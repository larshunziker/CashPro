import { useSort as useSort } from './hooks/useSort';
import {
  RANKING_TYPE_RICHEST,
  RANKING_TYPE_WHO_IS_WHO,
  RANKING_TYPE_YOUNG_RICHEST,
  RANKING_TYPE_YOUNG_RICHEST_INHERITANCE,
  RANKING_TYPE_YOUNG_RICHEST_STARS,
  RANKING_TYPE_YOUNG_RICHEST_ENTREPRENEUR,
} from '../Person/constants';

// filter by: Woman | Newcomer | Returnee | Industry
export const mapRanking = (
  { year, rankingType, rankings }: Ranking,
  filters: {
    filterByGender?: string;
    filterByStatus?: string;
    filterByIndustry?: string;
    filterByState?: string;
    suche?: string;
    sortBy?: string;
    direction?: string;
  },
  /* @ts-ignore TODO: TS7008 ->  Member 'rankingItems' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7008 ->  Member 'dropdownLists' implicitly has an 'any' type. */
): { rankingItems; dropdownLists } => {
  if (!rankings?.edges) {
    return {
      rankingItems: [],
      dropdownLists: { industryList: [], stateList: [] },
    };
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { sortText, sortStates, sortRanking } = useSort(filters?.direction);
  let dropdownLists = {};
  let industryList: any = new Set<string>();
  let stateList: any = new Set<string>();

  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
  const isNewRanking = year >= 2023 && rankingType === RANKING_TYPE_RICHEST;
  const normalizedFilters = Object.keys(filters)
    .filter((f) => f.startsWith('filterBy') || f.startsWith('suche'))
    .reduce((acc, key) => {
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'. */
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ filterByGender? */
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ filterByGender? */
      acc[key] = (filters[key] && normalize(filters[key])) || null;
      return acc;
    }, {});

  const filteredList = rankings?.edges.filter(
    ({
      /* @ts-ignore TODO: TS2339 ->  Property 'node' does not exist on type 'Maybe<RankingsEdge>'. */
      node: {
        person = null,
        rankingIndustry = null,
        rankingState = null,
        rankingTrend = null,
      },
    }) => {
      stateList.add(rankingState);
      const industries =
        (rankingIndustry?.includes(`,`) && rankingIndustry?.split(',')) ||
        rankingIndustry;

      if (Array.isArray(industries)) {
        [...industries].map((filter) => {
          industryList.add(filter);
        });
      } else {
        industryList.add(industries);
      }

      const isMatch = checkMatch({
        filters: normalizedFilters,
        rowValues: {
          filterByGender: person?.isWoman ? 'frauen' : '',
          filterByStatus: rankingTrend,
          filterByIndustry: normalize(rankingIndustry),
          filterByState: normalize(rankingState),
          suche: normalize(person?.name),
        },
      });

      return isMatch;
    },
  ) as any;

  // formatting => only to already filtered out items
  /* @ts-ignore TODO: TS7031 ->  Binding element 'node' implicitly has an 'any' type. */
  let rankingItems = filteredList.map(({ node }) => ({
    ...node,
    rankingValue: formatWealthNumber(node.rankingValue),
    // TODO: update rankingTrend here to also support icons for 'returnee' (prob using getPersonRanking)
  }));

  if (isNewRanking) {
    // sorting => only exists in new ranking lists
    rankingItems = filters?.sortBy
      ? sortRanking(rankingItems, filters?.sortBy, filters?.direction)
      : rankingItems;

    /* @ts-ignore TODO: TS7006 ->  Parameter 'list' implicitly has an 'any' type. */
    const stayAsc = (list) =>
      filters?.direction === 'asc' ? list : list.reverse();

    stateList = [...stateList].sort(sortStates);
    industryList = [...industryList].sort(sortText);

    dropdownLists = {
      stateList: stayAsc(stateList),
      industryList: stayAsc(industryList),
    };
  } else {
    rankingItems = ensureTeaserInterface(rankingItems, rankingType);
  }

  return {
    rankingItems,
    dropdownLists,
  };
};

export const normalize = (str: string): string => {
  if (!str) return '';

  return decodeURIComponent(str)
    .normalize('NFD') // ä => a, ß => ss
    .replace(/\p{Diacritic}/gu, '') // èéêë.. => e
    .trim()
    .toLowerCase();
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'filters' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'rowValues' implicitly has an 'any' type. */
const checkMatch = ({ filters, rowValues }): boolean => {
  let isMatch = true;

  Object.entries(filters).map(([key, value]: [key: string, value: string]) => {
    const rowValue = rowValues[key];

    // by always setting isMatch to false, we can skip the rest of the checks
    if (key === 'filterByGender' && !rowValue && isMatch) {
      isMatch = false;
    }

    if (
      key === 'filterByStatus' &&
      ((value === 'neu' && rowValue !== 'new') ||
        (value === 'returnee' && rowValue !== 'returnee')) &&
      isMatch
    ) {
      isMatch = false;
    }

    if (key === 'filterByIndustry' && !rowValue.includes(value) && isMatch) {
      isMatch = false;
    }

    if (key === 'filterByState' && rowValue !== value && isMatch) {
      isMatch = false;
    }

    if (key === 'suche' && !rowValue.includes(value) && isMatch) {
      isMatch = false;
    }
  });

  return isMatch;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'rankingItems' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'rankingType' implicitly has an 'any' type. */
const ensureTeaserInterface = (rankingItems, rankingType) => {
  const typesWithoutRankingPosition = [
    RANKING_TYPE_WHO_IS_WHO,
    RANKING_TYPE_YOUNG_RICHEST,
    RANKING_TYPE_YOUNG_RICHEST_INHERITANCE,
    RANKING_TYPE_YOUNG_RICHEST_STARS,
    RANKING_TYPE_YOUNG_RICHEST_ENTREPRENEUR,
  ];

  const isRankingPosition =
    !rankingType || !typesWithoutRankingPosition.includes(rankingType);

  // ensure that all required fields are present
  return rankingItems.map(
    /* @ts-ignore TODO: TS7031 ->  Binding element 'rankingValue' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'rankingPosition' implicitly has an 'any' type. */
    ({ person = null, rankingValue, rankingPosition }) => ({
      /* @ts-ignore TODO: TS2698 ->  Spread types may only be created from object types. */
      ...person,
      /* @ts-ignore TODO: TS2339 ->  Property 'createDate' does not exist on type 'never'. */
      createDate: person?.createDate || '',
      /* @ts-ignore TODO: TS2339 ->  Property 'name' does not exist on type 'never'. */
      title: person?.name || '',
      shortTitle: rankingValue || '',
      /* @ts-ignore TODO: TS2339 ->  Property 'teaserImage' does not exist on type 'never'. */
      teaserImage: person?.teaserImage || null,
      /* @ts-ignore TODO: TS2339 ->  Property 'preferredUri' does not exist on type 'never'. */
      preferredUri: person?.preferredUri || '',
      rankingPosition: (isRankingPosition && rankingPosition) || '',
    }),
  );
};

export const formatWealthNumber = (input: any): string => {
  const inputNumber = Number(input);
  if (!input || Number.isNaN(inputNumber) || inputNumber === 0) {
    if (inputNumber !== 0 && !Number.isNaN(inputNumber)) {
      return inputNumber.toString();
    }
    if (typeof input === 'string') {
      return input?.trim?.();
    }
    return input;
  }
  if (inputNumber < 1_000_000) {
    return new Intl.NumberFormat('de-CH', {}).format(inputNumber);
  }
  if (inputNumber < 1_000_000_000) {
    return `${Math.round(inputNumber / 1_000_000)} Mio.`;
  }
  let result = (inputNumber / 1_000_000_000).toFixed(1).replace('.', ',');
  if (result[result.length - 1] === '0') {
    result = result.slice(0, -2);
  }
  return `${result} Mrd.`;
};
