import { pool } from "./db.js";

export const createTempCustomer = async (FirstName, LastName, Email, PhoneNumber, Address, City, DateOfBirth, password) => {
    const [result] = await pool.query ( "INSERT INTO temp_Customer (FirstName, LastName, Email, PhoneNumber, Address, City, DateOfBirth, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [FirstName, LastName, Email, PhoneNumber, Address, City, DateOfBirth, password]);
    return {
        id: result.insertId,
        FirstName,
        LastName,
        Email,
        PhoneNumber,
        Address,
        City,
        DateOfBirth,
        password
    };
    return {
        id: result.insertId,
        FirstName,
        LastName,
        Email,
        PhoneNumber,
        Address,
        City,
        DateOfBirth,
        password
    }
}

export const getCustomer  = async () => {
    const [result] = await pool.query("SELECT * FROM Customer");
    return result; 
}

export const getTempCustByEmail = async (Email) => {
    const [result] = await pool.query("SELECT * FROM temp_Customer WHERE Email = ?", [Email]);
    return result[0];
}

export const deleteTempCustomer = async (Email) => {
    await pool.query("DELETE FROM temp_Customer WHERE Email = ?", [Email]);
}

export const createCustomer = async (FirstName, LastName, Email, PhoneNumber, Address, City, DateOfBirth, password) => {
    const [result] = await pool.query("INSERT INTO Customer (FirstName, LastName, Email, PhoneNumber, Address, City, DateOfBirth, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [FirstName, LastName, Email, PhoneNumber, Address, City, DateOfBirth, password]);
    return {
        id: result.insertId,
        FirstName,
        LastName,
        Email,
        PhoneNumber,
        Address,
        City,
        DateOfBirth,
        password
    }
}

export const getCustomerByEmail = async (Email) => {
    const [result] = await pool.query("SELECT * FROM Customer WHERE Email = ?", [Email]);
    return result[0];
}

export const customerImage = async (customerID, image) => {
    const [result] = await pool.query("UPDATE Customer SET image = ? WHERE customerID = ?", [image, customerID]);
    return result;
}

export const removecustomerImage = async (customerID) => {
    const [result] = await pool.query("UPDATE Customer SET image = NULL WHERE customerID = ?", [customerID]);
    return result;
}