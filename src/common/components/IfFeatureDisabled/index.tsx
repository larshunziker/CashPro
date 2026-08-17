import * as React from 'react';
import { useFeature } from '@growthbook/growthbook-react';

export default function IfFeatureDisabled({
  children,
  feature,
}: {
  children: React.ReactNode;
  feature: string;
}) {
  const isGrowthBookActive = __ENABLE_GROWTHBOOK__ && !__TESTING__;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return !isGrowthBookActive || useFeature(feature).off ? (
    <>{children}</>
  ) : null;
}
