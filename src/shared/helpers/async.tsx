export const errorLoading = (error: string | any): void =>
  console.error('Async loading failed.', error); // eslint-disable-line no-console
export const loadModule = (module: any): void => module.default;
