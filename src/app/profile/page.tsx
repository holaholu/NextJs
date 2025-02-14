"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";  //make sure its from /navigation
import { useState } from "react";
import { set } from "mongoose";
import { link } from "fs";
import { get } from "http";
export default function ProfilePage() {
  const Router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
        await axios.get("/api/users/logout");
      toast.success("Logout successful");
      //window.location.href = "/login";  
      Router.push("/login");
    } catch (error:any) {
       console.log(error.message);
       toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id); 
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className="p-1 rounded bg-green-500">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="bg-red-500  mt-4 inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      >
        Logout
      </button>

      <button
        onClick={getUserDetails}
        className="bg-green-800  mt-4 inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      >
        Get User Details
      </button>
    </div>
  );
}
