type ConfigMap =
  | {
      subsection?: ConfigMapItem | string;
      keywordCat?: ConfigMapItem | string;
      keywords?: ConfigMapItem | string;
      articleType?: ConfigMapItem | string;
      articleId?: ConfigMapItem | string;
      publication?: ConfigMapItem | string;
      usersi?: string;
      olid?: Pick<NodeJS.Global, 'olid'>;
      articlePremium?: string;
      pos?: ConfigMapItem | string;
    }
  | {
      authors?: ConfigMapItem | string;
      restrictionStatus?: ConfigMapItem | string;
    };

type ConfigMapItem = {
  type: string;
  value: string | Array<string>;
};

declare type AppNexusEvents = {
  adLoaded?: Function;
  adStatus?: Function;
  adEmpty?: Function;
  adReady?: Function;
  adError?: Function;
};

declare type AppNexusSlot = {
  slot: string;
  container: string;
  events?: AppNexusEvents;
  targeting?: ConfigMap;
  deviceType?: 'mobile' | 'tabletDesktop';
};

declare type AdPlacementConfigType = {
  mobileWeb: AdPlacementViewportType;
  desktop: AdPlacementViewportType;
};
