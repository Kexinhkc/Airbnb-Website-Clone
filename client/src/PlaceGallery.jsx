import { useState } from "react";
import AddressLink from "./AddressLink";

export default function PlaceGallery({place}){

    const [showAllPhotos, setShowAllPhotos] = useState(false);

    if(showAllPhotos){
        return (
            <div className="absolute inset-0 bg-white  min-h-screen">
                
                <div className="fixed ">
                    <button onClick={() => setShowAllPhotos(false)} className="bg-white w-screen py-5 px-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>

                    </button>
                </div>

                
                <div className="grid gap-4 pt-2 inset-0 lg:pt-24 lg:px-60">
                    <div>
                        <h2 className="text-3xl mt-14 lg:mt-0">Photos of {place.title}</h2>
                    </div>
                   
                    {place?.photos?.length > 0 && (
                        place.photos.map(photo => (
                            <div key={photo}> 
                                <img src={'http://localhost:4000/uploads/'+ photo} alt="property photos"/>
                            </div>
                        ))
                    )}
                </div>
                
            </div>
        );
    } 

    return (
        <div>
        
        <div className="relative ">
                <div className="grid gap-2 grid-cols-[2fr_1fr_1fr] rounded-2xl overflow-hidden lg:max-h-fit ">
                    <div className="">
                        {place.photos?.[0] && (
                            // <div className="border border-red-400">
                                <img onClick={() => {setShowAllPhotos(true)}} className="cursor-pointer object-cover aspect-square lg:aspect-auto" src={'http://localhost:4000/uploads/' + place.photos[0]} alt="property photo 1" />
                        //     
                        )}
                    </div>

                    <div className="grid ">
                        <div>
                            {place.photos?.[1] && (
                            
                            <img onClick={() => {setShowAllPhotos(true)}} className="cursor-pointer aspect-square lg:aspect-auto object-cover  " src={'http://localhost:4000/uploads/' + place.photos[1]} alt="property photo 2"/>
                            
                            )}
                        </div>
                        
                        
                        <div className="">
                            {place.photos?.[2] && (
                                <img onClick={() => {setShowAllPhotos(true)}} className="cursor-pointer aspect-square lg:aspect-auto object-cover relative top-2" src={'http://localhost:4000/uploads/' + place.photos[2]} alt="property photo 3"/>
                            )} 
                        </div> 
                        
                            
                    </div>

                    <div className="grid ">
                        <div>
                            {place.photos?.[3] && (
                            
                            <img onClick={() => {setShowAllPhotos(true)}} className="cursor-pointer aspect-square lg:aspect-auto object-cover " src={'http://localhost:4000/uploads/' + place.photos[3]} alt="property photo 2"/>
                            
                            )}
                        </div>
                        
                        
                        <div >
                            {place.photos?.[4] && (
                                <img onClick={() => {setShowAllPhotos(true)}} className="cursor-pointer aspect-square lg:aspect-auto object-cover relative top-2 " src={'http://localhost:4000/uploads/' + place.photos[4]} alt="property photo 3"/>
                            )} 
                        </div> 
                        
                            
                    </div>
                </div>
               
                <div className="invisible lg:visible">  {/* 'lg:visible': makes ele visible when screen size is md or larger; has to use 'invisible' before it or else it is gonna be visible for all screen size */}
                    <button className="flex gap-2 absolute bottom-3 right-3 rounded-lg py-1 px-2 bg-white shadow-md" onClick={() => setShowAllPhotos(true)}> 

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>

                    Show more photos

                    </button>
                </div>
            </div>
    </div>       
    );
}
