import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import {CssBaseline, AppBar, Toolbar, Typography } from "@material-ui/core";

import Main from './Main';
import Menu from './Menu';
import Statistics from './Statistics';
import { loadUsers } from '../actionCreators/users';
import { loadStatistics } from '../actionCreators/statistics';

class App extends Component {
    componentDidMount() {
        this.props.loadUsers();
    }

    render() {
        const { users, loading, loadStatistics } = this.props;

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Menu users={users} loading={loading} loadStatistics={loadStatistics} />
                        <Typography variant="h6" color="inherit">
                            App
                        </Typography>
                    </Toolbar>
                </AppBar>
                <CssBaseline />
                <Switch>
                    <Route key="main" exact path="/" component={Main} />
                    {users.map(user => <Route key={user.id} path={`/${user.name}`} component={Statistics} />)}
                </Switch>
            </div>
        );
    }
}

export default connect(
    state =>
        ({
            users: state.users.entities,
            loading: state.users.loading,
            loaded: state.users.loaded,
            error: state.users.error
        }),
    { loadUsers, loadStatistics }
)(App);
