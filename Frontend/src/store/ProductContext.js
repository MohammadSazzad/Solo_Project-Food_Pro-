import { createContext } from "react";

const ProductContext = createContext(
    {
        products: [],
        setProducts: () => {},
        cart: [],
        setCart: () => {},
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
    }
);

export default ProductContext;