import { pool } from './db.js';

export const createCategory = async (categoryName) => {
    const [result] = await pool.query("INSERT INTO Category (categoryName) VALUES (?)", [categoryName]);
    return result;
}

export const createCategoryImage = async (image) => {
    const [result] = await pool.query("INSERT INTO Category (image) VALUES (?)", [image]);
    return result;
}

export const updateCategory = async (categoryName, categoryID) => {
    const [result] = await pool.query("UPDATE Category SET categoryName = ? WHERE categoryID = ?", [categoryName, categoryID]);
    return result;
}

export const deleteCategory = async (categoryID) => {
    const [result] = await pool.query("DELETE FROM Category WHERE categoryID = ?", [categoryID]);
    return result;
}

export const getAllCategories = async () => {
    const [result] = await pool.query("SELECT * FROM Category");
    return result;
}

export const getCategoryById = async (categoryID) => {
    const [result] = await pool.query("SELECT * FROM Category WHERE categoryID = ?", [categoryID]);
    return result[0];
}