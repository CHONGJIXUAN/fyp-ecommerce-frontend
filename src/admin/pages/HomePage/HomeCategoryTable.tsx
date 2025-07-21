import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import { HomeCategory } from 'types/HomeCategoryTypes';
import { useAppDispatch, useAppSelector } from 'State/Store';
import { useEffect, useState } from 'react';
import { deleteHomeCategory, fetchHomeCategories, updateHomeCategory } from 'State/admin/homeCategorySlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createHomeCategory, deleteCategory, fetchCategories, updateCategory } from 'State/admin/categorySlice';

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

const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "fyp_upload_image");

  const response = await fetch("https://api.cloudinary.com/v1_1/daugfzmze/image/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data.secure_url;
};

const HomeCategoryTable = () => {
  const dispatch = useAppDispatch();
  const { categories, loading } = useAppSelector((state) => state.category);

  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleOpenDialog = (category?: any) => {
    if (category) {
      setEditMode(true);
      setSelectedCategory(category);
      formik.setValues({
        name: category.name,
        categoryId: category.categoryId,
        image: category.image,
        level: category.level,
        parentCategoryId: category.parentCategoryId || "",
      });
    } else {
      setEditMode(false);
      setSelectedCategory(null);
      formik.resetForm();
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCategory(null);
    formik.resetForm();
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(id));
    }
  };

  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploading(true);
    const imageUrl = await uploadToCloudinary(file);
    formik.setFieldValue("image", imageUrl);
    setUploading(false);
  };

  const handleRemoveImage = () => {
    formik.setFieldValue("image", "");
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      categoryId: "",
      image: "",
      level: 1,
      parentCategoryId: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      categoryId: Yup.string().required("Category ID is required"),
      level: Yup.number().required("Level is required"),
    }),
    onSubmit: async (values) => {
      if (editMode && selectedCategory) {
        await dispatch(updateCategory({ id: selectedCategory.id, category: values }));
        alert("Category updated successfully!");
      } else {
        await dispatch(createHomeCategory(values));
        alert("Category created successfully!");
      }
      handleCloseDialog();
    },
  });

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
        + Add Category
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category ID</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Parent</TableCell>
              <TableCell>Image</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((cat: any) => (
              <TableRow key={cat.id}>
                <TableCell>{cat.name}</TableCell>
                <TableCell>{cat.categoryId}</TableCell>
                <TableCell>{cat.level}</TableCell>
                <TableCell>{cat.parentCategoryId || "—"}</TableCell>
                <TableCell>
                  {cat.image ? <img src={cat.image} alt="Category" width="50" /> : "No Image"}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenDialog(cat)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton sx={{ color: "red" }} onClick={() => handleDelete(cat.id)}>
                    <CloseIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Add/Edit */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>{editMode ? "Edit Category" : "Add Category"}</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              label="Category Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Category ID"
              name="categoryId"
              value={formik.values.categoryId}
              onChange={formik.handleChange}
              sx={{ marginBottom: 2 }}
            />
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Level</InputLabel>
              <Select
                name="level"
                value={formik.values.level}
                onChange={formik.handleChange}
              >
                <MenuItem value={1}>Main</MenuItem>
                <MenuItem value={2}>Sub</MenuItem>
                <MenuItem value={3}>Bottom</MenuItem>
              </Select>
            </FormControl>
            {formik.values.level > 1 && (
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Parent Category</InputLabel>
                <Select
                  name="parentCategoryId"
                  value={formik.values.parentCategoryId}
                  onChange={formik.handleChange}
                >
                  {categories
                    .filter((c) => c.level === formik.values.level - 1)
                    .map((parent) => (
                      <MenuItem key={parent.categoryId} value={parent.categoryId}>
                        {parent.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}
            <div style={{ marginBottom: 10 }}>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {uploading && <CircularProgress size={20} />}
              {formik.values.image && (
                <div style={{ position: "relative", display: "inline-block" }}>
                  <img src={formik.values.image} alt="Preview" width="80" />
                  <IconButton
                    onClick={handleRemoveImage}
                    size="small"
                    color="error"
                    sx={{ position: "absolute", top: 0, right: 0 }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </div>
              )}
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={formik.submitForm} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};


export default HomeCategoryTable;