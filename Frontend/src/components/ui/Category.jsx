import styles from './Category.module.css';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductContext from '../../store/ProductContext';

const Category = () => {
    const { category } = useContext(ProductContext);
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1
    };

    const navigate = useNavigate();

    const handleCategoryClick = (name,id) => () => {
        navigate(`/foods/categoryFood/${name}/${id}`);
    };

    return (
        <div className={styles.categoryContainer}>
            <h1 className={styles.Header}>Category</h1>
             
                <div className={styles.categoryMain}>
                <div className={`${styles.SlideContainer}slider-container`}> 
                <Slider {...settings}>
                    {category.map((category) => (
                        <div key={category.id} className={styles.category} onClick={handleCategoryClick(category.name, category.id)}>
                            <img src={category.image} alt={category.name} className={styles.categoryImage}/>
                            <h4 className={styles.headerName}>{category.name}</h4>
                        </div>
                    ))}
                    </Slider>
                    </div>
                </div>
        </div>
    );
}

export default Category;