export function stripHtml(fieldValue: string) {
  // Remove all HTML tags
  return fieldValue ? fieldValue.replace(/<[^<>]+>/g, '') : fieldValue;
}
