import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Typography, LinearProgress, Tabs, Tab } from '@material-ui/core';
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
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes, bills, salary, shopping, userId, addNote, deleteNote, loading, loaded, error, location } = this.props;

        // if (loading) return (
        //     <div>
        //         <LinearProgress />
        //     </div>
        // );
        let common = List([]);
        let cash = 0;
        let chartLabels = []
        let chartData = []

        if (loaded) {


            common = bills.concat(salary).concat(shopping)
                .sortBy(v => moment(v.date).unix())
                .reverse();


            //if (common.isEmpty()) return <div>No statistics</div>;
            //const startDate = moment(common.last().date).format('YYYY-MM-DD');

            const dateList = getDateArray(moment('2018-11-01'), Date.now()).map(v => ({
                date: moment(v).format('DD-MM-YYYY'),
                amount: 0,
            }));

            dateList.forEach(listElement =>
                common.forEach(entity =>
                    listElement.date === moment(entity.date).format('DD-MM-YYYY') ? listElement.amount += entity.amount : entity));
            console.log('COMMON', common.toJS())

             chartLabels = dateList.map(v => moment(v.date, 'DD-MM-YYYY').format('DD-MM-YYYY'));

             chartData = List(dateList).groupBy(v => moment(v.date, 'DD-MM-YYYY').format('DD-MM-YYYY'))
                .map(v => v.reduce((acc, val) => acc + val.amount, 0))
                .toList()
                .reduce((acc, val, ind) => {
                    const oldValue = acc.get(ind - 1) ? acc.get(ind - 1) : 0;
                    const value = oldValue + val;
                    console.log(acc)
                    return acc.set(ind, value);
                }, List([]))
                 .toJS();

            console.log('LABELS', chartLabels);
            console.log('DATA', chartData);

            cash = common.reduce((acc, val) => acc + val.amount, 0);
            console.log('CASH', cash)
        }
        const { value } = this.state;

            return (
                <div>
                    <div className={classes.container}>
                        <Typography variant="h4" className={classes.typography}>{location.pathname.replace('/', '')}</Typography>
                        <Tabs value={value} onChange={this.handleChange}>
                            <Tab label="Salary" />
                            <Tab label="Bills" />
                            <Tab label="Shopping" />
                        </Tabs>
                    </div>
                    {value === 0 && <div className={classes.container}>
                        <Typography variant="h6" className={classes.typography}>Salary</Typography>
                        <StatisticsTable
                            userId={userId}
                            type="salary"
                            entities={salary.sortBy(v => moment(v.date).unix())}
                            deleteNote={deleteNote}
                        />
                        <AddForm
                            type="salary"
                            addNote={addNote}
                            userId={userId}
                        />
                    </div>}
                    {value === 1 && <div className={classes.container}>
                        <Typography variant="h6" className={classes.typography}>Bills</Typography>
                        <StatisticsTable
                            userId={userId}
                            type="bills"
                            entities={bills.sortBy(v => moment(v.date).unix())}
                            deleteNote={deleteNote}
                        />
                        <AddForm
                            type="bills"
                            addNote={addNote}
                            userId={userId}
                        />
                    </div>}
                    {value === 2 && <div className={classes.container}>
                        <Typography variant="h6" className={classes.typography}>Shopping</Typography>
                        <StatisticsTable
                            userId={userId}
                            type="shopping"
                            entities={shopping.sortBy(v => moment(v.date).unix())}
                            deleteNote={deleteNote}
                        />
                        <AddForm
                            type="shopping"
                            addNote={addNote}
                            userId={userId}
                        />
                    </div>}
                    <div className={classes.container}>
                        <Typography variant="h6" className={classes.typography}>Common</Typography>
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
        //return error ? <div>Ошибка: {error.message}</div> : <div />


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
)(withRouter(withStyles(styles)(Statistics)));