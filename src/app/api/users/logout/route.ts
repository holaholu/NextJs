import { NextResponse } from "next/server";
/* eslint-disable  @typescript-eslint/no-explicit-any */
export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    response.cookies.set(
      "token",
      "", //Set token to empty string- this removes token
      { httpOnly: true, expires: new Date(0) }
    ); //Set expiration date to 0 so it expires immediately

    return response; // enusures response is returned
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
