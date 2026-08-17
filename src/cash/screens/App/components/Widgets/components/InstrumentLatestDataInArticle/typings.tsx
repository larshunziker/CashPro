export type QueryResultArticle = {
  environment: {
    routeByPath: {
      object: {
        valors: ValorConnection;
      };
    };
  };
};

export type QueryResultFullquote = {
  getFullquotePage: Pick<
    FullquotePage,
    'mName' | 'listingId' | 'tradeType' | 'hrefBuy'
  >;
};
