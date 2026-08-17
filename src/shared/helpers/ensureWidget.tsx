export const ensureWidgetItem = (item: WidgetParagraph) => {
  if (item.widget) {
    return {
      ...item,
      id: item.widget.id,
      title: item.widget.title,
      link: {
        /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
        path: item.widget.url.path,
      },
      widget: item.widget,
    };
  }

  return item;
};
