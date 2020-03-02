// The following line makes sure your styles are included in the project. Don't remove this.
import "../styles/main.scss";
// Import any additional modules you want to include below \/
import "regenerator-runtime/runtime";
import Handlebars from "handlebars";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

let source = document.getElementById(`countries-temp`).innerHTML;
const template = Handlebars.compile(source);

Handlebars.registerHelper("lang", function(languages) {
  return languages
    .map(element => {
      return element.name;
    })
    .join(", ");
});

const baseUrl = "https://restcountries.eu/rest/v2/all";

document.addEventListener("DOMContentLoaded", () => {
  fetch(baseUrl)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`${res.status} ${res.statusText}`);
      }
    })
    .then(data => {
      let country = data;
      document.querySelector(`.countryCards`).innerHTML = template({ country });
    })
    .catch(e => {
      console.log(e);
    });
});
