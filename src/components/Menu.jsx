import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { IconButton, SwipeableDrawer, ListItem, ListItemText, CircularProgress, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    menu: {
        width: 250,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Menu extends Component {
    state = {
        openMenu: false,
    };

    toggleDrawer = open => () => {
        this.setState({
            openMenu: open,
        });
    };

    render() {
        const { classes, location, history, users, loading, loadStatistics } = this.props;

        const sideList = (
            loading
            ? <CircularProgress />
            : <div className={classes.menu}>
                <ListItem
                    label="list item"
                    key="main"
                    button
                    onClick={() => {
                        if (location.pathname !== `/`) {
                            history.push(`/`);
                        }
                    }}
                >
                    <ListItemText primary="Main" />
                </ListItem>
                {users.map(user => (
                    <ListItem
                        label="list item"
                        key={user.id}
                        button
                        onClick={() => {
                            if (location.pathname !== `/${user.name}`) {
                                loadStatistics(user.id);
                                history.push(`/${user.name}`);
                            }
                        }}
                    >
                        <ListItemText primary={user.name} />
                    </ListItem>
                ))}
            </div>
        );

        return (
            <div>
                <IconButton
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="Menu"
                    onClick={this.toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>
                <SwipeableDrawer
                    label="swipeable menu"
                    open={this.state.openMenu}
                    onOpen={this.toggleDrawer(true)}
                    onClose={this.toggleDrawer(false)}
                >
                    <div
                        label="closing menu"
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer(false)}
                        onKeyDown={this.toggleDrawer(false)}
                    >
                        {sideList}
                    </div>
                </SwipeableDrawer>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(Menu));