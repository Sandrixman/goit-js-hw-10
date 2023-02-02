import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';

const debounce = require('lodash.debounce');

const searchBox = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  let searchQuery = searchBox.value.trim();
  if (searchQuery !== '') {
    fetchCountries(searchQuery).then(searchCountries).catch(error);
  } else {
    countryInfo.innerHTML = '';
  }
}

function searchCountries(data) {
  if (data.length < 10) {
    renderFoundCountries(data);
  } else if (data.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}

function error() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function renderFoundCountries(countries) {
  const markup = countries
    .map(country => {
      return `<li>
            <p><b>Name</b>: ${country.name.official}</p>
          </li>`;
    })
    .join('');
  countryInfo.innerHTML = markup;
}
