import { connect } from "@/dbConfig/dbConfig"; //@ refers to the src folder (not the root folder)
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server"; //Used to send responses
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json(); //Get the request body as json
    const { username, email, password } = reqBody; //Destructure the request body

    console.log(reqBody);
    //Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
