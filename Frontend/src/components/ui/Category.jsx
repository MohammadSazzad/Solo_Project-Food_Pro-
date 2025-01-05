import styles from './Category.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Category = () => {

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

    return (
        <div className={styles.categoryContainer}>
            <h1 className={styles.Header}>Category</h1>
            <div className={styles.categoryMain}>
                {category.map((id) => (
                    <div key={id.id} className={styles.category} onClick={() => console.log(id.name)}>
                        <img src={id.image} alt={id.name} className={styles.categoryImage}/>
                        <h4 className={styles.headerName}>{id.name}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Category;