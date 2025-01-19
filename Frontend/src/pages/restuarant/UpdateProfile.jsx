import { useRef } from 'react';
import styles from './UpdateProfile.module.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const ResUpdateProfile = () => {

    const File = useRef();
    const token = localStorage.getItem('token');
    const resName = useRef();
    const ownName = useRef();
    const address = useRef();
    const city = useRef();
    const navigate = useNavigate();
    const handleImageSubmit = async (e) => {
        e.preventDefault();

        if (!File.current.files[0]) {
            alert("Please select a file to upload.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', File.current.files[0]); 
            const response = await axios.post(
                `/api/restuarant/restuarantOwnerImage/${token}`, 
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data', 
                    },
                }
            );
            console.log("Response Data:", response.data);
            alert("Image uploaded successfully!");
        } catch (error) {
            console.error("Error uploading image:", error.response?.data || error.message);
            alert("Failed to upload image. Please try again.");
        }
        e.reset.target();
    };

    const handleDetailsSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const decoded = token? jwtDecode(token): null;
        const ResID = decoded? decoded.id: null;
        try {
            axios.put(
                `/api/restuarant/updateRestuarantDetails/${ResID}`,
                {
                    resName: resName.current.value,
                    ownName: ownName.current.value,
                    address: address.current.value,
                    city: city.current.value,
                }
            );
            alert("Details updated successfully!");
            navigate('/restuarant/profile');
            
        } catch (error) {
            console.error("Error updating details:", error.response?.data || error.message);
            alert("Failed to update details. Please try again.");
        }
        e.reset.target();
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleImageSubmit}>
                <div className='row p-2 m-2'>
                    <div className='col-md-10'>
                        <input type="file" className="form-control" id="customFile" ref={File}/>
                    </div>
                    <div className='col-md-2 d-flex justify-content-center gap-2'>
                        <button type="button" className="btn btn-secondary">remove</button>
                        <button type="submit" className="btn btn-success">done</button>
                    </div>
                </div>
            </form>
            <form onSubmit={handleDetailsSubmit}>
                <div className='row p-2 m-2'>
                    <div className='col-md-6'>
                        <label htmlFor="firstName" className="form-label">Restuarant Name</label>
                        <input type="text" className="form-control" id="firstName" ref={resName}/>
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor="lastName" className="form-label">Owner Name</label>
                        <input type="text" className="form-control" id="lastName" ref={ownName}/>
                    </div>
                </div>
                <div className='row p-2 m-2'>
                    <div className='col-md-12'>
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" id="address" ref={address}/>
                    </div>
                </div>
                <div className='row p-2 m-2'>
                    <div className='col-md-12'>
                        <label htmlFor="text" className="form-label">City</label>
                        <input type="text" className="form-control" id="City" ref={city}/>
                    </div>
                </div>
                <div className='row p-2 m-2'>
                    <div className='col-md-12'>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ResUpdateProfile;