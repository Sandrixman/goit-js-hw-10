import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';

const debounce = require('lodash.debounce');

const searchBox = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');
const DEBOUNCE_DELAY = 300;

searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  let searchQuery = searchBox.value.trim();
  if (searchQuery !== '') {
    fetchCountries(searchQuery).then(searchCountries).catch(error);
  } else {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
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
  console.log(countries);

  const markup = countries
    .map(country => {
      return `<li class='list-item'>
                <img src='${country.flags.svg}'>
                <p>${country.name.official}</p>
              </li>
              <div class='card'>
                <p><b>Capital</b>: ${country.capital}</p>
                <p><b>Population</b>: ${country.population}</p>
                <p><b>Languages</b>: ${Object.values(country.languages).join(
                  ', '
                )}</p>
              </div>`;
    })
    .join('');
  if (countries.length < 10 && countries.length > 2) {
    countryList.innerHTML = markup;
    countryInfo.innerHTML = '';
  } else {
    countryInfo.innerHTML = markup;
    countryList.innerHTML = '';
  }
}
