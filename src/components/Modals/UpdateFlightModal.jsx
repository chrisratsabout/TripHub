import axios from "axios";
import { useState } from "react";

const UpdateFlightModal = ({ tripDetailsInfo, openChildModal, tripId }) => {
    const [departingFrom, setDepartingFrom] = useState('');
    const [arrivalTo, setArrivalTo] = useState('');
    const [flightPrice, setFlightPrice] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [successMsg, setSuccessMsg] = useState(false);
    const [failureMsg, setFailureMsg] = useState(false);

    function handleFlightUpdateSubmit(e) {
        e.preventDefault();
        console.log(tripDetailsInfo.flightId)
        const updatedFlightInfo = { flightId: tripDetailsInfo.flightId, departingFrom, arrivalTo, departureDate, returnDate, flightPrice }
        console.log(updatedFlightInfo)

        // send post request
        axios.patch('http://localhost:8080/flights/update/' + tripDetailsInfo.flightId, updatedFlightInfo)
            .then((res) => {
                console.log(res);
                setTimeout(()=> {
                    setSuccessMsg(true);
                }, 800)

                setTimeout(() => {
                    location.reload();
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
   <>
   <div className="flight-modal-container">
            <form onSubmit={handleFlightUpdateSubmit}>
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
                {successMsg && <p className='success-msg'>Flight Info Added!</p>}
                {failureMsg && <p className='failure-msg'>ERROR: Flight could not be added.</p>}
            </form>
        </div>
   </>
  )
}

export default UpdateFlightModal