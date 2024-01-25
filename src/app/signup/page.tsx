"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function signUpPage(){
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setbuttonDisabled] = useState(false)

    const [loading, setloading] = useState(false)

    // Function to handle form submission.
    const onSignup = async() => {
        try {
            setloading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup success", response.data);
            router.push("/login")
        }
        catch (error : any) {
            toast.error(error.message)
        }
        finally{
            setloading(true);
        }

    }
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setbuttonDisabled(false);
        }
        else{
            setbuttonDisabled(true);
        }
    }, [user])
    
    return(
        <div className="bg-grey-lighter min-h-screen flex flex-col">
                    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                            <h1 className="mb-8 text-3xl text-center">{loading? "Processing" : "Sign Up"}</h1>
                            <input 
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                id="username"
                                type="text" 
                                value={user.username}
                                onChange={(e) => setUser({...user, username: e.target.value})}
                                placeholder="username" />
        
                            <input 
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                id="email"
                                type="text" 
                                value={user.email}
                                onChange={(e) => setUser({...user, email: e.target.value})}
                                placeholder="email" />
        
                            <input 
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                id="password"
                                type="text" 
                                value={user.password}
                                onChange={(e) => setUser({...user, password: e.target.value})}
                                placeholder="password" />
        
                            <button
                                onClick={onSignup}
                                className="w-full text-center py-3 rounded bg-green text-black hover:bg-green-dark focus:outline-none my-1"
                            >{buttonDisabled ? "No value provided" : "Create Account"}</button>
        
                            <div className="text-center text-sm text-grey-dark mt-4">
                                By signing up, you agree to the 
                                <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                    Terms of Service
                                </a> and 
                                <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                    Privacy Policy
                                </a>
                            </div>
                        </div>
        
                        <div className="text-grey-dark mt-6">
                            Already have an account? 
                            <a className="no-underline border-b border-blue text-blue" href="/login">
                                Log in
                            </a>.
                        </div>
                    </div>
                </div>
    )
}