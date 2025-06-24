import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import PricingCard from "../Cart/PricingCard";

const Checkout = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const paymentGatewayList=[{
    value:"STRIPE",
    image:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png",
    label:"Stripe"
  }]

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [paymentGateway, setPaymentGateway] = React.useState("STRIPE");

  const handlePaymentChange = (event: any) => {
    setPaymentGateway(event.target.value);
  }

  return (
    <>
      <div className="pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen">
        <div className="space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9">
          <div className="col-span-2 space-y-5">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold">Select Address</h1>
              <Button onClick={handleOpen}>Add New Address</Button>
            </div>
            <div className="text-xs font-medium space-y-5">
              <p>Saved Address</p>
              <div className="space-y-3">
                {[1, 1, 1].map((item) => (
                  <AddressCard />
                ))}
              </div>
            </div>
            <div className="py-4 px-5 rounded-md border">
              <Button onClick={handleOpen}>Add New Address</Button>
            </div>
          </div>
          <div>
            <div>
                <div className="space-y-3 border p-5 rounded-md">
                    <h1 className="text-primary font-medium pb-2 text-center">Choose Payment Method</h1>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        className="flex justify-between items-center pr-0"
                        onChange={handlePaymentChange}
                        value={paymentGateway}
                    >
                    {paymentGatewayList.map((item) => 
                        <FormControlLabel
                            className="border w-[45%] pr-2 rounded-md flex justify-center"
                            value={item.value}
                            control={<Radio />}
                            label={
                                <img
                                className="w-14" 
                                src={item.image} alt={item.label} />
                            }
                    />)}
                    </RadioGroup>
                </div>
            </div>
            <div className="border rounded-md">
              <PricingCard />
              <div className="p-5">
                <Button
                  sx={{ py: "11px" }}
                  variant="contained"
                  className="w-full"
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddressForm />
        </Box>
      </Modal>
    </>
  );
};

export default Checkout;
