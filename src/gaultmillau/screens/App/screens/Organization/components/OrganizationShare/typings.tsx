export type SharePanelProps = {
  commentCount: number;
  layout?: string;
  shareCount: number;
  shareTitle?: string;
  lead?: string;
  url?: string;
  type?: string;
  address?: string;
  phone?: string;
  heroImage: string;
};

export type ShareItemProps = {
  iconType: string;
  url: string;
  referrer?: string;
  platform?: string;
};
