import React from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {

};

const StatisticsTable = ({classes, type, entities, userId, color, deleteNote}) => (
    <Paper>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell numeric>Amount</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {entities.map(entity => (
                    <TableRow key={entity.id}>
                        <TableCell>{entity.date}</TableCell>
                        <TableCell>{entity.description}</TableCell>
                        <TableCell style={{color: color}} numeric>{entity.amount}</TableCell>
                        <TableCell><Button onClick={() => deleteNote(type, entity.id, userId)}>Delete</Button></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </Paper>
);

export default withStyles(styles)(StatisticsTable);