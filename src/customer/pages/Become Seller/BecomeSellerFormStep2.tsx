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
                        name="pickupAddress.name"
                        label="Name"
                        value={formik.values.pickupAddress.name}
                        onChange={formik.handleChange}
                        error={
                        formik.touched.pickupAddress?.name &&
                        Boolean(formik.errors.pickupAddress?.name)
                        }
                        helperText={
                        formik.touched.pickupAddress?.name &&
                        formik.errors.pickupAddress?.name
                        }
                    />
                </Grid>

                <Grid size={{xs:6}}>
                     <TextField
                        fullWidth
                        name="pickupAddress.mobile"
                        label="Mobile"
                        value={formik.values.pickupAddress.mobile}
                        onChange={formik.handleChange}
                        error={
                        formik.touched.pickupAddress?.mobile &&
                        Boolean(formik.errors.pickupAddress?.mobile)
                        }
                        helperText={
                        formik.touched.pickupAddress?.mobile &&
                        formik.errors.pickupAddress?.mobile
                        }
                    />
                </Grid>

                <Grid size={{xs:6}}>
                     <TextField
                        fullWidth
                        name="pickupAddress.postCode"
                        label="Postal Code"
                        value={formik.values.pickupAddress.postCode}
                        onChange={formik.handleChange}
                        error={
                        formik.touched.pickupAddress?.postCode &&
                        Boolean(formik.errors.pickupAddress?.postCode)
                        }
                        helperText={
                        formik.touched.pickupAddress?.postCode &&
                        formik.errors.pickupAddress?.postCode
                        }
                    />
                </Grid>

                <Grid size={{xs:12}}>
                    <TextField
                        fullWidth
                        name="pickupAddress.fullAddress"
                        label="Address"
                        value={formik.values.pickupAddress.fullAddress}
                        onChange={formik.handleChange}
                        error={
                        formik.touched.pickupAddress?.fullAddress &&
                        Boolean(formik.errors.pickupAddress?.fullAddress)
                        }
                        helperText={
                        formik.touched.pickupAddress?.fullAddress &&
                        formik.errors.pickupAddress?.fullAddress
                        }
                    />
                </Grid>

                <Grid size={{xs:12}}>
                    <TextField
                        fullWidth
                        name="pickupAddress.locality"
                        label="Locality"
                        value={formik.values.pickupAddress.locality}
                        onChange={formik.handleChange}
                        error={
                        formik.touched.pickupAddress?.locality &&
                        Boolean(formik.errors.pickupAddress?.locality)
                        }
                        helperText={
                        formik.touched.pickupAddress?.locality &&
                        formik.errors.pickupAddress?.locality
                        }
                    />
                </Grid>

                <Grid size={{xs:6}}>
                    <TextField
                        fullWidth
                        name="pickupAddress.city"
                        label="City"
                        value={formik.values.pickupAddress.city}
                        onChange={formik.handleChange}
                        error={
                        formik.touched.pickupAddress?.city &&
                        Boolean(formik.errors.pickupAddress?.city)
                        }
                        helperText={
                        formik.touched.pickupAddress?.city &&
                        formik.errors.pickupAddress?.city
                        }
                    />
                </Grid>

                <Grid size={{xs:6}}>
                    <TextField
                        fullWidth
                        name="pickupAddress.state"
                        label="State"
                        value={formik.values.pickupAddress.state}
                        onChange={formik.handleChange}
                        error={
                        formik.touched.pickupAddress?.state &&
                        Boolean(formik.errors.pickupAddress?.state)
                        }
                        helperText={
                        formik.touched.pickupAddress?.state &&
                        formik.errors.pickupAddress?.state
                        }
                    />
                </Grid>
            </Grid>
        </>
    </Box>
  )
}

export default BecomeSellerFormStep2