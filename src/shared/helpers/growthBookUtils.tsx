export const growthBookUtils = {
  _navigateImpl: (url: string) => {
    window.location.replace(url);
  },
  navigateHandler(url: string) {
    growthBookUtils._navigateImpl(url);
  },
  setNavigateHandler(handler: (url: string) => void) {
    growthBookUtils._navigateImpl = handler;
  },
};
