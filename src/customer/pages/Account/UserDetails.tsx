import { Button, Divider, TextField } from '@mui/material'
import ProfileFieldCard from 'component/ProfileFieldCard'
import { useFormik } from 'formik'
import React from 'react'
import { updateUserProfile } from 'State/customer/ProductSlice'
import { useAppDispatch, useAppSelector } from 'State/Store'
import * as Yup from 'yup'

const UserDetails = () => {
  const { auth } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: auth.user.fullName || "",
      email: auth.user.email || "",
      mobile: auth.user.mobile || "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Name is required"),
      mobile: Yup.string()
        .required("Mobile is required")
    }),
    onSubmit: async (values) => {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        const result = await dispatch(updateUserProfile({ jwt, values }));
        if (updateUserProfile.fulfilled.match(result)) {
          alert("Profile updated successfully!");
        }
      }
    },
  });
  
  return (
    <div className="flex justify-center py-10">
      <div className="w-full lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600">
            Personal Details
          </h1>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Name */}
          <TextField
            label="Name"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            fullWidth
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={
              formik.touched.fullName && typeof formik.errors.fullName === "string"
                ? formik.errors.fullName
                : ""
            }
          />
          <Divider />

          {/* Email (Read-only) */}
          <TextField
            label="Email"
            value={formik.values.email}
            fullWidth
            disabled
          />
          <Divider />

          {/* Mobile */}
          <TextField
            label="Mobile"
            name="mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            fullWidth
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={
              formik.touched.mobile && typeof formik.errors.mobile === "string"
                ? formik.errors.mobile
                : ""
            }
          />
          <Divider />

          {/* Save Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: "12px", mt: 2 }}
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  )
}

export default UserDetails