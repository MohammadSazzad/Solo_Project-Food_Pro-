import { useEffect, useState } from "react";
import ProductContext from "./ProductContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ProductContextProvider = ({children}) => {
    const [orderHistory, setOrderHistory] = useState([]);
    const [category, setCategory] = useState([]);

    const token = localStorage.getItem("token");
    const decodedToken = token?jwtDecode(token):{};
    const customerID = token?decodedToken.id:null;

    useEffect(() => {
        if (!token) {
            return;
        }
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
                console.error('Error fetching profile data:', error);
            });
        return () => {
            controller.abort();
        }
            
    }, []);

    useEffect(() => {
        axios.get('/api/category/all')
            .then((response) => {
                setCategory( response.data.map((item) => ({id: item.categoryID, name: item.categoryName, image: item.image }))
                );
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, []); 

    const context = {
        orderHistory,
        category,
    };

    return (
        <ProductContext.Provider value={context}>
            {children}
        </ProductContext.Provider>
    );
}

export default ProductContextProvider;