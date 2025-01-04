import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
const Footer = () => {

    return (
        <div className="container">
            <footer className="py-5">
                <div className="row">
                <div className="col-6 col-md-3 mb-3">
                <p>© 2024 Company, Inc. All rights reserved.</p>
                </div>
                <div className="col-6 col-md-3 mb-3">
                    <h5>Section</h5>
                    <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Home</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Features</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Pricing</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">FAQs</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">About</a></li>
                    </ul>
                </div>

                <div className="col-6 col-md-3 mb-3">
                    <h5>Section</h5>
                    <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Home</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Features</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Pricing</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">FAQs</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">About</a></li>
                    </ul>
                </div>

                <div className="col-6 col-md-3 mb-3">
                    <h5>Section</h5>
                    <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Home</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Features</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Pricing</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">FAQs</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">About</a></li>
                    </ul>
                </div>

                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                    <div>
                        <h2>Food Pro</h2>
                        <h4>Order food from the best restaurants and shops with Food Pro</h4>
                        <p>Experience the ultimate blend of convenience and delight with Food Fiesta – Bangladesh's favorite food delivery app, trusted by over 5,000+ restaurants nationwide. Whether you're craving a quick meal, planning a cozy dine-in, or need flowers to brighten someone's day, we've got you covered! Enjoy lightning-fast delivery, seamless food pick-up, unforgettable dining experiences, and our special flower delivery service for those heartfelt moments. Food Fiesta is here to make every meal and occasion extraordinary – one bite, one bloom at a time!</p>
                    </div>
                <ul className="list-unstyled d-flex">
                    <li className="ms-3"><a className="link-body-emphasis" href="#">{<FaTwitter/>}</a></li>
                    <li className="ms-3"><a className="link-body-emphasis" href="#">{<FaInstagramSquare/>}</a></li>
                    <li className="ms-3"><a className="link-body-emphasis" href="#">{<FaFacebookSquare/>}</a></li>
                </ul>
                </div>
            </footer>
        </div>
    );
}

export default Footer;