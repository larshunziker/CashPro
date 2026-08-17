let currentSubCatValue: string | null = null;
let currentChannelVisitTagKeys: string[] = [];

export const setOneSignalPageContext = (options: {
  subCatValue: string | null;
  channelVisitTagKeys: string[];
}): void => {
  currentSubCatValue = options.subCatValue;
  currentChannelVisitTagKeys = options.channelVisitTagKeys;
};

export const getOneSignalPageContext = (): {
  subCatValue: string | null;
  channelVisitTagKeys: string[];
} => ({
  subCatValue: currentSubCatValue,
  channelVisitTagKeys: currentChannelVisitTagKeys,
});
