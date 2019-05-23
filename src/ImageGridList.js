import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
	},
	gridList: {
		width: "100%",
		padding: "0px",
	},
});



function ImageGridList(props) {
	const { classes } = props;
	const imageList = props.imageList;
	return (
		<div className={classes.root}>
			<GridList cellHeight={130} className={classes.gridList} cols={3}>
				{imageList.map(image => (
					<GridListTile key={image["imageId"]} cols={1}>
						<img src={image['imageUrl']} alt={image['imageId'+"加载失败"]} />
					</GridListTile>
				))}
			</GridList>
		</div>
	);
}

ImageGridList.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageGridList);
