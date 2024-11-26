import {pool} from './db.js';

export const createOrder = async (OrderDate, TotalAmount, status, customerID, CreatedAt, UpdatedAt) => {
    const [result] = await pool.query("INSERT INTO Orders (OrderDate, TotalAmount, status, customerID, CreatedAt, UpdatedAt) VALUES (?, ?, ?, ?, ?, ?)", [OrderDate, TotalAmount, status, customerID, CreatedAt, UpdatedAt]);
    return result;
};

export const updateOrder = async (orderID, status) => {
    const [result] = await pool.query("UPDATE Orders SET status = ? WHERE orderID = ?", [status, orderID]);
    return result;
};

export const deleteOrder = async (orderID) => {
    const [result] = await pool.query("DELETE FROM Orders WHERE orderID = ?", [orderID]);
    const [result1] = await pool.query("DELETE FROM OrdersItem WHERE orderID = ?", [orderID]);
    return result && result1;
};

export const getAllOrders = async () => {
    const [result] = await pool.query("SELECT * FROM Orders");
    return result;
};

export const getOrderByID = async (orderID) => {
    const [result] = await pool.query("SELECT * FROM Orders WHERE orderID = ?", [orderID]);
    return result[0];
};
