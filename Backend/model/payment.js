import { pool } from "./db.js";

export const createPayment = async (transactionId, amount, currency, customerName, customerEmail, customerPhone, paymentStatus, orderDate) => {
    const [ result ] = await pool.query('INSERT INTO payment (transactionId, amount, currency, customerName, customerEmail, customerPhone, paymentStatus, orderDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [transactionId, amount, currency, customerName, customerEmail, customerPhone, paymentStatus, orderDate]);
    return result;
};

export const successTransaction = async (transactionId) => {
    const [ result ] = await pool.query('UPDATE payment SET paymentStatus = "success" WHERE transactionId = ?', [transactionId]);
    return result;
};

export const failPayment = async (transactionId) => {
    const [ result ] = await pool.query('DELETE FROM payment WHERE transactionId = ?', [transactionId]);
    return result;
}