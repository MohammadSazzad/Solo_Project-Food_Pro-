import styles from './Cart.module.css';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
import { TbCurrencyTaka } from "react-icons/tb";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
    const [cartFoods, setCartFoods] = useState([]);
    const navigate = useNavigate();

    useEffect( () => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const controller = new AbortController();
        const signal = controller.signal;
        axios.get(`/api/cart/customer`, {headers, signal})
            .then((response) => {
                setCartFoods( response.data.map((item) => ({id:item.cartID, foodName: item.foodName, price: item.price, stock: item.stock, quantity:item.quantity, image: item.image }))
                );
            })
            .catch((error) => {
                console.error('Error fetching profile data:', error);
            });
        return () => {
            controller.abort();
        }
    }, []);
    console.log(cartFoods);
    
    const handleCartDeleteButton = async(id) => {
        const token = localStorage.getItem('token');
        if(!token) {
            return;
        }
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const controller = new AbortController();
        const signal = controller.signal;
        await axios.delete('/api/cart/remove', {headers, data: {cartID: id}, signal})
            .then((response) => {
                setCartFoods(cartFoods.filter((item) => item.id !== id));
            })
            .catch((error) => {
                console.error('Error deleting from cart:', error);
            });
        return () => {
            controller.abort();
        }
    }

    const handlePaymentButton = () => {
        navigate('/foods/payment', {state: {cartFoods}});
    }

    return (
        <div className={styles.container}>
            <div className="d-flex justify-content-center row">
                <div className="col-md-8">
                    <div className="p-2">
                        <h4>Cart</h4>
                        <div className=" d-flex flex-row justify-content-end align-items-center">
                            <span className="font-weight-light">Sort by:</span>
                            <span className="font-weight-bold">Price</span>
                            <div type="button"><RiArrowDropDownLine /></div>
                        </div>
                    </div>
                    {
                        cartFoods.map((item, index) => (
                            <div key={index} className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
                                <div className="mr-1">
                                    <img className="rounded" src={item.image} width="70"/>
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                    <span className="font-weight-bold">{item.foodName}</span>
                                </div>
                                <div className="d-flex flex-row align-items-center">
                                    <h5 className="text-grey mt-1 mr-1 ml-1">{item.quantity}</h5>
                                </div>
                                <div>
                                    <h5 className="d-flex flex-row align-items-center"><TbCurrencyTaka />{item.price}</h5>
                                </div>
                                <div className="d-flex align-items-center" type="button" onClick={ () => handleCartDeleteButton(item.id)}><RiDeleteBin6Fill /></div>
                            </div>
                        ))
                    }
                    <div className="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded">
                        <input type="text" className="form-control border-0 gift-card" placeholder="discount code/gift card"/>
                        <button className="btn btn-outline-warning btn-sm ml-2" type="button">Apply</button>
                    </div>
                    <div className='d-flex justify-content-center mt-3 p-1 bg-white rounded mb-3'>
                        <button type='button' className={`${styles.Buttn} btn btn-success btn-block btn-lg text-body`}  onClick={handlePaymentButton}>Proceed To Pay</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;