import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    container: {
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'column',
    },
};

class AddForm extends Component {
    state = {
        description: '',
        amount: '',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes, addNote, userId, type } = this.props;
        const body = {
            description: this.state.description,
            amount: type === 'salary' ? this.state.amount: -this.state.amount,
        };

        return (
            <div className={classes.container}>
                <TextField
                    label="Description"
                    value={this.state.description}
                    onChange={this.handleChange('description')}
                    margin="normal"
                />
                <TextField
                    label="Amount"
                    value={this.state.amount}
                    onChange={this.handleChange('amount')}
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={() => addNote(type, body, userId)}>Add</Button>
            </div>
        )
    };
}

export default withStyles(styles)(AddForm);