import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';

import { addNote, deleteNote } from '../actionCreators/statistics';
import StatisticsTable from './StatisticsTable';
import AddForm from './AddForm';
import Chart from './Chart';
import { getDateArray } from '../lib/utils';

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
            .sortBy(v => moment(v.date).unix())
            .reverse();

        const a = common.map(v => ({
            id: v.id,
            description: v.description,
            amount: v.amount,
            date: moment(v.date).format('DD-MM-YYYY'),
            userId: v.userId,
        }))

            .groupBy(v => v.date)
            .map(v => v.reduce((acc, val) => acc + val.amount, 0));


        const h = (arr, fn) => {
            return arr.reduce(function (prev, current) {
                return prev.concat(fn(current));
            }, []);
        };


        const b = a.reduce((acc, val) => acc + val)
          //const b = a.reduce((acc, val) => acc + val)
         //const b = a.map((v, k, i) => v + i[k])
        console.log("LOG", b)



        // const startDate = moment(common.last().get('date')).format('YYYY-MM-DD');
        //
        // const dateList = getDateArray(startDate, Date.now()).map(v => ({
        //     date: moment(v).format('YYYY-MM-DD'),
        //     amount: 0,
        // }));
        //
        // dateList.forEach(listElement =>
        //     common.forEach(entity =>
        //         listElement.date === entity.date ? listElement.count = entity.count : entity));
        //
        // const labels = dateList.map(v => moment(v.date).format('DD.MM.YY'));
        // const data = dateList.map(v => v.count);


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
                    <AddForm
                        type="salary"
                        addNote={addNote}
                        userId={userId}
                    />
                </div>
                <div className={classes.container}>
                    <Typography className={classes.typography}>Bills</Typography>
                    <StatisticsTable
                        userId={userId}
                        type="bills"
                        entities={bills}
                        deleteNote={deleteNote}
                    />
                    <AddForm
                        type="bills"
                        addNote={addNote}
                        userId={userId}
                    />
                </div>
                <div className={classes.container}>
                    <Typography className={classes.typography}>Shopping</Typography>
                    <StatisticsTable
                        userId={userId}
                        type="shopping"
                        entities={shopping}
                        deleteNote={deleteNote}
                    />
                    <AddForm
                        type="shopping"
                        addNote={addNote}
                        userId={userId}
                    />
                </div>
                <div className={classes.container}>
                    <Typography className={classes.typography}>Common</Typography>
                    <StatisticsTable
                        type="common"
                        entities={common}
                    />
                </div>
                <div className={classes.container}>
                    {/*<Chart />*/}
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