import type { ComponentType } from 'react';
import { AppNexusComponent } from '../AppNexus/typings';

export type MonsterSkyFactoryOptions = {
  AppNexus: AppNexusComponent;
  windowStateSelector: WindowStateSelector;
  scrollStateSelector: ScrollStateSelector;
  locationStateSelector: LocationStateSelector;
  slot: string;
  monsterSkyMinWindowWidth: number;
  monsterSkyMinMarginTop: number;
  shouldUpdate?: any;
  styles:
    | MonsterSkyFactoryOptionsStyles
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
    | ((props, state) => MonsterSkyFactoryOptionsStyles);
  positionModeOverride?: string;
};

export type MonsterSkyFactoryOptionsStyles = {
  Wrapper: string;
  WrapperInner: string;
  AdWrapper: string;
  Ad?: string;
  Sticky: string;
  Children?: string;
};

export type MonsterSkyComponent = ComponentType<any>;
