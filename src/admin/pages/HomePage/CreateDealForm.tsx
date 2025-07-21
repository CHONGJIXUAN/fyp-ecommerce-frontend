import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { fetchHomeCategories } from 'State/admin/adminSlice';
import { createDeal } from 'State/admin/dealSlice';
import { useAppDispatch, useAppSelector } from 'State/Store';
import * as Yup from 'yup';

const CreateDealForm = () => {
  const dispatch = useAppDispatch();
  const { categories, loading } = useAppSelector((state) => state.homeCategory);


  useEffect(() => {
    dispatch(fetchHomeCategories());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      discount: "",
      categoryId: "",
    },
    validationSchema: Yup.object({
      discount: Yup.number()
        .min(1, "Discount must be at least 1%")
        .max(100, "Discount cannot exceed 100%")
        .required("Discount is required"),
      categoryId: Yup.string().required("Category is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        alert("Unauthorized! Please log in again.");
        return;
      }

      try {
        await dispatch(
          createDeal({
            discount: Number(values.discount),
            homeCategory: {
              id: Number(values.categoryId),
              name: ''
            },
            category: undefined
          })
        ).unwrap();
        alert("Deal created successfully!");
        resetForm();
      } catch (error) {
        alert("Failed to create deal. Please try again.");
      }
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ maxWidth: 500, margin: "auto", padding: "20px", mt: 5 }}
      className="space-y-6"
    >
      <Typography variant="h4" className="text-center" sx={{ mb: 3 }}>
        Create Deal
      </Typography>

      {/* Discount Input */}
      <TextField
        fullWidth
        name="discount"
        label="Discount (%)"
        type="number"
        value={formik.values.discount}
        onChange={formik.handleChange}
        error={formik.touched.discount && Boolean(formik.errors.discount)}
        helperText={formik.touched.discount && formik.errors.discount}
        sx={{ mb: 3 }}
      />

      {/* Category Dropdown */}
      <FormControl fullWidth sx={{ mb: 0 }}>
        <InputLabel sx={{ mt: 2}}>Category</InputLabel>
        <Select
          name="categoryId"
          value={formik.values.categoryId}
          onChange={formik.handleChange}
        >
          {categories.map((cat:any) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Submit Button */}
      <Button
        fullWidth
        sx={{ py: "0.9rem" }}
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Create Deal"}
      </Button>
    </Box>
  )
}

export default CreateDealForm