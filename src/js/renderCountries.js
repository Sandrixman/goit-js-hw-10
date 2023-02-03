export default function renderCountries(countries, refs) {
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
  if (countries.length < 10 && countries.length > 1) {
    refs.countryList.innerHTML = markup;
    refs.countryInfo.innerHTML = '';
  } else {
    refs.countryInfo.innerHTML = markup;
    refs.countryList.innerHTML = '';
  }
}
