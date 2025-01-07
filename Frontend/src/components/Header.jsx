import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const Header = () => {

    const navigate = useNavigate();

    const handleLoginButton = () => {
        console.log("Login button clicked");
        navigate("/customer/login");
    }

    return(
        <header className="p-3 text-bg-dark fixed-top">
            <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li><a href="#" className="nav-link px-2 text-white">Food Pro</a></li>
                </ul>


                <div className="text-end">
                <button type="button" className="btn btn-outline-light me-5">{<AiOutlineShoppingCart/>}</button>
                <button type="button" className="btn btn-outline-light me-2" onClick={handleLoginButton}>Login</button>
                <button type="button" className="btn btn-warning">Sign-up</button>
                </div>
            </div>
            </div>
        </header>
    );
}

export default Header;