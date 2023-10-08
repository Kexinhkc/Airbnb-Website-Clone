import axios from "axios";
import { useEffect, useState } from "react";
import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage(){

    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState(''); 
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);
    const [price, setPrice] = useState(100);

    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/places/'+id).then((response) => {
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        })
    },[id]);

    function inputHeader(text){
        return(
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }

    function inputDescription(text){
        return(
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }

    function preInput(header,description){
        return(
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    async function saveNewPlace(ev){
        ev.preventDefault();
        // console.log("submit once");
        const placeData = {
            title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price 
        };

        if(!id){
           
           await axios.post('/place', placeData) //'data' is an object of the response data which can be used to access response body
           setRedirect(true);

        }else{
            await axios.put('/place', {id, ...placeData});
            setRedirect(true);
        }
       
       
    }

    if(redirect){
        return <Navigate to="/account/places" />
    }

    return (
    <div>
        <AccountNav/>
         <form onSubmit={saveNewPlace}>
                    {/* Title Field */}
                    {preInput('Title', 'Title for your place should be short and catchy')}
                    <input type="text" 
                           value={title} 
                           onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: Lovely House In the Hill" />

                     {/* Address Field */}
                     {preInput('Address','Address for this place')}
                    <input type="text" 
                           value={address} 
                           onChange={ev => setAddress(ev.target.value)} placeholder="address"/>

                    {/* Photos Field */}
                    {preInput('Photos','More is better')}
                    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                    
                    {/* Description */}
                    {preInput('Description','Detailed description of your place to let viewers')}
                    <textarea value={description} 
                              onChange={ev => setDescription(ev.target.value)}/>

                    {/* Perks */}
                    {preInput('Perks','Select all the perks of your place')}
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        <Perks selected={perks} onChange={setPerks}/>
                    </div>

                    {/* Extra Info */}
                    {preInput('House Rules', 'Address for this place')}
                    <textarea value={extraInfo} 
                              onChange={ev => setExtraInfo(ev.target.value)}/>
                    
                    {/* Check-in and check-out time */}
                    {preInput('Check-In & Out Times','Remember to have some time window for cleaning the room before guests arrive')}

                    <div className="grid gap-2 sm:grid-cols-3"> {/* 'sm' because if always have 3 cols, when the screen is really small, there is not enough space to put 3 cols and the last col will be squeezed up */}
                        <div>
                            <h3 className="mt-2 -mb-1">Check in time</h3>
                            <input type="text" 
                                   value={checkIn}
                                   onChange={ev => setCheckIn(ev.target.value)}
                                   placeholder="3:00 pm"/>
                        </div>
                        
                        <div>
                            <h3 className="mt-2 -mb-1">Check out time</h3>
                            <input type="text" 
                                   value={checkOut}
                                   onChange={ev => setCheckOut(ev.target.value)}
                                   placeholder="11:00 am"/>
                        </div>
                        
                        <div>
                            <h3 className="mt-2 -mb-1">Max number of guests</h3>
                            <input type="number" 
                                   value={maxGuests}
                                   onChange={ev => setMaxGuests(ev.target.value)}
                                />
                           
                        </div>

                    </div>

                    {/* Price Field */}
                    {preInput('Price','Price for one night')}
                    <input type="number" 
                           value={price} 
                           onChange={ev => setPrice(ev.target.value)} placeholder="$100"/>

                    <div>
                        <button className="primary my-4"> {/* The btn takes the length of the whole screen because there's 'w-full' inside the primary class. If that property is not set, the container will be as long as the text in <btn> and <Link> */}
                            Save
                        </button>
                    </div>

                </form>
    </div>
    );
}