import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';

import { addNote, deleteNote } from '../actionCreators/statistics';
import StatisticsTable from './StatisticsTable';
import AddForm from './AddForm';
import Chart from './Chart';

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

        const common = bills.concat(salary).concat(shopping)
            .forEach(v => moment(v.date, "DD-MM-YYYY HH:mm:ss"))
            .sortBy(v => moment(v.date).unix);

        return (
            <div>
                <div className={classes.container}>
                    <Typography className={classes.typography}>Salary</Typography>
                    <StatisticsTable
                        userId={userId}
                        type="salary"
                        entities={salary}
                        deleteNote={deleteNote}
                    />
                    <AddForm addNote={addNote} userId={userId} />
                </div>
                <div className={classes.container}>
                    <Typography className={classes.typography}>Bills</Typography>
                    <StatisticsTable
                        userId={userId}
                        type="bills"
                        entities={bills}
                        deleteNote={deleteNote}
                    />
                    <AddForm addNote={addNote} userId={userId} />
                </div>
                <div className={classes.container}>
                    <Typography className={classes.typography}>Shopping</Typography>
                    <StatisticsTable
                        userId={userId}
                        type="shopping"
                        entities={shopping}
                        deleteNote={deleteNote}
                    />
                    <AddForm addNote={addNote} userId={userId} />
                </div>
                <div className={classes.container}>
                    <Typography className={classes.typography}>Common</Typography>
                    <StatisticsTable
                        type="common"
                        entities={common}
                    />
                </div>
                <div className={classes.container}>
                    <Chart />
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