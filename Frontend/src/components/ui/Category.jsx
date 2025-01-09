import styles from './Category.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

    console.log(category);

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1
    };

    return (
        <div className={styles.categoryContainer}>
            <h1 className={styles.Header}>Category</h1>
             
                <div className={styles.categoryMain}>
                <div className={`${styles.SlideContainer}slider-container`}> 
                <Slider {...settings}>
                    {category.map((id) => (
                        <div key={id.id} className={styles.category} onClick={() => console.log(id.name)}>
                            <img src={id.image} alt={id.name} className={styles.categoryImage}/>
                            <h4 className={styles.headerName}>{id.name}</h4>
                        </div>
                    ))}
                    </Slider>
                    </div>
                </div>
        </div>
    );
}

export default Category;