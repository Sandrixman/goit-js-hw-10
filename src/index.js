import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';

const debounce = require('lodash.debounce');

const searchCountry = document.querySelector('#search-box');
const DEBOUNCE_DELAY = 300;
searchCountry.addEventListener(
  'input',
  debounce(callFatchCountries, DEBOUNCE_DELAY)
);

function callFatchCountries() {
  fetchCountries(searchCountry.value.trim())
    .then(data => {
      if (data.length < 10) {
        console.log(data);
      } else if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(Notiflix.Notify.failure('Oops, there is no country with that name'));
}
