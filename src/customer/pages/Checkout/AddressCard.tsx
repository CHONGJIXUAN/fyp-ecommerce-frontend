import { Radio } from '@mui/material'
import React from 'react'

interface Address {
  id: number;
  name: string;
  locality: string;
  fullAddress: string;
  city: string;
  state: string;
  postCode: string;
  mobile: string;
}

interface AddressCardProps {
  address: any;
  isSelected: boolean;
  onSelect: () => void;
}

const AddressCard = ({ address, selected, onSelect }: { address: Address; selected: boolean; onSelect: () => void }) => {
  return (
    <div className="p-5 border rounded-md flex" onClick={onSelect}>
      <Radio checked={selected} value={address.id} />
      <div className="space-y-3 pt-3">
        <h1>{address.name}</h1>
        <p className="w-[320px]">{address.fullAddress}</p>
        <p>
          <strong>Mobile:</strong> {address.mobile}
        </p>
      </div>
    </div>
  );
};

export default AddressCard;