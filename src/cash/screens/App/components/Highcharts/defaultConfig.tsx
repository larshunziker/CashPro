export const stockChartOptions = {
  lang: {
    decimalPoint: ',',
    loading: 'Daten werden geladen...',
    months: [
      'Januar',
      'Februar',
      'März',
      'April',
      'Mai',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'November',
      'Dezember',
    ],
    shortMonths: [
      'Jan',
      'Feb',
      'Mär',
      'Apr',
      'Mai',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Okt',
      'Nov',
      'Dez',
    ],
    rangeSelectorFrom: 'von',
    rangeSelectorTo: 'bis',
    thousandsSep: "'",
    weekdays: [
      'Sonntag',
      'Montag',
      'Dienstag',
      'Mittwoch',
      'Donnerstag',
      'Freitag',
      'Samstag',
    ],
    exportButtonTitle: 'Exportieren',
    printButtonTitle: 'Drucken',
    rangeSelectorZoom: 'Zeitraum',
    downloadPNG: 'Download als PNG-Bild',
    downloadJPEG: 'Download als JPEG-Bild',
    downloadPDF: 'Download als PDF-Dokument',
    downloadSVG: 'Download als SVG-Bild',
    resetZoom: 'Zoom zurücksetzen',
    resetZoomTitle: 'Zoom zurücksetzen',
    exitFullscreen: 'Leave full screen',
    stockTools: {
      gui: {
        advanced: 'Advanced',
        arrowLine: 'Arrow line',
        arrowRay: 'Arrow ray',
        arrowSegment: 'Arrow segment',
        circle: 'Circle',
        crooked3: 'Crooked 3 line',
        crooked5: 'Crooked 5 line',
        crookedLines: 'Crooked lines',
        currentPriceIndicator: 'Current Price Indicators',
        elliott3: 'Elliott 3 line',
        elliott5: 'Elliott 5 line',
        fibonacci: 'Fibonacci',
        flagCirclepin: 'Flag circle',
        flagDiamondpin: 'Flag diamond',
        flags: 'Flags',
        flagSimplepin: 'Flag simple',
        flagSquarepin: 'Flag square',
        fullScreen: 'View in full screen',
        horizontalLine: 'Horizontal line',
        indicators: 'Indicators',
        infinityLine: 'Infinity line',
        label: 'Label',
        line: 'Line',
        lines: 'Lines',
        measure: 'Measure',
        measureX: 'Measure X',
        measureXY: 'Measure XY',
        measureY: 'Measure Y',
        parallelChannel: 'Parallel channel',
        pitchfork: 'Pitchfork',
        ray: 'Ray',
        rectangle: 'Rectangle',
        saveChart: 'Save chart',
        segment: 'Segment',
        simpleShapes: 'Simple shapes',
        toggleAnnotations: 'Toggle annotations',
        typeCandlestick: 'Candlestick',
        typeChange: 'Type change',
        typeLine: 'Line',
        typeOHLC: 'OHLC',
        verticalArrow: 'Vertical arrow',
        verticalCounter: 'Vertical counter',
        verticalLabel: 'Vertical label',
        verticalLabels: 'Vertical labels',
        verticalLine: 'Vertical line',
        zoomChange: 'Zoom change',
        zoomX: 'Zoom X',
        zoomXY: 'Zooom XY',
        zoomY: 'Zoom Y',
      },
    },
  },
  time: {
    timezone: 'Europe/Zurich',
    timezoneOffset: new Date().getTimezoneOffset(), // Timezone offset in minutes (will update correctly with daylight saving time)
  },
  colors: [
    '#17a6be',
    '#e31b23',
    '#90ed7d',
    '#f7a35c',
    '#8085e9',
    '#f15c80',
    '#e4d354',
    '#2b908f',
    '#f45b5b',
    '#91e8e1',
  ],
  credits: {
    enabled: false,
  },
  dateTimeLabelFormats: {
    second: ['%A, %e. %b, %H:%M:%S', '%A, %e. %b, %H:%M:%S', '-%H:%M:%S'],
    minute: ['%A, %e. %b, %H:%M', '%A, %e. %b, %H:%M', '-%H:%M'],
    hour: ['%A, %e. %b, %H:%M', '%A, %e. %b, %H:%M', '-%H:%M'],
    day: ['%A, %e. %b %Y', '%A, %e. %b', '-%A, %e. %b %Y'],
    week: ['Woche vom %A, %e. %b %Y', '%A, %e. %b', '-%A, %e. %b %Y'],
  },
  /* @ts-ignore TODO: TS7006 ->  Parameter 'type' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'number' implicitly has an 'any' type. */
  digits: function (type, number) {
    switch (type) {
      case 'CUR':
        return 4;
      default:
        if (number < 20 && number >= 1) {
          return 3;
        } else if (number < 1) {
          return 4;
        } else {
          return 2;
        }
    }
  },
  /* @ts-ignore TODO: TS7006 ->  Parameter 'type' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'number' implicitly has an 'any' type. */
  axisDigits: function (type, number) {
    switch (type) {
      case 'CUR':
        return 4;
      default:
        if (number >= 100) {
          return 0;
        } else if (number < 1) {
          return 4;
        } else {
          return 2;
        }
    }
  },
  plotMinMax: function () {
    this.yAxis[0].removePlotLine('plotlinemax');
    this.yAxis[0].removePlotLine('plotlinemin');
    this.yAxis[0].addPlotLine({
      value: this.yAxis[0].getExtremes().dataMax,
      color: 'green',
      dashStyle: 'shortdash',
      width: 2,
      zIndex: 1,
      id: 'plotlinemax',
      label: {
        align: 'center',
        textAlign: 'center',
        text: 'Maximum ' + '',
        // Highcharts.numberFormat(
        //   this.yAxis[0].getExtremes().dataMax,
        //   Highcharts.getOptions().digits(
        //     settings.cash_highstock.type,
        //     this.yAxis[0].getExtremes().dataMax,
        //   ),
        //   '.',
        //   "'",
        // ),
        style: { color: 'green' },
      },
    });
    this.yAxis[0].addPlotLine({
      value: this.yAxis[0].getExtremes().dataMin,
      color: 'red',
      dashStyle: 'shortdash',
      width: 2,
      zIndex: 1,
      id: 'plotlinemin',
      label: {
        align: 'center',
        textAlign: 'center',
        text: 'Minimum ' + '',
        // Highcharts.numberFormat(
        //   this.yAxis[0].getExtremes().dataMin,
        //   Highcharts.getOptions().digits(
        //     settings.cash_highstock.type,
        //     this.yAxis[0].getExtremes().dataMin,
        //   ),
        //   '.',
        //   "'",
        // ),
        style: { color: 'red' },
        y: 14,
      },
    });
  },
};
