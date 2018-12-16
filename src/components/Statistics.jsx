import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { addNote, deleteNote } from '../actionCreators/statistics';
import StatisticsTable from './StatisticsTable';
import AddForm from './AddForm';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 800,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    typography: {
        margin: 20,
    },
};

class Statistics extends Component {
    render() {
        const { classes, bills, salary, shopping, userId, addNote, deleteNote } = this.props;

        return (
            <div>
                <div className={classes.container}>
                    <Typography className={classes.typography}>Salary</Typography>
                    <StatisticsTable
                        useId={userId}
                        type="salary"
                        entities={salary}
                        color="green"
                        deleteNote={deleteNote}
                    />
                    <AddForm />
                </div>
                <div className={classes.container}>
                    <Typography className={classes.typography}>Bills</Typography>
                    <StatisticsTable
                        useId={userId}
                        type="bills"
                        entities={bills}
                        color="red"
                        deleteNote={deleteNote}
                    />
                </div>
                <div className={classes.container}>
                    <Typography className={classes.typography}>Shopping</Typography>
                    <StatisticsTable
                        useId={userId}
                        type="shopping"
                        entities={shopping}
                        color="red"
                        eleteNote={deleteNote}
                    />
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        userId: state.statistics.userId,
        bills: state.statistics.bills,
        salary: state.statistics.salary,
        shopping: state.statistics.shopping,
        loading: state.statistics.loading,
        loaded: state.statistics.loaded,
        error: state.statistics.error,
    }),
    { addNote, deleteNote }
)(withStyles(styles)(Statistics));