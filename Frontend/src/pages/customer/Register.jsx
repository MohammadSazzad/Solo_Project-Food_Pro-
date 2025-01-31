import { useRef } from 'react';
import logo from '../../assets/Logo.png';
import axios from 'axios';
import styles from './Register.module.css';
import { useNavigate } from 'react-router-dom';
const Register = () => {

    const firstName = useRef();
    const lastName = useRef();
    const birthdayDate = useRef();
    const address = useRef();
    const city = useRef();
    const emailAddress = useRef();
    const phoneNumber = useRef();
    const pass = useRef();
    const navigate = useNavigate();

    const handleSubmitButton = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post('/api/customer/register',
                {
                    FirstName : firstName.current.value,
                    LastName : lastName.current.value,
                    Email : emailAddress.current.value,
                    PhoneNumber : phoneNumber.current.value,
                    Address : address.current.value,
                    City : city.current.value,
                    DateOfBirth : birthdayDate.current.value,
                    password : pass.current.value
                }
            );
            console.log("Data: ", response.data);
            navigate('/');
            if(response.data){
                alert("Verification Email Sent");
            }
            

        }catch(error){
            console.log(error);
        }
        e.target.reset();
    }

    return (
        <section className="vh-100 gradient-custom mt-5 bg-light">
            <div className="container py-5 h-100">
                <div className="row justify-content-center align-items-center h-100">
                <div className="col-12 col-lg-9 col-xl-7">
                    <div className="card shadow-2-strong card-registration" style={{"borderRadius": "15px"}}>
                    <div className="card-body p-4 p-md-5">
                        <div className="text-center font-weight-bold pb-2">
                            <img src={logo} alt="Logo" style={{"borderRadius":"50%", "height": "100px", "width":"100px"}} />
                            <h3>Sign-up </h3>
                            <p>Sign-up into your account from here.</p>
                        </div>
                        <form onSubmit={handleSubmitButton}>

                        <div className="row">
                            <div className="col-md-6 mb-2">

                            <div data-mdb-input-init className="form-outline">
                                <input type="text" id="firstName" className="form-control form-control-lg"  ref={firstName}/>
                                <label className="form-label" htmlFor="firstName">First Name</label>
                            </div>

                            </div>
                            <div className="col-md-6 mb-2">

                            <div data-mdb-input-init className="form-outline">
                                <input type="text" id="lastName" className="form-control form-control-lg" ref={lastName}/>
                                <label className="form-label" htmlFor="lastName">Last Name</label>
                            </div>

                            </div>
                        </div>

                        <div className="row">
                            <div className="md-6 mb-2 ">

                            <div data-mdb-input-init className="form-outline datepicker w-100">
                                <input type="date" className="form-control form-control-lg" id="birthdayDate" ref={birthdayDate}/>
                                <label htmlFor="birthdayDate" className="form-label">Birthday</label>
                            </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-2">
                                <div data-mdb-input-init className="form-outline">
                                    <input type="text" id="address" className="form-control form-control-lg" ref={address}/>
                                    <label className="form-label" htmlFor="Address">Address</label>
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div data-mdb-input-init className="form-outline">
                                    <input type="text" id="City" className="form-control form-control-lg" ref={city} />
                                    <label className="form-label" htmlFor="City">City</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="md-6 mb-2">

                                <div data-mdb-input-init className="form-outline">
                                    <input type="email" id="emailAddress" className="form-control form-control-lg" ref={emailAddress} />
                                    <label className="form-label" htmlFor="emailAddress">Email</label>
                                </div>
                            </div>
                            <div className="md-6 mb-2">

                                <div data-mdb-input-init className="form-outline">
                                    <input type="tel" id="phoneNumber" className="form-control form-control-lg" ref={phoneNumber}/>
                                    <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
                                </div>
                            </div>

                            <div className="md-6 mb-2">
                                <div data-mdb-input-init className="form-outline">
                                    <input type="password" id="password" className="form-control form-control-lg" ref={pass}/>
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
                        <p className='text-center text-muted mt-5 mb-0'>Have already an account?<a href="/customer/login" className='fw-bold text-body'>Login Here</a></p>

                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    );
}

export default Register;