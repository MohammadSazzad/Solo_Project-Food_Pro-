import payment from '../../assets/payment.jpg'
import logo from '../../assets/Logo.png';
import styles from './Payment.module.css'
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const Payment = () => {

    const location = useLocation();
    const { cartFoods } = location.state || {};
    const totalAmount = cartFoods.reduce ((acc, item) => acc + item.price*item.quantity, 0);
    const currentDate = new Date();
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    console.log(decoded);

    const handlePayButton = async(e) => {
        e.preventDefault();
        console.log("Payment Button Clicked");
        try{
            const response = await axios.post('/api/payment/create',
                {
                    cusName : decoded.FirstName + " " +decoded.LastName,
                    cusEmail : decoded.Email,
                    cusPhoneNumber : decoded.PhoneNumber,
                    cusAddress : decoded.Adress + " " + decoded.City,
                    cusPostCode : decoded.PostCode,
                    Currency : "BDT",
                    Amount : totalAmount,
                    OrderDate : currentDate.toISOString(),
                }
            )
            const result = response.data;
            window.location.replace(result.url);
        }catch(error){
            console.log(error.message);
        }
    }

    return (
        <div className={styles.container} style={{backgroundImage: `url(${payment})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '80vh'}}>
            <div className={styles.paymentHeaderContainer}>
                <h1 className={styles.paymentHeader}>Payment</h1>
            </div>
            <div className={styles.paymentForm}>
            <div className={`${styles.formData} p-2  p-md-2 p-lg-2`} style={{"borderRadius": "15px"}}>
                    <img src={logo} alt="Logo" style={{"borderRadius":"50%", "height": "150px", "width":"150px", }} />
                <div className="table width-100 height-100">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td><label htmlFor="name">Name:</label></td>
                                    <td>{decoded.FirstName} {decoded.LastName}</td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="email">Email:</label></td>
                                    <td>{decoded.Email}</td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="phoneNumber">Phone Number:</label></td>
                                    <td>{decoded.PhoneNumber}</td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="address">Address:</label></td>
                                    <td>{decoded.Adress} {decoded.City}</td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="postCode">Post Code:</label></td>
                                    <td>{decoded.PostCode|| 4600}</td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="currrency">Currency:</label></td>
                                    <td>BDT</td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="amount">Amount:</label></td>
                                    <td>{totalAmount}tk</td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="orderDate">Order Date:</label></td>
                                    <td> {currentDate.toLocaleDateString()} </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={handlePayButton}>Pay</button>
                </div>
            </div>

        </div>
    );

};

export default Payment;