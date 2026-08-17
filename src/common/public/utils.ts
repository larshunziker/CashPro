export function cleanCorruptedUtagCookies() {
  try {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const name = cookies[i].trim().split('=')[0];
      if (name.startsWith('utag_main') && name.includes('undefined')) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.cash.ch`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=cash.ch`;
      }
    }
  } catch (e) {}
}
