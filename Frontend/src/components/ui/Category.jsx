import styles from './Category.module.css';
import { useContext } from 'react';
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