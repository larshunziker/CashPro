import React, { Suspense, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import classNames from 'classnames';
import TextParagraph from '../../../../components/Paragraphs/components/TextParagraph';
import { apolloConfig } from '../../../../components/Router/apolloConfig';
import ButtonWithLoading from '../../../../components/ButtonWithLoading';
import { useStableNavigate } from '../../../../../../../shared/hooks/useStableNavigateContext';
import Picture from '../../../../../../../common/components/Picture';
import NetWorthChart from '../NetWorthChart';
import { getTop300Data } from '../NetWorthChart/helpers';
import { STYLE_1X1_210 } from '../../../../../../../shared/constants/images';
import styles from './styles.legacy.css';

type RowDetailsProps = {
  data: Person;
  year: number;
  rowIsOpen?: boolean;
};

const TableRowDetails = ({ year, data, rowIsOpen = true }: RowDetailsProps) => {
  // if we ever want the parent component to control the open state, we can pass a prop
  const [isOpen] = useState(rowIsOpen);
  const [chartData, setChartData] = useState({ x: [], y: [] });
  const { teaserImage, preferredUri, body } = data;
  const { relativeOriginPath, focalPointX, focalPointY, alt } =
    teaserImage?.image?.file || {};
  const navigate = useStableNavigate();

  const { query, ...options } = apolloConfig.options({
    location: { pathname: preferredUri },
  });
  const { data: rankingData, loading } = useQuery(query, options);

  useEffect(() => {
    if (rankingData) {
      const person: Person =
        rankingData?.environment?.routeByPath?.object || null;

      const { chartData } = getTop300Data(person, year, {
        noDataIfSingleRanking: true,
      });

      setChartData(chartData);
    }
  }, [rankingData, year]);

  return (
    <tr
      className={classNames(styles.RowDetailsOuterWrapper, {
        [styles.IsOpen]: isOpen,
      })}
    >
      <td className={styles.RowDetailsTableCell} colSpan={999}>
        <div
          className={classNames(styles.RowDetailsWrapper, {
            [styles.IsOpen]: isOpen,
          })}
        >
          <div className={styles.RowDetailsInnerWrapper}>
            <div className={styles.PictureAndMiddleWrapper}>
              <Picture
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                relativeOrigin={relativeOriginPath}
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                focalPointX={focalPointX}
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                focalPointY={focalPointY}
                style_320={STYLE_1X1_210}
                className={styles.RankingImage}
                alt={alt || ''}
              />
              <div className={styles.MiddleWrapper}>
                <TextParagraph
                  addClass={styles.DetailsTeaserText}
                  textParagraph={{ text: body }}
                />
                <div className={styles.ButtonWrapper}>
                  <ButtonWithLoading
                    ariaLabel="Show Details"
                    size="small"
                    variant="secondary"
                    addClass={styles.Button}
                    /* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
                    onClick={() => navigate(preferredUri)}
                  >
                    Profil anzeigen
                  </ButtonWithLoading>
                </div>
              </div>
            </div>

            <div
              className={classNames(styles.ChartWrapper, {
                [styles.IsLoading]: loading,
              })}
            >
              {loading && <div>Loading Chart...</div>}
              {!loading && isOpen && chartData.x.length > 0 && (
                <Suspense>
                  <NetWorthChart x={chartData.x} y={chartData.y} />
                </Suspense>
              )}
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default TableRowDetails;
