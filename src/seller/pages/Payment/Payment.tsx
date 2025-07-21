import { Button, Card, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Transaction from './Transaction'
import { useAppDispatch, useAppSelector } from 'State/Store';
import { fetchTransactionsBySeller } from 'State/seller/transactionSlice';

const Payment = () => {
  const dispatch = useAppDispatch();

  // ✅ Get transaction state from Redux
  const { transactions: transactionList, loading } = useAppSelector(
    (state) => state.transaction
  );

  const [totalEarning, setTotalEarning] = useState(0);
  const [lastPayment, setLastPayment] = useState(0);

  // ✅ Fetch transactions when component mounts
  useEffect(() => {
    const jwt = localStorage.getItem("sellerJwt");
    if (jwt) {
      dispatch(fetchTransactionsBySeller(jwt));
    }
  }, []);

  // ✅ Calculate total earning & last payment when transactionList updates
  useEffect(() => {
    if (transactionList && transactionList.length > 0) {
      // Calculate total earnings
      const total = transactionList.reduce(
        (sum:any, t:any) => sum + (t.order.totalSellingPrice || 0),
        0
      );
      setTotalEarning(total);

      // Find the latest transaction by date
      const latest = [...transactionList].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0];
      setLastPayment(latest.order.totalSellingPrice || 0);
    }
  }, []);

  return (
    <div className="space-y-5">
      <Card className="rounded-md space-y-4 p-5">
        <h1 className="text-gray-600 font-medium">Total Earning</h1>
        <h1 className="font-bold text-xl pb-1">RM {totalEarning}</h1>
        <Divider />
        <p className="text-gray-600 font-medium pt-1">
          Last Payment: <strong>RM {lastPayment}</strong>
        </p>
      </Card>
      <div className="pt-20 space-y-3">
        <h1 className="font-bold mb-5 text-xl">Transactions</h1>
        <Transaction />
      </div>
    </div>
  );
}

export default Payment