"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function signUpPage(){
    const router =useRouter()
    const [user, setUser] = useState({
        password: "",
        email: "",
    })
    const [buttonDisabled, setbuttonDisabled] = useState(false)

    const [loading, setLoading] = useState(false)

    const onLogin = async() => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user)
            console.log("Logged in", response.data);
            toast.success("Logged in successfully")
            const a = router.push("/profile")
            console.log(a);
            
        } 
        catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setbuttonDisabled(false);
        }
        else{
            setbuttonDisabled(true);
        }
    }, [user])

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "processing" : "Login"}</h1>
            <hr />
            <label htmlFor="email">Email</label>
            <input 
                className="p-2 border-gray-300 rounded-sm mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text" 
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="email" />
            <label htmlFor="password">Password</label>
            <input 
                className="p-2 border-gray-300 rounded-sm mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="text" 
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password" />
                <button onClick={onLogin} 
                className="p-2 border border-gray-300 rounded-md mb-4 focus:border-gray-600">{buttonDisabled ? "No value provided" : "Login"}</button>
                <Link href="/signup">Visit Signup page</Link>
        </div>
    )
}