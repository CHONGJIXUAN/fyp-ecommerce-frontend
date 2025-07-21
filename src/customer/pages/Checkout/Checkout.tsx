import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import PricingCard from "../Cart/PricingCard";
import { useAppDispatch, useAppSelector } from "State/Store";
import { fetchAddresses } from "State/customer/addressSlice";
import { createOrder } from "State/customer/orderSlice";
import { api } from "config/Api";

const Checkout: React.FC = () => {
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

  const paymentGatewayList = [
    {
      value: "STRIPE",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png",
      label: "Stripe",
    },
  ];

  const dispatch = useAppDispatch();
  const { addresses } = useAppSelector((state) => state.address);

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const [paymentGateway, setPaymentGateway] = useState("STRIPE");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePaymentChange = (event: any) => {
    setPaymentGateway(event.target.value);
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(fetchAddresses(jwt));
    }
  }, [dispatch]);

  const handleCheckout = async () => {
    if (!selectedAddressId) {
      alert("Please select an address before proceeding.");
      return;
    }

    try {
      const jwt = localStorage.getItem("jwt") || "";
      const response = await api.post("/orders/payment", null, {
        headers: { Authorization: `Bearer ${jwt}` },
        params: { addressId: selectedAddressId, paymentMethod: paymentGateway },
      });

      console.log("Payment Response:", response.data);

      if (response.data.payment_link_url) {
        window.location.href = response.data.payment_link_url;
      } else {
        alert("Order created, but no payment link received");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Something went wrong during checkout.");
    }
  };

  return (
    <>
      <div className="pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen">
        <div className="space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9">
          {/* Address Section */}
          <div className="col-span-2 space-y-5">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold">Select Address</h1>
              <Button onClick={handleOpen}>Add New Address</Button>
            </div>
            <div className="text-xs font-medium space-y-5">
              <p>Saved Address</p>
              <div className="space-y-3">
                {addresses.length > 0 ? (
                  addresses.map((address) => (
                    <AddressCard
                      key={address.id}
                      address={address}
                      selected={selectedAddressId === address.id}
                      onSelect={() => setSelectedAddressId(address.id)}
                    />
                  ))
                ) : (
                  <p>No addresses available. Please add one.</p>
                )}
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div>
            <div className="space-y-3 border p-5 rounded-md">
              <h1 className="text-primary font-medium pb-2 text-center">
                Choose Payment Method
              </h1>
              <RadioGroup
                name="payment-method"
                value={paymentGateway}
                onChange={handlePaymentChange}
                className="flex justify-between items-center pr-0"
              >
                {paymentGatewayList.map((item) => (
                  <FormControlLabel
                    key={item.value}
                    className="border w-[45%] pr-2 rounded-md flex justify-center"
                    value={item.value}
                    control={<Radio />}
                    label={<img className="w-14" src={item.image} alt={item.label} />}
                  />
                ))}
              </RadioGroup>
            </div>

            <div className="border rounded-md">
              <PricingCard />
              <div className="p-5">
                <Button
                  sx={{ py: "11px" }}
                  variant="contained"
                  className="w-full"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <AddressForm paymentGateway={paymentGateway} />
        </Box>
      </Modal>
    </>
  );
};


export default Checkout;
