import { ComponentType } from 'react';
import { AdZoneFactoryPropsInner } from './factory';
import { AppNexusComponent } from '../AppNexus/typings';

export type AdZoneFactoryProps = {};

export type AdZoneFactoryStyles = {
  Wrapper: string;
  InnerWrapper: string;
};

export type AdZoneFactoryOptions = {
  AppNexus: AppNexusComponent;
  styles:
    | AdZoneFactoryStyles
    | ((props: AdZoneFactoryPropsInner) => AdZoneFactoryStyles);
};

export type AdZoneState = {
  adHeight: number;
};

export type AdZoneFactoryDefaultStyles = {
  /*Note that the DefaultStyles CSS does not contain Wrapper and InnerWrapper. 
  But TSC doesn't understand classnames and therefore throws errors on lines 
  168 & 175 of the factory if they aren't mentioned here. */
  Wrapper?: string;
  InnerWrapper?: string;
  Preroll?: string;
};

export type AdZoneComponent = ComponentType<AdZoneFactoryProps>;
