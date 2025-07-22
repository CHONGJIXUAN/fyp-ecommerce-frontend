import { Button, Step, StepLabel, Stepper } from '@mui/material';
import React, { act, useState } from 'react'
import BecomeSellerFormStep1 from './BecomeSellerFormStep1';
import { useFormik } from 'formik';
import Account from '../Account/Account';
import BecomeSellerFormStep2 from './BecomeSellerFormStep2';
import BecomeSellerFormStep3 from './BecomeSellerFormStep3';
import BecomeSellerFormStep4 from './BecomeSellerFormStep4';
import { useNavigate } from 'react-router-dom';
import { api } from 'config/Api';
import * as Yup from "yup";

const steps = [
    "Tax Details & Mobile",
    "Pickup Address",
    "Bank Details",
    "Supplier Details",
];

interface SellerAccountFormProps {
  onRegisterSuccess: () => void;
}

const validationSchema = Yup.object({
  mobile: Yup.string()
    .required("Mobile is required")
    .matches(/^\d+$/, "Only numbers are allowed")
    .min(8, "Mobile number must be at least 8 digits"),
  SSM: Yup.string()
    .required("SSM number is required")
    .matches(/^\d+$/, "Only numbers are allowed"),
    pickupAddress: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    mobile: Yup.string()
      .matches(/^[0-9]+$/, "Mobile number must contain only digits")
      .required("Mobile is required"),
    postCode: Yup.string()
      .matches(/^[0-9]+$/, "Postal code must contain only digits")
      .required("Postal code is required"),
    fullAddress: Yup.string().required("Full address is required"),
    locality: Yup.string().required("Locality is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
  }),
  bankDetails: Yup.object().shape({
    accountNumber: Yup.string()
      .matches(/^[0-9]+$/, "Account number must contain only digits")
      .required("Account number is required"),
    accountHolderName: Yup.string().required(
      "Account holder name is required"
    ),
  }),
  sellerName: Yup.string().required("Seller name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  businessDetails: Yup.object().shape({
    businessName: Yup.string().required("Business name is required"),
    businessEmail: Yup.string()
      .email("Invalid email")
      .required("Business email is required"),
    businessMobile: Yup.string()
      .matches(/^[0-9]+$/, "Mobile number must contain only digits")
      .required("Business mobile is required"),
    businessAddress: Yup.string().required("Business address is required"),
  }),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SellerAccountForm: React.FC<SellerAccountFormProps> = ({ onRegisterSuccess }) => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

    const handleCreateAccount = async (values: any) => {
        try {
        const response = await api.post("/sellers/signup", values);
        alert("Seller registered successfully! Please verify your email.");
        onRegisterSuccess();
        } catch (error) {
        console.error("Error creating seller account:", error);
        alert("Failed to create account. Please try again.");
        }
    };

    const getStepFields = (step: number) => {
        switch (step) {
        case 0:
            return ["mobile", "SSM"];
        case 1:
            return [
            "pickupAddress.name",
            "pickupAddress.mobile",
            "pickupAddress.postCode",
            "pickupAddress.fullAddress",
            "pickupAddress.locality",
            "pickupAddress.city",
            "pickupAddress.state",
            ];
        case 2:
            return ["bankDetails.accountNumber", "bankDetails.accountHolderName"];
        case 3:
            return [
            "businessDetails.businessName",
            "businessDetails.businessEmail",
            "businessDetails.businessMobile",
            "sellerName",
            "email",
            "password",
            ];
        default:
            return [];
        }
    };

    const fieldsPerStep: string[][] = [
    ["mobile", "SSM"], // Step 0
    [
        "pickupAddress.name",
        "pickupAddress.mobile",
        "pickupAddress.postCode",
        "pickupAddress.fullAddress",
        "pickupAddress.locality",
        "pickupAddress.city",
        "pickupAddress.state",
    ], // Step 1
    ["bankDetails.accountNumber", "bankDetails.accountHolderName"], // Step 2
    [
        "businessDetails.businessName",
        "businessDetails.businessEmail",
        "businessDetails.businessMobile",
        "sellerName",
        "email",
        "password",
    ], // Step 3
    ];

    const handleNextStep = async () => {
        const currentFields = fieldsPerStep[activeStep];

        const stepErrors = await formik.validateForm();

        const hasErrors = currentFields.some((field) => {
            return (stepErrors as any)[field] !== undefined;
        });

        if (hasErrors) {
            // Mark fields as touched for current step
            currentFields.forEach((field) =>
            formik.setFieldTouched(field, true, false)
            );
            alert("Please fill in all required fields correctly.");
            return;
        }

        if (activeStep === steps.length - 1) {
            await handleCreateAccount(formik.values);
        } else {
            setActiveStep(activeStep + 1);
        }
    };

    const handlePreviousStep = () => {
        if (activeStep > 0) setActiveStep(activeStep - 1);
    };


  const formik = useFormik({
        initialValues: {
        mobile: '',
        SSM: '',
        pickupAddress: {
            name: '',
            mobile: '',
            postCode: '',
            fullAddress: '',
            locality: '',
            city: '',
            state: ''
        },
        bankDetails: {
            accountNumber: '',
            accountHolderName: '',
        },
        sellerName: '',
        email: '',
        businessDetails: {
            businessName: '',
            businessEmail: '',
            businessMobile: '',
            logo: '',
            banner: '',
            businessAddress: ''
        },
        password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await handleCreateAccount(values);
    },
  })

  return (
    <div>
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>
                        {label}
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
        <section className='mt-20 space-y-10'>
            <div>
                {activeStep === 0 ? (
                    <BecomeSellerFormStep1 formik={formik} />
                ) : activeStep === 1 ? (
                    <BecomeSellerFormStep2 formik={formik} />
                ) : activeStep === 2 ? (
                    <BecomeSellerFormStep3 formik={formik} />
                ) : (
                    <BecomeSellerFormStep4 formik={formik} />
                )}
                </div>

                <div className="flex items-center justify-between">
                <Button
                    onClick={handlePreviousStep}
                    variant="contained"
                    disabled={activeStep === 0}
                >
                    Back
                </Button>
                <Button onClick={handleNextStep} variant="contained">
                    {activeStep === steps.length - 1 ? "Create Account" : "Continue"}
                </Button>
            </div>
        </section>
    </div>
  )
}

export default SellerAccountForm