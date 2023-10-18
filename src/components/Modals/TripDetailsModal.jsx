import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import UpdateFlightModal from './UpdateFlightModal'
import UpdateHotelModal from './UpdateHotelModal'

const TripDetailsModal = ({ openModal, tripId }) => {

    const [tripDetailsInfo, setTripDetailsInfo] = useState([]);
    const [deleteSuccessMsg, setDeleteSuccessMsg] = useState(false);
    const [childModal, openChildModal] = useState(null)

    function openUpdateFlightModal() {
        openChildModal('updateFlightModal')
    }

    function openUpdateHotelModal() {
        openChildModal('updateHotelModal')
    }

    function handleDelete(e) {

        axios.delete('http://localhost:8080/trip-details/' + tripId)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

        setDeleteSuccessMsg(true);
        setTimeout(() => {
            location.reload();
        }, 1000)
    }

    useEffect(() => {
        axios.get('http://localhost:8080/trip-details/' + tripId)
            .then(res => {
                setTripDetailsInfo(res.data)
                console.log(res.data)

            })
            .catch(err => {
                console.log(err)
            })

    }, [])


    return (
        <>{
            !tripDetailsInfo ?
                <div className="trip-details-modal-container">
                    <p className='instructions'>Please enter flight and hotel info first.</p>
                    <button className="close-trip-details-btn" onClick={() => openModal(null)}>Close</button>
                </div>

                :
                <div className="trip-details-modal-container">
                    <div className="trip-details-top-container">
                        <h4>{tripDetailsInfo.tripName}</h4>
                        <p>{tripDetailsInfo.startDate} to {tripDetailsInfo.endDate}</p>
                    </div>
                    <div className="trip-details-bottom-container">
                        <div className="trip-details-bottom-left-container">
                            <h5>Flight Info:</h5>
                            <h6>Departing From:</h6>
                            <p>{tripDetailsInfo.departingFrom}</p>
                            <h6>Arrival To:</h6>
                            <p>{tripDetailsInfo.arrivalTo}</p>
                            <h6>Departure Date:</h6>
                            <p>{tripDetailsInfo.departureDate}</p>
                            <h6>Return Date:</h6>
                            <p>{tripDetailsInfo.returnDate}</p>
                            <h6>Price:</h6>
                            <p>${tripDetailsInfo.flightPrice}</p>
                        </div>
                        <div className="trip-details-bottom-right-container">
                            <h5>Hotel Info:</h5>
                            <h6>Hotel Name:</h6>
                            <p>{tripDetailsInfo.hotelName}</p>
                            <h6>No. of nights:</h6>
                            <p>{tripDetailsInfo.numberOfNights}</p>
                            <h6>Check In Date:</h6>
                            <p>{tripDetailsInfo.checkInDate}</p>
                            <h6>Checkout Date:</h6>
                            <p>{tripDetailsInfo.checkOutDate}</p>
                            <h6>Hotel Price:</h6>
                            <p>${tripDetailsInfo.hotelPrice}</p>
                        </div>
                    </div>



                    <button className="update-flight-btn" onClick={openUpdateFlightModal} data-id={tripId}>Update Flight</button>
                    <button className="update-hotel-btn" onClick={openUpdateHotelModal} data-id={tripId}>Update Hotel</button>
                    <button className="delete-trip-details-btn" data-id={tripId} onClick={handleDelete}>Delete Trip</button>
                    <button className="close-trip-details-btn" onClick={() => openModal(null)}>Close Trip Details</button>
                    {deleteSuccessMsg && <p className='success-msg'>Trip Deleted!</p>}

                </div>
        }


            {childModal === 'updateFlightModal' ? <UpdateFlightModal
                openChildModal={openChildModal}
                tripDetailsInfo={tripDetailsInfo} /> : null
            }

            {childModal === 'updateHotelModal' ? <UpdateHotelModal
                openChildModal={openChildModal}
                tripDetailsInfo={tripDetailsInfo}
            /> : null
            }
        </>
    )
}

export default TripDetailsModal