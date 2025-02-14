import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
/* eslint-disable  @typescript-eslint/no-explicit-any */
export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!); //any is used to tell typescript that this is not null
        return decodedToken.id; //can also return decodedToken.email or decodedToken.username. Check api/users/login
        
    } catch (error:any) {
        throw new Error(error.message);
    }
};