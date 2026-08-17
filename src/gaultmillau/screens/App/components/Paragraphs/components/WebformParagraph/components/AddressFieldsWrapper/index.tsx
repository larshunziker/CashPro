import React from 'react';
import { FormattedMessage } from 'react-intl';
import AddressFieldsWrapperFactory from '../../../../../../../../../common/components/Paragraphs/components/WebformParagraph/components/AddressFieldsWrapper/factory';
import InputField from '../InputField';
import SelectField from '../SelectField';
import styles from './styles.legacy.css';

export default AddressFieldsWrapperFactory({
  InputField,
  SelectField,
  styles: {
    Link: styles.Link,
  },
  defaultErrorMessages: {
    countryLabel: (
      <FormattedMessage
        id="app.addressfieldWrapper.countryLabel"
        description="The default country label"
        defaultMessage="Land"
      />
    ),
    zipCodeLabel: (
      <FormattedMessage
        id="app.addressfieldWrapper.zipCodeLabel"
        description="The default zip code label"
        defaultMessage="PLZ"
      />
    ),
    cityLabel: (
      <FormattedMessage
        id="app.addressfieldWrapper.cityLabel"
        description="The default city label"
        defaultMessage="Ort"
      />
    ),
    streetLabel: (
      <FormattedMessage
        id="app.addressfieldWrapper.streetLabel"
        description="The default street label"
        defaultMessage="Strasse"
      />
    ),
    streetNumberLabel: (
      <FormattedMessage
        id="app.addressfieldWrapper.streetNumberLabel"
        description="The default street number label"
        defaultMessage="Nr."
      />
    ),
    streetLinkLabel: (
      <FormattedMessage
        id="app.addressfieldWrapper.streetLinkLabel"
        description="The default label for link when street is not found"
        defaultMessage="Strasse nicht gefunden?"
      />
    ),
    placeHolderLabel: (
      <FormattedMessage
        id="app.addressfieldWrapper.placeHolderLabel"
        description="The default place holder label for street select field"
        defaultMessage="Bitte wählen"
      />
    ),
    noStreetNumberLabel: (
      <>
        <FormattedMessage
          id="app.addressfieldWrapper.noStreetNumberLabel"
          description="The default label for checkbox when street number should not be required"
          defaultMessage="Ohne Strassen-Nr. erfassen"
        />
      </>
    ),
  },
});
