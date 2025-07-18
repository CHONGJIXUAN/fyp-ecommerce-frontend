import { Button, Step, StepLabel, Stepper } from '@mui/material';
import React, { act, useState } from 'react'
import BecomeSellerFormStep1 from './BecomeSellerFormStep1';
import { useFormik } from 'formik';
import Account from '../Account/Account';
import BecomeSellerFormStep2 from './BecomeSellerFormStep2';
import BecomeSellerFormStep3 from './BecomeSellerFormStep3';
import BecomeSellerFormStep4 from './BecomeSellerFormStep4';

const steps = [
    "Tax Details & Mobile",
    "Pickup Address",
    "Bank Details",
    "Supplier Details",
];

const SellerAccountForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStep=(value:number)=>()=>{

    (activeStep < steps.length - 1 || (activeStep > 0 && value === -1)) && setActiveStep(activeStep + value);
    
    activeStep === steps.length -1 && handleCreateAccount();

    console.log("Active Step: ", activeStep);
  }

  const handleCreateAccount = ()=>{
    console.log("Create Account Clicked");
  }

  const formik = useFormik({
    initialValues:{
        mobile: '',
        otp: "",
        SSM: '',
        pickupAddress: {
            name: '',
            mobile: '',
            postalCode: '',
            address: '',
            locality: '',
            city: '',
            state: ''
        },
        bankDetails: {
            AccountNumber: '',
            accountHolderName: "",
        },
        sellerName: '',
        email: "",
        businessDetails:{
            businessName: '',
            businessEmail: '',
            businessMobile: '',
            logo: "",
            banner: "",
            businessAddess: ""
        },
        password: ""
    },
    onSubmit: (values) => {
        console.log('Form submitted:', values);
        console.log("Active Step ", activeStep)
    }
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
                {activeStep === 0 ? <BecomeSellerFormStep1 formik={formik} /> : 
                activeStep === 1 ? <BecomeSellerFormStep2 formik={formik} /> :
                activeStep === 2 ? <BecomeSellerFormStep3 formik={formik} /> :
                <BecomeSellerFormStep4 formik={formik} /> }
            </div>

            <div className="flex items-center justify-between">
                <Button onClick={handleStep(-1)} variant='contained' disabled={activeStep === 0}>
                    Back
                </Button>
                <Button onClick={handleStep(1)} variant='contained'>
                    {activeStep === steps.length - 1 ? "Create Account" : "Continue"}
                </Button>
            </div>
        </section>
    </div>
  )
}

export default SellerAccountForm