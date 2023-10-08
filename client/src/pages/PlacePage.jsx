import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage(){
    const {id} = useParams();
    const [place, setPlace] = useState(null);
    useEffect(() => {

        if (!id){
            return;
        }

        axios.get(`/places/${id}`).then((response) => {
            setPlace(response.data)
        })
    },[id]);

    if (!place){
        return '';
    }

    return (
        <div>
        <div className="mt-8 bg-gray-100 -mx-8 px-20 pt-8">
            <h1 className="text-3xl ">{place.title}</h1>

            <AddressLink>{place.address}</AddressLink>
            <PlaceGallery place={place}/>

            <div className="grid lg:grid-cols-[2fr_1fr] mt-9 gap gap-8">

                    <div >
                        <div className="">
                                <h2 className="font-semibold text-2xl">Description</h2>
                                {place.description}
                        </div>
                        <br />
                        
                        Check-in: {place.checkIn} am <br />
                        Check-out: {place.checkOut} pm <br />
                        Max number of guests: {place.maxGuests}
                    </div>
                    <div className="mb-6">
                        <BookingWidget place={place}/>
                    </div>
                    
                </div>
            </div>

                <div className="bg-white -mx-8 px-20 pt-4 border-t">
                    <div className="">
                        <h2 className="font-semibold text-2xl">Extra Information</h2>
                                    
                    </div>
                
                    <div className="mt-2 mb-4 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
                </div>                
                
        
        </div>
    )
}
