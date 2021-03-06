import React from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Typography,
    IconButton,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/DeleteForever';

const styles = {

};

const StatisticsTable = ({classes, type, entities, userId, color, cash, deleteNote}) => (
    <Paper>
        {cash && <Typography variant="h6">Total amount: {cash}</Typography>}
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell numeric>Amount</TableCell>
                    {type === 'common' ? null : <TableCell>Action</TableCell>}
                </TableRow>
            </TableHead>
            <TableBody>
                {entities.map(entity => {
                    const color = entity.amount.toString().search('-') === -1 ? 'green' : 'red';

                    return (
                        <TableRow key={entity.id}>
                            <TableCell>{moment(entity.date).format("DD-MM-YYYY HH:mm:ss")}</TableCell>
                            <TableCell>{entity.description}</TableCell>
                            <TableCell style={{color: color}} numeric>{entity.amount}</TableCell>
                            {type === 'common' ? null : <TableCell>
                                <IconButton onClick={() => deleteNote(type, entity.id, userId)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>}
                        </TableRow>
                    )}
                )}
            </TableBody>
        </Table>
    </Paper>
);

export default withStyles(styles)(StatisticsTable);