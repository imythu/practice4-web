import '../css/MaterialIcons.css';
import '../font/materialfont.woff2';
import ReactDOM from 'react-dom';
import React from 'react';
import ArticleInput from "./ArticleInput";

window.onload = function () {
    ReactDOM.render(<ArticleInput />, document.querySelector('#app'));
};