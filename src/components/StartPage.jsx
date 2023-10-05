import axios from 'axios';
import React from 'react'
import { Form, redirect, useActionData } from 'react-router-dom';


const StartPage = () => {

    const data = useActionData()

    return (
        <>
            <div className="start-page-grid">
                <div className='start-page-left-col'>
                    <h1>Welcome to TripHub</h1>
                    <img className="start-page-plane" src="src/assets/plane.png" alt="" />
                    <p>Start by entering a descriptive name for your trip as well as the
                        start and end date. You will then add flight and hotel information
                        after providing these basic details.</p>
                </div>
                <div className="start-page-right-col">
                    <Form method="post" action='/'>
                        <h1>Trip Details</h1>
                        <label htmlFor="trip-name">Trip Name:</label>
                        <input type="text" name="tripName" id="trip-name" placeholder='e.g. Family Vacation to Hawaii' autoComplete='off'/>
                        <label htmlFor="trip-start-date">Start Date:</label>
                        <input type="date" name="startDate" />
                        <label htmlFor="trip-end-date">End Date:</label>
                        <input type="date" name="endDate" />
                        <button type="submit">Add Trip</button>
                        {data && data.error && <p>{data.error}</p>}
                    </Form>
                </div>
            </div>

        </>
    )
}

export default StartPage

export const handleSubmit = async ({ request }) => {
    const data = await request.formData()

    const submission = {
        tripName: data.get('tripName'),
        startDate: data.get('startDate'),
        endDate: data.get('endDate')
    }

    console.log(submission);

    //error handling necessary
    if (submission.tripName == '') {
        return { error: 'Must fill out trip name.' }
    }

    // send post request
    axios.post('http://localhost:8080/trips/addTrip', submission)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log("THERE WAS AN ERROR" ,err)
    })

    //redirect the user
    return redirect('/trips')
}