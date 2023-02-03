import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');
import './css/styles.css';
import getRefs from './js/getRefs';
import { fetchCountries } from './js/fetchCountries';
import renderCountries from './js/renderCountries';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();

refs.searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  let searchQuery = refs.searchBox.value.trim();
  if (searchQuery !== '') {
    fetchCountries(searchQuery).then(searchCountries).catch(error);
  } else {
    clearRender();
  }
}

function searchCountries(data) {
  if (data.length < 10) {
    renderCountries(data, refs);
  } else if (data.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    clearRender();
  }
}

function error() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
  clearRender();
}

function clearRender() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}
