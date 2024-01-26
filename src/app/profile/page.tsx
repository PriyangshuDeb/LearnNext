"use client";
import Link from "next/link";
import React, { useState } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProfilePage(){
    const router = useRouter()
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
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <h1>Profile Page</h1>      
            <button onClick={logout} className="py-2 px-4 rounded font-bold text-white bg-blue-400 hover:bg-blue-700">Logout</button>
        </div>
    )
}