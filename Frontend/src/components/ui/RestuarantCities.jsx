import RestuarantInterior from '../../assets/Restuarant.svg';
import styles from './RestuarantCities.module.css';


const RestuarantCities = () => {

    const obj = [
        {
            id : 1,
            img : RestuarantInterior,
            name : "Dhaka",
            numOfRestuarants : 100
        },
        {
            id : 2,
            img : RestuarantInterior,
            name : "Chattogram",
            numOfRestuarants : 50
        },
        {
            id : 3,
            img : RestuarantInterior,
            name : "Sylhet",
            numOfRestuarants : 30
        },
        {
            id : 4,
            img : RestuarantInterior,
            name : "Khulna",
            numOfRestuarants : 20
        },
        {
            id : 5,
            img : RestuarantInterior,
            name : "Rajshahi",
            numOfRestuarants : 15
        },
        {
            id : 6,
            img : RestuarantInterior,
            name : "Barishal",
            numOfRestuarants : 10
        },
        {
            id : 7,
            img : RestuarantInterior,
            name : "Rangpur",
            numOfRestuarants : 5
        },
        {
            id : 8,
            img : RestuarantInterior,
            name : "Mymensingh",
            numOfRestuarants : 2
        }

    ]

    return (
        <div className={styles.restuarantCitiesMainContainer}>
            <h3 className={styles.Header}>We Deliver to:</h3>
            <div className={styles.restuarantCitiesContainer}>
                { obj.map ( (id) => 
                    <div key={id.id} className = {styles.restuarantCities}>
                        <img src={id.img} alt="restuarant" className={styles.citiesImage}/>
                        <h4>{id.name}</h4>
                        <p>{id.numOfRestuarants} Restuarants</p>
                    </div>
                ) }
            </div>
        </div>
    );
}

export default RestuarantCities;