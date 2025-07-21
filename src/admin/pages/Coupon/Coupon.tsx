import Delete from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { FormControl, InputLabel, MenuItem, Select, Table, TableContainer, TableHead, TableRow, TableCell, Paper, TableBody, tableCellClasses, Button, Dialog, DialogActions, DialogContent, TextField, DialogTitle, IconButton, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { deleteCoupon, fetchCoupons, updateCoupon } from 'State/customer/couponSlice';
import { useAppDispatch, useAppSelector } from 'State/Store';
import { useFormik } from 'formik';

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

const Coupon = () => {
  const dispatch = useAppDispatch();
  const { coupons, loading } = useAppSelector((state) => state.coupon);
  const [open, setOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  const handleEditClick = (coupon: any) => {
    setSelectedCoupon(coupon);
    formik.setValues({
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
      minimumOrderValue: coupon.minimumOrderValue,
      status: coupon.status,
    });
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Delete this coupon?")) {
      dispatch(deleteCoupon(id));
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedCoupon(null);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      code: selectedCoupon?.code || "",
      discountPercentage: selectedCoupon?.discountPercentage || 0,
      minimumOrderValue: selectedCoupon?.minimumOrderValue || 0,
      status: selectedCoupon?.status || "ACTIVE",
    },
    onSubmit: async (values) => {
      if (selectedCoupon) {
        await dispatch(updateCoupon({ id: selectedCoupon.id, updatedData: values }));
        handleCloseDialog();
      }
    },
  });

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Discount (%)</TableCell>
              <TableCell>Min Order Value</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow key={coupon.id}>
                <TableCell>{coupon.code}</TableCell>
                <TableCell>{coupon.discountPercentage}</TableCell>
                <TableCell>{coupon.minimumOrderValue}</TableCell>
                <TableCell>{coupon.status == "ACTIVE" ? "Active" : "Inactive"}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(coupon)} color="primary">
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(coupon.id)} sx={{ color: "red" }}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Edit Coupon</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <TextField fullWidth name="code" label="Code" value={formik.values.code} disabled />
            <TextField fullWidth name="discountPercentage" label="Discount" type="number" value={formik.values.discountPercentage} onChange={formik.handleChange} />
            <TextField fullWidth name="minimumOrderValue" label="Min Order Value" type="number" value={formik.values.minimumOrderValue} onChange={formik.handleChange} />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
              >
                <MenuItem value="ACTIVE">Active</MenuItem>
                <MenuItem value="INACTIVE">Inactive</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={formik.submitForm} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};


export default Coupon