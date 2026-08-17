export const linkFromSponsor = (sponsor: Sponsor): string | null => {
  if (!sponsor?.hasProfilePage) return null;

  const imageUrl = sponsor?.teaserImage?.link?.path;
  if (imageUrl) return imageUrl;

  const sponsorUrl = sponsor.preferredUri;
  if (sponsorUrl) return sponsorUrl;

  return null;
};
