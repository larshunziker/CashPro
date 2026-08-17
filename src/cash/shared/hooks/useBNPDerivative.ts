import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Location, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import autoUpdateStateSelector from '../../../shared/selectors/autoUpdateStateSelector';
import {
  GET_BNP_DERIVATIVES,
  GET_BNP_FULLQUOTE_SERVICE_PAGE,
} from './queries/bnpQueries';

export type QueryResultFullquote = {
  getFullquotePage: FullquotePage;
};

export type QueryResultDerivate = {
  integration: {
    bnp: { derivate: BnpDerivate };
  };
};

const pathFromLocation = (location: Location): string | undefined => {
  if (!location.pathname.includes('derivate-bnp')) {
    return undefined;
  }
  const path = location.pathname.replace('derivate-bnp', 'derivate');
  if (path.startsWith('/')) {
    return path.slice(1);
  }
  return path;
};

export const useBNPDerivativeFullquote = (
  widgetParagraph?: WidgetParagraph,
): { data: QueryResultFullquote | null } => {
  const [fullquoteData, setFullquoteData] =
    useState<QueryResultFullquote | null>(null);
  const location = useLocation();
  const path = widgetParagraph?.link?.path;
  const url =
    /* @ts-ignore TODO: typing for globalThis is not working */
    (path && path.startsWith('/') && new URL(path, global.locationOrigin)) ||
    (path && new URL(path)) ||
    null;
  const pathUrl = url?.searchParams?.get('path')?.trim();
  const derivatePath = pathUrl || pathFromLocation(location);

  const { loading, error } = useQuery(GET_BNP_FULLQUOTE_SERVICE_PAGE, {
    variables: {
      path: derivatePath,
    },
    onCompleted: (data) => setFullquoteData(data),
    skip: !derivatePath,
  });

  if (
    !derivatePath ||
    !fullquoteData ||
    !fullquoteData?.getFullquotePage ||
    loading ||
    error
  ) {
    return { data: null };
  }

  return { data: fullquoteData };
};

export const useBNPDerivative = (
  isin?: string,
): { data: QueryResultDerivate | null } => {
  const [derivateData, setDerivateData] = useState<QueryResultDerivate | null>(
    null,
  );
  const isAutoUpdateEnabled = useSelector(
    (state: ReduxState) => autoUpdateStateSelector(state).isAutoUpdateEnabled,
  );
  const { loading, error } = useQuery(GET_BNP_DERIVATIVES, {
    variables: {
      isin: isin,
    },
    onCompleted: (data) => setDerivateData(data),
    skip: !isin || !!(derivateData && !isAutoUpdateEnabled),
    pollInterval: 60_000,
  });

  if (
    !isin ||
    !derivateData ||
    !derivateData?.integration?.bnp?.derivate ||
    loading ||
    error
  ) {
    return { data: null };
  }

  return { data: derivateData };
};
