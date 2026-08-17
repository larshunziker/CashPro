import React from 'react';

export type SubscribeIconProps = {
  Icon: React.ComponentType<any>;
  styles: {
    Icon: string;
    Active: string;
    Animating: string;
  };
  isActive: boolean;
  isAnimating: boolean;
  isHybridApp: boolean;
};
