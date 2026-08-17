import { getChannelSponsorItems } from '../ministageChannelSponsorItems';

describe('[SHARED] helpers - sponsors', () => {
  test('Should return null if items are not assigned', () => {
    expect(getChannelSponsorItems('test')).toBeNull();
  });

  test('Should return valid items for Style landing page', () => {
    const items = getChannelSponsorItems('Style');

    expect(items.length).toEqual(1);
    expect(items[0].sponsors.length).toEqual(1);
    expect(items[0].sponsors[0].name).toEqual('Volvo');
  });

  test('Should return valid items for Body & Health landing page', () => {
    const items = getChannelSponsorItems('Body & Health');

    expect(items.length).toEqual(1);
    expect(items[0].sponsors.length).toEqual(1);
    expect(items[0].sponsors[0].name).toEqual('Toyota');
  });

  test('Should return valid items for Home landing page', () => {
    const items = getChannelSponsorItems('Home');

    expect(items.length).toEqual(2);
  });
});
