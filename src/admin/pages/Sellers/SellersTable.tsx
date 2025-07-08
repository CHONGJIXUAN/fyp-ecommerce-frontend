import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'

const accountStatusType = [
  { status: 'PENDING_VERIFICATION', title: 'Pending Verification', description: 'Account is awaiting verification.' },
  { status: 'ACTIVE', title: 'Active', description: 'Account is active and in good standing.' },
  { status: 'SUSPENDED', title: 'Suspended', description: 'Account is temporarily suspended.' },
  { status: 'DEACTIVATED', title: 'Deactivated', description: 'Account is deactivated.' },
  { status: 'BANNED', title: 'Banned', description: 'Account is permanently banned due to violations.' },
  { status: 'CLOSED', title: 'Closed', description: 'Account is permanently closed, possibly by user request.' },
];

const SellersTable = () => {
  const [accountStatus, setAccountStatus] = useState("ACTIVE");

  const handleChange = (event: any) => {
    setAccountStatus(event.target.value);
  };

  return (
    <div className='pb-5 w-60'>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Account Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={accountStatus}
          label="Account Status"
          onChange={handleChange}
        >
          {accountStatusType.map((item) => (
            <MenuItem key={item.status} value={item.status}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default SellersTable