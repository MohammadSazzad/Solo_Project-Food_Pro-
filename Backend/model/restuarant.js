import { pool } from "./db.js";

export const createTempRestuarant = async (Restuarant_Name, Owner_Name, Email, PhoneNumber, Address, City, password) => {
    const [ result ] = await pool.query("INSERT INTO temp_Restuarant (Restuarant_Name, Owner_Name, Email, PhoneNumber, Address, City, password) VALUES (?, ?, ?, ?, ?, ?, ?)", [Restuarant_Name, Owner_Name, Email, PhoneNumber, Address, City, password]);
    return {
        id: result.insertId,
        Restuarant_Name,
        Owner_Name,
        Email,
        PhoneNumber,
        Address,
        City,
        password
    }
}

export const getRestaurants = async () => {
    const [ result ] = await pool.query("SELECT * FROM Restuarant");
    return result;
}

export const getTempRestuarantByEmail = async (Email) => {
    const [ result ] = await pool.query("SELECT * FROM temp_Restuarant WHERE Email = ?", [Email]);
    return result[0];
}

export const deleteTempRestuarant = async (Email) => {
    await pool.query("DELETE FROM temp_Restuarant WHERE Email = ?", [Email]);
}

export const createRestuarant = async (Restuarant_Name, Owner_Name, Email, PhoneNumber, Address, City, password) => {
    const [ result ] = await pool.query("INSERT INTO Restuarant (Restuarant_Name, Owner_Name, Email, PhoneNumber, Address, City, password) VALUES (?, ?, ?, ?, ?, ?, ?)", [Restuarant_Name, Owner_Name, Email, PhoneNumber, Address, City, password]);
    return {
        id: result.insertId,
        Restuarant_Name,
        Owner_Name,
        Email,
        PhoneNumber,
        Address,
        City,
        password
    }
}

export const getRestuarantByEmail = async (Email) => {
    const [ result ] = await pool.query("SELECT * FROM Restuarant WHERE Email = ?", [Email]);
    return result[0];
}

export const createRestuarantImage = async (Restuarant_ID, Image) => {
    const [ result ] = await pool.query("UPDATE Restuarant SET Image = ? WHERE Restuarant_ID = ?", [Image, Restuarant_ID]);
    return result;
}

export const removeRestuarantImage = async (Restuarant_ID) => {
    const [ result ] = await pool.query("UPDATE Restuarant SET Image = NULL WHERE Restuarant_ID = ?", [Restuarant_ID]);
    return result;
}

