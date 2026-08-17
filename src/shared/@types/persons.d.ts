declare type PersonPositionsGraphList = {
  edges?: Array<PersonPositionsGraphListItem>;
};

declare type PersonPositionsGraphListItem = {
  node?: Position;
};

declare type PersonGraphList = {
  count?: number;
  edges?: Array<PersonGraphListItem>;
};

declare type PersonGraphListItem = {
  node?: Person;
};
