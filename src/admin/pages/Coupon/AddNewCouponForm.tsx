import { discount } from 'data/Filter/discount'
import { useFormik } from 'formik'
import React, { use } from 'react'
import { Dayjs } from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Button, Grid, TextField } from '@mui/material';

interface CouponFormValues {
  code: string;
  discountPercent: number;
  validityStartDate: Dayjs | null;
  validityEndDate: Dayjs | null;
  minimumOrderValue: number;
}

const AddNewCouponForm = () => {
  const formik = useFormik<CouponFormValues>({
    initialValues: {
      code: '',
      discountPercent: 0,
      validityStartDate: null,
      validityEndDate: null,
      minimumOrderValue: 0,
    },
    onSubmit: (values) => { 
      const formatedValues = {
        ...values,
        validityStartDate: values.validityStartDate?.toISOString(),
        validityEndDate: values.validityEndDate?.toISOString()
      }
      console.log(values,formatedValues);
    }
  })

  return (
    <div>
      <h1 className='text-xl font-bold text-primary pb-5 text-center'>Create New Coupon</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box component={"form"} onSubmit={formik.handleSubmit} sx={{mt:3}}>
            <Grid container spacing={2}>
                <Grid size={{xs:12, sm:6}}>
                    <TextField 
                      fullWidth
                      name='code'
                      label="Coupon Code"
                      value={formik.values.code}
                      onChange={formik.handleChange}
                      error={formik.touched.code && Boolean(formik.errors.code)}
                      helperText={formik.touched.code && formik.errors.code}
                    />
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                    <TextField 
                      fullWidth
                      name='discountPercent'
                      label="Coupon Discount Percentage"
                      value={formik.values.discountPercent}
                      onChange={formik.handleChange}
                      error={formik.touched.discountPercent && Boolean(formik.errors.discountPercent)}
                      helperText={formik.touched.discountPercent && formik.errors.discountPercent}
                    />
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                    <DatePicker 
                      sx={{width:"100%"}}
                      label="Validity Start Date"
                      name='validityStartDate'
                      onChange={formik.handleChange}
                      value={formik.values.validityStartDate}
                    />
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                    <DatePicker 
                      sx={{width:"100%"}}
                      label="Validity End Date"
                      name='validityEndDate'
                      onChange={formik.handleChange}
                      value={formik.values.validityEndDate}
                    />
                </Grid>
                <Grid size={{xs:12}}>
                    <TextField 
                      fullWidth
                      name='minimumOrderValue'
                      label="Minimum Order Value"
                      value={formik.values.minimumOrderValue}
                      onChange={formik.handleChange}
                      error={formik.touched.minimumOrderValue && Boolean(formik.errors.minimumOrderValue)}
                      helperText={formik.touched.minimumOrderValue && formik.errors.minimumOrderValue}
                    />
                </Grid>
                <Grid size={{xs:12}}>
                    <Button variant='contained' type='submit' fullWidth sx={{py:"0.8rem"}}>
                      Create Coupon
                    </Button>
                </Grid>
            </Grid>
          </Box>
      </LocalizationProvider>
    </div>
  )
}

export default AddNewCouponForm