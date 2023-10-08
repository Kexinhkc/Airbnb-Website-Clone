import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";

export default function PlacesPage(){

    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/user-places').then(({data}) => {
            setPlaces(data);
        })
    },[]);

    return (
        <div>

            <AccountNav />
           
            <div className="text-center">
                List of all added places 
                <br /> 
                <Link className="inline-flex mt-1 gap-1 bg-primary rounded-full px-7 py-2 text-white" to={'/account/places/new'}>
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add new places

                </Link>
            </div>
            <div className="mt-4">
                {places.length > 0 && places.map(place => (
                    <Link to={'/account/places/' + place._id} key={place} className="flex mb-3 cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl">
                        
                        <div className="flex bg-gray-300 w-32 h-32 grow-0 shrink-0">
                            <PlaceImg place={place}/>
                        </div>
                           
                        <div className="grow-0 shrink">  {/* 'grow-0' prevent a flex item from growing, 'shrink' allow flex items to shrink if possible */}
                        <h2 className="text-xl ">{place.title}</h2>
                        <p className="text-sm mt-2">{place.description}</p>
                        </div>
                    </Link>
                        ))}
            </div>

            
        </div>
    );
}