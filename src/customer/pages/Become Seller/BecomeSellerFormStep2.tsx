import { Box, Button, Grid, TextField } from '@mui/material'
import React, { use } from 'react'

interface BecomeSellerFormStep2Props {
    formik: any;
}

const BecomeSellerFormStep2 = ({formik}: BecomeSellerFormStep2Props) => {
  return (
    <Box>
        <>
            <Grid container spacing={3}>
                <Grid size={{xs:12}}>
                    <TextField 
                        fullWidth
                        name='name'
                        label="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                </Grid>

                <Grid size={{xs:6}}>
                    <TextField 
                        fullWidth
                        name='mobile'
                        label="Mobile"
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                        error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                        helperText={formik.touched.mobile && formik.errors.mobile}
                    />
                </Grid>

                <Grid size={{xs:6}}>
                    <TextField 
                        fullWidth
                        name='postalCode'
                        label="Postal Code"
                        value={formik.values.postalCode}
                        onChange={formik.handleChange}
                        error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
                        helperText={formik.touched.postalCode && formik.errors.postalCode}
                    />
                </Grid>

                <Grid size={{xs:12}}>
                    <TextField 
                        fullWidth
                        name='address'
                        label="Address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                    />
                </Grid>

                <Grid size={{xs:12}}>
                    <TextField 
                        fullWidth
                        name='locality'
                        label="Locality"
                        value={formik.values.locality}
                        onChange={formik.handleChange}
                        error={formik.touched.locality && Boolean(formik.errors.locality)}
                        helperText={formik.touched.locality && formik.errors.locality}
                    />
                </Grid>

                <Grid size={{xs:6}}>
                    <TextField 
                        fullWidth
                        name='city'
                        label="City"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        error={formik.touched.city && Boolean(formik.errors.city)}
                        helperText={formik.touched.city && formik.errors.city}
                    />
                </Grid>

                <Grid size={{xs:6}}>
                    <TextField 
                        fullWidth
                        name='state'
                        label="State"
                        value={formik.values.state}
                        onChange={formik.handleChange}
                        error={formik.touched.state && Boolean(formik.errors.state)}
                        helperText={formik.touched.state && formik.errors.state}
                    />
                </Grid>
            </Grid>
        </>
    </Box>
  )
}

export default BecomeSellerFormStep2