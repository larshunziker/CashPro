import { formatWealthNumber } from '../../helpers';
import { RANKING_TYPE_RICHEST } from '../../../Person/constants';

export const getTop300Data = (
  person: Person,
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ 320 */
  rankingYear,
  { noDataIfSingleRanking = false },
) => {
  const chartData = { x: [], y: [] };

  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  const isMoreThanOneRanking = person?.rankings?.edges.length >= 1;

  if (noDataIfSingleRanking && !isMoreThanOneRanking) {
    return { chartData, top300List: [] };
  }

  const top300List = person?.rankings?.edges?.filter(
    /* @ts-ignore TODO: TS2339 ->  Property 'node' does not exist on type 'Maybe<RankingsEdge>'. */
    ({ node: { rankingValue, ranking } }) => {
      const isRichest = ranking?.rankingType === RANKING_TYPE_RICHEST;
      const isOlderYear = rankingYear ? ranking?.year <= rankingYear : true;

      if (isRichest && isOlderYear) {
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ 320 */
        chartData.x.push(ranking?.year.toString());
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'number' is not assignable to parameter of type 'never'. */
        chartData.y.push(parseFloat(rankingValue));
      }
      return isRichest;
    },
  );

  return { chartData, top300List };
};

export const getOptions = (x: string[], y: number[]): Highcharts.Options => {
  return {
    legend: {
      enabled: false,
    },
    title: {
      text: 'Entwicklung des Vermögens',
      verticalAlign: 'bottom',
      style: {
        color: '#292E32',
        fontSize: '14px',
        fontWeight: '900',
        fontFamily: 'Gotham-Black',
        lineHeight: '19px',
        whiteSpace: 'nowrap',
      },
    },
    chart: {
      backgroundColor: 'transparent',
      // null = makes the chart's width and height responsive
      width: null,
      height: null,
    },
    xAxis: [
      {
        categories: x,
        lineWidth: 0,
        labels: {
          overflow: 'allow',
          formatter: function (): string {
            const { value, pos } = this;
            if (x.length <= 2) {
              return `${value}`;
            }
            /* @ts-ignore TODO: TS7006 ->  Parameter 'str' implicitly has an 'any' type. */
            const isOdd = (str) => Number(str) % 2 !== 0;
            const lastYear = x[x.length - 1];
            const offset = isOdd(lastYear) ? 1 : 0;

            return `${pos % 2 === offset ? value : ''}`;
          },
          rotation: 0,
          style: {
            fontSize: '11px',
            fontFamily: 'Gotham-Book',
          },
        },
      },
    ],
    credits: {
      enabled: false,
    },
    yAxis: [
      {
        gridLineWidth: 0,
        labels: {
          enabled: false,
        },
        title: {
          text: null,
        },
      },
    ],
    series: [
      {
        type: 'line',
        data: y,
        color: 'black',
        lineWidth: 2,
      },
    ],
    tooltip: {
      useHTML: true,
      style: {
        fontSize: '14px',
        fontFamily: 'Gotham-Book',
      },
      formatter: function (): string {
        return `<div>
                  <p>Jahr ${this.x}</p>
                  <p>Vermögen ${formatWealthNumber(this.y)}</p>
                </div>`;
      },
    },
  };
};
