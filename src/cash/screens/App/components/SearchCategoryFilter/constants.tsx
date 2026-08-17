import { Categories } from './typings';

export const categories: Categories[] = [
  {
    id: 'all',
    name: 'Alle',
    link: `/suche/alle/`,
    slugName: 'alle',
  },
  {
    id: 'equity',
    name: 'Aktien',
    link: `/suche/aktien/`,
    slugName: 'aktien',
  },
  {
    id: 'index',
    name: 'Indizes',
    link: `/suche/indizes/`,
    slugName: 'indizes',
  },
  {
    id: 'news',
    name: 'News',
    link: `/suche/news/`,
    slugName: 'news',
  },
  {
    id: 'fund',
    name: 'Fonds',
    link: `/suche/fonds/`,
    slugName: 'fonds',
  },
  {
    id: 'derivative',
    name: 'Derivate',
    link: `/suche/derivate/`,
    slugName: 'derivate',
  },
  {
    id: 'diverse',
    name: 'Diverse',
    link: `/suche/diverse/`,
    slugName: 'diverse',
  },
  {
    id: 'wikifolio',
    name: 'Wikifolio',
    link: `/suche/wikifolio/`,
    slugName: 'wikifolio',
  },
  {
    id: 'cryptoCurrency',
    name: 'Kryptowährungen',
    link: `/suche/kryptowaehrungen/`,
    slugName: 'cryptoCurrency',
  },
  {
    id: 'bond',
    name: 'Bonds',
    link: `/suche/bonds/`,
    slugName: 'bonds',
  },
  {
    id: 'newEmission',
    name: 'Neu Emissionen',
    link: `/suche/neuemissionen/`,
    slugName: 'neuemissionen',
  },
];
