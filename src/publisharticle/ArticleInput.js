import axios from "axios";
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from "@material-ui/core/Paper"
import TextField from '@material-ui/core/TextField';
import {serverAddressHeadForCommunity} from "../serverAdress";
import Button from "@material-ui/core/Button";
import ImageGridList from "../ImageGridList";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    submitBtn: {
        display: "block",
        margin: "0 auto",
    }
});
let initFiles;

class ArticleInput extends React.Component{

    state = {
        title: "",
        content: "",
        imageList: [],
    };

    handleChange = optionName => event => {
        if (optionName === "files") {
            let files = event.target.files;
            if (files.length > 9) {
                alert("最多9张");
                event.target.value = "";
                return;
            }
            let images = [];
            for (let i = 0;i < files.length;i++) {
                // console.log(files.item(i));
                if (files.item(i).size > 1024000) {
                    alert("不能有超过1M的图片");
                    event.target.value = "";
                    return;
                }
                let fileReader = new FileReader();
                fileReader.readAsDataURL(files.item(i));
                fileReader.onload = (ev => {
                    let url = ev.target.result;
                    images.push({
                        imageId: files.item(i).name,
                        imageUrl: url,
                    });
                    this.setState({
                        imageList: images
                    });
                });
                console.log(files.item(i).name);
            }
        } else {
            this.setState({
                [optionName]: event.target.value,
            });
        }
    };

    render() {
        const { classes } = this.props;
        let images = [];
        return (
            <Paper className={classes.container}>
                <form id={"articleForm"} action={serverAddressHeadForCommunity + "publishArticle"} method={"post"} encType="multipart/form-data">
                <TextField
                    id="title"
                    name={"articleTitle"}
                    fullWidth
                    label="贴子标题"
                    className={classes.textField}
                    onChange={this.handleChange("title")}
                    value={this.state.title}
                    helperText="输入贴子标题!"
                    margin="normal"
                    variant="outlined"
                    required={true}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="content"
                    name={"articleContent"}
                    label="贴子内容"
                    style={{ margin: 8}}
                    helperText="输入贴子正文!"
                    fullWidth
                    required={true}
                    type="textarea"
                    margin="normal"
                    rows={5}
                    multiline={true}
                    rowsMax={10}
                    value={this.state.content}
                    onChange={this.handleChange("content")}
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="images"
                    name={"imageFiles"}
                    label="图片"
                    style={{ margin: 8}}
                    helperText="添加图片!"
                    fullWidth
                    margin="normal"
                    type="file"
                    inputProps={
                        {
                            multiple: "multiple",
                            accept: "image/*",
                        }
                    }
                    onChange={this.handleChange("files")}
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <ImageGridList imageList={this.state.imageList} />
                <Button onClick={() => {
                    let formData = new FormData(document.getElementById("articleForm"));
                    axios({
                        url: serverAddressHeadForCommunity + "publishArticle",
                        data: formData,
                        contentType: "multipart/form-data",
                        method: "post",
                    }).then(function (res) {
                        if (res.data.result === 1) {
                            alert("发布成功");
                            window.history.back();
                        }
                    }).catch(function (err) {
                        console.log(err);
                        alert("网络错误");
                    });
                    console.log(formData);
                }} className={classes.submitBtn}>
                    上传
                </Button>
                </form>
            </Paper>
        );
    }
}

export default withStyles(styles)(ArticleInput);