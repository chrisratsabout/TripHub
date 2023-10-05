import axios from "axios";
import { useState } from "react";

const UpdateFlightModal = ({ tripDetailsInfo, openChildModal }) => {
    const [updatedFlightData, setUpdatedFlightData] = useState({
        flightId: tripDetailsInfo.flightId,
        departingFrom: tripDetailsInfo.departingFrom,
        arrivalTo: tripDetailsInfo.arrivalTo,
        flightPrice: tripDetailsInfo.flightPrice,
        departureDate: tripDetailsInfo.departureDate,
        returnDate: tripDetailsInfo.returnDate
    })
    const [successMsg, setSuccessMsg] = useState(false);
    const [failureMsg, setFailureMsg] = useState(false);

    const handleChange = (e) => {
        const changedField = e.target.name;
        const newValue = e.target.value;
        
        setUpdatedFlightData(currData => {
            return {
                ...currData,
                [changedField]: newValue,
            }
        })
    }

    function handleFlightUpdateSubmit(e) {
        e.preventDefault();
        console.log(updatedFlightData)
        // send post request

            axios.put('http://localhost:8080/flights/update/' + tripDetailsInfo.flightId, updatedFlightData)
            .then((res) => {
                console.log(res);
                setTimeout(()=> {
                    setSuccessMsg(true);
                }, 800)

                setTimeout(() => {
                    location.reload();
                }, 2000)
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
                <input type="text" value={updatedFlightData.departingFrom} name='departingFrom' placeholder='e.g. Boston' onChange={handleChange} autoComplete='off' required />
                <label htmlFor="arrival-to">Arrival To:</label>
                <input type="text" value={updatedFlightData.arrivalTo} name='arrivalTo' placeholder='e.g. Dublin'  onChange={handleChange} autoComplete='off' required />
                <label htmlFor="departure-date">Departure Date:</label>
                <input type="date" value={updatedFlightData.departureDate} name="departureDate" id="departureDate"  onChange={handleChange}required />
                <label htmlFor="return-date">Return Date:</label>
                <input type="date" value={updatedFlightData.returnDate} name="returnDate" id="returnDate"  onChange={handleChange} required />
                <label htmlFor="flight-price">Flight Price:</label>
                <input type="number" value={updatedFlightData.flightPrice} name="flightPrice" id="flight-price" step="any" placeholder='e.g. 599.99' onChange={handleChange} required />
                <button className="submit-flight-info-btn">Update Flight Info</button>
                {successMsg && <p className='success-msg'>Flight Info Updated!</p>}
                {failureMsg && <p className='failure-msg'>ERROR: Flight could not be updated.</p>}
            </form>
        </div>
   </>
  )
}

export default UpdateFlightModal