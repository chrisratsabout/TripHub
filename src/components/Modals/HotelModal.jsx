import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const HotelModal = ({ openModal, tripId }) => {
    const [hotelData, setHotelData] = useState({
        hotelName: "",
        checkInDate: "",
        checkOutDate: "",
        hotelPrice: "",
        numberOfNights: ""
    })
    const [successMsg, setSuccessMsg] = useState(false);
    const [failureMsg, setFailureMsg] = useState(false);

    const handleChange = (e) => {
        const changedField = e.target.name;
        const newValue = e.target.value;
        setHotelData(currData => {
            return {
                ...currData,
                [changedField]: newValue,
            }
        })
    }

    function handleHotelSubmit(e){
        e.preventDefault();

        axios.post('http://localhost:8080/hotels/add/' + tripId, hotelData)
        .then(res => {
            console.log(res.data)
            setTimeout(()=> {
                setSuccessMsg(true);
            }, 800)

            setTimeout(() => {
               openModal(null);
            }, 3000)
        })
        .catch (err => {
            console.log(err)
            setTimeout(()=> {
                setFailureMsg(true);
            }, 500)
        })
    }


  return (
   <>
           <div className="hotel-modal-container">
            <form onSubmit={handleHotelSubmit}>
                <i className="fa-solid fa-x close-hotel-modal-btn" onClick={() => { openModal(null) }}></i>
                <h3>Hotel Info:</h3>
                <label htmlFor="hotel-name">Hotel Name:</label>
                <input type="text" value={hotelData.hotelName} name='hotelName' placeholder='e.g. Four Seasons' onChange={handleChange} required />
                <label htmlFor="check-in-date">Check In Date:</label>
                <input type="date" value={hotelData.checkInDate} name="checkInDate" id="checkInDate" onChange={handleChange} required />
                <label htmlFor="check-out-date">Checkout Date:</label>
                <input type="date" value={hotelData.checkOutDate} name="checkOutDate" id="checkoutDate" onChange={handleChange} required />
                <label htmlFor="number-of-nights">Number of nights:</label>
                <input type="number" value={hotelData.numberOfNights} name='numberOfNights' placeholder='e.g. 3' onChange={handleChange} required />
                <label htmlFor="hotel-price">Hotel Price:</label>
                <input type="number" value={hotelData.hotelPrice} name="hotelPrice" id="hotel-price" step="any" placeholder='e.g. 599.99' onChange={handleChange} required />
                <button className="submit-hotel-info-btn">Add Hotel Info</button>
                {successMsg && <p className='success-msg'>Hotel Info Added!</p>}
                {failureMsg && <p className='failure-msg'>ERROR: Hotel could not be added.</p>}
            </form>
        </div>
   </>
  )
}

export default HotelModal