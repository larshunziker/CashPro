declare type HoroscopeHeader = {
  title: string;
  shortTitle: string;
  subTitle: string;
};

declare type DailyHoroscopeDecade = {
  title: string;
  shortTitle: string;
  text: string;
};

declare type DailyHoroscopeJSON = {
  header: {
    title: string;
    shortTitle: string;
    subTitle: string;
  };
  body: Array<DailyHoroscopeDecade>;
};
