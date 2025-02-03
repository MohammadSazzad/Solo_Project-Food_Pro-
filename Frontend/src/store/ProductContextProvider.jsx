import { useEffect, useState } from "react";
import ProductContext from "./ProductContext";
import axios from "axios";

const ProductContextProvider = ({children}) => {
    const [category, setCategory] = useState([]);


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
        category,
    };

    return (
        <ProductContext.Provider value={context}>
            {children}
        </ProductContext.Provider>
    );
}

export default ProductContextProvider;