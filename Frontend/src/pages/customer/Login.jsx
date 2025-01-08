import styles from './Login.module.css';
import login from '../../assets/Login.svg';
import logo from '../../assets/Logo.png';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const email = useRef();
    const password = useRef();

    const navigate = useNavigate();

    const handleSubmitButton = (e) => {
        e.preventDefault();
        try{
            fetch('/api/customer/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Email: email.current.value,
                    password: password.current.value
                })
            }).then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
            });
            navigate('/customer/profile');
        }catch(error){
            alert("Login Failed");
            console.log(error);
        }
        e.target.reset();
    }

    return ( 
        <div className={styles.container}>
            <img src={login} alt="Food_Pro" style={{height: '700px' , width: '700px' }} />
            <main className={`${styles.formContainer} form-signin w-100 m-auto`}>
                <form className={styles.formItem} onSubmit={handleSubmitButton}>
                    <div className="text-center">
                        <img className={styles.titleLogo} src={logo} alt="" style={{width:"200px", height:"200px"}} />
                        <h1 className="h3 mb-3 fw-normal">Please login</h1>
                    </div>

                    <div className="form-floating">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" ref={email}/>
                    <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" ref={password}/>
                    <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="form-check text-start my-3">
                    <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Remember me
                    </label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit">Login</button>
                </form>
            </main>
            <script src="/docs/5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossOrigin="anonymous"></script>
        </div>
    );
}

export default Login;