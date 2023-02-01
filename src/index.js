import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
const debounce = require('lodash.debounce');

const searchCountry = document.querySelector('#search-box');
const DEBOUNCE_DELAY = 300;
searchCountry.addEventListener(
  'input',
  debounce(callFatchCountries, DEBOUNCE_DELAY)
);

function callFatchCountries() {
  fetchCountries(searchCountry.value);
}
