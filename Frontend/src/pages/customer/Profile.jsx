import { useState } from 'react';
import styles from './Profile.module.css';
import login from '../../assets/Login.svg';

const orders = [
    {
        image_url: login,
        name: 'Product 1',
        order_created: '2021-09-01',
        order_end: '2021-09-02',
        price: 100,
        status: 'Delivered',
    },
    {
        image_url: login,
        name: 'Product 2',
        order_created: '2021-09-03',
        order_end: '2021-09-04',
        price: 200,
        status: 'Delivered',
    },
    {
        image_url: login,
        name: 'Product 3',
        order_created: '2021-09-05',
        order_end: '2021-09-06',
        price: 300,
        status: 'Delivered',
    },
    {
        image_url: login,
        name: 'Product 4',
        order_created: '2021-09-07',
        order_end: '2021-09-08',
        price: 400,
        status: 'Delivered',
    },
    {
        image_url: login,
        name: 'Product 5',
        order_created: '2021-09-09',
        order_end: '2021-09-10',
        price: 500,
        status: 'Delivered',
    },
    {
        image_url: login,
        name: 'Product 6',
        order_created: '2021-09-11',
        order_end: '2021-09-12',
        price: 600,
        status: 'Delivered',
    },
    {
        image_url: login,
        name: 'Product 7',
        order_created: '2021-09-13',
        order_end: '2021-09-14',
        price: 700,
        status: 'Delivered',
    },
    {
        image_url: login,
        name: 'Product 8',
        order_created: '2021-09-15',
        order_end: '2021-09-16',
        price: 800,
        status: 'Delivered',
    },
];


const Profile = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div >
          <img src={login} alt="Profile" style={{ height: '150px', width: '150px', borderRadius: '50%' }} />
          <div className="ms-3">
            <h1>Mohammad Sazzad</h1>
            <h3>sazzad19@student.sust.edu</h3>
            <h3>01735718761</h3>
          </div>
        </div>

        <div>
          <h3>Order History</h3>
          <table className="table table-striped table-bordered table-hover">
            <tbody>
              {orders.slice(0, 6).map((order, index) => (
                <tr key={index}>
                  <td>
                    <img src={order.image_url} alt={order.name} style={{ width: '50px', height: '50px' }} />
                  </td>
                  <td>{order.name}</td>
                  <td>{order.order_created}</td>
                  <td>{order.order_end}</td>
                  <td>${order.price.toFixed(2)}</td>
                  <td>{order.status}</td>
                  <td>
                    <button>
                        view details
                    </button>
                  </td>
                </tr>
              ))}
              
            </tbody>
          </table>
          {orders.length>6 && <button className="btn btn-primary mt-3" onClick={() => setShowModal(true)}>
            See More
          </button>}

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
                    <table className="table table-striped table-bordered table-hover">
                      <tbody>
                        {orders.map((order, index) => (
                          <tr key={index}>
                            <td>
                              <img
                                src={order.image_url}
                                alt={order.name}
                                style={{ width: '50px', height: '50px' }}
                              />
                            </td>
                            <td>{order.name}</td>
                            <td>{order.order_created}</td>
                            <td>{order.order_end}</td>
                            <td>${order.price.toFixed(2)}</td>
                            <td>{order.status}</td>
                            <td>
                                <button>View Details</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
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
