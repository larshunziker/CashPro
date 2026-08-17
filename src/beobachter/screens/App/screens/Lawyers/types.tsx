export enum ColumnNames {
  additionalQualifications = 'Zusatzqualifikationen',
  cantons = 'Kantone',
  languages = 'Sprachen',
  salutation = 'Ansprache',
  areasOfActivity = 'Tätigkeitsbereiche',
  website = 'Website',
  vorname = 'Vorname',
  nachname = 'Nachname',
  ort = 'Ort',
  plz = 'PLZ',
  strasse = 'Strasse',
  firmaKanzlei = 'Firma/Kanzlei',
}

export type Lawyer = {
  [key in ColumnNames]: string;
};
