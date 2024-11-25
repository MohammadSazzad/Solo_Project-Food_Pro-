import { pool } from './db.js';

export const createTempAdmin = async (adminName, email, password) => {
    const [result] = await pool.query("INSERT INTO temp_admins (adminName, email, password) VALUES (?, ?, ?)", [adminName, email, password]);
    return result.insertId;
}

export const getAdminByEmail= async (email) => {
    const [result] = await pool.query("SELECT * FROM admins WHERE email = ?", [email]);
    return result[0];
}

export const getTempAdminByEmail = async (email) => {
    const [result] = await pool.query("SELECT * FROM temp_admins WHERE email = ?", [email]);
    return result[0];
}

export const deleteTempAdmin = async (email) => {
    const result = await pool.query("DELETE FROM temp_admins WHERE email = ?", [email]);
    return result;
}

export const createAdmin = async (adminName, email, password) => {
    const [result] = await pool.query("INSERT INTO admins (adminName, email, password) VALUES (?, ?, ?)", [adminName, email, password]);
    return result.insertId;
}

export const createAdminImage = async (adminID, image) => {
    const [result] = await pool.query("UPDATE admins set image = ? WHERE adminID = ?", [image, adminID]);
    return result.insertId;
}

export const removeAdminImage = async (adminID) => {
    const [result] = await pool.query("UPDATE admins set image = null WHERE adminID = ?", [adminID]);
    return result.insertId;
}