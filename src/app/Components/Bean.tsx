"use client";

import { useState } from 'react';
import Script from 'next/script';

export default function Bean() {
  const [loading, setLoading] = useState(false);
  const amount = '400';
  const currency = 'INR';

  const createOrderId = async () => {
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount) * 100,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data.orderId;
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };

  const processPayment = async () => {
    try {
      const orderId: string = await createOrderId();
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: parseFloat(amount) * 100,
        currency: currency,
        name: 'Buy Me a Coffee',
        description: 'One coffee bean box',
        order_id: orderId,
        handler: async function (response: any) {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await fetch('/api/verify', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
          });
          const res = await result.json();
          if (res.isOk) alert('Payment succeeded');
          else {
            alert(res.message);
          }
        },
        theme: {
          color: '#3399cc',
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response: any) {
        alert(response.error.description);
      });
      paymentObject.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen py-8 px-4">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">Boost My Brew 🫘</h1>

        <div className="flex justify-center mb-4">
          <img
            src="https://static.vecteezy.com/system/resources/previews/027/927/578/non_2x/coffee-logo-ai-generative-free-png.png"
            alt="Boy drinking coffee"
            width={300}
            height={300}
            className="rounded"
          />
        </div>

        <p className="text-lg text-center mb-8">
          If you like my works then consider buying me some coffee beans 😊
        </p>

        <div className="flex justify-center">
          <button
            onClick={processPayment}
            className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
          >
            Buy One Coffee Box
          </button>
        </div>
      </div>
    </div>
  );
}