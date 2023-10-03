import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import FlightModal from './Modals/FlightModal'
import HotelModal from './Modals/HotelModal'
import TripDetailsModal from './Modals/TripDetailsModal'
import { Link } from 'react-router-dom'

const Trips = () => {
  const [tripsList, setTripsList] = useState([]);
  const [flightModalActive, setFlightModalActive] = useState(false);
  const [hotelModalActive, setHotelModalActive] = useState(false);
  const [tripDetailsModalActive, setTripDetailsModalActive] = useState(false);

  const [tripId, setTripId] = useState(null)

  function showTripDetailsModal(e) {
    console.log(e.target.parentElement.dataset.id);
    setTripId(e.target.parentElement.dataset.id);
    setTripDetailsModalActive(true);
  }

  function showFlightModal(e) {
    console.log(e.target.parentElement.dataset.id);
    setTripId(e.target.parentElement.dataset.id);
    setFlightModalActive(true);
  }

  function showHotelModal(e) {
    console.log(e.target.parentElement.dataset.id);
    setTripId(e.target.parentElement.dataset.id);
    setHotelModalActive(true);
  }

  useEffect(() => {
    // axios.get('http://localhost:8080/trips')
    //   .then(res => {
    //     setTripsList(res.data)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })

    const getData = async () => {
      axios.get('http://localhost:8080/trips')
        .then(res => {
          setTripsList(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }

    getData();

  }, [])

  return (
    <>
      <div className="trips-container">
        <h1 className='subtitle'>My Trips</h1>
        <p className='instructions'>Add flight and hotel info first. Then view, modify, <br></br>and delete information by clicking "View Trip Details".</p>
        <div className="trip-table">
          {tripsList.map((trip) => (
            <div className="trip-row" key={trip.tripId} data-id={trip.tripId}>
              <div className="trip-info">
                <h3>{trip.tripName}</h3>
                <p>{trip.startDate} to {trip.endDate}</p>
              </div>
              <button className="view-trip-details-btn" onClick={showTripDetailsModal}>View Trip Details</button>
              <button className="add-flight-info-btn" onClick={showFlightModal}>Add Flight Info</button>
              <button className="add-hotel-info-btn" onClick={showHotelModal}>Add Hotel Info</button>
            </div>
          ))}
        </div>
        <h2 className='planning-another-trip'>Planning another trip?</h2>
        <Link to={"/"}><button className="add-new-trip-btn">Add Trip on Start Page</button></Link>
        {flightModalActive && <FlightModal
          setFlightModalActive={setFlightModalActive}
          tripId={tripId}
        />}
        {
          hotelModalActive && <HotelModal
            setHotelModalActive={setHotelModalActive}
            tripId={tripId}
          />
        }
        {
          tripDetailsModalActive && <TripDetailsModal
            setTripDetailsModalActive={setTripDetailsModalActive}
            tripId={tripId}
          />
        }
      </div>


    </>

  )
}

export default Trips