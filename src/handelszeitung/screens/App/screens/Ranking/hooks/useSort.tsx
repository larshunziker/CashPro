import { normalize } from '../helpers';

export const useSort = (direction: string = 'asc') => {
  const sortNumbers = (a: number, b: number): number => {
    return (direction === 'asc' && a - b) || b - a;
  };

  const sortText = (a: string, b: string): number => {
    const normalized = { a: normalize(a), b: normalize(b) };

    if (normalized.a < normalized.b) {
      return (direction === 'asc' && -1) || 1;
    }

    if (normalized.a > normalized.b) {
      return (direction === 'asc' && 1) || -1;
    }
    return 0;
  };

  const sortStates = (a: string, b: string): number => {
    if (!a || !b) return 0;

    if (a.startsWith('Ausland: ') && !b.startsWith('Ausland: ')) {
      return direction === 'asc' ? 1 : -1;
    } else if (!a.startsWith('Ausland: ') && b.startsWith('Ausland: ')) {
      return direction === 'asc' ? -1 : 1;
    } else {
      return sortText(a, b);
    }
  };

  const sortRanking = (
    list: Array<Rankings>,
    sortBy: string,
    direction: string = 'asc',
  ): Array<Rankings> => {
    // only one item in the list. no need to sort
    if (list?.length < 2) return list;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { sortNumbers, sortText, sortStates } = useSort(direction);

    switch (sortBy) {
      case 'rang':
      case 'vermögen':
        return list?.sort((a, b) =>
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<number> | undefined' is not assignable to parameter of type 'number'. */
          sortNumbers(a.rankingPosition, b.rankingPosition),
        );

      case 'name':
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
        return list?.sort((a, b) => sortText(a.person?.name, b.person?.name));

      case 'branche':
        return list?.sort((a, b) => {
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
          return sortText(a.rankingIndustry, b.rankingIndustry);
        });

      case 'kanton':
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
        return list?.sort((a, b) => sortStates(a.rankingState, b.rankingState));

      default:
        return list;
    }
  };

  return { sortNumbers, sortText, sortStates, sortRanking };
};
