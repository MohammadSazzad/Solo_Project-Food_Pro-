import { useState, useContext } from 'react';
import styles from './Profile.module.css';
import { FaEdit } from "react-icons/fa";
import { jwtDecode } from 'jwt-decode';
import ProductContext from '../../store/ProductContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem('token');
  const user = jwtDecode(token);
  const { orderHistory } = useContext(ProductContext); 
  const navigate = useNavigate();

  const handleLogoutButton = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div className={styles.customerInfo}>
          <img
            src={user.image}
            alt="Profile"
            className={styles.imageDetails}
          />
          <div className={styles.customerDetails}>
            <h1>{user.FirstName} {user.LastName}</h1>
            <h3>{user.Email}</h3>
            <h3>{user.PhoneNumber}</h3>
            <button type="button" className="btn"><FaEdit /></button>
          </div>
        </div>

        <div className={styles.orderHistory}>
          <div className={styles.orderHistoryHeader}>
            <h3 className={styles.historyHeader}>Order History</h3>
            <button type="button" className="btn btn-outline-light me-2" onClick={handleLogoutButton}>Logout</button>
          </div>
          <table className={`${styles.tableContent} table table-striped  table-hover`}>
            <tbody>
              {orderHistory.slice(0, 6).map((order, index) => (
                <tr key={index}>
                  <td className='text-center'>
                    <img
                      src={order.image}
                      alt={order.name}
                      style={{ width: '50px', height: '50px' }}
                    />
                  </td>
                  <td className='text-center'>{order.foodName}</td>
                  <td className='text-center'>${order.price.toFixed(2)}</td>
                  <td className='text-center'>{order.status}</td>
                  <td className='text-end'>
                  <button type="button" className="btn btn-info ">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orderHistory.length > 6 && (
            <button
              className="btn btn-primary "
              onClick={() => setShowModal(true)}
            >
              See More
            </button>
          )}

          {showModal && (
            <div className="modal fade show d-block" tabIndex="-1" role="dialog">
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">All Order History</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <table className="table table-striped table-hover">
                      <tbody>
                        {orderHistory.map((order, index) => (
                          <tr key={index}>
                            <td className='text-center'>
                              <img
                                src={order.image_url}
                                alt={order.name}
                                style={{ width: '50px', height: '50px' }}
                              />
                            </td>
                            <td className='text-end'>{order.name}</td>
                            <td className='text-end'>${order.price.toFixed(2)}</td>
                            <td className='text-end'>{order.status}</td>
                            <td className='text-end'>
                            <button type="button" className="btn btn-info">View Details</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showModal && <div className="modal-backdrop fade show"></div>}
        </div>
      </div>
    </div>
  );
};

export default Profile;