import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import FlightModal from './Modals/FlightModal'

const Trips = () => {
  const [tripsList, setTripsList] = useState([]);
  const [flightModalActive, setFlightModalActive] = useState(false);
  const [tripId, setTripId] = useState(null)

  function showFlightModal(e){
    console.log(e.target.parentElement.dataset.id);
    setTripId(e.target.parentElement.dataset.id);
    setFlightModalActive(true);
  }

  useEffect(() => {
    axios.get('http://localhost:8080/trips')
      .then(res => {
        setTripsList(res.data)
      })
      .catch(err => {
        console.log(err)
      })

  }, [])

  return (
    <>
      <div className="trips-container">
        <h1 className='subtitle'>My Trips</h1>
        <div className="trip-table">
          {tripsList.map((trip) => (
            <div className="trip-row" key={trip.tripId} data-id={trip.tripId}>
              <div className="trip-info">
                <h3>{trip.tripName}</h3>
                <p>{trip.startDate} to {trip.endDate}</p>
              </div>
              <button className="view-trip-details-btn">View Trip Details</button>
              <button className="add-flight-info-btn" onClick={showFlightModal}>Add Flight Info</button>
              <button className="add-hotel-info-btn">Add Hotel Info</button>
            </div>
          ))}
        </div>
        {flightModalActive && <FlightModal 
        setFlightModalActive={setFlightModalActive}
        tripId={tripId}
        />}
      </div>
      

    </>

  )
}

export default Trips