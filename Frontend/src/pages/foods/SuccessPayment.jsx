import { useParams } from "react-router-dom";
import styles from './SuccessPayment.module.css';
import thumb from '../../assets/thumb.svg'
import axios from "axios";

const SuccessPayment = () => {
    const { tran_id } = useParams();
    console.log('Success Transaction: ', tran_id);
    const token = localStorage.getItem('token');

    if(!token) {
        return ;
    }

    const headers = {
        Authorization: `Bearer ${token}`,
    };
    try{
        axios.delete('/api/cart/remove/customer', { headers })
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.error('Error updating payment status:', error);
        }
        )
    } catch (error) {
        console.error(error.message);
    }


    return (
        <div className={styles.successContainer} style={{backgroundImage: `url(${thumb})`, cover: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', height:'800px', width:'100%', marginTop: '4rem', paddingBottom: '5rem'}}>
            <h1>Payment Successful</h1>
            <p>Your payment was successful. Your order will be delivered soon.</p>
        </div>
    );
}

export default SuccessPayment;