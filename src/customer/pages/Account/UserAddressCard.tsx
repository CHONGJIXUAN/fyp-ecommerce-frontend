import React, { useEffect } from 'react'
import { fetchAddresses } from 'State/customer/addressSlice';
import { useAppDispatch, useAppSelector } from 'State/Store';

interface UserAddressCardProps {
  address: {
    id: number;
    name: string;
    fullAddress: string;
    locality: string;
    city: string;
    state: string;
    postCode: string;
    mobile: string;
  };
}

const UserAddressCard: React.FC<UserAddressCardProps> = ({ address }) => {
  return (
    <div className="p-5 border rounded-md flex">
      <div className="space-y-3">
        <h1>{address.name}</h1>
        <p className="w-[320px]">
          {address.fullAddress}, {address.locality}, {address.city}, {address.state} - {address.postCode}
        </p>
        <p>
          <strong>Mobile :</strong> {address.mobile}
        </p>
      </div>
    </div>
  );
};

export default UserAddressCard