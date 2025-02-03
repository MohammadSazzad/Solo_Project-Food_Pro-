import { createContext } from "react";

const ProductContext = createContext(
    {
        products: [],
        setProducts: () => {},
        user: {},
        setUser: () => {},
        orders: [],
        setOrders: () => {},
        order: {},
        setOrder: () => {},
        orderDetails: [],
        setOrderDetails: () => {},
        orderDetail: {},
        setOrderDetail: () => {},
        orderHistory: [],
        setOrderHistory: () => {},
        isLoading: false,
        category: [],
        setCategory: () => {},
        categoryClicked: [],
        setCategoryClicked: () => {},
        handleCategoryClick: () => {},
    }
);

export default ProductContext;