import { getStyleByType } from '../helpers';
import { MINISTAGE_COMPONENT_NEWSLETTER } from '../../../../../../../../../../../../shared/constants/paragraphs';
import { NEWSLETTER_TYPE_HANDELSZEITUNG } from '../../../constants';

/* @ts-ignore TODO: TS7034 ->  Variable 'node' implicitly has type 'any' in some locations where its type cannot be determined. */
let node;

beforeEach(() => {
  node = {
    __typename: MINISTAGE_COMPONENT_NEWSLETTER,
    type: null,
  };
});

describe('[Helpers] MinistageNewsletter', () => {
  it('Should return empty string if no __typename is set in node', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'node' implicitly has an 'any' type. */
    node.__typename = null;
    //@ts-ignore
    const style = getStyleByType(node);
    expect(style).toBe('');
  });

  it(`Should return 'IsHandelszeitungNewsletter' if __typename is ${MINISTAGE_COMPONENT_NEWSLETTER} and type is ${NEWSLETTER_TYPE_HANDELSZEITUNG}`, () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'node' implicitly has an 'any' type. */
    node.type = NEWSLETTER_TYPE_HANDELSZEITUNG;
    //@ts-ignore
    const style = getStyleByType(node);
    expect(style).toBe('IsHandelszeitungNewsletter');
  });

  it(`Should return empty string if __typename is ${MINISTAGE_COMPONENT_NEWSLETTER} and type is NOT ${MINISTAGE_COMPONENT_NEWSLETTER} - default case`, () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'node' implicitly has an 'any' type. */
    node.__typename = MINISTAGE_COMPONENT_NEWSLETTER;
    /* @ts-ignore TODO: TS7005 ->  Variable 'node' implicitly has an 'any' type. */
    node.type = null;
    //@ts-ignore
    const style = getStyleByType(node);
    expect(style).toBe('');
  });
});
