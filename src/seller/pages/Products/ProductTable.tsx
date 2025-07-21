import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from 'State/Store';
import { useEffect, useState } from 'react';
import { fetchSellerProducts, updateProduct } from 'State/seller/sellerProductSlice';
import { Product } from 'types/ProductTypes';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { sizesOptions } from 'data/Filter/productOptions';
import { colors } from 'data/Filter/color';
import { uploadToCoudinary } from 'Util/uploadToCloudinary';

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

export default function ProductTable() {
  const dispatch = useAppDispatch();
  const { sellerProduct } = useAppSelector((store) => store);
  const [uploadImage, setUploadImage] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem("sellerJwt");
    if (jwt) {
      dispatch(fetchSellerProducts(jwt));
    }
  }, [dispatch]);

  const handleOpenDialog = (product: any) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const handleImageChange = async (event: any) => {
      const file = event.target.files[0];
      setUploadImage(true);
      const image = await uploadToCoudinary(file);
      formik.setFieldValue('images', [...formik.values.images, image]);
      setUploadImage(false);
    }
  
    const handleRemoveImage = (index: number) => {
      const updatedImages = [...formik.values.images];
      updatedImages.splice(index, 1);
      formik.setFieldValue('images', updatedImages);
    }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: selectedProduct?.title || "",
      sellingPrice: selectedProduct?.sellingPrice || 0,
      color: selectedProduct?.color || "",
      sizes: selectedProduct?.sizes || "",
      images: selectedProduct?.images || [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      sellingPrice: Yup.number().required("Price is required"),
      color: Yup.string().required("Color is required"),
      sizes: Yup.string().required("Size is required"),
    }),
    onSubmit: async (values) => {
      const jwt = localStorage.getItem("sellerJwt") || "";
      if (!selectedProduct?.id) return;

      await dispatch(
        updateProduct({
          jwt,
          productId: selectedProduct.id,
          data: {
            title: values.title,
            sellingPrice: values.sellingPrice,
            color: values.color,
            sizes: Array.isArray(values.sizes) ? values.sizes : [values.sizes],
            images: values.images,
          },
        })
      );
      alert("Product updated successfully!");
      handleCloseDialog();
    },
  });

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Images</StyledTableCell>
              <StyledTableCell align="right">Title</StyledTableCell>
              <StyledTableCell align="right">Selling Price</StyledTableCell>
              <StyledTableCell align="right">Colors</StyledTableCell>
              <StyledTableCell align="right">Sizes</StyledTableCell>
              <StyledTableCell align="right">Update</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellerProduct.products.map((item:Product) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell component="th" scope="row">
                  <div className='flex gap-1 flex-wrap'>
                    {item.images.map((image)=><img className='w-20 rounded-md' alt="" src={image} />)}
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">{item.title}</StyledTableCell>
                <StyledTableCell align="right">{item.sellingPrice}</StyledTableCell>
                <StyledTableCell align="right">{item.color}</StyledTableCell>
                <StyledTableCell align="right">{item.sizes}</StyledTableCell>
                <StyledTableCell align="right">{
                  <IconButton color="primary" size="small" onClick={() => handleOpenDialog(item)}>
                    <Edit />
                  </IconButton>
                }</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <label className="relative" htmlFor="fileInput">
                  <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400">
                    <AddPhotoAlternateIcon className="text-gray-700" />
                  </span>
                  {uploadImage && (
                    <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex items-center justify-center">
                      <CircularProgress />
                    </div>
                  )}
                </label>

                <div className="flex flex-wrap gap-2 mt-3">
                  {formik.values.images.map((image:any, index:any) => (
                    <div className="relative" key={index}>
                      <img
                        className="w-24 h-24 object-cover"
                        src={image}
                        alt={`ProductImage ${index + 1}`}
                      />
                      <IconButton
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-0 right-0"
                        size="small"
                        color="error"
                        sx={{ position: "absolute", top: 0, right: 0, outline: "none" }}
                      >
                        <CloseIcon sx={{ fontSize: "1rem" }} />
                      </IconButton>
                    </div>
                  ))}
                </div>
              </div>  
            <TextField
              className=''
              fullWidth
              //label="Title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              //helperText={formik.errors.title}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              type="number"
              //label="Selling Price"
              name="sellingPrice"
              value={formik.values.sellingPrice}
              onChange={formik.handleChange}
              error={formik.touched.sellingPrice && Boolean(formik.errors.sellingPrice)}
              //helperText={formik.errors.sellingPrice}
              sx={{ mb: 2 }}
            />

            {/* Color Dropdown */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Select name="color" value={formik.values.color} onChange={formik.handleChange}>
                {colors.map((c) => (
                  <MenuItem key={c.name} value={c.name}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Sizes Dropdown */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Select name="sizes" value={formik.values.sizes} onChange={formik.handleChange}>
                {sizesOptions.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
}