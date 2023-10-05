import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const FlightModal = ({ openModal, tripId }) => {
    const [flightData, setFlightData] = useState({
        departingFrom: "",
        arrivalTo: "",
        flightPrice: "",
        departureDate: "",
        returnDate: ""
    })
    const [successMsg, setSuccessMsg] = useState(false);
    const [failureMsg, setFailureMsg] = useState(false);

    const handleChange = (e) => {
        const changedField = e.target.name;
        const newValue = e.target.value;

        setFlightData(currData => {
            return {
                ...currData,
            [changedField]: newValue,
            }
        })
    }
    function handleFlightSubmit(e) {
        e.preventDefault();

        // send post request
        axios.post('http://localhost:8080/flights/add/' + tripId, flightData)
            .then((res) => {
                console.log(res);
                setTimeout(()=> {
                    setSuccessMsg(true);
                }, 800)

                setTimeout(() => {
                    openModal(null)
                }, 3000)
            })
            .catch((err) => {
                console.log("THERE WAS AN ERROR", err)
                setTimeout(()=> {
                    setFailureMsg(true);
                }, 500)
            })
    }

    return (
        <div className="flight-modal-container">
            <form onSubmit={handleFlightSubmit}>
                <i className="fa-solid fa-x close-flight-modal-btn" onClick={() => { openModal(null) }}></i>
                <h3>Flight Info:</h3>
                <label htmlFor="departing-from">Departing From:</label>
                <input type="text" value={flightData.departingFrom} name='departingFrom' placeholder='e.g. Boston' onChange={handleChange} autoComplete='off' required />
                <label htmlFor="arrival-to">Arrival To:</label>
                <input type="text" value={flightData.arrivalTo} name='arrivalTo' placeholder='e.g. Dublin' onChange={handleChange} autoComplete='off' required />
                <label htmlFor="departure-date">Departure Date:</label>
                <input type="date" value={flightData.departureDate} name="departureDate" id="departureDate" onChange={handleChange} required />
                <label htmlFor="return-date">Return Date:</label>
                <input type="date" value={flightData.returnDate} name="returnDate" id="returnDate" onChange={handleChange} required />
                <label htmlFor="flight-price">Flight Price:</label>
                <input type="number" value={flightData.flightPrice} name="flightPrice" id="flight-price" step="any" placeholder='e.g. 599.99' onChange={handleChange} required />
                <button className="submit-flight-info-btn">Add Flight Info</button>
                {successMsg && <p className='success-msg'>Flight Info Added!</p>}
                {failureMsg && <p className='failure-msg'>ERROR: Flight could not be added.</p>}
            </form>
        </div>
    )
}

export default FlightModal