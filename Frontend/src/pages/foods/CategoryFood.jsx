import { useEffect, useState } from 'react';
import cuisine from '../../assets/best_cuisine.svg';
import styles from './CategoryFood.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { MdOutlineDeliveryDining } from "react-icons/md";


const CategoryFood = () => {
    const backgroundStyle = {
        backgroundImage: `url(${cuisine})`,
        backgroundSize: "cover",
    };

    const { categoryName, categoryID } = useParams();
    const [foods, setFoods] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`/api/foods/category/${categoryID}`)
            .then((response) => {
                setFoods(response.data.map((item) => ({id: item.foodID, name: item.foodName, image: item.image })))
            })
            .catch((error) => {
                console.error('Error fetching foods:', error);
            });
    }, []);

    const handleViewDetails = (id) => () => {
        navigate(`/foods/foodDetails/${id}`);
    };

    const [seeeMore, setSeeMore] = useState(false);

    return (
        <div>
            <div style={backgroundStyle} className={styles.imageContainer}>
                <h1>Cuisines</h1>
            </div>
            <div>
                <main>
                    <div className="album py-5 bg-body-tertiary">
                        <div className="container">
                            <h2 className='pb-4'>Favourite Cuisine</h2>
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
                                {foods.slice(0,12).map((card) => (
                                    <div key={card.id} className="col">
                                        <div className="card shadow-sm">
                                            <img src={card.image} alt="Food Image" style={{'width':'100%', 'height':'200px', 'borderRadius':'5px 5px 0 0'}}/>
                                            <div className="card-body">
                                                <h5 className="card-title">{card.name}</h5>
                                                <p>!!{categoryName} </p>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleViewDetails(card.id)}>View</button>
                                                    <small className="text-body-secondary"><MdOutlineDeliveryDining /> 30tk</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {foods.length > 12 && (
                                <div className='d-flex justify-content-center'>
                                    <button type='submit' className={`${styles.Buttn} btn btn-success btn-block btn-lg text-body` } onClick={()=> setSeeMore(true)}>Show More Foods</button>
                                </div>
                                )}
                            {seeeMore && (
                                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
                                    {foods.map((card) => (
                                        <div key={card.id} className="col">
                                            <div className="card shadow-sm">
                                                <img src={card.image} alt="Food Image" style={{'width':'100%', 'height':'200px', 'borderRadius':'5px 5px 0 0'}}/>
                                                <div className="card-body">
                                                    <h5 className="card-title">{card.name}</h5>
                                                    <p>!!{categoryName} </p>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleViewDetails(card.id)}>View</button>
                                                        <small className="text-body-secondary"><MdOutlineDeliveryDining /> 30tk</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CategoryFood;