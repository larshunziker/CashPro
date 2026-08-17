export type AppNexusProviderFactoryOptions = {
  mapViewportToAdViewport: (
    viewportOrViewportLabel: Viewport | ViewportLabel,
  ) => 'Desktop' | 'MobileWeb';
};
