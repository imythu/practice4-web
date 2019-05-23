import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from "@material-ui/core/Icon";

const styles = theme => ({
    absolute: {
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3,
    },
});

function ArrowUpward(props) {
    const { classes } = props;
    return (
        <div>
            <Tooltip title="发布贴子" aria-label="发布帖子"
                     onClick={() => {
                     	window.location.href="#pageStart";
                     }}
            >
                <Fab className={classes.absolute}>
                    <Icon>
	                    arrow_upward
                    </Icon>
                </Fab>
            </Tooltip>
        </div>
    );
}

ArrowUpward.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ArrowUpward);
