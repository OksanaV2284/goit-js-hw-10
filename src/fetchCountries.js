export function fetchCountries(name) {
  const URL = 'https://restcountries.com/v3.1/name/';
  return fetch(
    `${URL}${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    console.log(response);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
