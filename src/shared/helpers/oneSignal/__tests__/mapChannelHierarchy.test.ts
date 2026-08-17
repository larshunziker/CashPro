import { resolveChannelHierarchyForOneSignal } from '../mapChannelHierarchy';

describe('resolveChannelHierarchyForOneSignal', () => {
  it('returns the trimmed hierarchy when titles are present', () => {
    expect(
      resolveChannelHierarchyForOneSignal({
        channelHierarchy: ['Börse', '  Aktien  '],
      }),
    ).toEqual(['Börse', 'Aktien']);
  });

  it('drops empty / whitespace-only titles', () => {
    expect(
      resolveChannelHierarchyForOneSignal({
        channelHierarchy: ['Ratgeber', '', '   ', 'Sparen'],
      }),
    ).toEqual(['Ratgeber', 'Sparen']);
  });

  it('returns null when the hierarchy is missing or empty', () => {
    expect(
      resolveChannelHierarchyForOneSignal({ channelHierarchy: [] }),
    ).toBeNull();
    expect(
      resolveChannelHierarchyForOneSignal({ channelHierarchy: null }),
    ).toBeNull();
    expect(resolveChannelHierarchyForOneSignal({})).toBeNull();
  });
});
