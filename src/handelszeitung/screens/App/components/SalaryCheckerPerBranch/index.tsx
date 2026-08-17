import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { viewportLabelSelector } from '../../../../../shared/selectors/windowStateSelector';
import { VIEWPORT_SM } from '../../../../../shared/actions/window';
import Link from '../../../../../common/components/Link';
import Card from '../Card';
import Img from '../Img';
import salaryPerBranch from './salaryPerBranch.json';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import lohnCheckLogo from 'graphics/lc_logo.png';
import { SalaryCheckerPerBranchProps } from './typings';

type Occupation = {
  title: string;
  salary: number;
  url: string;
};

type Industry = {
  salaryAverage: number;
  occupations: Array<Occupation>;
  title?: string;
};

const OCCUPATION_URL_LABEL = 'Mehr zum Beruf';

const fetchBranch = (branch: Branch): Industry | null => {
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ "Mobilit\u00E4t */
  if (branch.title && salaryPerBranch[branch.title]) {
    return {
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ "Mobilit\u00E4t */
      salaryAverage: salaryPerBranch[branch.title].salaryAverage || 0,
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ "Mobilit\u00E4t */
      occupations: salaryPerBranch[branch.title].occupations || [],
      title: branch.title || '',
    };
  }
  return null;
};

const getHighestRatio = (salaryAverage: number) =>
  Math.round((salaryAverage / 4915 - 1) * 100);

const getLowestRatio = (salaryAverage: number) =>
  Math.round((1 - salaryAverage / 6757) * 100);

const renderCard = (occupation: Occupation, index: number) => (
  <div key={index} className={classNames(grid.ColSm12, grid.ColMd8)}>
    <Card
      title={occupation.title}
      urlLabel={OCCUPATION_URL_LABEL}
      url={occupation.url}
    >
      <div className={styles.CardContent}>{occupation.salary} CHF</div>
    </Card>
  </div>
);

const SalaryCheckerPerBranch = ({
  branch,
  addClass = '',
}: SalaryCheckerPerBranchProps) => {
  const viewportLabel = useSelector((state: ReduxState) =>
    viewportLabelSelector(state),
  );
  const industry = (branch && fetchBranch(branch)) || null;
  if (!industry) {
    return null;
  }

  const has2ColsOccupations = [VIEWPORT_SM].indexOf(viewportLabel) !== -1;

  return (
    <div
      className={classNames({
        [styles.Wrapper]: !addClass,
        [addClass]: !!addClass,
      })}
    >
      <h2 className={styles.Title}>
        <span className={styles.Mobile}>Löhne</span>
        <span className={styles.Desktop}>Durchschnittslöhne</span>
      </h2>
      <div className={styles.ReferenceWrapper}>
        <div className={styles.Reference}>
          <span className={styles.ReferenceLabel}>präsentiert von</span>
          <Link path="https://www.lohncheck.ch/lohnrechner.php" rel="sponsored">
            <Img
              addClass={styles.ReferenceLogo}
              url={lohnCheckLogo}
              alt="Lohncheck logo"
            />
          </Link>
        </div>
      </div>
      <h3 className={styles.Branch}>{industry.title || ''} branchenweit</h3>
      {industry.salaryAverage && (
        <div className={styles.Quantities}>
          <div className={styles.SalaryAverageWrapper}>
            <span className={styles.SalaryAverage}>
              {industry.salaryAverage}
            </span>
            <span className={styles.Currency}>CHF</span>
          </div>
          <table className={styles.RatioWrapper}>
            <tbody>
              <tr>
                <td className={classNames(styles.Ratio, styles.ShiftDownFirst)}>
                  {getHighestRatio(industry.salaryAverage)}
                </td>
                <td
                  className={classNames(
                    styles.RatioDescription,
                    styles.ShiftDownFirst,
                  )}
                >
                  % höher als die Branche mit der niedrigsten Löhnen
                </td>
              </tr>
              <tr>
                <td
                  className={classNames(styles.Ratio, styles.ShiftDownSecond)}
                >
                  {getLowestRatio(industry.salaryAverage)}
                </td>
                <td
                  className={classNames(
                    styles.RatioDescription,
                    styles.ShiftDownSecond,
                  )}
                >
                  % niedriger als die Branche mit der höchsten Löhnen
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <div className={styles.OccupationsTitle}>
        In typischen Berufen {industry.title || ''}
      </div>

      {industry.occupations && (
        <div className={grid.Row}>
          {has2ColsOccupations &&
            industry.occupations.slice(0, 2).map(renderCard)}
          {!has2ColsOccupations && industry.occupations.map(renderCard)}
        </div>
      )}
      <div className={grid.Row}>
        <div className={grid.ColXs24}>
          <Link
            className={styles.Button}
            path="/rechner/lohnvergleich"
            label="Berechne Deinen Lohn"
          />
        </div>
      </div>
    </div>
  );
};

export default SalaryCheckerPerBranch;
