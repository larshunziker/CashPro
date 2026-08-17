/* checking of iOS device from ua-parser
https://github.com/faisalman/ua-parser-js/blob/732cf5834e6a8605c75f48db492a14426345d475/src/ua-parser.js#L905
*/
export const isIOS = (): boolean =>
  __CLIENT__ &&
  [
    /cfnetwork\/.+darwin/i,
    /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i,
  ].some((item) => item.test(global.navigator.userAgent));

export const safariVersion = (): RegExpMatchArray =>
  __CLIENT__
    ? /* @ts-ignore TODO: TS2322 ->  Type 'RegExpMatchArray | null' is not assignable to type 'RegExpMatchArray'. */
      global.navigator.userAgent.match(/version\/([0-9\._]+).*safari/i)
    : ([] as unknown as RegExpMatchArray);
