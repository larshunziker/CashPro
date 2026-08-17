import { latestNACounter } from '../useLatestNativeAdvertisings';
import mockData0 from './mockData/useLatestNativeAdvertising_0.json';
import mockData1 from './mockData/useLatestNativeAdvertising_1.json';
import mockData5 from './mockData/useLatestNativeAdvertising_5.json';

const mockPage1 = JSON.parse(JSON.stringify(mockData1));
const mockPage5 = JSON.parse(JSON.stringify(mockData5));
const mockPage0 = JSON.parse(JSON.stringify(mockData0));

describe('[Function] latestNACounter ', () => {
  it('[1] Should return 1 if one paragraph is to useNativeAdvertising', () => {
    const count = latestNACounter(mockPage1);
    expect(count).toBe(1);
  });
  it('[2] Should return 5 if five paragraphs are to useNativeAdvertising', () => {
    const count = latestNACounter(mockPage5);
    expect(count).toBe(5);
  });
  it('[3] Should return 0 if the items array is empty', () => {
    const count = latestNACounter(mockPage0);
    expect(count).not.toBeNull;
    expect(count).toBe(0);
  });
});
