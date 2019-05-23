import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
	root: {
		flexGrow: 1,
		marginTop: "10px",
	},
};

function LinearIndeterminate(props) {
	const { classes } = props;
	return (
		<div className={classes.root}>
			<Typography align="center" variant="h6">
				加载中......
			</Typography>

			<LinearProgress key={"blue"} />
			<br />

			<LinearProgress key={"red"} color="secondary" />
		</div>
	);
}

LinearIndeterminate.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearIndeterminate);
