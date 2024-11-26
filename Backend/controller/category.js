import { createCategory, updateCategory, deleteCategory, getAllCategories, getCategoryById } from "../model/category.js";

export const createCategoryController = async (req, res) => {
    if(req.user.role !== 'admin') {
        return res.status(401).json({message: 'Unauthorized'});
    }

    const { categoryName } = req.body;
    const result = await createCategory(categoryName);
    return res.status(201).json(result);
}

export const deleteCategoryController = async (req, res) => {
    if(req.user.role !== 'admin') {
        return res.status(401).json({message: 'Unauthorized'});
    }
    const { categoryID } = req.params;
    await deleteCategory(categoryID);
    return res.status(200).json({message: 'Category deleted successfully'});
}

export const updateCategoryController = async (req, res) => {
    if(req.user.role !== 'admin') {
        return res.status(401).json({message: 'Unauthorized'});
    }
    const { categoryName } = req.body;
    const { categoryID } = req.params;
    const result = await updateCategory(categoryName, categoryID);
    return res.status(200).json(result);
}

export const getAllCategoriesController = async (req, res) => {
    const result = await getAllCategories();
    return res.status(200).json(result);
}

export const getCategoryByIdController = async (req, res) => {
    const { categoryID } = req.params;
    const result = await getCategoryById(categoryID);
    return res.status(200).json(result);
}