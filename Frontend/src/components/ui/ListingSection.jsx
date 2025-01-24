import { jwtDecode } from "jwt-decode";
import styles from "./ListingSection.module.css";
import listing from "../../assets/cuisine.svg";
import { useNavigate } from "react-router-dom";

const ListingSection = () => {

    const token = localStorage.getItem('token');
    let userRole = null;
    const navigate = useNavigate();

    try {
        userRole = token ? jwtDecode(token).role : null;
    } catch (error) {
        console.error("Invalid token:", error);
        userRole = null;
    }

    const handleListButton = () => {
        navigate('/restuarant/foodListing');
    }

    return (
        <div>
            {userRole === "seller" && (
                <div className={styles.listingSectionUi} >
                    <div className={styles.listingInput}>
                        <div>
                            <h1>Unleash</h1>
                            <h1>Your Culinary Genius</h1>
                        </div>
                        <div>
                            <h3>List, Sell, Savor</h3>
                            <p>Join the Food Pro revolution! Showcase your delicious creations and let the world feast their eyes on your culinary masterpieces. It's time to shine, chef!</p>
                            <button type="button" className={`${styles.listingButton} btn btn-warning mt-1`} onClick={handleListButton}>List Your Food Now</button>
                        </div>
                    </div>
                    <div className={styles.mainImageContainer}>
                        <img src={listing} alt="Food Rider" style={{ width: '400px', height: '400px' }} />    
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListingSection;