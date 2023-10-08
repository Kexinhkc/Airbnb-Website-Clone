import { useContext, useEffect, useState } from "react";
import {differenceInCalendarDays} from "date-fns"
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingWidget({place}){
    const [checkIn, setCheckIn] = useState(''); 
    const [checkOut, setCheckOut] = useState(''); 
    const [numOfGuests, setNumOfGuests] = useState(1); 
    const [name, setName] = useState('');
    const [phone, setPhone] = useState(''); 
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext); 

    // must use 'useEffect' because if only use 'user.name', on the webpage you can't change/add to your name
    useEffect(() => {
        if (user){
            setName(user.name);
        }
    },[user])

    let numOfNights = 0;

    if(checkIn && checkOut){
        numOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function bookThisPlace(){

        const response = await axios.post('/bookings',{
            checkIn, checkOut, numOfGuests, name, phone,
            place: place._id,
            price: numOfNights * place.price,
        });

        const bookingID = response.data._id;
        setRedirect(`/account/bookings/${bookingID}`);
    }

    if(redirect){
        return  <Navigate to={redirect} />
    }

    

    return (
        <div>
            <div>
                        <div className="bg-white shadow p-4 rounded-2xl mt-5 md:mt-0 ">
                            <div className="text-2xl text-center">
                                Price: ${place.price}/night
                            </div>
                            
                            <div className="border rounded-2xl mt-4 border "> 
                                <div className="flex grid grid-cols-2 "> 
                                    <div className="py-3 px-4 overflow-hidden">
                                        <label>Check-in:</label>
                                        <br />
                                        <input type="date" 
                                        value={checkIn} 
                                        onChange={(ev) => setCheckIn(ev.target.value)
                                        }/>
                                    </div>

                                    <div className="py-3 px-4 border-l overflow-hidden ">
                                        <label>Check-out:</label>
                                        <br />
                                        <input type="date" 
                                        value={checkOut} 
                                        onChange={(ev) => setCheckOut(ev.target.value)
                                        }/>
                                    </div>
                                </div>

                                <div className="py-3 px-4 border-t">
                                        <label>Number of guests:</label>
                                        <input type="number" 
                                        value={numOfGuests} 
                                        onChange={(ev) => setNumOfGuests(ev.target.value)
                                        }/>
                                </div>

                                {numOfNights > 0 && (
                            
                                    <div className="py-3 px-4 border-t">
                                        <label>Your full name:</label>
                                        <input type="text" 
                                        value={name} 
                                        onChange={(ev) => setName(ev.target.value)
                                        }/>

                                        <label>Phone number:</label>
                                        <input type="tel" 
                                        value={phone} 
                                        onChange={(ev) => setPhone(ev.target.value)
                                        }/>
                                    </div>
                                
                            ) }
                                
                            </div>
                           
                            <button onClick={bookThisPlace} className="primary mt-4">Book this place 
                            {numOfNights > 0 && (
                                <span> for ${numOfNights * place.price}</span>
                            )}
                            </button>

                        </div>
                    </div>
        </div>
    );
}