import { getSponsor } from '../helpers/sponsors';
import {
  MAIN_CHANNEL_BODY_HEALTH,
  MAIN_CHANNEL_HOME,
  MAIN_CHANNEL_STYLE,
} from '../../screens/App/constants';
import type { MinistageChannelSponsorItem } from '../../screens/App/components/Paragraphs/components/MinistageParagraph/components/MinistageChannelSponsor/typings';

export const getChannelSponsorItems = (
  activeMainChannel: string,
): Array<MinistageChannelSponsorItem> => {
  switch (activeMainChannel) {
    case MAIN_CHANNEL_HOME:
      const sponsors: Array<MinistageChannelSponsorItem> = [
        {
          title: 'Starker Partner für Style',
          subtitle: 'Wir sind stolz auf die Zusammenarbeit mit Volvo Cars.',
          /* @ts-ignore TODO: TS2322 ->  Type '{ logoUrl */
          sponsors: [getSponsor('Volvo')],
        },
        {
          title: 'Starker Partner für Body&Health',
          subtitle: 'Wir sind stolz auf die Zusammenarbeit mit Toyota Schweiz.',
          /* @ts-ignore TODO: TS2322 ->  Type '{ logoUrl */
          sponsors: [getSponsor('Toyota')],
        },
      ];
      return sponsors;

    case MAIN_CHANNEL_STYLE:
      return [
        {
          title: 'Starker Partner',
          subtitle: 'Wir sind stolz auf die Zusammenarbeit mit Volvo Cars.',
          /* @ts-ignore TODO: TS2322 ->  Type '{ logoUrl */
          sponsors: [getSponsor('Volvo')],
        },
      ];

    case MAIN_CHANNEL_BODY_HEALTH:
      return [
        {
          title: 'Starker Partner',
          subtitle: 'Wir sind stolz auf die Zusammenarbeit mit Toyota Schweiz.',
          /* @ts-ignore TODO: TS2322 ->  Type '{ logoUrl */
          sponsors: [getSponsor('Toyota')],
        },
      ];
  }

  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'MinistageChannelSponsorItem[]'. */
  return null;
};
