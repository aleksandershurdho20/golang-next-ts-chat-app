export function setCookie(name: string, val: string) {
    const date = new Date();
    const value = val;

    // Set it expire in 7 days
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = name+"="+value+"; expires="+date.toUTCString()+"; path=/";
}
export const getCookie = (cookieName: string) => {
    const match = new RegExp(`${cookieName}=([^;]+);`).exec(document.cookie);
    if (match) {
      return match[1];
    } else {
      console.error(`Cookie with name "${cookieName}" not found. document.cookie: ${document.cookie}`);
      return null; 
    }
  };