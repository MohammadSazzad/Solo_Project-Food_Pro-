import { useRef } from 'react';
import logo from '../../assets/Logo.png';
import styles from './Register.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResRegister = () => {

    const resName = useRef();
    const ownName = useRef();
    const resAddress = useRef();
    const resCity = useRef();
    const resEmail = useRef();
    const resPhone = useRef();
    const resPass = useRef();
    const navigate = useNavigate();

    const handleSubmitButton = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post('/api/restuarant/register',
                {
                    Restuarant_Name : resName.current.value,
                    Owner_Name : ownName.current.value,
                    Email : resEmail.current.value,
                    PhoneNumber : resPhone.current.value,
                    Address : resAddress.current.value,
                    City : resCity.current.value,
                    password : resPass.current.value
                }
            );
            console.log("Data: ", response.data);
            navigate('/');
            if(response.data){
                alert("Verification Email Sent");
            }

        }catch(error){
            console.log(error.message);
        }
        //e.target.reset();
    }
    
    return(
        <section className="vh-100 gradient-custom mt-5 bg-light">
            <div className="container py-5 h-100">
                <div className="row justify-content-center align-items-center h-100">
                <div className="col-12 col-lg-9 col-xl-7">
                    <div className="card shadow-2-strong card-registration" style={{"borderRadius": "15px"}}>
                    <div className="card-body p-4 p-md-5">
                        <div className="text-center font-weight-bold pb-2">
                            <img src={logo} alt="Logo" style={{"borderRadius":"50%", "height": "100px", "width":"100px"}} />
                            <h3>Sign-up </h3>
                            <p>Register your restuarant.</p>
                        </div>
                        <form onSubmit={handleSubmitButton}>

                        <div className="row">
                            <div className="col-md-6 mb-2">

                            <div data-mdb-input-init className="form-outline">
                                <input type="text" id="resName" className="form-control form-control-lg" ref={resName} />
                                <label className="form-label" htmlFor="resName">Restuarant Name</label>
                            </div>

                            </div>
                            <div className="col-md-6 mb-2">

                            <div data-mdb-input-init className="form-outline">
                                <input type="text" id="ownerName" className="form-control form-control-lg" ref={ownName}/>
                                <label className="form-label" htmlFor="ownerName">Owner Name</label>
                            </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-2">
                                <div data-mdb-input-init className="form-outline">
                                    <input type="text" id="address" className="form-control form-control-lg" ref={resAddress} />
                                    <label className="form-label" htmlFor="Address">Address</label>
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div data-mdb-input-init className="form-outline">
                                    <input type="text" id="City" className="form-control form-control-lg" ref={resCity} />
                                    <label className="form-label" htmlFor="City">City</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="md-6 mb-2">

                                <div data-mdb-input-init className="form-outline">
                                    <input type="email" id="emailAddress" className="form-control form-control-lg" ref={resEmail} />
                                    <label className="form-label" htmlFor="emailAddress">Email</label>
                                </div>
                            </div>
                            <div className="md-6 mb-2">

                                <div data-mdb-input-init className="form-outline">
                                    <input type="tel" id="phoneNumber" className="form-control form-control-lg" ref={resPhone}/>
                                    <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
                                </div>
                            </div>

                            <div className="md-6 mb-2">
                                <div data-mdb-input-init className="form-outline">
                                    <input type="password" id="password" className="form-control form-control-lg" ref={resPass}/>
                                    <label className="form-label" htmlFor="password">Password</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-check d-flex justify-content-center mb-5">
                            <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                            <label className="form-check-label" htmlFor="form2Example3g">
                                I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                            </label>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button type='submit' className={`${styles.Buttn} btn btn-success btn-block btn-lg text-body`}>Submit</button>
                        </div>
                        <p className='text-center text-muted mt-5 mb-0'>Have already an account?<a href="#" className='fw-bold text-body'>Login Here</a></p>

                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    );
}

export default ResRegister;