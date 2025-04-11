export function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export function setCookie(cname: string, cvalue: string, exdays: number): void {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);

  const expires = `expires=${d.toUTCString()}`;

  document.cookie = `${encodeURIComponent(cname)}=${encodeURIComponent(
    cvalue
  )};${expires};path=/`;
}

export function removeCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function getUrlParts() {
  const url = window.location.href;
  const queryString = url.split('?')[1];

  if (!queryString) return {};

  const parts: { [key: string]: string } = {};
  const hash = queryString.split('&');

  for (let i = 0; i < hash.length; i++) {
    const params = hash[i].split('=');
    parts[decodeURIComponent(params[0])] = decodeURIComponent(params[1] || '');
  }

  return parts;
}
