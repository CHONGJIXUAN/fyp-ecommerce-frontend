import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from 'State/Store';
import { useEffect, useState } from 'react';
import { deleteDeal, fetchDeals, updateDeal } from 'State/admin/dealSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

export default function DealTable() {

   const dispatch = useAppDispatch();
    const { deals, loading } = useAppSelector((state) => state.deal);
    const categoriesInDeals = deals.map((d) => d.category);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedDeal, setSelectedDeal] = useState<any>(null);

    useEffect(() => {
      dispatch(fetchDeals());
    }, [dispatch]);

    const handleEditClick = (deal: any) => {
      setSelectedDeal(deal);
      setOpenDialog(true);
    };

    const handleCloseDialog = () => {
      setOpenDialog(false);
      setSelectedDeal(null);
    };

    const handleDelete = (id: number) => {
      if (window.confirm("Are you sure you want to delete this deal?")) {
        dispatch(deleteDeal(id));
      }
    };

    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        discount: selectedDeal?.discount || "",
        category: {
          name: selectedDeal?.category?.name || "",
        },
      },
      validationSchema: Yup.object({
        discount: Yup.number().min(1).max(100).required("Discount is required"),
        category: Yup.object({
          name: Yup.string().required("Category name is required"),
        }),
      }),
      onSubmit: async (values) => {
        if (!selectedDeal?.id) return;

        const updatedDeal = {
          ...selectedDeal,
          discount: values.discount,
          category: {
            ...selectedDeal.category,
            name: values.category.name, 
          },
        };

        await dispatch(updateDeal({ id: selectedDeal.id, deal: updatedDeal }));
        alert("Deal updated successfully!");
        handleCloseDialog();
      },
    });

  return (
    <>
      <TableContainer component={Paper}>
        {loading && <p>Loading deals...</p>}
        <Table sx={{ minWidth: 700 }} aria-label="deal table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Discount (%)</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deals.map((deal: any, index: number) => (
              <TableRow key={deal.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={deal.category?.image}
                    alt="Category"
                    style={{ width: "60px", borderRadius: "8px" }}
                  />
                </TableCell>
                <TableCell>{deal.category?.name}</TableCell>
                <TableCell align="right">{deal.discount}%</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleEditClick(deal)}>
                    <EditIcon />
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <IconButton sx={{ color: "red" }} onClick={() => handleDelete(deal.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ✅ Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Edit Deal</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            {/* Discount Input */}
            <TextField
              fullWidth
              label="Discount (%)"
              name="discount"
              type="number"
              value={formik.values.discount}
              onChange={formik.handleChange}
              error={formik.touched.discount && Boolean(formik.errors.discount)}
              sx={{ mt: 2 }}
            />

            {/* Category Name Input */}
            <TextField
              fullWidth
              label="Category Name"
              name="category.name"
              value={formik.values.category.name}
              onChange={formik.handleChange}
              error={formik.touched.category?.name && Boolean(formik.errors.category?.name)}
              sx={{ mt: 2 }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={formik.submitForm} variant="contained" color="primary">
            {loading ? <CircularProgress size={20} /> : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
