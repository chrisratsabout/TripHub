import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const FlightModal = ({ setFlightModalActive, tripId }) => {

    const [departingFrom, setDepartingFrom] = useState('')
    const [arrivalTo, setArrivalTo] = useState('')
    const [flightPrice, setFlightPrice] = useState('')
    const [departureDate, setDepartureDate] = useState('')
    const [returnDate, setReturnDate] = useState('')
    const [successMsg, setSuccessMsg] = useState(false)
    const [failureMsg, setFailureMsg] = useState(false)

    function handleFlightSubmit(e) {
        e.preventDefault();
        const flightInfo = { departingFrom, arrivalTo, departureDate, returnDate, flightPrice }
        console.log(flightInfo)

        // send post request
        axios.post('http://localhost:8080/flights/add/' + tripId, flightInfo)
            .then((res) => {
                console.log(res);
                setTimeout(()=> {
                    setSuccessMsg(true);
                }, 800)

                setTimeout(() => {
                    setFlightModalActive(false)
                }, 3000)
            })
            .catch((err) => {
                console.log("THERE WAS AN ERROR", err)
                setTimeout(()=> {
                    setFailureMsg(true);
                }, 500)
            })
    }

    // function handleDepartingFromChange(e) {
    //     setDepartingFrom(...departingFrom, e.target.value)
    // }

    // function handleSetArrivalToChange(e) {
    //     setArrivalTo(...arrivalTo, e.target.value)
    // }

    // function handleFlightPriceChange(e) {
    //     setFlightPrice(...flightPrice, e.target.value)
    // }

    // function handleDepartureDateChange(e) {
    //     setDepartureDate(...departureDate, e.target.value)
    // }

    // function handleReturnDateChange(e) {
    //     setReturnDate(...returnDate, e.target.value)
    // }


    return (
        <div className="flight-modal-container">
            <form onSubmit={handleFlightSubmit}>
                <i className="fa-solid fa-x close-flight-modal-btn" onClick={() => { setFlightModalActive(false) }}></i>
                <h3>Flight Info:</h3>
                <label htmlFor="departing-from">Departing From:</label>
                <input type="text" name='departingFrom' placeholder='e.g. Boston' onChange={(e)=> setDepartingFrom(e.target.value)} required />
                <label htmlFor="arrival-to">Arrival To:</label>
                <input type="text" name='arrivalTo' placeholder='e.g. Dublin' onChange={(e) => setArrivalTo(e.target.value)} required />
                <label htmlFor="departure-date">Departure Date:</label>
                <input type="date" name="departure-date" id="departureDate" onChange={(e) => setDepartureDate(e.target.value)} required />
                <label htmlFor="return-date">Return Date:</label>
                <input type="date" name="return-date" id="returnDate" onChange={(e)=> setReturnDate(e.target.value)} required />
                <label htmlFor="flight-price">Flight Price:</label>
                <input type="number" name="flightPrice" id="flight-price" step="any" placeholder='e.g. 599.99' onChange={(e)=> setFlightPrice(e.target.value)} required />
                <button className="submit-flight-info-btn">Add Flight Info</button>
                {successMsg && <p className='success-msg'>Flight Info Added!</p>}
                {failureMsg && <p className='failure-msg'>ERROR: Flight could not be added.</p>}
            </form>
        </div>
    )
}

export default FlightModal