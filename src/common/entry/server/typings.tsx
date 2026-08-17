import { ComponentType } from 'react';
import { Store } from 'redux';
import express, { NextFunction, Request, Response } from 'express';
import { AssetManifest } from '../../../shared/helpers/getAssetManifest';

export type ServerRenderFactoryOptions = {
  RaschProviders?: ComponentType;
  AppRoutes: ComponentType;
  configureServerStore: ({
    url,
    headers,
  }: {
    url: any;
    headers: Record<string, string | string[]>;
  }) => Store;
  fontPreloadLinks?: string[];
  dnsPrefetchLinks?: string[];
  preConnectLinks?: { href: string; options?: any }[];
  doNotHydrateWindowState?: boolean;
  preloadCssPattern?: string;
  getContentSecurityPolicyHeader?: (req: Request) => string;
  assetManifest: AssetManifest;
  generateApolloCache: () => any;
};

export type ServerFactoryOptions = {
  RaschProviders?: ComponentType;
  AppRoutes: ComponentType;
  authenticate?: (req: Request, res: Response, next: NextFunction) => void;
  configureServerStore: (req: Request) => Store;
  fontPreloadLinks?: string[];
  dnsPrefetchLinks?: string[];
  /* @ts-ignore TODO: TS7006 ->  Parameter 'error' implicitly has an 'any' type. */
  errorFunction?: (error) => string;
  unsupportedBrowser?: () => string;
  loginOffline: () => string;
  preConnectLinks?: { href: string; options?: any }[];
  isAkamaiRequest?: (req: Request, res: Response, next: NextFunction) => void;
  doNotHydrateWindowState?: boolean;
  preloadCssPattern?: string;
  getContentSecurityPolicyHeader?: (req: Request) => string;
  generateApolloCache: () => any;
  registerRoutes?: (app: express.Application) => void;
};
