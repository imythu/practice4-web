import {Grid, Paper} from "@material-ui/core";
import React, {useState} from "react";
import Article from "../Article";
import LinkText from "../LinkText";
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';


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

function RelatedMe(props) {
    let messageList = JSON.parse(sessionStorage.getItem("messageList"));
    let noMessage = <Typography variant="h5" gutterBottom>
        {"暂无消息"}
    </Typography>;

    if (messageList == null || messageList.length === 0) {
        return noMessage;
    }

    const [articles, setArticles] = useState(messageList);
    const [endArticleId, setEndArticleId] = useState(-1);
    const { classes } = props;
    let articleItems = [];
    articles.forEach((article) => {
        article = JSON.parse(article);
        console.log(article.article);
        articleItems.push(
            <Article key={article['article']['articleId']} article={article}/>
        );
    });
    return (
        <Grid container spacing={40} className={classes.mainGrid} key={endArticleId}>
            {/* Main content */}
            <Grid key="1" item xs={12} md={8}>
                <Typography variant="h6" gutterBottom>
                    与我相关
                </Typography>
                <Divider />
                {articleItems.length == 0 ? noMessage : articleItems}
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

export default withStyles(styles)(RelatedMe);