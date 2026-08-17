export function featureIsEnabled(name: string) {
  if (__FEATURES__ && __FEATURES__.includes(name)) {
    return true;
  }
  return false;
}
