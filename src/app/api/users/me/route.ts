import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();
export async function GET(request: NextRequest) {
  try {
    const useId = await getDataFromToken(request);
    const user = await User.findById({ _id: useId }).select(
      "-password -refreshToken"
    );
    return NextResponse.json({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
