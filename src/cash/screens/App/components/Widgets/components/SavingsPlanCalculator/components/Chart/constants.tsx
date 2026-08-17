export const defaultOptions = {
  chart: {
    type: 'column',
    width: null,
  },
  credits: {
    enabled: false,
  },
  title: {
    text: null,
  },
  xAxis: [
    {
      categories: ['Sparkonto', 'Sparplan'],
    },
    {
      title: {
        text: 'Anlagezeitraum in Jahren',
      },
    },
  ],
  yAxis: {
    opposite: true,
    title: {
      text: null,
    },
  },
  tooltip: {
    formatter: function () {},
    positioner: function () {
      return {
        x: this.chart.plotLeft,
        y: this.chart.plotTop,
      };
    },
    shared: true,
  },
  plotOptions: {
    column: {
      stacking: 'normal',
      pointPadding: 0.05,
      borderWidth: 0,
      inactiveOtherPoints: true,
    },
    line: {
      lineWidth: 4,
      pointWidth: 0,
      marker: {
        enabled: false,
      },
    },
    series: {
      marker: {
        enabled: false,
        states: {
          hover: {
            enabled: false,
          },
        },
      },
    },
  },
  legend: { enabled: false },
  series: [
    {
      name: 'Rendite Sparplan',
      data: [1, 2, 4, 7, 10],
      stack: 'Type A',
      xAxis: 1,
      color: '#D8D8D8',
      type: 'line',
      zIndex: 1,
    },
    {
      name: 'Rendite Sparkonto',
      data: [3, 9, 18, 27, 36],
      stack: 'Type B',
      xAxis: 1,
      color: '#B11029',
    },
    {
      name: 'Einzahlungen',
      data: [1, 9, 18, 27, 36],
      stack: 'Type B',
      xAxis: 1,
      color: '#107B8E',
    },
  ],
};
