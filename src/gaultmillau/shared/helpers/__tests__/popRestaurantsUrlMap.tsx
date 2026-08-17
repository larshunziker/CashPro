import { mapUrlToPopCityEnum } from '../popRestaurantsUrlMap';

describe('[HELPER] popRestaurantUrlMap', () => {
  test.each`
    city
    ${''}
    ${'basel'}
    ${'bern'}
    ${'fribourg'}
    ${'genf'}
    ${'gstaad'}
    ${'lausanne'}
    ${'luzern'}
    ${'neuenburg'}
    ${'stgallen'}
    ${'stmoritz'}
    ${'uebrigeschweiz'}
    ${'zermatt'}
    ${'zurich'}
    ${'nott_existing_city'}
  `('Should render city $city for language de', ({ city }) => {
    const popCityEnum = mapUrlToPopCityEnum(city);
    expect(popCityEnum).toMatchSnapshot();
  });

  test.each`
    city
    ${''}
    ${'ailleurs'}
    ${'bale'}
    ${'berne'}
    ${'fribourg'}
    ${'geneve'}
    ${'gstaad'}
    ${'lausanne'}
    ${'lucerne'}
    ${'neuchatel'}
    ${'stmoritz'}
    ${'zermatt'}
    ${'zurich'}
    ${'nott_existing_city'}
  `('Should render city $city for language fr', ({ city }) => {
    const popCityEnum = mapUrlToPopCityEnum(city, 'fr');
    expect(popCityEnum).toMatchSnapshot();
  });
});
