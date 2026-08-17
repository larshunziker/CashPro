import { ROUTE_PUZZLES_PLAY } from '../../constants';
import binoxxo from '../../assets/graphics/puzzles/binoxxo.svg';
import kleinesKreuzwort from '../../assets/graphics/puzzles/kleines-kreuzwort.svg';
import kreuzwortchaos from '../../assets/graphics/puzzles/kreuzwortchaos.svg';
import kreuzwortraetsel from '../../assets/graphics/puzzles/kreuzwortraetsel.svg';
import sudokuEinfach from '../../assets/graphics/puzzles/sudoku-einfach.svg';
import sudokuMittel from '../../assets/graphics/puzzles/sudoku-mittel.svg';
import sudokuSchwer from '../../assets/graphics/puzzles/sudoku-schwer.svg';
import woertli from '../../assets/graphics/puzzles/woertli.svg';
import wortsuche from '../../assets/graphics/puzzles/wortsuche.svg';
import { PuzzlesListItem } from './typings';

export type GameType = {
  title: string;
  id: number;
  date?: string;
  parent?: string;
  isAccessNeeded?: boolean;
};

export const GAME_MAP = {
  free: {
    'kleines-kreuzwort': {
      title: 'Kleines Kreuzwort',
      id: 677,
      date: '2022-09-26',
      isAccessNeeded: false,
    },
    binoxxo: {
      title: 'Binoxxo',
      id: 681,
      date: '2022-09-26',
      isAccessNeeded: false,
    },
    kreuzwortchaos: {
      title: 'Kreuzwortchaos',
      id: 679,
      date: '2022-10-25',
      isAccessNeeded: false,
    },
    'sudoku-einfach': {
      title: 'Sudoku (einfach)',
      id: 674,
      date: '2022-09-26',
      parent: 'sudoku',
      isAccessNeeded: false,
    },
    'sudoku-mittel': {
      title: 'Sudoku (mittel)',
      id: 675,
      date: '2022-09-26',
      parent: 'sudoku',
      isAccessNeeded: false,
    },
    'sudoku-schwer': {
      title: 'Sudoku (schwer)',
      id: 673,
      date: '2022-09-26',
      parent: 'sudoku',
      isAccessNeeded: false,
    },
    woertli: {
      title: 'Wörtli',
      id: 682,
      date: '2022-09-26',
      isAccessNeeded: false,
    },
    woertersuche: {
      title: 'Wörtersuche',
      id: 686,
      date: '2022-09-26',
      isAccessNeeded: false,
    },
  },
  full: {
    binoxxo: {
      title: 'Binoxxo',
      id: 680,
      isAccessNeeded: true,
    },
    kreuzwortchaos: {
      title: 'Kreuzwortchaos',
      id: 678,
      isAccessNeeded: true,
    },
    'kleines-kreuzwort': {
      title: 'Kleines Kreuzwort',
      id: 677,
      isAccessNeeded: false,
    },
    kreuzwortraetsel: {
      title: 'Kreuzworträtsel',
      id: 676,
      isAccessNeeded: true,
    },
    'sudoku-einfach': {
      title: 'Sudoku (einfach)',
      id: 659,
      parent: 'sudoku',
      isAccessNeeded: true,
    },
    'sudoku-mittel': {
      title: 'Sudoku (mittel)',
      id: 671,
      parent: 'sudoku',
      isAccessNeeded: true,
    },
    'sudoku-schwer': {
      title: 'Sudoku (schwer)',
      id: 672,
      parent: 'sudoku',
      isAccessNeeded: true,
    },
    woertli: {
      title: 'Wörtli',
      id: 683,
      isAccessNeeded: true,
    },
    woertersuche: {
      title: 'Wörtersuche',
      id: 687,
      isAccessNeeded: true,
    },
  },
};

export const PAGE_SIZE = 15;
export const PUZZLES: PuzzlesListItem[] = [
  {
    name: 'sudoku',
    title: 'Sudoku',
    description: 'Täglich ein neues Spiel pro Schwierigkeitsstufe.',
    instruction:
      'Das Diagramm ist mit den Zahlen 1 bis 9 zu füllen. Dabei darf jede Zahl in jeder Zeile und jeder Spalte und in jedem 3 x 3–Feld nur einmal vorkommen.',
    levels: ['einfach', 'mittel', 'schwer'],
    icons: [sudokuEinfach, sudokuMittel, sudokuSchwer],
    freeGame: `/${ROUTE_PUZZLES_PLAY}/sudoku-einfach/free`,
    isAccessNeeded: true,
  },
  {
    name: 'kleines-kreuzwort',
    title: 'Kleines Kreuzwort',
    description: 'Jetzt kostenlos spielen. Täglich ein neues Rätsel entdecken.',
    instruction:
      'Die Definitionen in den Kästchen geben vor, ob eine Lösung waagerecht oder senkrecht eingetragen wird.',
    icons: [kleinesKreuzwort],
    isAccessNeeded: false,
  },
  {
    name: 'kreuzwortraetsel',
    title: 'Kreuzworträtsel',
    description: 'Der Klassiker. Täglich gibt es ein neues Kreuzworträtsel.',
    instruction:
      'Die Definitionen in den Kästchen geben vor, ob eine Lösung waagerecht oder senkrecht eingetragen wird.',
    icons: [kreuzwortraetsel],
    isAccessNeeded: true,
  },
  {
    name: 'binoxxo',
    title: 'Binoxxo',
    description: 'Täglich ein neues «Binoxxo» entdecken.',
    instruction:
      'In jeder Zeile und Spalte sollen die zwei unterschiedlichen Symbole jeweils in gleicher Anzahl vorhanden sein. Es ist darauf zu achten, dass nicht mehr als zwei gleiche Symbole nebeneinander- oder untereinanderstehen.',
    icons: [binoxxo],
    freeGame: `/${ROUTE_PUZZLES_PLAY}/binoxxo/free`,
    isAccessNeeded: true,
  },
  {
    name: 'woertli',
    title: 'Wörtli',
    description: 'Täglich ein neues «Wörtli» entdecken.',
    instruction: `Findest du das gesuchte Wort?
    
      Nach jedem Versuch werden die Buchstaben in einer von drei Farben eingefärbt.

      Grün – Der Buchstabe ist an der richtigen Stelle.
      Gelb – Der Buchstabe ist an der falschen Stelle.
      Rot – Der Buchstabe kommt nicht im Wort vor.
      
      Du hast 6 Versuche, um das Wort zu finden. Viel Glück!`,
    icons: [woertli],
    freeGame: `/${ROUTE_PUZZLES_PLAY}/woertli/free`,
    isAccessNeeded: true,
  },
  {
    name: 'woertersuche',
    title: 'Wörtersuche',
    description: 'Täglich ein neues «Wörtersuche» entdecken.',
    instruction: `In diesem Buchstabenfeld sind Begriffe versteckt. Die Wörter können in jede Richtung laufen, auch diagonal, rückwärts oder von unten nach oben.
      
      Ein Klick auf den Anfangs- und auf den Endbuchstaben des gefundenen Wortes aktiviert den Begriff.`,
    icons: [wortsuche],
    freeGame: `/${ROUTE_PUZZLES_PLAY}/woertersuche/free`,
    isAccessNeeded: true,
  },
  {
    name: 'kreuzwortchaos',
    title: 'Kreuzwortchaos',
    description: 'Täglich ein neues «Kreuzwortchaos» entdecken.',
    instruction:
      'Bei diesem Rätsel sind die einzutragenden Wörter bereits in den Definitionsfeldern vorgegeben, jedoch sind deren Buchstaben durcheinandergeschüttelt.',
    icons: [kreuzwortchaos],
    freeGame: `/${ROUTE_PUZZLES_PLAY}/kreuzwortchaos/free`,
    isAccessNeeded: true,
  },
];

export const INITIAL_DATE = new Date('2022-12-01');
export const PUZZLE_WORD_SEARCH = 'woertersuche';
