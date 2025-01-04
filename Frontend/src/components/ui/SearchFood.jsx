import foodRider from '../../assets/foodRider.svg';
import styles from './SearchFood.module.css';

const SearchFood = () => {
    return (
        <div className={styles.searchFoodUi} >
            <div className={styles.greetingsInput}>
                <h1>Fast, Fresh</h1>
                <h1>& Right To Your Door</h1>
                <p>Order dishes from favorite restaurants near you.</p>
                <div className={styles.inputContainer}>
                    <input type="text" placeholder='Enter your location' className={styles.inputLocation}/>
                    <button type="button" className={`${styles.inputButton} btn btn-warning`}>Find_Food</button>
                </div>
            </div>
            <div className={styles.mainImageContainer}>
                <img src={foodRider} alt="Food Rider" style={{ width: '400px', height: '400px' }} />    
            </div>
        </div>
    );
}

export default SearchFood;