import locationStateSelector from '../../../shared/selectors/locationStateSelector';
import windowStateSelector from '../../../shared/selectors/windowStateSelector';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../shared/decorators/withAppNexusFactory'. '/Users/bhs/code/work/ra */
import withAppNexusFactory from '../../../shared/decorators/withAppNexusFactory';
import {
  mapPathSegmentFullPath,
  mapPathSegmentToVertical,
} from '../reducers/route';
import {
  BOOKS,
  DEFAULT,
  HOME,
  HOME_FR,
  HOTEL_TIPP,
  HOT_TEN,
  LIFE_STYLE,
  LIFE_STYLE_FR,
  NEWS_FR,
  POP,
  RECIPE,
  RESTAURANTS,
  STARCHEFS,
  STARCHEFS_FR,
  VIDEOS,
  WINE_DRINKS,
  ZUERI_ISST,
} from '../actions/route';

const mapVerticalToAdCategory = () => ({
  [RESTAURANTS]: 'Restaurants',
  [RECIPE]: 'Rezepte',
  [LIFE_STYLE]: 'LifeStyle',
  [LIFE_STYLE_FR]: 'LifeStyleFr',
  [HOTEL_TIPP]: 'HotelDerWoche',
  [STARCHEFS]: 'Starchefs',
  [STARCHEFS_FR]: 'LesChefs',
  [VIDEOS]: 'Videos',
  [WINE_DRINKS]: 'WineDrinks',
  [HOT_TEN]: 'HotTen',
  [HOME]: 'Home',
  [HOME_FR]: 'Home',
  [NEWS_FR]: 'LesNews',
  [BOOKS]: 'Buecher',
  [ZUERI_ISST]: 'ZuerichIsst',
  [POP]: 'Pop',
});

export default withAppNexusFactory({
  locationStateSelector,
  windowStateSelector,
  mapPathSegmentToVertical,
  mapPathSegmentToOnmeda: mapPathSegmentFullPath,
  mapVerticalToAdCategory,
  defaultVertical: DEFAULT,
});
