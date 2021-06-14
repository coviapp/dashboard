import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#191970",
    color: theme.palette.common.white,
    fontSize: 20,
    fontWeight: "bold"
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, details) {
  return { name, details };
}

const useStyles = makeStyles({
  table: {
    width: "90vw",
    maxWidth: 700,
    alignSelf: "center"
  }
});

export default function StudentData(data) {
  const classes = useStyles();
  data = data.data

  const rows = [
    createData('Name', data['name']),
    createData('Roll No / EC Number', data['ec_rollno']),
    createData('Phone Number', data['phone']),
    createData('Category', data['selected_category']),
    createData('Parent\'s mobile number', data['parent_mobileno']),
    createData('Covid Positive', data['have_covid']),
  ];

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >Patient details</StyledTableCell>
            <StyledTableCell align="left"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="left">{row.details}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}