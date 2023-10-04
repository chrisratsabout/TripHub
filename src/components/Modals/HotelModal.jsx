import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const HotelModal = ({ openModal, tripId }) => {
    const [hotelName, setHotelName] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [hotelPrice, setHotelPrice] = useState('');
    const [numberOfNights, setNumberOfNights] = useState('');
    const [successMsg, setSuccessMsg] = useState(false);
    const [failureMsg, setFailureMsg] = useState(false);

    function handleHotelSubmit(e){
        e.preventDefault();
        const hotelInfo = {hotelName, checkInDate, checkOutDate, hotelPrice, numberOfNights};

        axios.post('http://localhost:8080/hotels/add/' + tripId, hotelInfo)
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
                <input type="text" name='hotel-name' placeholder='e.g. Four Seasons' onChange={(e)=> setHotelName(e.target.value)} required />
                <label htmlFor="check-in-date">Check In Date:</label>
                <input type="date" name="check-in-date" id="checkInDate" onChange={(e) => setCheckInDate(e.target.value)} required />
                <label htmlFor="check-out-date">Checkout Date:</label>
                <input type="date" name="check-out-date" id="checkoutDate" onChange={(e)=> setCheckOutDate(e.target.value)} required />
                <label htmlFor="number-of-nights">Number of nights:</label>
                <input type="number" name='number-of-nights' placeholder='e.g. 3' onChange={(e) => setNumberOfNights(e.target.value)} required />
                <label htmlFor="hotel-price">Hotel Price:</label>
                <input type="number" name="hotelPrice" id="hotel-price" step="any" placeholder='e.g. 599.99' onChange={(e)=> setHotelPrice(e.target.value)} required />
                <button className="submit-hotel-info-btn">Add Hotel Info</button>
                {successMsg && <p className='success-msg'>Hotel Info Added!</p>}
                {failureMsg && <p className='failure-msg'>ERROR: Hotel could not be added.</p>}
            </form>
        </div>
   </>
  )
}

export default HotelModal