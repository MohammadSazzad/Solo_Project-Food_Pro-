import express from 'express';
import { createPayment, failPayment, successTransaction } from '../model/payment.js';
import SSLCommerzPayment from 'sslcommerz-lts';
import dotenv from 'dotenv';

const store_id = process.env.SSCZ_STORE_ID;
const store_passwd = process.env.SSCZ_STORE_SECRET;
const is_live = false //true for live, false for sandbox

dotenv.config();

export const createPaymentController = async(req, res) => {

    const paymentData = req.body;
    const tran_id = 'TEST_' + Math.floor(Math.random() * 1000000); // use unique tran_id for each api call
    const data = {
        total_amount: paymentData.Amount,
        currency: paymentData.Currency,
        tran_id: tran_id, // use unique tran_id for each api call
        success_url: `http://localhost:3000/api/payment/success/${tran_id}`,
        fail_url: `http://localhost:3000/api/payment/fail/${tran_id}`,
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: paymentData.cusName,
        cus_email: paymentData.cusEmail,
        cus_add1: paymentData.cusAddress,
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: paymentData.cusPostCode || '4600',
        cus_country: 'Bangladesh',
        cus_phone: paymentData.cusPhoneNumber,
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };

    await createPayment(tran_id, paymentData.Amount, paymentData.Currency, paymentData.cusName, paymentData.cusEmail,paymentData.cusPhoneNumber, 'Pending', paymentData.OrderDate,);

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL
        res.send({url: GatewayPageURL})
        console.log('Redirecting to: ', GatewayPageURL)
    });
};

export const successPaymentController = async(req, res) => {
    const { tran_id } = req.params;
    console.log('Success Transaction: ', tran_id);
    
    try {
        const response = await successTransaction(tran_id);
        if (response) {
            res.redirect(`http://localhost:5173/payment/success/${tran_id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

export const failPaymentController = async(req, res) => {
    const { tran_id } = req.params;
    try{
        const response = failPayment(tran_id);
        if (response) {
            res.redirect(`http://localhost:5173/payment/fail/${tran_id}`);
        }
    }catch(error){
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

