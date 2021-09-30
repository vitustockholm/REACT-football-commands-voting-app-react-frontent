import React, { useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

import { UserContext } from '../App';

import { DELETE_CAR_URI, ADD_CAR_URI, USERS_URI } from '../utils/endpoints';

import '../assets/styles/my_account_page.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';

const MyAccountScreen = () => {
  const { dispatch, state } = useContext(UserContext);
  const history = useHistory();

  const [userID, setUserID] = useState('');
  const [userName, setUserName] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userCars, setUserCars] = useState([]);

  const [addCarMessage, setAddCarMessage] = useState('');
  const addCarMessageElemRef = useRef();

  const [removeCarMessage, setRemoveCarMessage] = useState('');
  const removeCarMessageElemRef = useRef();

  const carMakeInputRef = useRef();
  const carModelInputRef = useRef();
  const carYearInputRef = useRef();
  const carPriceInputRef = useRef();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      (async () => {
        if (!userID) {
          const userID = localStorage.getItem('user');
          const userData = await getUserData(USERS_URI, userID);
          setUserName(userData.name);
          setUserSurname(userData.surname);
          setUserEmail(userData.email);
          setUserID(userData._id);
          setUserCars(userData.cars);
          console.log(userData);
        }
      })();
    } else history.push('/login');
  });

  const displayAddCarMessage = (message, result = false) => {
    const elem = addCarMessageElemRef.current;
    if (result) {
      elem.className = '';
      elem.classList.add('form-message-success', 'form-message');
    } else {
      elem.className = '';
      elem.classList.add('form-message-danger', 'form-message');
    }
    setAddCarMessage(message);
  };

  const displayRemoveCarMessage = (message, result = false) => {
    const elem = removeCarMessageElemRef.current;
    if (result) {
      elem.className = '';
      elem.classList.add('form-message-success', 'form-message');
    } else {
      elem.className = '';
      elem.classList.add('form-message-danger', 'form-message');
    }
    setRemoveCarMessage(message);
  };

  const getUserData = async (URI, userID) => {
    return await axios
      .get(URI + userID)
      .then((res) => res.data)
      .catch((err) => err);
  };

  const logoutUser = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    history.push('/');
  };

  const deleteCar = (carID) => {
    axios
      .delete(DELETE_CAR_URI + carID)
      .then((res) => {
        setUserCars(res.data.cars);
        displayRemoveCarMessage('Car deleted', true);
      })
      .catch((err) => displayRemoveCarMessage(err, false));
  };

  const addCar = (e) => {
    e.preventDefault();
    const carMakeValue = carMakeInputRef.current.value;
    const carModelValue = carModelInputRef.current.value;
    const carYearValue = carYearInputRef.current.value;
    const carPriceValue = carPriceInputRef.current.value;

    if (!carMakeValue || !carModelValue || !carYearValue || !carPriceValue) {
      displayAddCarMessage('Please fill all form inputs', false);
      return;
    }
    carPriceValue.replaceAll(',', '.');
    if (Number.isNaN(carYearValue) || Number.isNaN(carPriceValue)) {
      displayAddCarMessage(
        'Car year of production and price must be a number',
        false
      );
      return;
    }
    let car = {
      make: carMakeValue,
      model: carModelValue,
      year: carYearValue,
      price: carPriceValue,
    };

    axios
      .put(ADD_CAR_URI + userID, car)
      .then((res) => {
        setUserCars(res.data.cars);
        displayAddCarMessage(
          `${car.make} ${car.model} successfully added`,
          true
        );
      })
      .catch((err) => displayAddCarMessage(err, false));
  };

  return (
    <main>
      <div className='container'>
        <section>
          <h1 className='headline-1'>
            Hello, <span id='user-name'>{userName}</span>
          </h1>
        </section>
        <section id='user'>
          <div id='user__info' className='card-shadow'>
            <div>{/* <FontAwesomeIcon icon={faUser} size='2x' /> */}</div>
            <h3>
              {userName} {userSurname}
            </h3>
            <p>{userEmail}</p>
            <p>Cars for sale: {userCars.length}</p>
            <button className='btn-primary' onClick={() => logoutUser()}>
              Logout
            </button>
          </div>
          <div id='user__cars'>
            <div id='user__cars-list'>
              <p className='hidden form-message' ref={removeCarMessageElemRef}>
                {removeCarMessage}
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userCars.map((car) => (
                    <tr key={car._id}>
                      <td>{car.make}</td>
                      <td>{car.model}</td>
                      <td>{car.year}</td>
                      <td>{car.price}</td>
                      <td>
                        <button
                          className='btn-primary btn-delete-car'
                          onClick={() => deleteCar(car._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div id='user__cars-add-new' className='card-shadow'>
              <h6>Have car for sale?</h6>
              <h2>Enter Information</h2>

              <form id='addNewCarForm' className='form'>
                <div className='form-control'>
                  <label className='form-label' htmlFor='carMake'>
                    Make
                  </label>
                  <input
                    className='form-input'
                    type='text'
                    id='carMake'
                    ref={carMakeInputRef}
                    required
                  />
                </div>

                <div className='form-control'>
                  <label className='form-label' htmlFor='carModel'>
                    Model
                  </label>
                  <input
                    className='form-input'
                    type='text'
                    id='carModel'
                    ref={carModelInputRef}
                    required
                  />
                </div>

                <div className='form-control'>
                  <label className='form-label' htmlFor='carYear'>
                    Year
                  </label>
                  <input
                    className='form-input'
                    type='text'
                    id='carYear'
                    ref={carYearInputRef}
                    required
                  />
                </div>

                <div className='form-control'>
                  <label className='form-label' htmlFor='carPrice'>
                    Price
                  </label>
                  <input
                    className='form-input'
                    type='text'
                    id='carPrice'
                    ref={carPriceInputRef}
                    required
                  />
                </div>

                <div className='form-control'>
                  <input
                    type='submit'
                    value='Add Car'
                    className='btn-primary btn-primary-submit'
                    onClick={(e) => addCar(e)}
                  />
                </div>
              </form>
              <p className='hidden form-message' ref={addCarMessageElemRef}>
                {addCarMessage}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default MyAccountScreen;
