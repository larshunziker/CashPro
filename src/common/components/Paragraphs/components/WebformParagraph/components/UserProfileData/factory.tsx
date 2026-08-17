import React, { FC } from 'react';
import { connect } from 'react-redux';
import { UserProfileDataFactoryProps, UserProfileDataProps } from './typings';
import { getServiceUrl } from '../../../../../../../shared/helpers/serviceUrl';

const UserProfileDataFactory = ({
  styles,
  authStateSelector,
}: UserProfileDataFactoryProps) => {
  const UserProfileData: FC<UserProfileDataProps> = ({ authState }) => {
    if (!authState || !authState.address) {
      return null;
    }
    return (
      <div>
        <p className={styles.Paragraph}>
          Folgende Daten sind dem Profil hinterlegt und werden mit dem Formular
          versendet:
        </p>
        <p className={styles.Title}>Adresse</p>
        <p className={styles.Text}>
          <span className={styles.Row}>
            {authState.givenName} {authState.familyName}
          </span>
          <span className={styles.Row}>{authState.address.addressLine1}</span>

          {authState.address.addressLine2 && (
            <span className={styles.Row}>{authState.address.addressLine2}</span>
          )}
          <span className={styles.Row}>
            {`${authState.address.country}-${authState.address.zipCode} ${authState.address.city}`}
          </span>
        </p>
        {authState.mobileNumber && (
          <>
            <p className={styles.Title}>Telefonnummer</p>
            <p className={styles.Text}>{authState.mobileNumber}</p>
          </>
        )}
        <p className={styles.Title}>E-Mailadresse</p>
        <p className={styles.Text}>{authState.email}</p>
        {authState.birthday && (
          <>
            <p className={styles.Title}>Geburtsdatum</p>
            <p className={styles.Text}>{authState.birthday}</p>
          </>
        )}
        {authState.gpNumber && (
          <>
            <p className={styles.Title}>Kundennummer</p>
            <p className={styles.Text}>{authState.gpNumber}</p>
          </>
        )}
        <p className={styles.Paragraph}>
          <a
            className={styles.Button}
            href={`${getServiceUrl(__AUTH_SERVICE_URL__)}/profile?lang=de`}
          >
            Profil bearbeiten
          </a>
        </p>
      </div>
    );
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
  const mapStateToProps = (state) => ({
    authState: authStateSelector(state),
  });

  return connect(mapStateToProps)(UserProfileData);
};

export default UserProfileDataFactory;
