import { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import styles from './FoodDetails.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FoodDetails = () => {
    const foodID = useParams().foodID;
    const [food, setFood] = useState([]);

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFoodDetails = async () => {
            try {
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const response = await axios.get(`/api/foods/foodID/${foodID}`, { headers });
                setFood(response.data);
            } catch (error) {
                console.error('Error fetching food details:', error);
            }
        };

        fetchFoodDetails();
    }, [foodID, token]); 

    console.log(food);

    const handleAddCartButton = async() => {
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try{
            const response = await axios.post('/api/cart/create', 
            {
                foodID: food.foodID,
                RestuarantID: food.RestuarantID,
            },
            { headers });
            console.log('Added to cart:', response.data);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
        navigate('/foods/cart');
    }

    const [mainImage, setMainImage] = useState({});

    const thumbnails = [
        food.image,
        food.image,
        food.image,
        food.image,
    ];

    const changeImage = (src) => {
        setMainImage(src);
    };

    console.log(food);

    return (
        <div className="container mt-5 pt-5">
        <div className="row">
            <div className="col-md-6 mb-4">
            <img
                src={food.image}
                alt="Product"
                className={`${styles.productImage} img-fluid rounded mb-3 `}
            />
            <div className="d-flex justify-content-between">
                {thumbnails.map((thumbnail, index) => (
                <img
                    key={index}
                    src={thumbnail}
                    alt={`Thumbnail ${index + 1}`}
                    className={`${styles.thumbnail} rounded ${mainImage === thumbnail ? 'active' : ''}`}
                    onClick={() => changeImage(thumbnail)}
                />
                ))}
            </div>
            </div>

            <div className="col-md-6">
            <h2 className="mb-3">{food.foodName}</h2>
            <p className="text-muted mb-4">FPC: WH10{food.foodID}00XM4</p>
            <div className="mb-3">
                <span className="h4 me-2">{food.price} tk</span>
                <span className="text-muted">
                <s>{food.price+50} tk</s>
                </span>
            </div>
            <div className="mb-3">
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-half text-warning"></i>
                <span className="ms-2">4.5 (120 reviews)</span>
            </div>
            <p className="mb-4">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo soluta, aut quasi nostrum iure voluptatum ad placeat perspiciatis voluptas, sunt, porro reprehenderit adipisci culpa officiis reiciendis ex voluptates iusto ut.
            </p>
            <div className="mb-4">
                <h5>Color:</h5>
                <div className="btn-group" role="group" aria-label="Color selection">
                <input
                    type="radio"
                    className="btn-check"
                    name="color"
                    id="black"
                    autoComplete="off"
                    defaultChecked
                />
                <label className="btn btn-outline-dark" htmlFor="black">
                    Black
                </label>
                <input
                    type="radio"
                    className="btn-check"
                    name="color"
                    id="silver"
                    autoComplete="off"
                />
                <label className="btn btn-outline-secondary" htmlFor="silver">
                    Silver
                </label>
                <input
                    type="radio"
                    className="btn-check"
                    name="color"
                    id="blue"
                    autoComplete="off"
                />
                <label className="btn btn-outline-primary" htmlFor="blue">
                    Blue
                </label>
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="quantity" className="form-label">
                Quantity:
                </label>
                <input
                type="number"
                className="form-control"
                id="quantity"
                defaultValue="1"
                min="1"
                style={{ width: "80px" }}
                />
            </div>
            <button className="btn btn-primary btn-lg mb-3 me-2" onClick={handleAddCartButton}>
                <i className="bi bi-cart-plus"></i> Add to Cart
            </button>
            <button className="btn btn-outline-secondary btn-lg mb-3">
                <i className="bi bi-heart"></i> Add to Wishlist
            </button>
            </div>
        </div>
        </div>
    );
};

export default FoodDetails;
