import { connect } from "@/dbConfig/dbConfig"; //@ refers to the src folder (not the root folder)
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server"; //Used to send responses
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {

    try {
                 const reqBody = await request.json(); //Get the request body as json
                 const { email, password } = reqBody; //Destructure the request body
                 console.log(reqBody);
                 const user = await User.findOne({ email });
                
                 //Check if user already exists
                 if (!user) {
                   return NextResponse.json(
                     { error: "User does not exist" },
                     { status: 400 }
                   );
                 }

                 //Check if password is correct
                 const validPassword = await bcrypt.compare(
                   password,
                   user.password
                 );
                 if (!validPassword) {
                   return NextResponse.json(
                     { error: "Invalid password" },
                     { status: 400 }
                   );
                 }

                 //Create token data
                 const tokenData = {
                   id: user._id,
                   username: user.username,
                   email: user.email,
                 };

                 //Create token
                 const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { //! is used to tell typescript that this is not null. jwt.sign is used to sign the token
                   expiresIn: "1d",}) //This is the expiry time

                   const response = NextResponse.json({
                     message: "Login successful",
                     success: true,
                   });
                   response.cookies.set("token", token, {  //This is used to set the browser cookie
                     httpOnly: true,
                   });

                   console.log(token)
                  
                   return response
                   
        
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})     
    }
}    