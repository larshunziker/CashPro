import AustraliaFlag from './assets/australia.png';
import CanadaFlag from './assets/canada.png';
import DenmarkFlag from './assets/denmark.png';
import EuropeFlag from './assets/europe.png';
import GreatBritainFlag from './assets/greatbritain.png';
import HongkongFlag from './assets/hongkong.png';
import JapanFlag from './assets/japan.png';
import NorwegenFlag from './assets/norwegen.png';
import SingapurFlag from './assets/singapur.png';
import SwedenFlag from './assets/sweden.png';
import SwitzerlandFlag from './assets/switzerland.png';
import TurkeyFlag from './assets/turkey.png';
import UsaFlag from './assets/usa.png';
import styles from './styles.legacy.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const markStyleAsUsed = [
  styles.Wrapper,
  styles.ContentWrapper,
  styles.Title,
  styles.FormWrapper,
  styles.InputRow,
  styles.ColumnLayout,
  styles.FullWidth,
  styles.ChartWrapper,
  styles.SwitchIconWrapper,
  styles.InputFieldWrapper,
  styles.SelectFieldWrapper,
  styles.SkeletonWrapper,
  styles.Hidden,
  styles.SmallLayout,
];

export const listingKeysMapping = {
  // AUD
  '275722-149-184': 'AUD/CAD',
  '499048-149-1': 'AUD/CHF',
  '968876-149-814': 'AUD/EUR',
  '275307-149-272': 'AUD/DKK',
  '275682-149-402': 'AUD/GBP',
  '340944-149-470': 'AUD/HKD',
  '1117561-149-662': 'AUD/NOK',
  '1117632-149-864': 'AUD/SEK',
  '341762-149-846': 'AUD/SGD',
  '1992428-149-921': 'AUD/TRY',
  '275125-149-333': 'AUD/USD',

  // CAD
  '275719-149-88': 'CAD/AUD',
  '275003-149-1': 'CAD/CHF',
  '968879-149-814': 'CAD/EUR',
  '275306-149-272': 'CAD/DKK',
  '275680-149-402': 'CAD/GBP',
  '1117451-149-470': 'CAD/HKD',
  '275681-149-534': 'CAD/JPY',
  '1117446-149-662': 'CAD/NOK',
  '1117448-149-864': 'CAD/SEK',
  '1117457-149-846': 'CAD/SGD',
  '1992384-149-921': 'CAD/TRY',
  '275114-149-333': 'CAD/USD',

  // CHF
  '275276-149-88': 'CHF/AUD',
  '275270-149-184': 'CHF/CAD',
  '968880-149-814': 'CHF/EUR',
  '275757-149-272': 'CHF/DKK',
  '274248-149-402': 'CHF/GBP',
  '611306-149-470': 'CHF/HKD',
  '275327-149-534': 'CHF/JPY',
  '157937-149-662': 'CHF/NOK',
  '158124-149-864': 'CHF/SEK',
  '611786-149-846': 'CHF/SGD',
  '1992411-149-921': 'CHF/TRY',
  '275164-149-333': 'CHF/USD',

  // DKK
  '275740-149-88': 'DKK/AUD',
  '275739-149-184': 'DKK/CAD',
  '275015-149-1': 'DKK/CHF',
  '968882-149-814': 'DKK/EUR',
  '275698-149-402': 'DKK/GBP',
  '614554-149-470': 'DKK/HKD',
  '275699-149-534': 'DKK/JPY',
  '1117502-149-662': 'DKK/NOK',
  '1117510-149-864': 'DKK/SEK',
  '614556-149-846': 'DKK/SGD',
  '1992390-149-921': 'DKK/TRY',
  '275697-149-333': 'DKK/USD',

  // EUR
  '946687-149-88': 'EUR/AUD',
  '946690-149-184': 'EUR/CAD',
  '897789-149-1': 'EUR/CHF',
  '946836-149-272': 'EUR/DKK',
  '946684-149-402': 'EUR/GBP',
  '946843-149-470': 'EUR/HKD',
  '946686-149-534': 'EUR/JPY',
  '946867-149-662': 'EUR/NOK',
  '946692-149-864': 'EUR/SEK',
  '946870-149-846': 'EUR/SGD',
  '1991307-149-921': 'EUR/TRY',
  '946681-149-333': 'EUR/USD',

  // GBP
  '275200-149-88': 'GBP/AUD',
  '275196-149-184': 'GBP/CAD',
  '275001-149-1': 'GBP/CHF',
  '275191-149-272': 'GBP/DKK',
  '947552-149-814': 'GBP/EUR',
  '275198-149-470': 'GBP/HKD',
  '275195-149-534': 'GBP/JPY',
  '275192-149-662': 'GBP/NOK',
  '275193-149-864': 'GBP/SEK',
  '275199-149-846': 'GBP/SGD',
  '1991436-149-921': 'GBP/TRY',
  '275017-149-333': 'GBP/USD',

  // HKD
  '341786-149-88': 'HKD/AUD',
  '614662-149-184': 'HKD/CAD',
  '506042-149-1': 'HKD/CHF',
  '1117696-149-272': 'HKD/DKK',
  '968893-149-814': 'HKD/EUR',
  '1117694-149-402': 'HKD/GBP',
  '329050-149-534': 'HKD/JPY',
  '1117699-149-662': 'HKD/NOK',
  '1117701-149-864': 'HKD/SEK',
  '341755-149-846': 'HKD/SGD',
  '1992402-149-921': 'HKD/TRY',
  '610491-149-333': 'HKD/USD',

  // JPY
  '275275-149-88': 'JPY/AUD',
  '275268-149-184': 'JPY/CAD',
  '275018-149-1': 'JPY/CHF',
  '275749-149-272': 'JPY/DKK',
  '968902-149-814': 'JPY/EUR',
  '275322-149-402': 'JPY/GBP',
  '340808-149-470': 'JPY/HKD',
  '209686-149-662': 'JPY/NOK',
  '209586-149-864': 'JPY/SEK',
  '341737-149-846': 'JPY/SGD',
  '1992422-149-921': 'JPY/TRY',
  '275032-149-333': 'JPY/USD',

  // NOK
  '1117554-149-88': 'NOK/AUD',
  '1117466-149-184': 'NOK/CAD',
  '275014-149-1': 'NOK/CHF',
  '1117533-149-272': 'NOK/DKK',
  '968927-149-814': 'NOK/EUR',
  '1117493-149-402': 'NOK/GBP',
  '614569-149-470': 'NOK/HKD',
  '1117543-149-534': 'NOK/JPY',
  '1126404-149-864': 'NOK/SEK',
  '614571-149-846': 'NOK/SGD',
  '1992392-149-921': 'NOK/TRY',
  '610485-149-333': 'NOK/USD',

  // SEK
  '1117583-149-88': 'SEK/AUD',
  '497977-149-184': 'SEK/CAD',
  '275013-149-1': 'SEK/CHF',
  '1117535-149-272': 'SEK/DKK',
  '968934-149-814': 'SEK/EUR',
  '497930-149-402': 'SEK/GBP',
  '614583-149-470': 'SEK/HKD',
  '497980-149-534': 'SEK/JPY',
  '1117575-149-662': 'SEK/NOK',
  '614585-149-846': 'SEK/SGD',
  '1992396-149-921': 'SEK/TRY',
  '497924-149-333': 'SEK/USD',

  // SGD
  '341789-149-88': 'SGD/AUD',
  '614855-149-184': 'SGD/CAD',
  '506034-149-1': 'SGD/CHF',
  '1117763-149-272': 'SGD/DKK',
  '968976-149-814': 'SGD/EUR',
  '1117762-149-402': 'SGD/GBP',
  '340809-149-470': 'SGD/HKD',
  '329149-149-534': 'SGD/JPY',
  '1117765-149-662': 'SGD/NOK',
  '1117770-149-864': 'SGD/SEK',
  '1992407-149-921': 'SGD/TRY',
  '610497-149-333': 'SGD/USD',

  // TRY
  '1992426-149-88': 'TRY/AUD',
  '1992386-149-184': 'TRY/CAD',
  '1992409-149-1': 'TRY/CHF',
  '1992391-149-272': 'TRY/DKK',
  '1991471-149-814': 'TRY/EUR',
  '1992388-149-402': 'TRY/GBP',
  '1991467-149-470': 'TRY/HKD',
  '1992418-149-534': 'TRY/JPY',
  '1992393-149-662': 'TRY/NOK',
  '1992398-149-864': 'TRY/SEK',
  '1991448-149-846': 'TRY/SGD',
  '1992412-149-333': 'TRY/USD',

  // USD
  '275274-149-88': 'USD/AUD',
  '275027-149-184': 'USD/CAD',
  '275000-149-1': 'USD/CHF',
  '275031-149-272': 'USD/DKK',
  '968984-149-814': 'USD/EUR',
  '275321-149-402': 'USD/GBP',
  '275126-149-470': 'USD/HKD',
  '275023-149-534': 'USD/JPY',
  '275030-149-662': 'USD/NOK',
  '275029-149-864': 'USD/SEK',
  '275129-149-846': 'USD/SGD',
  '1991420-149-921': 'USD/TRY',
};

export const currencySelectOptions = [
  {
    currency: 'CHF',
    value: 'CHF: Schweizer Franken',
    flag: {
      url: SwitzerlandFlag,
      styles: styles.SwissFlag,
    },
  },
  {
    currency: 'EUR',
    value: 'EUR: Euro',
    flag: {
      url: EuropeFlag,
      styles: styles.Flag,
    },
  },
  {
    currency: 'AUD',
    value: 'AUD: AustralischerDollar',
    flag: {
      url: AustraliaFlag,
      styles: styles.Flag,
    },
  },
  {
    currency: 'CAD',
    value: 'CAD: Kanadischer Dollar',
    flag: {
      url: CanadaFlag,
      styles: styles.Flag,
    },
  },
  {
    currency: 'DKK',
    value: 'DKK: Dänische Krone',
    flag: {
      url: DenmarkFlag,
      styles: styles.Flag,
    },
  },
  {
    currency: 'GBP',
    value: 'GBP: Britisches Pfund',
    flag: {
      url: GreatBritainFlag,
      styles: styles.Flag,
    },
  },
  {
    currency: 'HKD',
    value: 'HKD: Hongkong-Dollar',
    flag: {
      url: HongkongFlag,
      styles: styles.Flag,
    },
  },
  {
    currency: 'JPY',
    value: 'JPY: Japanischer Yeng',
    flag: {
      url: JapanFlag,
      styles: styles.Flag,
    },
  },
  {
    currency: 'NOK',
    value: 'NOK: Norwegische Krone',
    flag: {
      url: NorwegenFlag,
      styles: styles.Flag,
    },
  },
  {
    currency: 'SEK',
    value: ' SEK: Schwedische Krone',
    flag: {
      url: SwedenFlag,
      styles: styles.Flag,
    },
  },
  {
    currency: 'SGD',
    value: 'SGD: Singapur-Dollar',
    flag: {
      url: SingapurFlag,
      styles: styles.Flag,
    },
  },
  {
    currency: 'TRY',
    value: 'TRY: Türkische Lira',
    flag: {
      url: TurkeyFlag,
      styles: styles.Flag,
    },
  },
  {
    currency: 'USD',
    value: 'USD: Amerikanischer Dollar',
    flag: {
      url: UsaFlag,
      styles: styles.Flag,
    },
  },
];
