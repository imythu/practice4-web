import React, {useEffect, useState} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LinkText from './LinkText'
import Divider from '@material-ui/core/Divider';
import Article from './Article';
import {serverAddressHeadForCommunity} from "./serverAdress";
import axios from 'axios';
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import LinearIndeterminate from "./LinearIndeterminate";
import InfiniteScroll from "react-infinite-scroller";

const styles = theme => ({
    mainGrid: {
        marginTop: theme.spacing.unit,
    },
    sidebarAboutBox: {
        padding: theme.spacing.unit * 2,
        backgroundColor: theme.palette.grey[200],
    },
    sidebarSection: {
        marginTop: theme.spacing.unit * 3,
    },
    loadBtn: {
        display: "block",
        margin: "0 auto",
    }
});

function ArticleListMain(props) {
    const [articles, setArticles] = useState([]);
    const [endArticleId, setEndArticleId] = useState(-1);
    const [hasMore, setHasMore] = useState(true);
    const { classes } = props;
    let articleItems = [];
    articles.map((article) => (
        articleItems.push(
            <Article key={article['article']['articleId']} article={article}/>
        )
    ));
    return (
        <Grid container spacing={40} className={classes.mainGrid} key={endArticleId}>
            {/* Main content */}
            <Grid key="1" item xs={12} md={8}>
                <Typography variant="h6" gutterBottom>
                    最新贴子
                </Typography>
                <Divider />
                <InfiniteScroll
                    key={endArticleId}
                    threshold={480}
                    pageStart={1}
                    loadMore={() => {
                        axios.defaults.withCredentials=true;
                        axios({
                            method: "get",
                            url: serverAddressHeadForCommunity + 'getNewestArticles?endArticleId=' + endArticleId,
                            responseType: "json",
                        }).then(function (res) {
                            if (res.data == null || res.data.length === 0) {
                                setHasMore(false);
                                return;
                            }
                            let focusArticlesId = JSON.parse(sessionStorage.getItem("focusArticlesId"));
                            res.data.forEach(item => {
                                if (focusArticlesId.indexOf(item.article.articleId) >= 0) {
                                    // console.log("关注了" + item.article.articleId);
                                    item.isFocus = true;
                                } else {
                                    // console.log("未关注" + item.article.articleId);
                                    item.isFocus = false;
                                }
                                // console.log(item);
                                articles.push(item);
                            });
                            setArticles(articles);
                            setEndArticleId(res.data[res.data.length-1].article.articleId);
                        }).catch(function (error) {
                            console.log(error);
                        });
                    }}
                    hasMore={hasMore}
                    loader={<LinearIndeterminate key={articles.length} />}
                    useWindow={true}>
                    {articleItems}
                </InfiniteScroll>
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
    );
}

export default withStyles(styles)(ArticleListMain);