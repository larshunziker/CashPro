// read assets manifest
import { resolve } from 'path';
import fs from 'fs-extra';

export type AssetManifest = {
  files?: Record<string, string>;
};

export const getAssetManifest: () => AssetManifest = () => {
  let assetManifest: AssetManifest = {};

  try {
    assetManifest =
      JSON.parse(
        fs
          .readFileSync(
            resolve(
              process.cwd(),
              `build/${__APP_NAME__}/public/asset-manifest.json`,
            ),
          )
          .toString(),
      ) || {};
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(
      '[asset-manifest.json] error: assetManifest cannot be parsed',
      e,
    );
  }

  return assetManifest;
};
