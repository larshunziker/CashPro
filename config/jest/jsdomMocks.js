/**
 * @file   mock jsdom functions
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2018-06-04
 */

import { TextEncoder } from 'util';
import fetch from 'node-fetch';

window.scrollTo = () => {};
global.TextEncoder = TextEncoder;
window.fetch = fetch;
