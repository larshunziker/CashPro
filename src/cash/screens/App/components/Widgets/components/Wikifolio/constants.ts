export const CONFIG = {
  capital: {
    rankingType: 'Capital',
    title: 'Investiertes Kapital in €',
    columnTitle: 'Kapital (€)',
    rankingName: 'aum',
  },
  oneYear: {
    rankingType: 'OneYear',
    title: 'Top Performance 1 Jahr',
    columnTitle: '52W%',
    rankingName: 'perf12m',
  },
  oneMonth: {
    rankingType: 'OneMonth',
    title: 'Top Performance 1 Monat',
    columnTitle: '4W%',
    rankingName: 'perf1m',
  },
  allTime: {
    rankingType: 'AllTime',
    title: 'Top Performance seit Start',
    columnTitle: 'Seit Start %',
    rankingName: 'perfever',
  },
} as const;
