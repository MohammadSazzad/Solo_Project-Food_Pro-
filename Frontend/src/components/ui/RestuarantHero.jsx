import styles from './RestuarantHero.module.css';
import Restuarant1 from '../../assets/Restuarant1.png';
import Hero from '../../assets/Hero.svg';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Ensure this import is correct

const RestuarantHero = () => {
    const navigate = useNavigate();

    const handleRestuarantButton = () => {
        navigate('/restuarant/signup');
    };

    const handleHeroButton = () => {
        navigate('/hero/signup'); // Add the appropriate path here
    };

    const token = localStorage.getItem('token');
    let userRole = null;

    try {
        userRole = token ? jwtDecode(token).role : null;
    } catch (error) {
        console.error("Invalid token:", error);
        userRole = null;
    }

    return (
        <>
            {userRole !== "seller" && (
                <div className={styles.restuarantHeroContainer}>
                    <div className={styles.restuarantContainer}>
                        <img
                            src={Restuarant1}
                            alt="Restaurant Interior"
                            className={styles.restuarantInterior}
                        />
                        <div className={styles.restuarantheroText}>
                            <h4>List Your Restaurant on Food Pro</h4>
                            <p>
                                Would you like millions of new customers to enjoy your amazing food
                                and groceries? Let's start our partnership today!
                            </p>
                            <button
                                className={styles.restuarantHeroButton}
                                onClick={handleRestuarantButton}
                            >
                                Become a Partner
                            </button>
                        </div>
                    </div>
                    <div className={styles.heroContainer}>
                        <img src={Hero} alt="Hero" className={styles.hero} />
                        <div className={styles.restuarantheroText}>
                            <h4>Become A Food Pro Hero</h4>
                            <p>
                                Are you a man of speed and a master of navigation? Become a Foodi
                                Hero and earn up to 25,000 TK each month while spreading joy to the
                                doorsteps.
                            </p>
                            <button
                                className={styles.restuarantHeroButton}
                                onClick={handleHeroButton}
                            >
                                Become a Hero
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RestuarantHero;
