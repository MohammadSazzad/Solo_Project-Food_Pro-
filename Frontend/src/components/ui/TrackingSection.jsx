import styles from './TrackingSection.module.css';
import Hero2 from '../../assets/Hero2.svg';
import Location from '../../assets/Location.svg';
import Restuarant from '../../assets/Restuarant.svg';
const TrackingSection = () => {

    return (
        <div className={styles.trackingSectionContainer}>
            <div>
                <img src={Hero2} alt="Hero" className={styles.pic} />
                <div className={styles.trackingSectionText}>
                    <h4>Super fast Delivery</h4>
                    <p>Faster than your cravings can blink. Experience the super-fast delivery and get fresh food.</p>
                </div>
            </div>
            <div>
                <img src={Location} alt="Location" className={styles.pic} />
                <div className={styles.trackingSectionText}>
                    <h4>Live Order Tracking</h4>
                    <p>Track your order while it is delivered to your doorstep from the restaurant.</p>
                </div>
            </div>
            <div>
                <img src={Restuarant} alt="Restuarant" className={styles.pic} />
                <div className={styles.trackingSectionText}>
                    <h4>Your Favorite Restaurants</h4>
                    <p>Find the best and nearest top your favorite restaurants from your selected location.</p>
                </div>

            </div>
        </div>

    );
}

export default TrackingSection;