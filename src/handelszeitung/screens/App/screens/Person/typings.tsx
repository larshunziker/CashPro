import { PERSON_DETAIL, PERSON_DETAIL_LEGACY } from './constants';

export type PersonProps = Pick<RouterProps, 'location'> & {
  person: Person & { text?: Person['body'] };
  page: number;
  component: typeof PERSON_DETAIL_LEGACY | typeof PERSON_DETAIL;
};
