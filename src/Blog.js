import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LinkText from './LinkText'
import Divider from '@material-ui/core/Divider';
import LongMenu from "./LongMenu";
import PublishArticle from "./ArrowUpward";
import {makeStyles} from '@material-ui/styles';
import Article from './Article';
import InfiniteScroll from 'react-infinite-scroller';
import {serverAddressHeadForCommunity} from "./serverAdress";
import axios from 'axios';
import LinearIndeterminate from './LinearIndeterminate'
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core//Icon";


const styles = theme => ({
	layout: {
		width: 'auto',
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
	},
	toolbarMain: {
		borderBottom: `1px solid ${theme.palette.grey[300]}`,
	},
	toolbarTitle: {
		flex: 3,
	},
	toolbarSecondary: {
		justifyContent: 'space-between',
	},
	mainGrid: {
		marginTop: theme.spacing.unit,
	},
	markdown: {
		padding: `${theme.spacing.unit * 3}px 0`,
	},
	sidebarAboutBox: {
		padding: theme.spacing.unit * 2,
		backgroundColor: theme.palette.grey[200],
	},
	sidebarSection: {
		marginTop: theme.spacing.unit * 3,
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		marginTop: theme.spacing.unit * 8,
		padding: `${theme.spacing.unit * 6}px 0`,
	},
	avatar: {
		margin: 10,
		width: 30,
		height: 30,
	},
});
let articles = [{}];

function Blog(props) {
	articles = props.articles;
	const [endArticleId, setEndArticleId] = useState(articles[articles.length - 1].article.articleId);
	const { classes } = props;
	let mapArticles = articles.slice();
	return (
		<React.Fragment>
			<PublishArticle/>
			<CssBaseline />
			<Paper id="pageStart">
				<div className={classes.layout}>
					<Toolbar className={classes.toolbarMain}>
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
						<LongMenu/>
					</Toolbar>
					<main>
						<Grid container spacing={40} className={classes.mainGrid}>
							{/* Main content */}
							<Grid key="1" item xs={12} md={8}>
								<Typography variant="h6" gutterBottom>
									最新贴子
								</Typography>
								<Divider />
								<Paper>
									<InfiniteScroll
										key={endArticleId}
										threshold={480}
										pageStart={1}
										loadMore={() => {
											axios.defaults.withCredentials=true;
											axios({
												method: "get",
												url: serverAddressHeadForCommunity + 'getNewestArticles?endArticleId='+endArticleId,
												responseType: "json",
											}).then(function (res) {
												res.data.forEach(item => {
													articles.push(item);
												})
												articles = res.data;
												let end = articles[articles.length - 1]['article']['articleId'];
												setEndArticleId(end);
											}).catch(function (error) {
												console.log(error);
											})
										}}
										hasMore={true}
										loader={<LinearIndeterminate key={articles.length} />}
										useWindow={true}>
										{mapArticles.map((article, index) => (
											<Paper key={Math.random()}>
												<Article key={articles[index]['article']['articleId']} article={articles[index]}/>
											</Paper>
										))}
									</InfiniteScroll>
								</Paper>
							</Grid>
							{/* End main content */}
							{/* Sidebar */}
							<Grid key="2" item xs={12} md={4}>
								<Paper elevation={0} className={classes.sidebarAboutBox}>
									<Typography key="3" variant="h6" gutterBottom>
										关于我们
									</Typography>
									<Typography key = "4">
										工程实践4xxx项目开发团队
									</Typography>
								</Paper>
								<Typography key="7" variant="h6" gutterBottom className={classes.sidebarSection}>
									项目地址
								</Typography>
								<LinkText/>
							</Grid>
							{/* End sidebar */}
						</Grid>
					</main>
				</div>
				{/* Footer */}
				<footer className={classes.footer}>
					<Typography variant="h6" align="center" gutterBottom>
						@myth 2019
					</Typography>
					<Typography variant="subtitle1" align="center" color="textSecondary" component="p">
						@2019 myth
					</Typography>
				</footer>
			</Paper>
			{/* End footer */}
		</React.Fragment>
	);
}

Blog.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Blog);
