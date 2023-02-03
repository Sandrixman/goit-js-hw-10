const BASE_URL = 'https://restcountries.com';

function fetchCountries(name) {
  const url = `${BASE_URL}/v3.1/name/${name}?fields=name,capital,population,flags,languages`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export { fetchCountries };
