import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import '../assets/styles/home_page.css';
import { CARS_URI } from '../utilities/endpoints';

const HomeScreen = () => {
  const [carList, setCarList] = useState([]);
  const carLoadFailed = useRef(false);

  const getCarList = async (URI) => {
    return await axios
      .get(URI)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        carLoadFailed.current = true;
        return [];
      });
  };

  useEffect(() => {
    (async () => {
      const carList = await getCarList(CARS_URI);
      setCarList(carList);
      // console.log('carlist', carList);
    })();
  }, []);

  return (
    <main>
      <div className='container'>
        <section>
          <h1 className='headline-1'>Latest Teams for Your Vote!</h1>
        </section>
        <section>
          <div id='latest-cars'>
            {carLoadFailed.current ? (
              <p className='form-message form-message-danger'>
                Something went wrong. Can't load data from server!
              </p>
            ) : carList.length ? (
              carList.map((car) => (
                <div className='car card-shadow' key={car._id}>
                  <h4>
                    {/* {console.log('car', car)}
                    {console.log('car.cars', car.cars[0])} */}

                    {/* /////////// */}

                    <p>Team name:</p>
                  </h4>
                  <p>pass: {car.password}</p>
                  <p>Contact: {car.email}</p>
                  <p>Admin: {car.name}</p>
                  {/* <p>Rank: {car.cars[0]}</p> */}

                  <p>Votes: </p>
                  <button>Vote</button>
                  <button>UnVote</button>
                </div>
              ))
            ) : (
              <p className='form-message form-message-danger'>
                Loading football voting data...
              </p>
            )}
          </div>
          <br />
          <p>Viso komandu:{carList.length}</p>
        </section>
      </div>
    </main>
  );
};

export default HomeScreen;
