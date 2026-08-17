/**
 *
 */

export const ensureVideoItem = (item) => {
  if (!item.video) {
    return {
      ...item,
      video: {
        id: item.id,
        brightcoveId: item.brightcoveId,
        caption: item?.image?.caption || item.caption,
        credit: item?.image?.credit || item.credit,
        image: item.image,
        title: item.title,
        ...item,
      },
    };
  }

  return item;
};
