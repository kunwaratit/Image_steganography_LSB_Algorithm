function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function getAuthToken() {
  // Check if the token is stored in cookies
  const tokenFromCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('authToken='))
    ?.split('=')[1];

  // Check if the token is stored in local storage
  const tokenFromLocalStorage = localStorage.getItem('authToken');

  // Return the token from cookies or local storage, if present
  return tokenFromCookie || tokenFromLocalStorage;
}

export { getCookie, getAuthToken };
