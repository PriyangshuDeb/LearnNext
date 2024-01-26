"use client";
import Link from "next/link";
import React, { useState } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProfilePage(){
    const router = useRouter()

    const [data, setData] = useState("nothing")

    const logout = () => {
        try {
            axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } 
        catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const getUserDetails = async() => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <h1>Profile Page</h1>  
            <h2 className="p-3 rounded bg-green-500">{data === "nothing" ? "Nothing" : <Link href = {`/profile/${data}`}>{data}</Link>}</h2>   
            <hr /> 
            <button onClick={logout} className="py-2 px-4 mt-4 rounded font-bold text-white bg-blue-400 hover:bg-blue-700">Logout</button>
            <hr />
            <button onClick={getUserDetails} className="py-2 px-4 mt-4 rounded font-bold text-white bg-red-400 hover:bg-red-700">GetUserDetails</button>
        </div>
    )
}