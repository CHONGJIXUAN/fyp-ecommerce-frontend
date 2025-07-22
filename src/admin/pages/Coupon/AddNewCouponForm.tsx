import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import Grid from '@mui/material/Grid';
import * as Yup from "yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch } from "State/Store";
import { createCoupon } from "State/customer/couponSlice";

interface CouponFormValues {
  code: string;
  discountPercent: number;
  validityStartDate: Dayjs | null;
  validityEndDate: Dayjs | null;
  minimumOrderValue: number;
}

const AddNewCouponForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik<CouponFormValues>({
    initialValues: {
      code: "",
      discountPercent: 0,
      validityStartDate: dayjs(),
      validityEndDate: dayjs().add(7, "day"), // default 7 days later
      minimumOrderValue: 0,
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Coupon Code is required"),
      discountPercent: Yup.number()
        .required("Discount is required")
        .min(1, "Minimum 1%")
        .max(100, "Cannot exceed 100%"),
      validityStartDate: Yup.date().required("Start date is required"),
      validityEndDate: Yup.date()
        .required("End date is required")
        .test("is-after", "End date must be after start date", function (value) {
          return value && value > this.parent.validityStartDate;
        }),
      // minimumOrderValue: Yup.number()
      //   .required("Minimum order value is required")
      //   .min(0, "Cannot be negative"),
    }),
    onSubmit: (values) => {
      const formattedValues = {
        code: values.code,
        discountPercentage: values.discountPercent, 
        validityStartDate: values.validityStartDate?.format("YYYY-MM-DD"), 
        validityEndDate: values.validityEndDate?.format("YYYY-MM-DD"),
        minimumOrderValue: values.minimumOrderValue,
        isActive: true, 
      };

      console.log("Formatted Values:", formattedValues);
      dispatch(createCoupon(formattedValues));
      alert("Coupon created successfully!");
      formik.resetForm();
    }
  });

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, textAlign: "center", color: "primary.main" }}
      >
        Create New Coupon
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            {/* Coupon Code */}
            <Grid size={{xs:12}}>
              <TextField
                fullWidth
                name="code"
                label="Coupon Code"
                value={formik.values.code}
                onChange={formik.handleChange}
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.touched.code && formik.errors.code}
              />
            </Grid>

            {/* Discount */}
            <Grid size={{xs:12}}>
              <TextField
                fullWidth
                name="discountPercent"
                label="Discount (%)"
                type="number"
                value={formik.values.discountPercent}
                onChange={formik.handleChange}
                error={
                  formik.touched.discountPercent &&
                  Boolean(formik.errors.discountPercent)
                }
                helperText={
                  formik.touched.discountPercent && formik.errors.discountPercent
                }
              />
            </Grid>

            {/* Start Date */}
            <Grid size={{xs:12}}>
              <DatePicker
                label="Start Date"
                value={formik.values.validityStartDate}
                onChange={(date) =>
                  formik.setFieldValue("validityStartDate", date)
                }
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>

            {/* End Date */}
            <Grid size={{xs:12}}>
              <DatePicker
                label="End Date"
                value={formik.values.validityEndDate}
                onChange={(date) =>
                  formik.setFieldValue("validityEndDate", date)
                }
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>

            {/* Minimum Order Value */}
            {/* <Grid size={{xs:12}}>
              <TextField
                fullWidth
                name="minimumOrderValue"
                label="Minimum Order Value"
                type="number"
                value={formik.values.minimumOrderValue}
                onChange={formik.handleChange}
                error={
                  formik.touched.minimumOrderValue &&
                  Boolean(formik.errors.minimumOrderValue)
                }
                helperText={
                  formik.touched.minimumOrderValue &&
                  formik.errors.minimumOrderValue
                }
              />
            </Grid> */}

            {/* Submit Button */}
            <Grid size={{xs:12}}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ py: "0.8rem" }}
              >
                Create Coupon
              </Button>
            </Grid>
          </Grid>
        </Box>
      </LocalizationProvider>
    </Box>
  );
};

export default AddNewCouponForm