export const cantoneList = [
  'AG',
  'AI',
  'AR',
  'BE',
  'BL',
  'BS',
  'FR',
  'GE',
  'GL',
  'GR',
  'JU',
  'LU',
  'NE',
  'NW',
  'OW',
  'SG',
  'SH',
  'SO',
  'SZ',
  'TG',
  'TI',
  'UR',
  'VD',
  'VS',
  'ZG',
  'ZH',
];

export const salutationList = ['Frau', 'Herr'];

export const languageList = [
  'Deutsch',
  'Englisch',
  'Französisch',
  'Italienisch',
  'Spanisch',
  'Gujarati',
  'Kroatisch/Serbisch/Bosnisch',
  'Ungarisch',
  'Norwegisch',
];

export const additionalQualifications = ['Mediation', 'notarielle Tätigkeit'];

export const lawAreas: Record<string, { areas: string[]; isOpen?: boolean }> = {
  'Bau- und Planungsrecht': {
    areas: ['Bau- und Planungsrecht', 'Enteignungsrecht'],
    isOpen: true,
  },
  'Haftpflicht- und Versicherungsrecht': {
    areas: [
      'Haftpflichtrecht - Sachschaden',
      'Privatversicherungsrecht',
      'Krankentaggeldversicherung',
    ],
  },
  Handelsrecht: { areas: ['Bankenrecht', 'Gesellschafts- und Firmenrecht'] },
  Immaterialgüterrecht: {
    areas: [
      'Kartell- und Wettbewerbsrecht',
      'Medienrecht',
      'Marken-, Patent-, Urheberrecht',
    ],
  },
  'Schuldbetreibungs- und Konkursrecht': {
    areas: ['Schuldbetreibungs- und Konkursrecht'],
  },
  Sozialversicherungsrecht: {
    areas: [
      'AHV',
      'Invalidenversicherungsrecht',
      'Krankenkasse',
      'Ergänzungsleistungen',
      'Haftpflicht-, Unfall- und Sozialversicherungsrecht',
      'Patientenrecht - Personenschaden/Arzthaftung',
      'Pensionskasse',
      'Arbeitslosenversicherungsrecht',
    ],
  },
  'Steuern- und Abgaberecht': {
    areas: ['Steuern natürliche Personen', 'Unternehmenssteuerrecht'],
  },
  Strafrecht: {
    areas: [
      'Allgemeines Strafrecht',
      'Jugendstrafrecht',
      'Militärstrafrecht',
      'Opferhilferecht',
      'Strassenverkehrsrecht',
      'Steuerstrafrecht',
    ],
  },
  Vertragsrecht: {
    areas: [
      'Arbeitsrecht',
      'Kaufvertragsrecht',
      'Reiserecht',
      'Werkvertragsrecht',
      'Auftragsrecht',
      'Mietrecht',
      'Geschäftsraummiete',
      'Landwirtschaftliche Pacht',
    ],
  },
  Verwaltungsrecht: {
    areas: [
      'Migrationsrecht',
      'Datenschutzrecht',
      'Energierecht',
      'Umwelt/Mobilfunk',
      'Verwaltungsrecht allgemein',
      'Öffentliches Personalrecht',
      'Bildungsrecht / Schule',
      'Sozialhilferecht',
    ],
  },
  Zivilrecht: {
    areas: [
      'Eherecht/Trennung/Scheidung',
      'Konkubinatsrecht',
      'Kindesrecht',
      'Erbrecht',
      'Bäuerliches Boden- und Erbrecht',
      'Erwachsenenschutzrecht',
      'Vereinsrecht',
      'Stockwerkeigentum',
      'Nachbarrecht',
      'Dingliche Rechte',
      'Tiere',
    ],
  },
};
