import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LongMenu from "./LongMenu";
import PublishArticle from "./ArrowUpward";
import {websocketBaseUrl} from './serverAdress';
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core//Icon";
import Badge from "@material-ui/core/Badge";
import ArticleListMain from "./ArticleListMain";
import ArrowUpward from "./ArrowUpward";

const styles = theme => ({
	layout: {
		width: 'auto',
		marginTop: theme.spacing.unit * 2,
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
	},
	toolbarMain: {
		borderBottom: `1px solid ${theme.palette.grey[300]}`,
	},
	toolbarTitle: {
		flex: 3,
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		marginTop: theme.spacing.unit * 8,
		padding: `${theme.spacing.unit * 6}px 0`,
	},
});

let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
let websocketHasOpen = false;
let messageNumber = 0;

function ArticleList(props) {
	const [messageNum, setMessageNum] = useState(0);
	const { classes } = props;
	useEffect(function () {
		if (websocketHasOpen) {
			return;
		}
		let url = websocketBaseUrl+"?phoneNumber="+userInfo.phoneNumber+"&password="+userInfo.password;
		const websocket = new WebSocket(url);
		console.log(url);
		console.log("开始连接");
		websocket.onopen = function (event) {
			console.log("连接成功");
			websocket.send("userId:" + userInfo.userId);
			websocketHasOpen = true;
		};
		websocket.onmessage = function (event) {
			console.log(event.data);
			if (event.data === "pong") {
				console.log("pong");
				setTimeout(function () {
					websocket.send("ping");
				}, 5000);
				return;
			}
			let jsonData = JSON.parse(event.data);
			if (jsonData.commentMessage != null) {
				let commentMessageList = JSON.stringify(JSON.parse(sessionStorage.getItem("commentMessageList")).push(jsonData));
				sessionStorage.setItem("commentMessageList", commentMessageList);
				messageNumber+=1;
				setMessageNum(messageNumber);
			} else if (jsonData.articleMessage != null) {
				let articleMessageList = JSON.stringify(JSON.parse(sessionStorage.getItem("articleMessageList")).push(jsonData));
				sessionStorage.setItem("articleMessageList", articleMessageList);
				messageNumber+=1;
				setMessageNum(messageNumber);
			}
		}
	});
	return (
		<React.Fragment>
			<PublishArticle/>
			<CssBaseline />
			<ArrowUpward/>
					<Toolbar className={classes.toolbarMain} id="pageStart">
						<Typography
							component="h2"
							variant="h5"
							color="inherit"
							align="left"
							noWrap
							className={classes.toolbarTitle}
						>
							家长社区
						</Typography>
						<Fab size="small" color="primary">
							<Icon>
								add
							</Icon>
						</Fab>
						<Badge badgeContent={messageNum} color="primary">
							<LongMenu/>
						</Badge>
					</Toolbar>
            <ArticleListMain/>
			{/* Footer */}
			<footer className={classes.footer}>
				<Typography variant="h6" align="center" gutterBottom>
					@myth 2019
				</Typography>
				<Typography variant="subtitle1" align="center" color="textSecondary" component="p">
					@2019 myth
				</Typography>
			</footer>
		</React.Fragment>
	);
}

ArticleList.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ArticleList);
