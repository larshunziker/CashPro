export const getFallbackTitle = (organization: Organization): string => {
  if (!organization || !organization.title) {
    return (organization?.organizationType === 'pop' && 'Pop') || 'Restaurant';
  }
  return '';
};
