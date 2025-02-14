"use client"; // This is a client component

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { set } from "mongoose";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      router.push("/login");
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    //this runs when the page is loaded to get the token
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    //this runs when the token changes
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);
return (
  <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1>Verify Email</h1>
    <h2 className="text-2xl mb-2 text-black">
      {token ? `${token}` : "Missing token"}
    </h2>
    {verified && (
      <div>
        <h2 className="text-2xl">Email verified successfully</h2>
        <Link className="text-blue-500" href="/login">
          Login
        </Link>
      </div>
    )}

    {error && (
      <div>
        <h2 className="text-2xl bg-red-500 text-black" >Error</h2>
      </div>
    )}
  </div>
);

}
