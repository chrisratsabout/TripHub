import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const UpdateHotelModal = ({ tripDetailsInfo, openChildModal }) => {
const [updatedHotelData, setUpdatedHotelData] = useState({
    hotelId: tripDetailsInfo.hotelId,
    hotelName: tripDetailsInfo.hotelName,
    checkInDate: tripDetailsInfo.checkInDate,
    checkOutDate: tripDetailsInfo.checkOutDate,
    hotelPrice: tripDetailsInfo.hotelPrice,
    numberOfNights: tripDetailsInfo.numberOfNights
})
const [successMsg, setSuccessMsg] = useState(false);
const [failureMsg, setFailureMsg] = useState(false);

const handleChange = (e) => {
    const changedField = e.target.name;
    const newValue = e.target.value;
    
    setUpdatedHotelData(currData => {
        return {
            ...currData,
            [changedField]: newValue,
        }
    })
}

function handleHotelUpdateSubmit(e) {
    e.preventDefault();
    // send post request

        axios.put('http://localhost:8080/hotels/update/' + tripDetailsInfo.hotelId, updatedHotelData)
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
    <div className="hotel-modal-container">
            <form onSubmit={handleHotelUpdateSubmit}>
                <i className="fa-solid fa-x close-hotel-modal-btn" onClick={() => { openChildModal(null) }}></i>
                <h3>Update Hotel Info:</h3>
                <label htmlFor="hotel-name">Hotel Name:</label>
                <input type="text" value={updatedHotelData.hotelName} name='hotelName' placeholder='e.g. Four Seasons' onChange={handleChange} autoComplete='off' required />
                <label htmlFor="check-in-date">Check In Date:</label>
                <input type="date" value={updatedHotelData.checkInDate} name="checkInDate" id="checkInDate" onChange={handleChange} required />
                <label htmlFor="check-out-date">Checkout Date:</label>
                <input type="date" value={updatedHotelData.checkOutDate} name="checkOutDate" id="checkoutDate" onChange={handleChange} required />
                <label htmlFor="number-of-nights">Number of nights:</label>
                <input type="number" value={updatedHotelData.numberOfNights} name='numberOfNights' placeholder='e.g. 3' onChange={handleChange} required />
                <label htmlFor="hotel-price">Hotel Price:</label>
                <input type="number" value={updatedHotelData.hotelPrice} name="hotelPrice" id="hotel-price" step="any" placeholder='e.g. 599.99' onChange={handleChange} required />
                <button className="submit-hotel-info-btn">Update Hotel Info</button>
                {successMsg && <p className='success-msg'>Hotel Info Updated!</p>}
                {failureMsg && <p className='failure-msg'>ERROR: Hotel could not be updated.</p>}
            </form>
        </div>
    </>
  )
}

export default UpdateHotelModal