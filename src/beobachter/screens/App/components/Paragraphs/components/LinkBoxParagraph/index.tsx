/* istanbul ignore file */
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/decorators/componentSwitch'. '/Users/bhs/code */
import createComponentSwitch from '../../../../../../../shared/decorators/componentSwitch';
import Default from './components/DefaultLinkBox';
import RechtsratgeberLinkBox from './components/RechtsratgeberLinkBox';

export const LINK_BOX_STYLE_DEFAULT = 'default';
export const LINK_BOX_STYLE_GUIDER = 'guider';

const LinkBoxParagraphSwitch = createComponentSwitch({
  [LINK_BOX_STYLE_DEFAULT]: Default,
  [LINK_BOX_STYLE_GUIDER]: RechtsratgeberLinkBox,
});

export default LinkBoxParagraphSwitch;
