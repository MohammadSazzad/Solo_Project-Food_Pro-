import listingTop from '../../assets/B_cuisine.jpg';
import styles from './FoodListing.module.css';
import { useDropzone } from "react-dropzone";
import { useRef, useState } from 'react';
import axios from 'axios';

const FoodListing  = () => { 
    const [preview, setPreview] = useState(null);
    const token = localStorage.getItem("token");
    const [info, setInfo] = useState([]);

    const onDrop = async(acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
        setPreview(URL.createObjectURL(file));
            try {
                const formData = new FormData();
                formData.append('file', file); 
                const response =await axios.post(
                    `/api/foods/image/${token}`, 
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data', 
                        },
                    }
                );
                console.log("Response Data:", response.data);
                setInfo(response.data);
                alert("Image uploaded successfully!");
            } catch (error) {
                console.error("Error uploading image:", error.response?.data || error.message);
                alert("Failed to upload image. Please try again.");
            }
        }
    };
    console.log(info);
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const food = useRef();
    const category = useRef();
    const Price = useRef();
    const Stock = useRef();

    const handleSubmitButton = async(e) => {
        e.preventDefault();
        const foodName = food.current.value;
        const categoryID = category.current.value;
        const price = Price.current.value;
        const stock = Stock.current.value;
        const foodID = info.id;
        try {
            await axios.post(
                `/api/foods/details/${foodID}`,
                {
                    categoryID,
                    foodName,
                    price,
                    stock,
                }
            );
            alert("Details updated successfully!");
        } catch (error) {
            console.error("Error updating details:", error.response?.data || error.message);
            alert("Failed to update details. Please try again.");
        }
        e.target.reset();
    }

    return (
        <>
            <div style={{
                    backgroundImage: `url(${listingTop})`,
                    backgroundSize: "cover",
                    height : "300px",
                    }} className={styles.imageContainer}>
                <div>
                    <h1 className=''>List Your Food</h1>
                    <p>Step into the spotlight with Food Pro! Share your culinary creations and inspire taste buds around the globe. Your journey to becoming the ultimate food icon starts here!</p>
                </div>
            </div>
            <div className={` ${styles.cardContainer} `}>
                <div className={` ${styles.cardMain} card`} style={{width: '30rem'}}>
                        <div {...getRootProps()} style={{border: "2px dashed #007BFF", padding: "20px", textAlign: "center", cursor: "pointer",}} >
                            <input {...getInputProps()} />
                            {preview ? (
                                <img src={preview} alt="Preview" style={{width: "200px", height: "200px", objectFit: "cover",}} />
                            ) : (
                                <p>Drag & drop your image here, or click to select</p>
                            )}
                        </div>
                    <div className="card-body d-flex flex-column align-items-center pt-5">
                        <h5 className="card-title">Upload Your Food Image Here.</h5>
                    </div>
                </div>
                <div className={styles.formContainer}>
                    <form type="submit" onSubmit={handleSubmitButton}>
                        <div className="mb-3">
                            <label htmlFor="foodName" className="form-label">Food Name</label>
                            <input type="text" className="form-control" id="foodName" aria-describedby="foodName" ref={food}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="foodCategory" className="form-label">Category</label>
                            <input type="number" className="form-control" id="foodCategory" aria-describedby="foodCategory" ref={category}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="foodPrice" className="form-label">Food Price</label>
                            <input type="number" className="form-control" id="foodPrice" aria-describedby="foodPrice" ref={Price}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="foodStock" className="form-label">Stock</label>
                            <input type="number" className="form-control" id="foodStock" aria-describedby="foodStock" ref={Stock}/>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block " style={{width:'100%'}}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
} 

export default FoodListing;
