import { useRef } from 'react';
import styles from './UpdateProfile.module.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {

    const File = useRef();
    const token = localStorage.getItem('token');
    const firstName = useRef();
    const lastName = useRef();
    const address = useRef();
    const city = useRef();
    const dateOfBirth = useRef();
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
                `/api/customer/customerImage/${token}`, 
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
        const CustomerID = decoded? decoded.id: null;
        try {
            axios.put(
                `/api/customer/updateCustomer/${CustomerID}`,
                {
                    firstName: firstName.current.value,
                    lastName: lastName.current.value,
                    address: address.current.value,
                    city: city.current.value,
                    dateOfBirth: dateOfBirth.current.value,
                }
            );
            alert("Details updated successfully!");
            navigate('/customer/profile');
            
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
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="firstName" ref={firstName}/>
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="lastName" ref={lastName}/>
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
                        <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                        <input type="date" className="form-control" id="dateOfBirth" ref={dateOfBirth}/>
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

export default UpdateProfile;