import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from 'State/Store';
import { useEffect, useState } from 'react';
import { fetchSellerOrders, updateOrderStatus } from 'State/seller/sellerOrderSlice';
import { Button, Menu, MenuItem } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const orderStatusColor = {
  PENDING: { color: '#FFA500', label: 'PENDING' }, 
  CONFIRMED: { color: '#F5BCBA', label: 'CONFIRMED' },
  PLACED: { color: '#F5BCBA', label: 'PLACED' },
  SHIPPED: { color: '#1E90FF', label: 'SHIPPED' }, 
  DELIVERED: { color: '#32CD32', label: 'DELIVERED' }, 
  CANCELLED: { color: '#FF0000', label: 'CANCELLED' } 
};

const orderStatus = [
  { color: '#FFA500', label: 'PENDING' },
  { color: '#F5BCBA', label: 'PLACED' },
  { color: '#F5BCBA', label: 'CONFIRMED' },
  { color: '#1E90FF', label: 'SHIPPED' },
  { color: '#32CD32', label: 'DELIVERED' },
  { color: '#FF0000', label: 'CANCELLED' },
];

export default function OrderTable() {
  const dispatch = useAppDispatch();
  const {sellerOrder} = useAppSelector(store => store);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    dispatch(fetchSellerOrders(localStorage.getItem("sellerJwt") || ""));
  }, [dispatch]);

  const [anchorEl, setAnchorEl] = useState<null | any>({});
  const open = Boolean(anchorEl);
  const handleClick = (event: any, orderId:number) => {
    setAnchorEl((prev:any) => ({...prev, [orderId]:event.currentTarget}));
  };
  const handleClose = (orderId:number) => () => {
    setAnchorEl((prev:any) => ({...prev, [orderId]:null}));
  };

  const handleUpdateOrderStatus = (orderId: number, orderStatus: any) => () => {
    dispatch(updateOrderStatus({jwt: localStorage.getItem("sellerJwt") || "", orderId, orderStatus}))
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Order Id</StyledTableCell>
            <StyledTableCell>Products</StyledTableCell>
            <StyledTableCell align="right">Shipping Address</StyledTableCell>
            <StyledTableCell align="right">Order Status</StyledTableCell>
            <StyledTableCell align="right">Update</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sellerOrder.orders.map((item:any) => (
            <StyledTableRow key={item.Id}>
              <StyledTableCell component="th" scope="row">
                {item.id}
              </StyledTableCell>
              <StyledTableCell>
                <div className='flex gap-1 flex-wrap'>
                  {
                    item.orderItems.map((orderItem:any) => <div className='flex gap-5'>
                      <img className='w-20 rounded-md' src={orderItem.product.images[0]} alt="" />
                      <div className='flex flex-col justify-between py-2'>
                        <h1>Title: {orderItem.product.title}</h1>
                        <h1>Price: {orderItem.product.sellingPrice}</h1>
                        <h1>Color: {orderItem.product.color}</h1>
                      </div>
                    </div>)
                  }
                </div>
              </StyledTableCell>
              <StyledTableCell align="right">
                 <div className='flex flex-col gap-y-2'>
                    <h1>{item.shippingAddress?.name || "N/A"}</h1>
                    <h1>{item.shippingAddress?.address || "N/A"}, {item.shippingAddress?.city || "N/A"}</h1>
                    <h1>{item.shippingAddress?.state || "N/A"} - {item.shippingAddress?.postalCode || "N/A"}</h1>
                    <h1><strong>Mobile: </strong>{item.shippingAddress?.mobile || "N/A"}</h1>
                 </div>
              </StyledTableCell>
              <StyledTableCell align="right">
                <span className='px-5 py-2 border rounded-full border-primary'>{item.orderStatus}</span>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button onClick={(e) => handleClick(e, item.id)}>
                  Status
                </Button>
                <Menu
                  id={`status-menu ${item.id}`}
                  anchorEl={anchorEl[item.id]}
                  open={Boolean(anchorEl[item.id])}
                  onClose={handleClose(item.id)}
                  slotProps={{
                    list: {
                      'aria-labelledby':  `status-menu ${item.id}`,
                    },
                  }}
                >
                  {orderStatus.map((status) => 
                    <MenuItem key={item.label} onClick={handleUpdateOrderStatus(item.id, status.label)}>
                      {status.label}
                    </MenuItem>)}
                </Menu>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}