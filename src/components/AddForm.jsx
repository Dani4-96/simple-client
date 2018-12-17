import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';

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
        const { addNote, userId } = this.props;
        const body = {
            description: this.state.description,
            amount: this.state.amount,
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
                <Button onClick={() => addNote('bills', body, userId)}>Add</Button>
            </div>
        )
    };
}

export default AddForm;