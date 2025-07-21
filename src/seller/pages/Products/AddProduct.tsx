import { Button, CircularProgress, FormControl, FormHelperText, Grid, Icon, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { homeLivingLevel3, kidsLevel3, menLevel3, personalCareLevel3, womenLevel3, zeroWasteLevel3 } from 'data/category/level three/Level3'
import { homeLivingLevel2, kidsLevel2, menLevel2, personalCareLevel2, womenLevel2, zeroWasteLevel2 } from 'data/category/level two/Level2'
import { useFormik } from 'formik'
import { title } from 'process'
import React, { useState } from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import { Form } from 'react-router-dom'
import { mainCategory } from 'data/category/mainCategory'
import { colors } from 'data/Filter/color'
import { useAppDispatch } from 'State/Store'
import { create } from 'domain'
import { createProduct } from 'State/seller/sellerProductSlice'
import { uploadToCoudinary } from 'Util/uploadToCloudinary'

const AddProduct = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      sellingPrice: "",
      quantity: 1,
      color: "",
      images: [],
      sizes: "",
    },
    onSubmit: (values) => {
      console.log("Form values:", values);
      dispatch(
        createProduct({
          request: values,
          jwt: localStorage.getItem("sellerJwt"),
        })
      );
    },
  });

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    setUploadImage(true);
    const image = await uploadToCoudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  return (
    <div>
      <h1 className="font-bold mb-5 text-xl">Add New Product</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4 p-4">
        <Grid container spacing={2}>
          {/* ✅ Image Upload */}
          <Grid size={{ xs: 12 }} className="flex flex-wrap gap-5">
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

            <div className="flex flex-wrap gap-2">
              {formik.values.images.map((image, index) => (
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
                  >
                    <CloseIcon sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </div>
              ))}
            </div>
          </Grid>

          {/* ✅ Title */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Product Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              required
            />
          </Grid>

          {/* ✅ Description */}
          <Grid size={{ xs: 12 }}>
            <TextField
              multiline
              rows={4}
              fullWidth
              id="description"
              name="description"
              label="Product Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              required
            />
          </Grid>

          {/* ✅ Price */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              id="sellingPrice"
              name="sellingPrice"
              label="Selling Price"
              type="number"
              value={formik.values.sellingPrice}
              onChange={formik.handleChange}
              required
            />
          </Grid>

          {/* ✅ Quantity */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              id="quantity"
              name="quantity"
              label="Quantity"
              type="number"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              required
            />
          </Grid>

          {/* ✅ Color */}
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth required>
              <InputLabel id="color-label">Color</InputLabel>
              <Select
                labelId="color-label"
                id="color"
                name="color"
                value={formik.values.color}
                onChange={formik.handleChange}
              >
                {colors.map((color, index) => (
                  <MenuItem key={index} value={color.name}>
                    {color.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* ✅ Sizes */}
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth required>
              <InputLabel id="sizes-label">Sizes</InputLabel>
              <Select
                labelId="sizes-label"
                id="sizes"
                name="sizes"
                value={formik.values.sizes}
                onChange={formik.handleChange}
              >
                <MenuItem value="FREE">FREE</MenuItem>
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="XL">XL</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* ✅ Submit */}
          <Grid size={{ xs: 12 }}>
            <Button
              sx={{ p: "14px" }}
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
            >
              {uploadImage ? (
                <CircularProgress size="small" sx={{ width: "27px", height: "27px" }} />
              ) : (
                "Add Product"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};


export default AddProduct