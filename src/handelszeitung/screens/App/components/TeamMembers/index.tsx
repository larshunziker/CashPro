import React, { ReactElement } from 'react';
import TeaserGrid from '../TeaserGrid';
import { PERSON_PAGE_TYPE } from '../../screens/Person/constants';
import { GRID_LAYOUT_TEAM_MEMBERS } from '../TeaserGrid/gridConfigs/constants';
import styles from './styles.legacy.css';
import { TeamMembersProps } from './typings';

/* @ts-ignore TODO: TS7006 ->  Parameter 'nodes' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'title' implicitly has an 'any' type. */
const ensureTeaserInterface = (nodes, title) =>
  // ensure that all required fields are present
  nodes
    /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
    .map((item) => ({
      node: {
        ...item.node,
        createDate: item?.node?.person?.createDate || '',
        title: item?.node?.person?.title || '',
        shortTitle: item?.node?.organization?.title || '',
        teaserImage: item?.node?.person?.teaserImage || null,
        preferredUri: item?.node?.organization?.preferredUri || '',
        position: item?.node?.position || '',
      },
    }))
    /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
    .filter((item) => item?.node?.person?.title !== title); // Person Profile Site shouldn't refer to itself

const TeamMembers = ({
  persons,
  title,
  origin,
}: TeamMembersProps): ReactElement => {
  if (
    !persons ||
    !persons.edges ||
    ensureTeaserInterface(persons.edges, title).length === 0 ||
    (title &&
      persons.edges.length === 1 && // Person Profile Site shouldn't refer to itself and it should return, if the only person is itself
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
      persons.edges.filter((item) => item.node.person.title !== title))
  ) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  return (
    <div className={styles.Wrapper}>
      <h3 className={styles.Title}>
        {(origin === PERSON_PAGE_TYPE &&
          persons.edges?.[0]?.node?.organization?.title &&
          `FirmenkollegInnen bei ${persons.edges?.[0]?.node?.organization?.title}`) ||
          'MitarbeiterInnen'}
      </h3>
      <TeaserGrid
        layout={GRID_LAYOUT_TEAM_MEMBERS}
        items={ensureTeaserInterface(persons.edges, title)}
      />
    </div>
  );
};

export default TeamMembers;
