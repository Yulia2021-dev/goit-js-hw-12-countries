const BASE_URL = 'https://restcountries.com/v2/name/';

export const fetchCountries = searchQuery => {
  return fetch(BASE_URL + searchQuery)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .catch(error => console.log('Error: ' + error));
};
