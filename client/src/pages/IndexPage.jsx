import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";


export default function IndexPage() {
    const [places,setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/places').then(response => { //'response' is an arr, each element is an object
            setPlaces(response.data);//'.data' contains the content of the response body, e.g. JSON, text...
        });
    },[]);
    
   
    return(
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && places.map( place => (
            <Link to={'/place/'+place._id} className=" " key={place.title}>
                <div className="rounded-2xl mb-2 flex">
                    {place.photos?.[0] && (
                        <img className="rounded-2xl aspect-square  object-cover " src={'http://localhost:4000/uploads/' + place.photos[0]} />
                    )}{/* 'aspect-square' will give you a square container(based on the bigger dimention) & stretching the image. 'Object-cover' enlarges the image to fit the sqaure container */}
                </div>
                <h2 className="text-sm font-bold ">
                {place.address}
                </h2>

                <h3 className="text-sm text-gray-500">
                {place.title}
                </h3>
                
                <div className="mt-1/2">
                   <span className="font-bold">${place.price} </span> per night
                </div>
            </Link>
                
            ))}
        </div>
    )

}