import { Box, Button, Grid, TextField } from '@mui/material'
import React, { use } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const AddressFormSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    mobile: Yup.string()
        .required('Mobile number is required')
        .matches(/^\d{10}$/, 'Mobile number is not valid'),
    postalCode: Yup.string()
        .required('Postal code is required')
        .matches(/^\d{5,6}$/, 'Postal code is not valid'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    locallity: Yup.string().required('Locality is required')
})

const AddressForm = () => {
  const Formik = useFormik({
    initialValues: {
      name: '',
      mobile: '',
      postalCode: '',
      address: '',
      city: '',
      state: '',
      locality: ''
    },
    validationSchema: AddressFormSchema,
    onSubmit: (values) => {
      console.log('Form submitted:', values)
    }
  })
    
  return (
    <Box sx={{max:"auto"}}>
        <p className='text-xl font-bold text-center pb-5'>Contact Details</p>

        <form onSubmit={Formik.handleSubmit}>
            <Grid container spacing={3}>
                <Grid size={{xs:12}}>
                    <TextField 
                        fullWidth
                        name='name'
                        label="Name"
                        value={Formik.values.name}
                        onChange={Formik.handleChange}
                        error={Formik.touched.name && Boolean(Formik.errors.name)}
                        helperText={Formik.touched.name && Formik.errors.name}
                    />
                </Grid>

                <Grid size={{xs:6}}>
                    <TextField 
                        fullWidth
                        name='mobile'
                        label="Mobile"
                        value={Formik.values.mobile}
                        onChange={Formik.handleChange}
                        error={Formik.touched.mobile && Boolean(Formik.errors.mobile)}
                        helperText={Formik.touched.mobile && Formik.errors.mobile}
                    />
                </Grid>

                <Grid size={{xs:6}}>
                    <TextField 
                        fullWidth
                        name='postalCode'
                        label="Postal Code"
                        value={Formik.values.postalCode}
                        onChange={Formik.handleChange}
                        error={Formik.touched.postalCode && Boolean(Formik.errors.postalCode)}
                        helperText={Formik.touched.postalCode && Formik.errors.postalCode}
                    />
                </Grid>

                <Grid size={{xs:12}}>
                    <TextField 
                        fullWidth
                        name='address'
                        label="Address"
                        value={Formik.values.address}
                        onChange={Formik.handleChange}
                        error={Formik.touched.address && Boolean(Formik.errors.address)}
                        helperText={Formik.touched.address && Formik.errors.address}
                    />
                </Grid>

                <Grid size={{xs:12}}>
                    <TextField 
                        fullWidth
                        name='locality'
                        label="Locality"
                        value={Formik.values.locality}
                        onChange={Formik.handleChange}
                        error={Formik.touched.locality && Boolean(Formik.errors.locality)}
                        helperText={Formik.touched.locality && Formik.errors.locality}
                    />
                </Grid>

                <Grid size={{xs:6}}>
                    <TextField 
                        fullWidth
                        name='city'
                        label="City"
                        value={Formik.values.city}
                        onChange={Formik.handleChange}
                        error={Formik.touched.city && Boolean(Formik.errors.city)}
                        helperText={Formik.touched.city && Formik.errors.city}
                    />
                </Grid>

                <Grid size={{xs:6}}>
                    <TextField 
                        fullWidth
                        name='state'
                        label="State"
                        value={Formik.values.state}
                        onChange={Formik.handleChange}
                        error={Formik.touched.state && Boolean(Formik.errors.state)}
                        helperText={Formik.touched.state && Formik.errors.state}
                    />
                </Grid>

                <Grid size={{xs:12}}>
                    <Button fullWidth type='submit' variant='contained' sx={{py:"14px"}}>
                        Add Address
                    </Button>
                </Grid>

            </Grid>
        </form>

    </Box>
  )
}

export default AddressForm