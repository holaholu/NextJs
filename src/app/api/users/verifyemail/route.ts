import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server"; //Used to send responses
/* eslint-disable  @typescript-eslint/no-explicit-any */

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json(); //Get the request body as json
    const { token } = reqBody; //Destructure the request body
    console.log(token);

    //Check if user already exists
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() }, //check if token is valid. Link was clicked within 1 hour
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }
    console.log(user);
    //Update user
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
