/**
 * Returns the (trimmed, non-empty) CMS channel hierarchy in deepest-last
 * order, or `null` if the page has no usable hierarchy. Pure helper kept
 * separate from the React provider so it is easy to unit test.
 *
 * The provider feeds this from Piano's `pageMetadata.channelsHierarchy`,
 * which is itself derived from the CMS in `usePianoTrackingData`.
 */
export const resolveChannelHierarchyForOneSignal = (options: {
  channelHierarchy?: string[] | null;
}): string[] | null => {
  const titles = (options.channelHierarchy ?? [])
    .map((title) => title?.trim() ?? '')
    .filter(Boolean);
  return titles.length > 0 ? titles : null;
};
