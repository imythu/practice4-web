import {Grid, Paper} from "@material-ui/core";
import React from "react";
import Article from "../Article";
import ReactDOM from "react-dom";
import ArticleList from "../ArticleList";

function RelatedMe(props) {
    let articleMessageList = JSON.parse(sessionStorage.getItem("articleMessageList"));
    let commentMessageList = JSON.parse(sessionStorage.getItem("commentMessageList"));
console.log(articleMessageList);
    let items = articleMessageList.map((item) => (
        <Article article={item}/>
    ));
    if (articleMessageList.length == 0 && commentMessageList.length == 0) {
        items = <Paper>
            <Paper onClick={function (event) {

                ReactDOM.render(<ArticleList />, document.querySelector('#app'));
            }}>返回</Paper>
            <Paper>暂无消息</Paper>
        </Paper>;
    }

    return (
        <Paper>
            {items}
        </Paper>
    );
}

export default RelatedMe;