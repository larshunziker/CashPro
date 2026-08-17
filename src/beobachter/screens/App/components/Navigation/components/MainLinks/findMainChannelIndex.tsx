function findLinkInFirstLevelSubtree(
  path: string,
  menuTreeItem?: Maybe<MenuTreeItem>,
) {
  if (!menuTreeItem) {
    return false;
  }
  if (menuTreeItem.link?.path === path) {
    return true;
  }
  const edges = menuTreeItem.subtree?.edges;
  return edges?.some((edge) => edge?.node?.link?.path === path);
}
export function findMainChannelIndex(menu: Menu, routePathname: string) {
  if (menu?.links?.edges) {
    return menu.links.edges.findIndex((edge) =>
      findLinkInFirstLevelSubtree(routePathname, edge?.node),
    );
  }
  return -1;
}
