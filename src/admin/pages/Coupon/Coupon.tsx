import Delete from '@mui/icons-material/Delete';
import { FormControl, InputLabel, MenuItem, Select, Table, TableContainer, TableHead, TableRow, TableCell, Paper, TableBody, tableCellClasses, Button } from '@mui/material'
import { styled } from '@mui/material/styles';
import React, { useState } from 'react'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// Dummy data for demonstration
function createData(name: string, calories: string, fat: string, carbs: string, protein: string) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('12345', 'Product A', '123 Main St', 'Delivered', 'Update'),
  createData('12346', 'Product B', '456 Elm St', 'Pending', 'Update'),
];

const accountStatusType = [
  { status: 'PENDING_VERIFICATION', title: 'Pending Verification', description: 'Account is awaiting verification.' },
  { status: 'ACTIVE', title: 'Active', description: 'Account is active and in good standing.' },
  { status: 'SUSPENDED', title: 'Suspended', description: 'Account is temporarily suspended.' },
  { status: 'DEACTIVATED', title: 'Deactivated', description: 'Account is deactivated.' },
  { status: 'BANNED', title: 'Banned', description: 'Account is permanently banned due to violations.' },
  { status: 'CLOSED', title: 'Closed', description: 'Account is permanently closed, possibly by user request.' },
];

const Coupon = () => {
  const [accountStatus, setAccountStatus] = useState("ACTIVE");

  const handleChange = (event: any) => {
    setAccountStatus(event.target.value);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Coupon Code</StyledTableCell>
              <StyledTableCell>Start Date</StyledTableCell>
              <StyledTableCell>End Date</StyledTableCell>
              <StyledTableCell align="right">Minimum Order Value</StyledTableCell>
              <StyledTableCell align="right">Discount</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell>{row.calories}</StyledTableCell>
                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                <StyledTableCell align="right">{row.protein}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button>
                    <Delete />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
    
  )
}

export default Coupon