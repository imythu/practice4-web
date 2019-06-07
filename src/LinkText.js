import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Link from '@material-ui/core/Link'


const styles = theme => ({
    fab: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});

function LinkText(props) {
    const { classes } = props;
    return (
        <div>
            <Fab variant="extended" aria-label="Delete" className={classes.fab}>
                <NavigationIcon className={classes.extendedIcon} />
                <Link
                    onClick={() => {
                        window.location.href = "https://github.com/imythu/practice4";
                    }}
                >
                    GitHub
                </Link>
            </Fab>
        </div>
    );
}

LinkText.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinkText);