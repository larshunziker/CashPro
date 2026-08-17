export const ensureBookmarkListInterface = (bookmarkList: Array<Bookmark>) => {
  const ensureBookmarkList: Array<Record<string, any>> =
    (Array.isArray(bookmarkList) &&
      bookmarkList.map(
        (item) =>
          (item && {
            id: item?.id,
            ...item.node,
            createDate: item.node?.createDate || '',
            title: item.node?.title || '',
            shortTitle: item.node?.shortTitle || '',
            teaserImage: item.node?.teaserImage || null,
            preferredUri: item?.node?.preferredUri || '',
            node: {
              ...item.node,
              id: item?.id,
              createDate: item.node?.createDate || '',
              title: item.node?.title || '',
              shortTitle: item.node?.shortTitle || '',
              teaserImage: item.node?.teaserImage || null,
              preferredUri: item?.node?.preferredUri || '',
            },
          }) ||
          [],
      )) ||
    [];

  return ensureBookmarkList;
};
