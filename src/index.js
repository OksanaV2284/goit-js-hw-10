import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';

const searchBox = document.querySelector('#search-box');
console.log(searchBox);
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countryList.style.paddingLeft = '1px';
searchBox.style.color = ' #18449c';

const DEBOUNCE_DELAY = 300;

searchBox.addEventListener('input', debounce(onSeachCountry, DEBOUNCE_DELAY));

function onClearData(output) {
  output.innerHTML = '';
}

function onSeachCountry(evt) {
  const name = evt.target.value.trim();
  if (name === '') {
    return;
  }

  fetchCountries(name)
    .then(data => {
      onCreateMarkup(data);
    })
    .catch(error => {
      if (name !== '' || name === '') {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        onClearData(countryList);
        onClearData(countryInfo);
      }
    });
  evt.preventDefault();
}

function onCreateMarkup(array) {
  if (array.length > 10) {
    onClearData(countryList);
    onClearData(countryInfo);

    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (array.length > 1 && array.length <= 10) {
    onClearData(countryList);
    onClearData(countryInfo);

    const onCreateMarkupStart = array
      .map(
        ({ name, flags }) =>
          `<li style="display: flex; gap: 8px;  align-items: center; color: #10e713">
    <img src="${flags.svg}" alt="${name.official}" width="40" height="30">
    <p>${name.official}</p>
    </li>`
      )
      .join('');

    countryList.insertAdjacentHTML('beforeend', onCreateMarkupStart);
  } else {
    onClearData(countryList);
    onClearData(countryInfo);

    const onCreateMarkupEnd = array
      .map(
        ({ name, flags, capital, population, languages }) =>
          `
    <div>
            <img 
                src="${flags.svg}" 
                alt="${name.official}" 
                width="60"
                height="40">
        <div>    
            <h2 style="color: #042e0e">${name.official}</h2>
            <p><b>Capital:&nbsp</b>${capital}</p>
            <p><b>Population:&nbsp</b>${population}</p>  
            <p><b>languages:&nbsp</b>${Object.values(languages)}</p>
    </div>
    </div>`
      )
      .join('');

    countryList.insertAdjacentHTML('beforeend', onCreateMarkupEnd);
  }
}
