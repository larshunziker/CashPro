import { CalendarData } from './typings';

export const getChunks = (array: any[], number: number) => {
  const newArray = [];
  for (let i = 0; i < array.length; i += number) {
    const chunk = array.slice(i, i + number);
    newArray.push(chunk);
  }

  return newArray;
};

export const getCombinedData = (
  slideData: CalendarItem[],
  quoteData: any,
): CalendarData[] | [] => {
  if (!slideData || !quoteData) {
    return [];
  }

  return slideData.map((item) => {
    const quote = quoteData.quoteList.quoteList.edges.find(
      ({ node }: any) => node.instrumentKey === item.instrumentKey,
    );

    return {
      ...item,
      quote: quote?.node,
    };
  });
};
