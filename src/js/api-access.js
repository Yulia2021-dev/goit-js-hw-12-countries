const BASE_URL = 'https://restcountries.com/v2/name/';

export const fetchCountries = searchQuery => {
  return fetch(BASE_URL + searchQuery)
    .then(response => {
      if (!response.ok) {
        throw Error("couldn't fetch, because: " + response.status);
      } else {
        return response.json();
      }
    })
    .catch(error => console.warn(error));
};
