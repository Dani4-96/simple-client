import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { List } from 'immutable';
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

        // const a = common.map(v => ({
        //     id: v.id,
        //     description: v.description,
        //     amount: v.amount,
        //     date: moment(v.date).format('DD-MM-YYYY'),
        //     userId: v.userId,
        // }))
        //
        //     .groupBy(v => v.date)
        //     .map(v => v.reduce((acc, val) => acc + val.amount, 0));


        // const h = (arr, fn) => {
        //     return arr.reduce(function (prev, current) {
        //         return prev.concat(fn(current));
        //     }, []);
        // };


        // const b = a.reduce((acc, val) => acc + val)
        //   const b = a.reduce((acc, val) => acc + val)
        //  const b = a.map((v, k, i) => v + i[k])
        // console.log("LOG", b)



        const startDate = moment(common.first().get('date')).format('DD-MM-YYYY');

        const dateList = getDateArray(startDate, Date.now()).map(v => ({
            date: moment(v).format('DD-MM-YYYY'),
            amount: 0,
        }));

        dateList.forEach(listElement =>
            common.forEach(entity =>
                listElement.date === entity.date ? listElement.amount = entity.amount : entity));

        const chartLabels = dateList.map(v => moment(v.date));
        const chartData = dateList.groupBy(v => v.date)
            .map(v => v.reduce((acc, val) => acc + val.amount, 0))
            .toList()
            .reduce((acc, val, ind) => {
                const oldValue = acc[ind - 1] ? acc[ind - 1] : 0;
                const value = oldValue + val;
                return acc.add(value);
            }, List([]));

        console.log('LABELS', chartLabels);
        console.log('DATA', chartData);

        const cash = common.reduce((acc, val) => acc + val);

        console.log('CASH', cash)

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
                        cash={cash}
                    />
                </div>
                <div className={classes.container}>
                    <Chart chartLabels={chartLabels} chartData={chartData} />
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