import { pool } from './db.js';

export const createOrderItem = async (orderID, RestuarantID, foodID, price, quantity) => {
    const [result] = await pool.query("INSERT INTO ordersItem (orderID, RestuarantID, foodID, price, quantity) VALUES (?, ?, ?, ?, ?)", [orderID, RestuarantID, foodID, price, quantity]);
    return result;
}

export const getAllOrderItems = async () => {
    const [result] = await pool.query("SELECT * FROM ordersItem");
    return result;
}

export const getOrderItemByID = async (orderID) => {
    const [result] = await pool.query("SELECT * FROM ordersItem WHERE orderID = ?", [orderID]);
    return result[0];
}

export const getOrderItemByRestaurantID = async (restuarantID) => {
    const [result] = await pool.query("SELECT * FROM ordersItem WHERE restuarantID = ?", [restuarantID]);
    return result;
}

export const getOrderItemByFoodID = async (foodID) => {
    const [result] = await pool.query("SELECT * FROM ordersItem WHERE foodID = ?", [foodID]);
    return result;
}

export const getStatus = async (customerID) => {
    const [result] = await pool.query("SELECT ordersItem.status FROM ordersItem JOIN Orders ON ordersItem.orderID = Orders.OrderID WHERE Orders.customerID=?", [customerID]);
    return result;
}