# NYT-Top-News

#### A static, single-page, serverless web app

This webpage displays the top ten results from various sections of the 
New York Times Top Stories API. When the DOM is ready, stories display 
from the "Home" section. Clicking one of several dynamically rendered 
button elements (each bound to a click event) will change the displayed
section and re-render story details. Results can also be filtered using
a single keyword containing up to 35 alphanumeric characters. Validation of this input is achieved with regular expression matching and character relacements that occur any time the input value changes.

#### Technologies used:
- HTML/CSS
- Bootstrap
- Javascript
- JQuery
- AJAX GET request
- NYT Top Stories API
- Moment.js and Moment.tx
- Font-Awesome icons