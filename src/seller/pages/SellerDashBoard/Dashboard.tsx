import { Box, Button, Card, CardContent, Divider, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { fetchSellerOrders } from 'State/seller/sellerOrderSlice';
import { fetchTransactionsBySeller } from 'State/seller/transactionSlice';
import { useAppDispatch, useAppSelector } from 'State/Store';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { orders, loading } = useAppSelector((state) => state.sellerOrder);
  const { transactions: transactionList } = useAppSelector(
      (state) => state.transaction
    );
    
    const [totalEarning, setTotalEarning] = useState(0);
    const [lastPayment, setLastPayment] = useState(0);
    const [, setTotalSales] = useState(0);

  useEffect(() => {
    if (transactionList && transactionList.length > 0) {
      // Total Earnings
      const total = transactionList.reduce(
        (sum: number, t: any) => sum + (t.order.totalSellingPrice || 0),
        0
      );
      setTotalEarning(total);

      // Total Sales (Number of items sold)
      const sales = transactionList.reduce(
        (sum: number, t: any) => sum + (t.order.totalItem || 0),
        0
      );
      setTotalSales(sales);

      // Last Payment
      const latest = [...transactionList].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0];
      setLastPayment(latest.order.totalSellingPrice || 0);
    }
  }, [transactionList]);

  useEffect(() => {
    const jwt = localStorage.getItem("sellerJwt") || "";
    if (jwt) {
      dispatch(fetchSellerOrders(jwt));
    }
  }, [dispatch]);

  useEffect(() => {
      const jwt = localStorage.getItem("sellerJwt");
      if (jwt) {
        dispatch(fetchTransactionsBySeller(jwt));
      }
    }, []);

  const totalSales = orders.reduce((sum, order) => sum + (order.totalSellingPrice || 0), 0);
  const pendingOrders = orders.filter((o) => o.orderStatus === "PENDING").length;
  const completedOrders = orders.filter((o) => o.orderStatus === "DELIVERED").length;
  const recentOrders = orders.slice(0, 5);
    
  return (
    <Box className="space-y-6 p-6">
      {/* Summary Cards */}
      <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg rounded-lg">
          <CardContent>
            <Typography variant="h6" className="text-gray-600">Total Sales</Typography>
            <Typography variant="h4" className="font-bold text-green-600">RM {totalEarning}</Typography>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-lg">
          <CardContent>
            <Typography variant="h6" className="text-gray-600">Pending Orders</Typography>
            <Typography variant="h4" className="font-bold text-yellow-600">{pendingOrders}</Typography>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-lg">
          <CardContent>
            <Typography variant="h6" className="text-gray-600">Completed Orders</Typography>
            <Typography variant="h4" className="font-bold text-blue-600">{completedOrders}</Typography>
          </CardContent>
        </Card>
      </Box>

      <Divider />

      {/* Recent Orders */}
      <Box>
        <Typography variant="h6" className="font-bold mb-3">Recent Orders</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Order ID</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Total</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                <TableCell>RM {order.totalSellingPrice}</TableCell>
                <TableCell>{order.orderStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  )
}

export default Dashboard