/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { viewAllOrders } from '../utils/data/orderData';
import { getRevenue } from '../utils/data/revenueData';
import { viewAllOrderItems } from '../utils/data/itemData';

function Revenue() {
  const [orderDetails, setOrderDetails] = useState({});
  const [revenueDetails, setRevenueDetail] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [cardCounter, setCardCount] = useState(0);
  const [creditCount, setCreditCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [formattedTips, setFormattedTips] = useState(0);

  useEffect(() => {
    viewAllOrders().then(setOrderDetails);
    getRevenue().then(setRevenueDetail);
    viewAllOrderItems().then((items) => {
      setMenuItems(items);
    });
  }, []);

  useEffect(() => {
    // Loop through revenueDetails and count Cash and Credit
    let cardCounterr = 0;
    let creditCounter = 0;

    revenueDetails.forEach((order) => {
      if (order.paymentType === 'Cash') {
        cardCounterr++;
      } else if (order.paymentType === 'Card') {
        creditCounter++;
      }
    });

    setCardCount(cardCounterr);
    setCreditCount(creditCounter);
  }, [revenueDetails]);

  useEffect(() => {
    // Calculate total revenue
    // .reduce loops through the array acc is for the starting point of the array 0. Easier to read compared to a loop
    const total = menuItems.reduce((acc, item) => (!item.order_open ? acc + item.price : acc), 0);
    setTotalRevenue(total);

    // Calculate total tip amount and format
    const tips = revenueDetails.reduce((totals, order) => totals + parseFloat(order.tipAmount), 0);
    setFormattedTips(tips);
  }, [menuItems, revenueDetails]);

  const revenueTotal = totalRevenue + formattedTips;

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Total Revenue: ${revenueTotal}</h1>
      <h1 style={{ margin: '0 auto' }}>Total Tips: ${formattedTips}</h1>
      <p>Cash Orders: {cardCounter}</p>
      <p>Card Orders: {creditCount}</p>
    </div>
  );
}

export default Revenue;
