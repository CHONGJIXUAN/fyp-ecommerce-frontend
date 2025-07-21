import React, { use, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from 'State/Store';
import { fetchHomeCategories, updateHomeCategory } from 'State/admin/adminSlice';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import { fetchDeals } from 'State/admin/dealSlice';

const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "fyp_upload_image"); 

  const response = await fetch(`https://api.cloudinary.com/v1_1/daugfzmze/image/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data.secure_url; 
};

export default function DealCategoryTable() {
  const dispatch = useAppDispatch();
  const { deals, loading } = useAppSelector((state) => state.deal);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [uploadImage, setUploadImage] = useState(false);

  useEffect(() => {
    dispatch(fetchDeals());
  }, [dispatch]);

  const categoriesInDeals = Array.from(
    new Map(deals.map((deal: any) => [deal.category.id, deal.category])).values()
  );

  const handleEditClick = (category: any) => {
    setSelectedCategory(category);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCategory(null);
  };

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploadImage(true);
    const imageUrl = await uploadToCloudinary(file);
    formik.setFieldValue("image", imageUrl);
    setUploadImage(false);
  };

  const handleRemoveImage = () => {
    formik.setFieldValue("image", "");
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      image: selectedCategory?.image || "",
      name: selectedCategory?.name || "",
      section: selectedCategory?.section || "",
    },
    validationSchema: Yup.object({
      image: Yup.string().required("Image is required"),
      name: Yup.string().required("Category name is required"),
      section: Yup.string().required("Section is required"),
    }),
    onSubmit: async (values) => {
      if (!selectedCategory?.id) return;
      await dispatch(
        updateHomeCategory({
          id: selectedCategory.id,
          data: {
            ...values,
            categoryId: selectedCategory.categoryId || selectedCategory.id, 
          },
        })
      );
      alert("Category updated successfully!");
      handleCloseDialog();
    },
  });

  return (
    <>
      <TableContainer component={Paper}>
        {loading && <p>Loading categories...</p>}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>Section</TableCell>
              <TableCell align="right">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoriesInDeals.map((cat: any, index: number) => (
              <TableRow key={cat.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={cat.image}
                    alt="Category"
                    style={{ width: "60px", borderRadius: "8px" }}
                  />
                </TableCell>
                <TableCell>{cat.name}</TableCell>
                <TableCell>{cat.section}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleEditClick(cat)}>
                    <EditIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ✅ Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Image Upload */}
            <Grid className="flex flex-col gap-4" container>
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <label htmlFor="fileInput" className="relative">
                <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400">
                  <AddPhotoAlternateIcon className="text-gray-700" />
                </span>
                {uploadImage && (
                  <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex items-center justify-center bg-gray-100">
                    <CircularProgress />
                  </div>
                )}
              </label>

              {/* Preview Uploaded Image */}
              {formik.values.image && (
                <div className="relative">
                  <img
                    className="w-24 h-24 object-cover rounded"
                    src={formik.values.image}
                    alt="Category"
                  />
                  <IconButton
                    onClick={handleRemoveImage}
                    className="absolute top-0 right-0"
                    size="small"
                    color="error"
                    sx={{ position: "absolute", top: 0, right: 0 }}
                  >
                    <CloseIcon sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </div>
              )}
            </Grid>

            {/* Category Name */}
            <TextField
              fullWidth
              label="Category Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              sx={{ mt: 2 }}
            />

            {/* Section Dropdown */}
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Section</InputLabel>
              <Select
                name="section"
                value={formik.values.section}
                onChange={formik.handleChange}
              >
                <MenuItem value="GRID">GRID</MenuItem>
                <MenuItem value="SHOP_BY_CATEGORIES">Shop by Categories</MenuItem>
                <MenuItem value="HOUSEHOLD_ITEM">Household Items</MenuItem>
                <MenuItem value="RECYCLE_PRODUCTS">Recycle Products</MenuItem>
                <MenuItem value="DEALS">Deals</MenuItem>
                <MenuItem value="SUSTAINABLE_PERSONAL_CARE">Sustainable Care</MenuItem>
                <MenuItem value="ZERO_WASTE">Zero Waste</MenuItem>
              </Select>
            </FormControl>
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
