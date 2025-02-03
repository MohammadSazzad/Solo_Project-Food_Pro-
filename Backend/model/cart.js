import { pool } from './db.js';

export const getFoodName = async (foodID) => {
    const [ result ] = await pool.query(
        `SELECT * FROM foods WHERE foodID = ?`,
        [foodID]
    );
    return result;
}

export const createCart = async (customerID, foodID, RestuarantID, foodName, price, quantity, image) => {
    const [result] = await pool.query(
        `INSERT INTO cart (customerID, foodID, RestuarantID, foodName, price, quantity, image) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [customerID, foodID, RestuarantID, foodName, price, quantity, image]
    );
    return result;
};


export const removeFoodFromCart = async (cartID) => {
    const [ result ] = await pool.query(
        `DELETE FROM cart WHERE cartID = ?`,
        [cartID]
    );
    return result;
}

export const removeFoodFromCartByCustomer = async ( customerID ) => {
    const [ result ] = await pool.query(
        `DELETE FROM cart WHERE customerID = ?`,
        [customerID]
    );
    return result;
}

export const getCartByCustomerID = async (customerID) => {
    const [ result ] = await pool.query(
        `SELECT * FROM cart WHERE customerID = ?`,
        [customerID]
    );
    return result;
}

export const getAllCart = async () => {
    const [ result ] = await pool.query(
        `SELECT * FROM cart`
    );
    return result;
}

export const getCartByrestaurant = async (RestuarantID) => {
    const [ result ] = await pool.query(
        `SELECT * FROM cart WHERE RestuarantID = ?`,
        [RestuarantID]
    );
    return result;
}