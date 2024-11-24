import { pool } from './db.js';

export const createFoodImage = async (RestuarantID, image) => {
    const [result] = await pool.query("INSERT INTO foods (RestuarantID, image) VALUES (?, ?)", [RestuarantID, image]);
    return result.insertId; 
};


export const createFoodDetails = async (foodID, categoryID, foodName, price, stock) => {
    const result = await pool.query("UPDATE foods SET categoryID = ?, foodName = ?, price = ?, stock = ? WHERE foodID = ?", [categoryID, foodName, price, stock, foodID]);
    return result;
};

export const getFoodDetailsByFoodID = async (foodID) => {
    const [ result ] = await pool.query("SELECT * FROM foods WHERE foodID = ?", [foodID]);
    return result[0];
}