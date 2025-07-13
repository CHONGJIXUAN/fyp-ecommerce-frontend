import { Button, CircularProgress, FormControl, FormHelperText, Grid, Icon, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { menLevel3 } from 'data/category/level three/menLevel3'
import { menLevel2 } from 'data/category/level two/menLevel2'
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

const categoryTwo: {[key: string]: any[] } = {
  men: menLevel2
}

const categoryThree: {[key: string]: any[] } = {
  men: menLevel3
  
}

const AddProduct = () => {
  const [uploadImage, setUploadImage] = useState(false);

  const [snackbarOpen, setOpenSnackbar] = useState(false);

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      sellingPrice: "",
      quantity: "", 
      color: "",
      images: [],
      bottomCategory: '',  
      subCategory: '',
      mainCategory: '',
      sizes: "",
    },
    onSubmit: (values) => {
      console.log('Form values:', values);
      dispatch(createProduct({request:values,jwt:localStorage.getItem('sellerJwt')}))
    },
  })

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

  const childCategory = (category: any, parentCategoryId: any) => {
    return category.filter((child:any) => {
      return child.parentCategoryId === parentCategoryId
    })
  }

  const handleClosSnackbar = () => {
    setOpenSnackbar(false);
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="space-y-4 p-4">
        <Grid container spacing={2}>
          <Grid className="flex flex-wrap gap-5" size={{xs:12}}>
            <input 
              type="file" 
              accept='image/*'
              id='fileInput'
              style={{ display: 'none' }}
              onChange={handleImageChange}  
            />
            <label className='relative' htmlFor="fileInput">
              <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400'>
                <AddPhotoAlternateIcon className='text-gray-700' />
              </span>
              {uploadImage && (
                <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex items-center justify-center'>
                  <CircularProgress />
                </div>
              )}
            </label>

            <div className='flex flex-wrap gap-2'>
              {formik.values.images.map((image, index) => (
                <div className='relative' key={index}>
                  <img
                    className='w-24 h-24 object-cover'
                    src={image}
                    alt={`ProductImage ${index + 1}`}
                  />
                  <IconButton
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0"
                    size="small"
                    color="error"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      outline: 'none',
                    }}
                  >
                    <CloseIcon sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </div>
              ))}
            </div>

          </Grid>
          <Grid size={{xs:12}}>
              <TextField 
                fullWidth
                id="title"
                name="title"
                label="Product Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                required
              />
          </Grid>
          <Grid size={{xs:12}}>
              <TextField 
                multiline
                rows={4}
                fullWidth
                id="description"
                name="description"
                label="Product Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                required
              />
            </Grid>
            <Grid size={{xs:12, md:4, lg:4}}>
              <TextField 
                fullWidth
                id="sellingPrice"
                name="sellingPrice"
                label="Selling Price"
                type="number"
                value={formik.values.sellingPrice}
                onChange={formik.handleChange}
                error={formik.touched.sellingPrice && Boolean(formik.errors.sellingPrice)}
                helperText={formik.touched.sellingPrice && formik.errors.sellingPrice}
                required
              />
            </Grid>
            <Grid size={{xs:12, md:4, lg:4}}>
              <FormControl fullWidth error={formik.touched.color && Boolean(formik.errors.color)} required>
                  <InputLabel id="color-label">Color</InputLabel>
                  <Select 
                    labelId="color-label" 
                    id="color" 
                    name="color" 
                    value={formik.values.color}
                    onChange={formik.handleChange}
                    label="Color"  
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

                    {colors.map((color, index) => (
                      <MenuItem key={index} value={color.name}>
                        <div className="flex gap-3 items-center">
                          <span
                            style={{ backgroundColor: color.hex }}
                            className={`h-5 w-5 rounded-full ${color.name === "White" ? "border" : ""} inline-block`}
                          ></span>
                          <p>{color.name}</p>
                        </div>
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.color && formik.errors.color && (
                    <FormHelperText>{formik.errors.color}</FormHelperText>
                  )}
              </FormControl>
            </Grid>
            <Grid size={{xs:12, md:4, lg:4}}>
              <FormControl fullWidth error={formik.touched.sizes && Boolean(formik.errors.sizes)} required>
                  <InputLabel id="sizes-label">Sizes</InputLabel>
                  <Select 
                    labelId="sizes-label" 
                    id="sizes" 
                    name="sizes" 
                    value={formik.values.sizes}
                    onChange={formik.handleChange}
                    label="sizes"  
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="FREE">FREE</MenuItem>
                    <MenuItem value="S">S</MenuItem>
                    <MenuItem value="M">M</MenuItem>
                    <MenuItem value="L">L</MenuItem>
                    <MenuItem value="XL">XL</MenuItem>
                  </Select>
                  {formik.touched.sizes && formik.errors.sizes && (
                    <FormHelperText>{formik.errors.sizes}</FormHelperText>
                  )}
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg: 4 }}>
              <FormControl
                fullWidth
                error={formik.touched.mainCategory && Boolean(formik.errors.mainCategory)}
                required
              >
                <InputLabel id="category-label">Main Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="mainCategory"
                  name="mainCategory" // ✅ Correct name
                  value={formik.values.mainCategory}
                  onChange={formik.handleChange}
                  label="Main Category"
                >
                  {mainCategory.map((item) => (
                    <MenuItem key={item.categoryId} value={item.categoryId}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg: 4 }}>
              <FormControl
                fullWidth
                error={formik.touched.subCategory && Boolean(formik.errors.subCategory)}
                required
              >
                <InputLabel id="subCategory-label">Second Category</InputLabel>
                <Select
                  labelId="subCategory-label"
                  id="subCategory"
                  name="subCategory" // ✅ FIXED: was "category2"
                  value={formik.values.subCategory}
                  onChange={formik.handleChange}
                  label="Second Category"
                >
                  {formik.values.mainCategory &&
                    categoryTwo[formik.values.mainCategory]?.map((item) => (
                      <MenuItem key={item.categoryId} value={item.categoryId}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg: 4 }}>
              <FormControl
                fullWidth
                error={formik.touched.bottomCategory && Boolean(formik.errors.bottomCategory)}
                required
              >
                <InputLabel id="bottomCategory-label">Third Category</InputLabel>
                <Select
                  labelId="bottomCategory-label"
                  id="bottomCategory"
                  name="bottomCategory" // ✅ FIXED: was "category3"
                  value={formik.values.bottomCategory}
                  onChange={formik.handleChange}
                  label="Third Category"
                >
                  {formik.values.subCategory &&
                    childCategory(categoryThree[formik.values.mainCategory], formik.values.subCategory)?.map(
                      (item: any) => (
                        <MenuItem key={item.categoryId} value={item.categoryId}>
                          {item.name}
                        </MenuItem>
                      )
                    )}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{xs:12}}>
              <Button
                sx={{p: "14px"}}
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                {false ? <CircularProgress size="small" sx={{width: "27px", height: "27px"}} /> : "Add Product"}
              </Button>        
            </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default AddProduct