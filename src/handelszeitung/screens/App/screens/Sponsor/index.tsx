import createComponentSwitch from '../../../../shared/decorators/componentSwitch';
import BrandReport from './components/BrandReport';
import Sponsors from './components/Sponsors';

const SponsorWrapper = createComponentSwitch({
  sponsors: Sponsors,
  brandReport: BrandReport,
});

export default SponsorWrapper;
