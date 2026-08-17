/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
export const countSearchResults = (props, searchType = 'alle'): number => {
  if (searchType === 'wikifolio') {
    return wikifolioCount(props);
  }

  if (searchType === 'news') {
    return newsCount(props);
  }

  const results = props?.newData?.textSearch;
  if (!results) {
    return 0;
  }

  const total = Object.values(results).map(
    (element: any) => element?.count || 0,
  );

  if (searchType === 'alle') {
    total.push(wikifolioCount(props), newsCount(props));
  }
  return total.reduce((partialSum, total) => partialSum + total, 0);
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const wikifolioCount = (props) => props?.newData?.wikifolio?.count || 0;

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const newsCount = (props) =>
  props?.newData?.environment?.globalSearch?.count || 0;
