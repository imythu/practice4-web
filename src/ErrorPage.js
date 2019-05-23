import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
	card: {
		maxWidth: 400,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	avatar: {
		backgroundColor: red[500],
	},
});

class ErrorPage extends React.Component {

	render() {
		const { classes } = this.props;
		const imageSrc = this.props.imageSrc == null ? "https://imyth.top/defaultHead.png" : this.props.imageSrc;
		const errorTitle = this.props.errorTitle == null ? "错误" : this.props.errorTitle;
		return (
			<Card className={classes.card}>
				<CardHeader
					avatar={
						<Avatar aria-label="Recipe" className={classes.avatar}>
							500
						</Avatar>
					}
					title={

						<Typography component="h1" light="true">
							{errorTitle}
						</Typography>
					}
				/>
				<CardMedia
					className={classes.media}
					image={imageSrc}
				/>
			</Card>
		);
	}
}

ErrorPage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ErrorPage);
