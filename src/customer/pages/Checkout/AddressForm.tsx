import { Box, Button, Grid, TextField } from '@mui/material'
import React, { use, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch } from 'State/Store';
import { createOrder } from 'State/customer/orderSlice';
import { addAddress, updateAddress } from 'State/customer/addressSlice';

const AddressFormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  mobile: Yup.string().required("Mobile number is required"),
  postCode: Yup.string().required("Postal code is required"),
  fullAddress: Yup.string().required("Full Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  locality: Yup.string().required("Locality is required"),
});

type AddressFormProps = {
  paymentGateway?: string;
  address?: any; // Pass when editing
  onClose?: () => void;
};

const AddressForm = ({ paymentGateway, address, onClose }: AddressFormProps) => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      name: address?.name || "",
      mobile: address?.mobile || "",
      postCode: address?.postCode || "",
      fullAddress: address?.fullAddress || "",
      city: address?.city || "",
      state: address?.state || "",
      locality: address?.locality || "",
    },
    validationSchema: AddressFormSchema,
    enableReinitialize: true, // ✅ Allows dynamic update when address changes
    onSubmit: async (values) => {
      const jwt = localStorage.getItem("jwt") || "";
      if (address) {
        await dispatch(updateAddress({ jwt, id: address.id, data: values }));
        alert("Address updated successfully!");
      } else {
        await dispatch(addAddress({ jwt, values }));
        alert("Address added successfully!");
      }
      if (onClose) onClose();
    },
  });

  return (
    <Box>
      <p className="text-xl font-bold text-center pb-5">
        {address ? "Edit Address" : "Add New Address"}
      </p>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          {[
            { name: "name", label: "Name" },
            { name: "mobile", label: "Mobile" },
            { name: "postCode", label: "Postal Code" },
            { name: "fullAddress", label: "Full Address" },
            { name: "locality", label: "Locality" },
            { name: "city", label: "City" },
            { name: "state", label: "State" },
          ].map((field) => (
            <Grid key={field.name} size={field.name === "mobile" || field.name === "postCode" ? 6 : 12}>
              <TextField
                fullWidth
                name={field.name}
                label={field.label}
                value={(formik.values as any)[field.name]}
                onChange={formik.handleChange}
                error={formik.touched[field.name as keyof typeof formik.touched] && Boolean(formik.errors[field.name as keyof typeof formik.errors])}
                //helperText={formik.touched[field.name as keyof typeof formik.touched] && formik.errors[field.name as keyof typeof formik.errors]}
              />
            </Grid>
          ))}

          <Grid size={{xs:12}}>
            <Button fullWidth type="submit" variant="contained" sx={{ py: "14px" }}>
              {address ? "Update Address" : "Add Address"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddressForm