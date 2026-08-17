# Mailchimp Subscribe Form

Displays an InputField where the user can sign up to a Mailchimp newsletter.
(This MailchimpSubscribeForm factory was/is based on the MailChimpSubscribeForm from HZ).

## Usage

MailchimpSubscribeForm factory call inside of the **APP**:

```jsx
import { gql } from '@apollo/client';
import classNames from 'classnames';
import mailchimpSubscribeFormFactory from '../../../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageNewsletter/components/MailchimpSubscribeForm/factory';
import InputField from '../InputField';
import grid from '../../../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const mutation = gql`
  mutation MailchimpListRequest(
    $action: MailchimpListAction!
    $email: String!
    $listId: String!
    $groupId: String
    $mailchimpAccountId: String!
  ) {
    mailchimpListRequest(
      input: {
        action: $action
        email: $email
        listId: $listId
        groupId: $groupId
        mailchimpAccountId: $mailchimpAccountId
      }
    )
  }
`;

const MailchimpSubscribeForm = mailchimpSubscribeFormFactory({
  InputField,
  mutationQuery: mutation,
  styles: {
    Form: styles.Form,
    Row: grid.Row,
    InputWrapper: classNames(
      styles.InputWrapper,
      grid.ColSm16,
      grid.ColMd17,
      grid.ColXl18,
    ),
    EmailWrapper: styles.EmailWrapper,
    SuccessWrapper: classNames(
      styles.SuccessWrapper,
      grid.ColMd17,
      grid.ColXl18,
    ),
    SuccessTick: styles.SuccessTick,
    SuccessSubmission: styles.SuccessSubmission,
    ButtonWrapper: classNames(
      styles.ButtonWrapper,
      grid.ColSm8,
      grid.ColMd7,
      grid.ColXl6,
    ),
    Button: styles.ActionLink,
  },
});

export default MailchimpSubscribeForm;
```

MailchimpSubscribeForm Component usage:

```html
<MailchimpSubscribeForm ministageNewsletter="{ministage}" />
```
