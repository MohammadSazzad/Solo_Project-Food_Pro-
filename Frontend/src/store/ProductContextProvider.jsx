import { useEffect, useState } from "react";
import ProductContext from "./ProductContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ProductContextProvider = ({children}) => {
    const [orderHistory, setOrderHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const customerID = decodedToken.id;
    useEffect(() => {
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const controller = new AbortController();
        const signal = controller.signal;

        axios.get(`/api/foods/order-history/${customerID}`, {headers, signal})
            .then((response) => {
                setOrderHistory( response.data.map((item) => ({foodName: item.foodName, price: item.price, image: item.image }))
                );
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
        return () => {
            controller.abort();
        }
            
    }, []);

    const context = {
        orderHistory,
        isLoading,
    };

    return (
        <ProductContext.Provider value={context}>
            {children}
        </ProductContext.Provider>
    );
}

export default ProductContextProvider;