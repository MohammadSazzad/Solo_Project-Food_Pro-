import Error from '../../assets/Error.svg';
import styles from './FailPayment.module.css';

const FailPayment = () => {

    return (
        <div className={styles.container}>
            <img src={Error} alt="Error" style={{height: '500px', width: '500px'}} />
            <div>
                <h1>Transaction Failed</h1>
                <p>Sorry, your payment was not successful. Please <a href="/foods/cart">try again.</a></p>
            </div>
        </div>
    )
}

export default FailPayment;