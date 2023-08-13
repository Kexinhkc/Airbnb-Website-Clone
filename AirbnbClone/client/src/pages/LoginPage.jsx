// import { useState } from "react";
import { Link } from "react-router-dom";
// import axios from 'axios';

export default function RegisterPage(){

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-60">
                <h1 className="text-center text-4xl mb-4 ">Login</h1>
                <form  className="max-w-md mx-auto" > 
                    
                    <input 
                    type="email" 
                    placeholder="yourmail@gmail.com" 
                    />

                    <input 
                    type="password" 
                    placeholder="password" 
                    />

                    <button className="primary" >Login</button>

                    <div className="text-center py-2 text-gray-500">
                    Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register</Link>
                    </div>
                </form>

                
            </div>
            
        </div>
    );
}