export const isFrenchRoute = (pathname: string): boolean =>
  pathname.startsWith('/fr/') ||
  pathname === '/fr' ||
  pathname.startsWith('/fr?');
