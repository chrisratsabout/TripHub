// import React, { useState, useEffect } from 'react'
// import axios from 'axios';

const UpdateFlightModal = ({ tripDetailsInfo, openChildModal }) => {
    // const [existingFlightInfo, setExistingFlightInfo] = useState([]);

// useEffect(()=> {
//     axios.get('http://localhost:8080/trip-details/' + tripId)
//     .then(res => {
//         console.log("got")
//         console.log(res.data)
//         setExistingFlightInfo(res.data)
//     })
//     .catch(err => {
//         console.log(err)
//     })
// }, [])


  return (
   <>
   <div className="flight-modal-container">
            <form>
                <i className="fa-solid fa-x close-flight-modal-btn" onClick={() => { openChildModal(null) }}></i>
                <h3>Update Flight Info:</h3>
                <label htmlFor="departing-from">Departing From:</label>
                <input type="text" name='departingFrom' placeholder='e.g. Boston' defaultValue={tripDetailsInfo.departingFrom} onChange={(e)=> setDepartingFrom(e.target.value)} required />
                <label htmlFor="arrival-to">Arrival To:</label>
                <input type="text" name='arrivalTo' placeholder='e.g. Dublin' defaultValue={tripDetailsInfo.arrivalTo} onChange={(e) => setArrivalTo(e.target.value)} required />
                <label htmlFor="departure-date">Departure Date:</label>
                <input type="date" name="departure-date" id="departureDate" defaultValue={tripDetailsInfo.departureDate} onChange={(e) => setDepartureDate(e.target.value)} required />
                <label htmlFor="return-date">Return Date:</label>
                <input type="date" name="return-date" id="returnDate" defaultValue={tripDetailsInfo.returnDate} onChange={(e)=> setReturnDate(e.target.value)} required />
                <label htmlFor="flight-price">Flight Price:</label>
                <input type="number" name="flightPrice" id="flight-price" step="any" placeholder='e.g. 599.99' defaultValue={tripDetailsInfo.flightPrice} onChange={(e)=> setFlightPrice(e.target.value)} required />
                <button className="submit-flight-info-btn">Update Flight Info</button>
                {/* {successMsg && <p className='success-msg'>Flight Info Added!</p>}
                {failureMsg && <p className='failure-msg'>ERROR: Flight could not be added.</p>} */}
            </form>
        </div>
   </>
  )
}

export default UpdateFlightModal