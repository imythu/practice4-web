import ReactDOM from 'react-dom';
import React from 'react';
import ArticleList from './ArticleList';
import {serverAddressHeadForCommunity, serverAddressHeadForUser} from './serverAdress';
import axios from 'axios';
import ErrorPage from './ErrorPage'
import LinearIndeterminate from './LinearIndeterminate';
import './css/MaterialIcons.css';
import './font/materialfont.woff2';

let userInfo = {};
axios.defaults.withCredentials=true;
axios.defaults.responseType="json";
let userId;

ReactDOM.render(<LinearIndeterminate />, document.querySelector('#app'));
window.onload = function () {
	login();
}
// ReactDOM.render(<LinearIndeterminate />, document.querySelector('#app'));
function login() {
	let currentUrl = window.location.href;
	let suffix = currentUrl.substring(currentUrl.indexOf("?"));
	userInfo.phoneNumber = userInfo.phoneNumber == null ? suffix.substring(13, suffix.indexOf("&")) : userInfo.phoneNumber;
	userInfo.password = userInfo.password == null ? suffix.substring(suffix.indexOf("&password")+10) : userInfo.password;
	if (userInfo.password.indexOf("#") > 0 ) {
		userInfo.password = userInfo.password.substring(0, userInfo.password.indexOf("#"));
	}
	axios({
		method: 'post',
		url: serverAddressHeadForUser + "login?phoneNumber="+userInfo.phoneNumber+"&password="+userInfo.password
	}).then(function (res) {
		let resultJson = res.data;
		if (resultJson['result'] > 0) {
			userId = resultJson['result'];

			axios({
				url: serverAddressHeadForCommunity + "getMyFocusArticlesId?userId="+userId,
				method: "get",
				responseType: "json",
			}).then(res => {
				sessionStorage.setItem("focusArticlesId", JSON.stringify(res.data.result));
			}).catch(err => {
				console.log(err);
			});

			userInfo.userId = userId;
			// console.log("登录成功")
			// ReactDOM.render(<ErrorPage errorTitle="登录成功" />, document.querySelector('#app'));
			sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
			let commentMessageList = [];
			sessionStorage.setItem("commentMessageList", JSON.stringify(commentMessageList));
			let articleMessageList = [];
			sessionStorage.setItem("articleMessageList", JSON.stringify(articleMessageList));
			renderHomePage();
			// getNewestArticles();
		} else {
			renderNotLoginPage();
		}
	}).catch(function (error) {
		console.log(error);
		renderNetworkErrorPage();
	})
}

function renderHomePage() {
	ReactDOM.render(<ArticleList />, document.querySelector('#app'));
}

function renderNotLoginPage() {
	ReactDOM.render(<ErrorPage errorTitle="登录检查失败" />, document.querySelector('#app'));
}
function renderNetworkErrorPage() {
	ReactDOM.render(<ErrorPage errorTitle="网络错误" />, document.querySelector('#app'));
}