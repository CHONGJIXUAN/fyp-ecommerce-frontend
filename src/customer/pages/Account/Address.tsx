import React, { useEffect, useState } from 'react'
import UserAddressCard from './UserAddressCard'
import { useAppDispatch, useAppSelector } from 'State/Store';
import { deleteAddress, fetchAddresses } from 'State/customer/addressSlice';
import { Button, Dialog, DialogContent, DialogTitle, Modal } from '@mui/material';
import AddressForm from '../Checkout/AddressForm';

interface Address {
  id: number;
  name: string;
  fullAddress: string;
  locality: string;
  city: string;
  state: string;
  postCode: string;
  mobile: string;
}

interface Address {
  id: number;
  name: string;
  fullAddress: string;
  locality: string;
  city: string;
  state: string;
  postCode: string;
  mobile: string;
}

const Address = () => {
  const dispatch = useAppDispatch();
  const { addresses, loading, error } = useAppSelector((state) => state.address);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(fetchAddresses(jwt));
    }
  }, [dispatch]);

  const handleAddNew = () => {
    setSelectedAddress(null); // Add mode
    setOpenDialog(true);
  };

  const handleEdit = (address: Address) => {
    setSelectedAddress(address); // Edit mode
    setOpenDialog(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      const jwt = localStorage.getItem("jwt") || "";
      dispatch(deleteAddress({ jwt, id }));
    }
  };

  return (
    <div className="space-y-3 p-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">My Addresses</h1>
        <Button variant="contained" color="primary" onClick={handleAddNew}>
          + Add New Address
        </Button>
      </div>

      {loading && <p>Loading addresses...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {addresses.length > 0 ? (
        addresses.map((address: Address) => (
          <div key={address.id} className="p-5 border rounded-md flex justify-between">
            <div>
              <h1 className="font-bold">{address.name}</h1>
              <p>
                {address.fullAddress}, {address.locality}, {address.city}, {address.state} - {address.postCode}
              </p>
              <p>
                <strong>Mobile:</strong> {address.mobile}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outlined" color="primary" onClick={() => handleEdit(address)}>Edit</Button>
              <Button variant="outlined" color="error" onClick={() => handleDelete(address.id)}>Delete</Button>
            </div>
          </div>
        ))
      ) : (
        <p>No addresses found.</p>
      )}

      {/* ✅ Dialog for Add/Edit */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>{selectedAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
        <DialogContent>
          <AddressForm address={selectedAddress} onClose={() => setOpenDialog(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Address