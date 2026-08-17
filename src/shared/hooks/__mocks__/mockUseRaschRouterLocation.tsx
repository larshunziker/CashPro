const mockUseRaschRouterLocation = (): RaschRouterLocation => {
  return {
    ...location,
    href: `${location.pathname}${location.search}${location.hash}`,
    query: {},
    action: 'POP',
    params: {},
  };
};

export default mockUseRaschRouterLocation;
