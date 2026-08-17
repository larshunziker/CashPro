import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import { compose } from 'redux';
import classNames from 'classnames';
import { getRestrictedClassName } from '../../../../../../../shared/helpers/withHelmet';
import bookingStateSelector from '../../../../../../../shared/selectors/bookingStateSelector';
import Paragraphs from '../../../../components/Paragraphs';
import Confirmation from '../../../../components/Paragraphs/components/BookingFormParagraph/components/Confirmation';
import DocumentCheckConfirmation from '../../../../components/Paragraphs/components/DocumentCheckFormParagraph/components/Confirmation';
import EditButtons from './../../../../components/EditButtons';
import { CONFIRMATION } from '../../../../components/Paragraphs/components/BookingFormParagraph/factory/BookingFormParagraph/constants';
import { PAGE_SCREEN_DEFAULT } from '../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { PageScreenBookingProps } from './typings';

const PageScreenBooking = ({
  pageScreen,
  bookingFormEntry,
  bookingConfirmation,
}: PageScreenBookingProps): ReactElement => {
  const confirmationTexts = {
    title: bookingFormEntry.title,
    description: bookingFormEntry.text,
    buttonLink: bookingFormEntry.link?.path,
    buttonLabel: bookingFormEntry.link?.label,
  };

  const confirmationPlaceholders = {
    title: 'Buchungsbestätigung',
    buttonLabel: 'Zurück zur Übersicht',
  };

  const { phoneNumber, description, attachment, time, weekdayFormat } =
    bookingConfirmation;
  const location = useLocation();

  return (
    <div
      data-testid="page-container"
      className={classNames('page-screen', styles.Wrapper)}
    >
      <EditButtons
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        editContentUri={pageScreen.editContentUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        editRelationUri={pageScreen.editRelationUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        cloneContentUri={pageScreen.cloneContentUri}
      />

      {phoneNumber && location.search?.includes(CONFIRMATION) ? (
        <div
          className={grid.Container}
          data-testid="articlepage-articleheader-wrapper"
        >
          <div className={grid.Row}>
            <div className={classNames(grid.ColSm20, grid.ColXl14)}>
              {time ? (
                <Confirmation
                  phoneNumber={phoneNumber}
                  time={time}
                  weekdayFormat={weekdayFormat}
                  /* @ts-ignore TODO: TS2322 ->  Type '{ title */
                  texts={confirmationTexts}
                  placeholders={confirmationPlaceholders}
                  description={description}
                />
              ) : (
                <DocumentCheckConfirmation
                  phoneNumber={phoneNumber}
                  description={description}
                  attachment={attachment}
                  /* @ts-ignore TODO: TS2322 ->  Type '{ title */
                  texts={confirmationTexts}
                  placeholders={confirmationPlaceholders}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div data-testid="head-container" className={grid.Container}>
            <div className={grid.Row}>
              <div className={classNames(grid.ColSm20, grid.ColXl14)}>
                <div className="pagescreen-lead">
                  {pageScreen.title && (
                    <h1 data-testid="title-container" className={styles.Title}>
                      <span className={styles.MainTitle} itemProp="headline">
                        {pageScreen.title}
                      </span>
                    </h1>
                  )}

                  {pageScreen.lead && (
                    <p
                      data-testid="lead-container"
                      className={styles.Lead}
                      itemProp="description"
                    >
                      {pageScreen.lead}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div
            data-testid="paragraphs-container"
            className={getRestrictedClassName(pageScreen.__typename)}
          >
            <Paragraphs
              colStyle={classNames(
                grid.ColSm20,
                grid.ColXl14,
                styles.ParagraphsContainer,
              )}
              pageBody={pageScreen.body}
              origin={PAGE_SCREEN_DEFAULT}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
              isAdSuppressed={pageScreen?.channel?.suppressAds}
            />
          </div>
        </>
      )}
    </div>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  bookingConfirmation: bookingStateSelector(state),
});

export default compose<any>(connect(mapStateToProps, null))(PageScreenBooking);
