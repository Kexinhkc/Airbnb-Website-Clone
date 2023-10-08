import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
import BookingDates from "../BookingDates";

export default function BookingPage(){
    const {id} = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        axios.get('/bookings').then((response) => {
            const foundBooking = response.data.find(({_id}) => _id === id); //'find()' is an JS array function to find the first element in an array that satisfies a provided testing function

            if(foundBooking){
                setBooking(foundBooking);
            }
        });
    },[id]);

    if(!booking){
        console.log("no bookings")
        return '';
    }

    return(
        <div className="my-8">
            <h1 className="text-3xl ">{booking.place.title}</h1>
            <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
            <div className="bg-gray-200 p-6 mb-6 rounded-2xl">
                <h2 className="text-xl mt-1">Your booking information</h2>
                <BookingDates booking={booking}/>
            </div>
            <PlaceGallery place={booking.place} />
           
        </div>
    );
}