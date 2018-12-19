import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    container: {
        marginLeft: 'auto',
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
        const { addNote, userId, type } = this.props;
        const body = {
            description: this.state.description,
            amount: type === 'salary' ? this.state.amount: -this.state.amount,
        };

        return (
            <div>
                <TextField
                    label="description"
                    value={this.state.description}
                    onChange={this.handleChange('description')}
                    margin="normal"
                />
                <TextField
                    label="amount"
                    value={this.state.amount}
                    onChange={this.handleChange('amount')}
                    margin="normal"
                />
                <Button onClick={() => addNote(type, body, userId)}>Add</Button>
            </div>
        )
    };
}

export default withStyles(styles)(AddForm);