/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
import './bootstrap.js';
import './styles/app.css';
import './styles/scss/app.scss';

// import './js/material-dashboard/material-dashboard.js'; // any JS you import will output into a single css file (app.js in this case)
// import './styles/scss/material-dashboard.scss'; // any CSS you import will output into a single css file (app.css in this case)

// jQuery stuff
import jquery from 'jquery';
const $ = jquery;
window.$ = window.jQuery = $;

document.addEventListener('turbo:before-cache', (event) => {
    // You can repair broken bootstrap here
});

$(document).ready(function () {
    // console.log('Test jQuery'); TODO::DELETE
})