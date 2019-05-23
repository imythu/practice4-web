import ReactDOM from 'react-dom';
import React from 'react';
import Blog from './Blog';
import {serverAddressHeadForCommunity, serverAddressHeadForUser} from './serverAdress';
import axios from 'axios';
import ErrorPage from './ErrorPage'
import LinearIndeterminate from './LinearIndeterminate';
import userInfo from './UserInfo';

axios.defaults.withCredentials=true;
axios.defaults.responseType="json";
let articles = [{}];
let userId;

ReactDOM.render(<LinearIndeterminate />, document.querySelector('#app'));
window.onload = function () {
	login();
}
// ReactDOM.render(<LinearIndeterminate />, document.querySelector('#app'));
function login() {
	let currentUrl = window.location.href;
	let suffix = currentUrl.substring(currentUrl.indexOf("?"));
	axios({
		method: 'post',
		url: serverAddressHeadForUser + "login" + suffix,
	}).then(function (res) {
		let resultJson = res.data;
		if (resultJson['result'] > 0) {
			userId = resultJson['result'];
			userInfo.userId = userId;
			// console.log("登录成功")
			// ReactDOM.render(<ErrorPage errorTitle="登录成功" />, document.querySelector('#app'));
			getNewestArticles();
		} else {
			renderNotLoginPage();
		}
	}).catch(function (error) {
		console.log(error);
		renderNetworkErrorPage();
	})
}

function getNewestArticles() {
	axios({
        method: "get",
        url: serverAddressHeadForCommunity + 'getNewestArticles?endArticleId=-1',
    }).then(function (res) {
			articles = res.data;
			renderHomePage();
	}).catch(function (error) {
	    console.log(error);
		articles = [{}];
		renderNetworkErrorPage();
	})
}

function renderHomePage() {
	ReactDOM.render(<Blog userId={userId} articles={articles} />, document.querySelector('#app'));
}

function renderNotLoginPage() {
	ReactDOM.render(<ErrorPage errorTitle="登录检查失败" />, document.querySelector('#app'));
}
function renderNetworkErrorPage() {
	ReactDOM.render(<ErrorPage errorTitle="网络错误" />, document.querySelector('#app'));
}