import PropTypes from "prop-types"
import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/styles';
import ImageGridList from './ImageGridList';
import {unstable_Box as Box} from '@material-ui/core/Box';
import Slide from "@material-ui/core/Slide";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Card from "@material-ui/core/Card";
import {serverAddressHeadForCommunity, serverAddressHeadForUser} from './serverAdress';
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";


const useStyles = makeStyles({
	root: {
		padding: '1rem 10px',
		flexDirection: 'column',
		alignItems: 'flex-start',
		marginTop: "10px",
	},
});
function Article(props) {
	let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
	const classes = useStyles();
	const [article, setArticle] = useState(props.article);
	const [open, switchOpen] = useState(false);

	let favoriteIcon = <Icon light="true" text="true">favorite</Icon>;
	let favoriteBorderIcon = <Icon light="true" text="true">favorite_border</Icon>;
	const [favorite, setFavoriteBorder] = useState(article.isFocus ? favoriteIcon : favoriteBorderIcon);
	const [replyToUserName, setReplyToUserName] = useState("楼主");
	const [focusNum, setFocusNum] = useState(article.focusNumber);
	const [sendComment, setSendComment] = useState({
		userId: userInfo.userId,
		articleId: article.article.articleId,
		replyToUserId: null,
		commentContent: "test"
	});

	const addComment = function () {
		console.log(sendComment)
		let jsonData = JSON.stringify(sendComment);

		axios.defaults.withCredentials=true;
		axios({
			method: "post",
			url: serverAddressHeadForCommunity + 'publishComment',
			responseType: "json",
			headers: {
				"Content-Type": "application/json; charset=utf-8"},
			data: jsonData
		}).then(function (res) {
			// console.log("返回"+res.data);
			if (res.data != null) {
				article.replyNum+=1;
				article.commentList.push(res.data);
				setArticle(article);
				switchOpen(false);
			} else {
				console.log("评论失败")
			}
		}).catch(function (error) {
			console.log(error);
		})
	};
	let images = [];
	article.imageList.forEach((item) => {
		if (item.imageUrl.indexOf("http") >= 0) {
			images.push(item);
		} else {
			images.push({
				imageId: item.imageId,
				imageUrl: serverAddressHeadForCommunity + "getArticleImage/" + item.imageUrl
			});
		}
	});
	article.imageList = images;
	return (
		<Card className={classes.root}>
			<Box mb="5px">
				<Grid container spacing={8}>
					<Grid item>
						<Box
							display="flex"
							height="100%"
							justifyContent="flex-end"
							alignItems="center"
							minWidth={49}
						>
							<Icon light="true" text="true">
								head
							</Icon>
						</Box>
					</Grid>
					<Grid item>
						<Typography light="true">{article['userNickname']}</Typography>
					</Grid>
				</Grid>
			</Box>
			<Grid container spacing={8} wrap="nowrap">
				<Grid item>
					<Avatar
						medium="true"
						src={
							serverAddressHeadForUser + "getHeadImage?userId=" + (article['userId'] == null ? 0 : article['userId'])
						}
					/>
				</Grid>
				<Grid item>
					<Grid container spacing={16}>
						<Grid item xs={12}>
							<Typography variant="h5" bold="true" inline>
								{article['article']['articleTitle']}
							</Typography>
							<Typography light="true">
								{' '}
							</Typography>
							<Typography variant="caption" light="true" inline>
								{article['article']['gmtCreate']}
							</Typography>
							<Typography light="true" />
							<Typography light="true" inline>
							</Typography>
							<Typography paragraph variant="body2">
								{article['article']['articleContent']}
							</Typography>
						</Grid>
						<ImageGridList key={article['article']['articleId']} imageList={article['imageList']}/>
						<Grid item xs={12}>
							<Box ml="-12px" display="inline-flex" alignItems="center">
								<IconButton onClick={() => {
									sendComment.replyToUserId = null;
									setReplyToUserName("楼主");
									switchOpen(true);
								}}>
									<Icon light="true" text="true">
										mode_comment
									</Icon>
								</IconButton>
								<Typography variant="caption" light="true" inline>
									{article['replyNum']}
								</Typography>
							</Box>
							<Box ml="32px" display="inline-flex" alignItems="center">
								<IconButton danger="true" onClick={() => {
									let focusArticlesIdList = JSON.parse(sessionStorage.getItem("focusArticlesId"));
									axios.defaults.withCredentials=true;
									// console.log(article.article.articleId);
									let index = focusArticlesIdList.indexOf(article.article.articleId);
									if (index >= 0) {
										axios({
											url: serverAddressHeadForCommunity + "unFocusArticle?userId="+userInfo.userId+"&articleId="+article.article.articleId,
											method: "post",
											contentType: "application/x-www-form-urlencoded",
											responseType: "json"
										}).then(res => {
											console.log(res.data.result);
											if (res.data.result === 1) {
												focusArticlesIdList.splice(index);
												sessionStorage.setItem("focusArticlesId", JSON.stringify(focusArticlesIdList));
												// console.log(article);
												setFocusNum(focusNum - 1);
												setFavoriteBorder(favoriteBorderIcon);
											} else {
												console.log("取消收藏失败")
											}
										})
									} else {
										axios({
											url: serverAddressHeadForCommunity + "focusArticle?userId="+userInfo.userId+"&articleId="+article.article.articleId,
											method: "post",
											responseType: "json"
										}).then(res => {
											if (res.data.result === 1) {
												focusArticlesIdList.push(article.article.articleId);
												sessionStorage.setItem("focusArticlesId", JSON.stringify(focusArticlesIdList));
												setFavoriteBorder(favoriteIcon);
												setFocusNum(focusNum + 1);
											} else {
												alert("收藏失败");
											}
										}).catch(err => {
											console.log(err);
											alert("错误，收藏失败");
										});
									}
								}}>
									{favorite}
								</IconButton>
								<Typography variant="caption" light="true" inline danger="true">
									{focusNum}
								</Typography>
							</Box>
						</Grid>
								{article['commentList'].map((comment) => (
									<div key={comment.commentId}onClick={()=> {
										setReplyToUserName(comment.myNickname);
										sendComment.replyToUserId = comment.myUserId;
										switchOpen(true);
									}}>
										<Typography  color="textSecondary">
											{"@"+comment.myNickname}
											{comment['replyToUserNickname'] == null ? "回复@楼主: " : (" 回复@" + comment['replyToUserNickname']) + "： "}
											{comment['commentContent']}
										</Typography>
									</div>
								))}
						<Dialog
							open={open}
							TransitionComponent={Transition}
							onClose={()=> {
								switchOpen(false);
							}}
						>
							<DialogContent>
								<TextField
									autoFocus
									margin="dense"
									id="commentInput"
									label={"回复@"+replyToUserName}
									type="text"
									fullWidth
								/>
							</DialogContent>
							<DialogActions>
								<Button onClick={()=> {
									switchOpen(false);
								}} color="primary">
									取消
								</Button>
								<Button onClick={() => {
									sendComment.commentContent = document.getElementById("commentInput").value.trim();
									if (sendComment.commentContent === "" ) {
										alert("输入为空");
										return;
									}
									addComment();
								}} color="primary">
									回复
								</Button>
							</DialogActions>
						</Dialog>
					</Grid>
				</Grid>
			</Grid>
		</Card>
	);
}


function Transition(props) {
	return <Slide direction="up" {...props} />;
}


Article.propTypes = {
	article: PropTypes.object.isRequired,
};

export default Article;