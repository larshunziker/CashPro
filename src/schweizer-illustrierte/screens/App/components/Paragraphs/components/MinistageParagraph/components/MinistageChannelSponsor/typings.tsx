import { ChannelSponsor } from '../../../../../../../../shared/helpers/sponsors';

export type MinistageChannelSponsorItem = {
  title: string;
  subtitle: string;
  sponsors: Array<ChannelSponsor>;
};

export type MinistageChannelSponsorProps = {
  asSlider?: boolean;
  items: Array<MinistageChannelSponsorItem>;
};

export type ChannelSponsorProps = {
  item: MinistageChannelSponsorItem;
  index: number;
  standalone: boolean;
  slideIndex: number;
};
