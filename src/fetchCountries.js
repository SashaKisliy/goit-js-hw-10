import axios from "axios";
export 

function fetchCountries(name) {
    axios.get(`https://restcountries.com/v3.1/name/${name}`)
    .then(function (response) {
        // handle success
        console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });
};