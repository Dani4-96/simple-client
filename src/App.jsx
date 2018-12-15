import React from 'react'
import { CssBaseline, AppBar, Toolbar, Typography, Button, IconButton } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

export default () => (
    <div>
        <AppBar position="static">
            <Toolbar>
                <IconButton color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit">
                    App
                </Typography>
                <Button color="inherit">Button</Button>
            </Toolbar>
        </AppBar>
        <CssBaseline />
        <h1>Simple react client</h1>
    </div>
);
