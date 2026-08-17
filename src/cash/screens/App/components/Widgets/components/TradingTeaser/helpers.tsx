export const calculateDepotPrice = (totalValue: number) => {
  if (totalValue <= 100_000) {
    return '25';
  }
  if (totalValue <= 500_000) {
    return '50';
  }
  if (totalValue <= 1_000_000) {
    return '100';
  }
  if (totalValue <= 5_000_000) {
    return '200';
  }
  return 'auf Anfrage';
};

export const getTeaserTextByDepotPrice = (depotPrice: string) => {
  return depotPrice === 'auf Anfrage'
    ? 'Depotgebühren bei cash - bank zweiplus: auf Anfrage.'
    : `Ihr Depot würde bei cash - bank zweiplus nur CHF ${depotPrice} pro Quartal kosten.`;
};

export const getTooltipTextByDepotPrice = (depotPrice: string) => {
  return depotPrice === 'auf Anfrage'
    ? 'Depotgebühren bei cash - bank zweiplus: auf Anfrage.'
    : `Bei cash - bank zweiplus würde Ihr <br />Depot nur CHF ${depotPrice} pro Quartal kosten.`;
};
