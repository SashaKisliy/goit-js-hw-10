import './css/styles.css';
import './fetchCountries.js'
import debounce from 'lodash.debounce';
import axios from 'axios';
import Notiflix, { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;


const searchCountryInput = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchCountryInput.addEventListener('input', debounce(takeSearhсParam, DEBOUNCE_DELAY));

function takeSearhсParam(e) {
    let orderCountry = e.target.value.trim();
    if (orderCountry === '') {
        countryList.innerHTML = '';
        return;
    }

    fetchCountries(orderCountry).then(createCountryList)
}

function fetchCountries(name) {
    return axios.get(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then(res => {
        return res.data}).catch(notFound);
};


function createCountryList(countries) {
        clearCountryContainer();
        if (countries.length >= 2 && countries.length <= 10) {
            countries.forEach(({name, flags}) => {
                const contentEl = `<li class="country-item">
                <img class="country-flag" src="${flags.svg}" alt="${name.common}">
                <p class="country-name">${name.common}</p>
                </li>`;
                countryList.insertAdjacentHTML('beforeend', contentEl)
            }
            )
        }
        if (countries.length === 1) {
            clearCountryContainer();
            countries.forEach(({name, flags, capital, population, languages}) => {
                const contentEl = `<img class="country-flag" src="${flags.svg}" alt="${name.common}">
                <h1 class="country-title"> ${name.common}</h1>
                <p class="countrys"><b>Capital:</b> ${capital}</p>
                <p class="countrys"><b>Population:</b> ${population}</p>
                <p class="countrys"><b>Languages:</b> ${Object.values(languages)}</p>`;
                countryInfo.insertAdjacentHTML('beforeend', contentEl);
            }
            )
        }

        if(countries.length > 10) {
            manyFound();
        }
        };


        function manyFound () {
                Notify.info('Too many matches found. Please enter a more specific name.', {
                    width: '500px',
                    position: 'center-top',
                })
            };

 q  
        function notFound () {
            Notify.failure('Oops, there is no country with that name', {
                width: '500px',
                position: 'center-top',
            })
        }

        function clearCountryContainer() {
            countryList.innerHTML = '';
            countryInfo.innerHTML = '';
        }




// function renderCountry(container, content) {
//     container.innerHTML = '';
//     container.insertAdjacentHTML('beforeend', content)
// }