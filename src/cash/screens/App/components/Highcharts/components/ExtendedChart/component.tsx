import React, { Suspense, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import classNames from 'classnames';
import autoUpdateStateSelector from 'src/shared/selectors/autoUpdateStateSelector';
import { setInstrumentKeysAnonymous } from 'src/cash/shared/actions/autoUpdate';
import {
  adjustBlickWidgetHight,
  scriptToAppend,
} from '../../../Widgets/helpers';
import { mapTimePeriodToShortUrlFormat } from '../../helpers';
import Logo from '../../../Logo';
import HighchartsWrapper from '../../component';
import Head from '../Head';
import { apolloConfig } from './apolloConfig';
import { HIGHCHART_LINE_CHART } from '../../constants';
import styles from './styles.legacy.css';
import { HeadProps } from '../Head/typings';
import { ExtendedChartProps } from './typings';

const ExtendedChart = ({
  location,
  isInternal,
  internalData,
}: ExtendedChartProps) => {
  const elementRef = useRef(null);
  const queryString = location?.search;
  const urlParams = new URLSearchParams(queryString);
  const urlListingId = urlParams.get('listingid');
  const path = urlParams.get('path');
  const protocol = location?.protocol || 'https:';
  const host = location?.host || 'www.cash.ch';
  const origin = urlParams.get('origin') || 'cash';
  const isHzOrigin = origin === 'hz';
  const isBlickOrigin = origin === 'blick';
  let timePeriod = urlParams.get('timeperiod') || 'threeMonths';
  const dispatch = useDispatch();

  if (isInternal) {
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    timePeriod = internalData.timePeriod.join(',') || 'threeMonths';
  }

  const queryConfig = apolloConfig.options({
    location: location,
    params: {
      listingId: urlListingId || '',
      path: path || '',
    },
  });

  useEffect(() => {
    if (!isBlickOrigin) {
      return;
    }
    scriptToAppend(
      'https://www.blick.ch/assets/iframeHeightAdjustment.js',
      elementRef,
    );
    return adjustBlickWidgetHight();
  }, [elementRef, isBlickOrigin]);

  const { data } = useQuery(queryConfig.query, {
    variables: queryConfig.variables,
    skip: !urlListingId && !path,
  });

  const fullquoteUrl = data?.getFullquotePage?.canonicalUrl;
  const queryListingId = data?.getFullquotePage?.listingId;

  useEffect(() => {
    dispatch(
      setInstrumentKeysAnonymous([
        {
          isMarketOpen: true,
          /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
          listingKey: queryListingId,
        },
      ]),
    );
  }, [dispatch, queryListingId]);

  const instrument = useSelector(
    /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
    (state) => autoUpdateStateSelector(state),
  )?.data?.[queryListingId];

  let dataCopy = null;

  if (data && instrument?.lval) {
    dataCopy = JSON.parse(JSON.stringify(data));
    dataCopy.getFullquotePage.lval = instrument?.lval;
    dataCopy.getFullquotePage.lvalDatetime = instrument?.lvalDatetime;
    dataCopy.getFullquotePage.iNetVperprV = instrument?.iNetVperprV;
    dataCopy.getFullquotePage.iNetVperprVPr = instrument?.iNetVperprVPr;
  }

  return (
    <div
      id="__BLICK_IFRAME_ID__"
      ref={elementRef}
      className={isBlickOrigin ? styles.WrapperBlick : styles.Wrapper}
    >
      <Head
        {...((dataCopy || data)?.getFullquotePage as HeadProps)}
        origin={origin}
        fullquoteUrl={fullquoteUrl}
      />
      <div className={isBlickOrigin ? styles.BlickChart : styles.Chart}>
        <Suspense>
          <HighchartsWrapper
            origin={origin}
            widgetParagraph={{
              link: {
                path: `${__FI_BOX_SERVICE_ENDPOINT__}/services/charts-json/timeserie/${
                  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                  isInternal ? internalData.listingId : queryListingId
                }`,
              },
              timePeriodValues: timePeriod?.split(',').map((timeValue) => {
                return mapTimePeriodToShortUrlFormat(timeValue);
              }),
            }}
            component={HIGHCHART_LINE_CHART}
            externalFullquoteUrl={fullquoteUrl}
          />
        </Suspense>
      </div>
      <div
        className={classNames(styles.Footer, {
          [styles.ExternalStyles]: isHzOrigin || isBlickOrigin,
          [styles.HzStyles]: isHzOrigin,
          [styles.BlickStyles]: isBlickOrigin,
        })}
      >
        <span className={styles.FooterText}>
          Nur 29 Franken pro Online-Trade mit cash.
          <a
            target={isHzOrigin || isBlickOrigin ? '_blank' : ''}
            className={styles.Link}
            href={`${protocol}//${host}/online-trading?promo_name=cta_button&promo_position=extended-chart`}
          >
            Jetzt mehr erfahren
          </a>
        </span>
        {(isHzOrigin || isBlickOrigin) && (
          <div className={styles.Logo}>
            <span className={styles.LogoText}>Präsentiert von</span>
            <a href="https://www.cash.ch/" target="_blank">
              <Logo width={96} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExtendedChart;
