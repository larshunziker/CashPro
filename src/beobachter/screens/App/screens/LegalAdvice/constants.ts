import { ROUTE_LEGAL_ADVICE, ROUTE_LEGAL_ADVICE_PARENT } from '../../constants';
import { BreadcrumbsItems } from '../../../../../common/components/Breadcrumbs/typings';

export const breadcrumbItems: BreadcrumbsItems = {
  edges: [
    {
      node: {
        link: ROUTE_LEGAL_ADVICE_PARENT,
        label: 'Beratung',
        id: '0',
      },
    },
    {
      node: {
        link: ROUTE_LEGAL_ADVICE,
        label: 'Rechtsratgeber',
        id: '1',
      },
    },
  ],
};

export const kmuCategories = [
  {
    title: 'Abeitsrecht',
    id: '1',
    path: `${ROUTE_LEGAL_ADVICE}/arbeit/arbeitsrecht`,
  },
  {
    title: 'Geschäftsmiete',
    id: '2',
    path: `${ROUTE_LEGAL_ADVICE}/wohnen/geschaeftsmiete`,
    isKMU: true,
  },
  {
    title: 'Gesellschaftsrecht',
    id: '3',
    path: `${ROUTE_LEGAL_ADVICE}/staat/gesellschaftsrecht`,
    isKMU: true,
  },
  {
    title: 'Familienbetriebe',
    id: '4',
    path: `${ROUTE_LEGAL_ADVICE}/familie/familienbetriebe`,
    isKMU: true,
  },
  {
    title: 'Finanzen',
    id: '5',
    path: `${ROUTE_LEGAL_ADVICE}/konsum/schulden-betreibung-und-konkurs`,
    isKMU: true,
  },
  {
    title: 'Vertragsrecht',
    id: '6',
    path: `${ROUTE_LEGAL_ADVICE}/konsum/dienstleistungen`,
    isKMU: true,
  },
  {
    title: 'Datenschutz',
    id: '7',
    path: `${ROUTE_LEGAL_ADVICE}/staat/buerger-und-behoerden/daten-und-persoenlichkeitsschutz`,
  },
];
