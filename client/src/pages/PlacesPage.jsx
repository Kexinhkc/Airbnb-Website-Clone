import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";

export default function PlacesPage(){

    const {action} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

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

    async function addPhotoByLink(ev){

        ev.preventDefault(); //Prevent the 'add photo'  button from triggering a page reload 

        const {data:filename} = await axios.post('/upload-by-link', {
             link: photoLink
        });

        setAddedPhotos(prev => { //The 'prev' arg represents the current state val(prev is just a conventional name), and return a new arr using the spread operator '[...prev]' to copy the eles from the prev state array 
            return [...prev,filename]; 
        });

        setPhotoLink('');
    }

    async function uploadPhoto(ev){
        const files = ev.target.files; //Way to access the selected file
        const data = new FormData();//A special object(key value pairs that is used to send data as part of an HTTP req). Files are in binary which cannot be converted to JSON object, and files are usually too big to be included within the req body. FormData uses a specific encoding to handle files.  
        
        for (let i = 0; i < files.length; i++){
            data.append('photos',files[i]);//Append a new val to an existing key within the 'FormData' obj(create a new key if the key doesn't exist) 
        }
        
        const {data:filenames} = await axios.post('/upload',data, {
            headers:{'Content-type':'multipart/form-data'}
        });

        setAddedPhotos(prev => { 
            return [...prev,...filenames]; 
        });
    }

    return (
        <div>

            {action !== 'new' && (
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary rounded-full px-6 py-2 text-white" to={'/account/places/new'}>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new places

                    </Link>
                </div>
            )}
            
            {action === 'new' && (
                <form>
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
                    <div className="flex gap-2">
                        <input type="text" 
                               value={photoLink} 
                               onChange={ev => setPhotoLink(ev.target.value)}placeholder={'add using a link ...jpg'} />

                        <button className="bg-gray-200 rounded-2xl px-4" onClick={addPhotoByLink}>Add&nbsp;photo</button> {/*'&nbsp;' = no breaking space, meaning put in a space between two words but the two words are on the same line  */}
                    </div>
                    <div className=" mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 ">
                        {addedPhotos.length > 0 && addedPhotos.map((ele) => (
                            // eslint-disable-next-line react/jsx-key
                            <div className="flex h-32">
                                <img className="rounded-2xl w-full object-cover " src={"http://localhost:4000/uploads/" + ele } alt="A photo of this property" />
                            </div>
                        ))} 
                        {/* Using () instead of {} in the arrow function is an easy way to return JSX content, it implied that the expression inside the parentheses is what the function will return, without using the 'return' keyword */}
                        <label className="flex h-32 cursor-pointer items-center gap-1 justify-center rounded-2xl border bg-transparent p-2 text-2xl text-gray-600">
                            <input type="file" multiple className="hidden" onChange={uploadPhoto}/> {/* 'onChange' is triggered after user selects a file and closes the file selection dialog*/}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                            </svg>
                         Upload
                        </label>

                    </div>

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

                    <div>
                        <button className="primary my-4"> {/* The btn takes the length of the whole screen because there's 'w-full' inside the primary class. If that property is not set, the container will be as long as the text in <btn> and <Link> */}
                            Save
                        </button>
                    </div>

                </form>
            )}
            
        </div>
    );
}