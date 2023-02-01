function fetchCountries(name) {
  fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(r => r.json())
    .then(console.log)
    .catch(console.log('error'));
}

export { fetchCountries };
