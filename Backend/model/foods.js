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

export const getAllFoods = async () => {
    const [ result ] = await pool.query("SELECT * FROM foods");
    return result;
}

export const getFoodByCategory = async (categoryID) => {
    const [ result ] = await pool.query("SELECT * FROM foods WHERE categoryID = ?", [categoryID]);
    return result;
}

export const getFoodByRestuarantID = async (RestuarantID) => {
    const [ result ] = await pool.query("SELECT * FROM foods WHERE RestuarantID = ?", [RestuarantID]);
    return result;
}

export const deleteFoodByFoodID = async (foodID) => {
    const result = await pool.query("DELETE FROM foods WHERE foodID = ?", [foodID]);
    return result;
}

export const deleteFoodByRestuarantID = async (RestuarantID) => {
    const result = await pool.query("DELETE FROM foods WHERE RestuarantID = ?", [RestuarantID]);
    return result;
}

