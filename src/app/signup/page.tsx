"use client"; // This is a client component

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter(); 
  const [user, setUser] = useState({
    email: "",
    password: "",   
    username:"",
  })

  const[buttonDisabled, setButtonDisabled] = useState(false); //control signup
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
       setLoading(true);
       const response = await axios.post("/api/users/signup", user);
       //toast.success("Signup successful");
       console.log("Signup success", response.data);
       router.push("/login"); //This will redirect to the login page
    } catch (error:any) { //Any is used to avoid app errors in case no error is found
      console.log("Signup failed badly",error.message);
      //toast.error("Something went wrong");
    } finally {     //This happens no matter what
      setLoading(false);
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setButtonDisabled(false)
  
    }else{
      setButtonDisabled(true)
     
    }
  }, [user])

  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="">{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onSignup}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled? "No Signup": "Signup"}
      </button>
      <Link href="/login">Visit Login Page</Link>
    </div>
  );
}
