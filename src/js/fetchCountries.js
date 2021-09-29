import { fetchCountries } from './api-access';
import countryCard from '../templates/country-card.hbs';
import countryList from '../templates/country-list.hbs';
import getRefs from './get-refs';
import debounce from 'lodash.debounce';
import { error, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

defaultModules.set(PNotifyMobile, {});
// defaultModules.set(PNotifyFontAwesome5, {});

const refs = getRefs();
refs.searchInput.addEventListener('input', debounce(onSearch, 500));
function onSearch(e) {
  e.preventDefault();
  let country = e.target.value;
  if ('' !== country.trim()) {
    fetchCountries(country)
      .then(data => {
        if (data.hasOwnProperty('status')) {
          throw Error("couldn't fetch, because: " + response.status);
        }
        renderData(data);
      })
      .catch(searchError);
  } else {
    refs.cardContainer.innerHTML = null;
  }
}

function searchError(err) {
  error({
    text: 'Country not found!',
    maxTextHeight: null,
    delay: 2000,
    sticker: false,
  });
  refs.cardContainer.innerHTML = null;
}

function appendCountriesMarkup(countries) {
  refs.cardContainer.innerHTML = countryCard(countries[0]);
}

function appendCountries(countries) {
  refs.cardContainer.innerHTML = countryList(countries);
}

function renderData(data) {
  const size = data.length;
  if (size > 10) {
    error({
      text: 'Too many matches found. Please enter a more specific query!',
      maxTextHeight: null,
      delay: 2000,
      sticker: false,
    });
    refs.cardContainer.innerHTML = null;
  } else if (size > 2 && size <= 10) {
    appendCountries(data);
  } else {
    appendCountriesMarkup(data);
  }
}
