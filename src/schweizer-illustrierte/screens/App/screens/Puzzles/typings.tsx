export type PuzzleOverviewProps = Partial<RouterProps> & {
  subscriptions?: string[];
};

export type Puzzle = {
  name: string;
  title: string;
  description: string;
  icon?: string;
  badge?: string;
  restricted?: boolean;
};

export type PuzzlesListProps = {
  puzzle: string;
  location: Location;
  page: number;
};

export type PuzzlesListItem = Puzzle & {
  instruction?: string;
  levels?: string[];
  freeGame?: string;
  icons: string[];
  isAccessNeeded?: boolean;
};

export type PuzzlesDetailProps = Partial<RouterProps>;

export type Day = {
  date: string;
  dateFormatted: string;
};

export type PuzzleItemProps = {
  index: number;
  level?: string;
  puzzle: PuzzlesListItem;
  day: Day;
};
