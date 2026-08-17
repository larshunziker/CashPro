export const defaultOptions = {
  chart: {
    type: 'column',
    width: null,
    height: 300,
  },
  credits: {
    enabled: false,
  },
  title: {
    text: null,
  },
  xAxis: [
    {
      categories: ['Jahre'],
    },
    {
      title: {
        text: '',
      },
    },
  ],
  yAxis: {
    opposite: true,
    title: {
      text: null,
    },
    allowDecimals: true,
  },
  plotOptions: {
    column: {
      stacking: 'normal',
      pointPadding: 0.05,
      borderWidth: 0,
      inactiveOtherPoints: true,
    },
    series: {
      marker: {
        enabled: true,
        states: {
          hover: {
            enabled: true,
          },
        },
      },
    },
  },
  legend: { enabled: false },
  tooltip: {
    formatter: function () {},
    shared: true,
    enable: true,
  },
  series: [
    {
      name: 'Auszahlung in CHF',
      data: [3, 4, 5, 6, 7, 8],
      stack: 'Type B',
      xAxis: 1,
      color: '#107B8E',
    },
  ],
};
