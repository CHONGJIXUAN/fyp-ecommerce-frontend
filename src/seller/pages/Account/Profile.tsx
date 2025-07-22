import { Box, Button, CircularProgress, Divider, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSellerProfile, updateSellerProfile } from "State/seller/sellerSlice";
import { useAppDispatch, useAppSelector } from "State/Store";
import * as Yup from "yup";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { profile, loading } = useAppSelector((state) => state.seller);
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      sellerName: profile?.sellerName || "",
      mobile: profile?.mobile || "",
      ssm: profile?.ssm || "",
      businessName: profile?.businessDetails?.businessName || "",
      businessMobile: profile?.businessDetails?.businessMobile || "",
      businessAddress: profile?.businessDetails?.businessAddress || "",
    },
    validationSchema: Yup.object({
      sellerName: Yup.string().required("Seller name is required"),
      mobile: Yup.string().required("Mobile is required"),
      ssm: Yup.string().required("SSM is required"),
      businessName: Yup.string().required("Business name is required"),
      businessMobile: Yup.string().required("Business mobile is required"),
      businessAddress: Yup.string().required("Business address is required"),
    }),
    onSubmit: (values) => {
      const jwt = localStorage.getItem("sellerJwt") || "";
      dispatch(updateSellerProfile({ jwt, values }))
        .unwrap()
        .then(() => {
          alert("Profile updated successfully!");
          navigate("/seller/account");
        })
        .catch(() => alert("Update failed!"));
    },
  });

  useEffect(() => {
    const jwt = localStorage.getItem("sellerJwt") || "";
    dispatch(fetchSellerProfile(jwt));
  }, [dispatch]);

  return (
    <Box className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <Typography variant="h5" className="font-bold text-gray-700">
        Seller Profile
      </Typography>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Typography variant="h6">Basic Information</Typography>
        <TextField fullWidth label="Seller Name" name="sellerName" value={formik.values.sellerName} onChange={formik.handleChange} />
        <TextField fullWidth label="Mobile" name="mobile" value={formik.values.mobile} onChange={formik.handleChange} />
        <TextField fullWidth label="SSM" name="ssm" value={formik.values.ssm} onChange={formik.handleChange} />
        
        <Divider />

        {/* Business Details */}
        <Typography variant="h6">Business Details</Typography>
        <TextField fullWidth label="Business Name" name="businessName" value={formik.values.businessName} onChange={formik.handleChange} />
        <TextField fullWidth label="Business Mobile" name="businessMobile" value={formik.values.businessMobile} onChange={formik.handleChange} />
        <TextField fullWidth label="Business Address" name="businessAddress" value={formik.values.businessAddress} onChange={formik.handleChange} />

        <Box className="flex justify-end">
          <Button variant="contained" color="primary" type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Update Profile"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Profile;

