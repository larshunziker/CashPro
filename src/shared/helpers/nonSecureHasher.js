/**
 * @file   non secure hasher (commonjs version)
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2017-11-15
 */

function hashCode(input) {
  var hash = 0,
    i,
    chr;
  if (typeof input !== 'string') {
    input = JSON.stringify(input);
  }
  if (input.length === 0) return hash;
  for (i = 0; i < input.length; i++) {
    chr = input.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

module.exports.hashCode = hashCode;
