import { FormControl, InputLabel, MenuItem, Select, Table, TableContainer, TableHead, TableRow, TableCell, Paper, TableBody, tableCellClasses, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react'
import { deleteSeller, fetchAllSellers, updateSellerStatus } from 'State/seller/sellerSlice';
import { useAppDispatch, useAppSelector } from 'State/Store';

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

const accountStatusType = [
  { status: "PENDING_VERIFICATION", title: "Pending Verification" },
  { status: "ACTIVE", title: "Active" },
  { status: "SUSPENDED", title: "Suspended" },
  { status: "DEACTIVATED", title: "Deactivated" },
  { status: "CLOSED", title: "Closed" },
];

const SellersTable = () => {
  const dispatch = useAppDispatch();
  const { sellers } = useAppSelector((state) => state.seller);

  const [open, setOpen] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<any>(null);
  const [status, setStatus] = useState("ACTIVE");

  useEffect(() => {
    const jwt = localStorage.getItem("jwt") || "";
    dispatch(fetchAllSellers(jwt));
  }, [dispatch]);

  const handleEditClick = (seller: any) => {
    setSelectedSeller(seller);
    setStatus(seller.accountStatus);
    setOpen(true);
  };

  const handleSave = async () => {
    if (selectedSeller) {
      const jwt = localStorage.getItem("jwt") || "";
      await dispatch(updateSellerStatus({ id: selectedSeller.id, status, jwt }));

      if (status === "CLOSED") {
        // Call delete API
        await dispatch(deleteSeller({ id: selectedSeller.id, jwt }));
      }

      setOpen(false);
    }
  };


  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellers.map((seller: any) => (
              <TableRow key={seller.id}>
                <TableCell>{seller.sellerName}</TableCell>
                <TableCell>{seller.email}</TableCell>
                <TableCell>{seller.accountStatus}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    onClick={() => handleEditClick(seller)}
                  >
                    Edit Status
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth className="mt-20">
        <DialogTitle>Update Seller Status</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              {accountStatusType.map((option) => (
                <MenuItem key={option.status} value={option.status}>
                  {option.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};


export default SellersTable