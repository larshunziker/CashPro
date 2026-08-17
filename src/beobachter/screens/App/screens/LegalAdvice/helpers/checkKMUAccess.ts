export function checkKMUAccess(subscriptions: string[]): boolean {
  return (
    (subscriptions?.find((subscription) => subscription.includes('KMU')) || [])
      .length > 0
  );
}
